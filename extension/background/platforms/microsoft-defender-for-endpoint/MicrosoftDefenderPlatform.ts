import { AbstractPlatform } from '../AbstractPlatform';
import { NormalizedParsedResult, ParsedResult, PlatformID } from '../../../common/types/types-common';
import { Url } from '../../../../common/types';
import { getDebugPrefix } from '../../../common/loggers/loggers-debug';
import { setBGInterceptor } from '../../services/background-services-listeners';
import { BGListenerType, TabID } from '../../types/types-background-common';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { microsoftDefenderPostsUrls, microsoftDefenderWatchers } from './microsoft-defender-watchers';
import { getNormalizedWatchers } from '../background-platforms-helpers';
import { normalizeParsedResource, sendMessageFromBackground } from '../../services/background-services';
import { SetLoadingStatePayload } from '../../../common/types/types-common-payloads';
import { MessageToApp } from '../../../app/types/types-app-messages';
import { LoadingKey } from '../../../app/types/types-app-common';
import { uuid } from '../../../../common/helpers';
import { http } from '../../../../common/Http';

const loggers = require('../../../common/loggers').loggers
  .addPrefix(getDebugPrefix('background'))
  .addPrefix(PlatformID.MicrosoftDefender);

export class MicrosoftDefenderPlatform extends AbstractPlatform {
  private static sendLoading(tabID: TabID, loading: boolean) {
    sendMessageFromBackground<SetLoadingStatePayload>(tabID, {
      type: MessageToApp.AppSetLoadingState,
      payload: {
        loading,
        key: LoadingKey.resourcesAdding,
      },
    });
  }

  static id = PlatformID.MicrosoftDefender;

  constructor() {
    super();
    this.watchingResources = microsoftDefenderWatchers;
    this.emptyFieldValue = '';
  }
  
  getID() {
    return MicrosoftDefenderPlatform.id;
  }

  parseResponse(response: {
    Results: Record<string, string>[];
  }) {
    const id = uuid();
    loggers.debug().log('started parse response...', id, this.watchingResources);

    const results: ParsedResult = {
      'assets': {},
      'accounts': {},
      'services': {},
    };

    const { mapFieldNameToType, fieldsNames } = getNormalizedWatchers(this.watchingResources);

    (response?.Results || []).forEach(document => {
      Array.from(fieldsNames).forEach(fieldName => {
        if (document?.[fieldName]) {
          const types = mapFieldNameToType.get(fieldName)!;
          types.forEach(t => {
            this.addValueToResource(results[t], fieldName, document[fieldName]);
          });
        }
      });
    });

    loggers.debug().log('finished parse response', id);

    return {
      services: results.services,
      accounts: results.accounts,
      assets: results.assets,
    };
  }

  register(): void {
    const urlsProcessing = new Set<Url>();
    const bodyData = new Map<Url, ArrayBuffer>();

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeRequest,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestBodyDetails;
          const { href } = new URL(details.url);
          if (!isMatched(
            () => !(
              urlsProcessing.has(details.url)
              || details.method !== 'POST'
              || !microsoftDefenderPostsUrls.some(p => href.indexOf(p) > -1)
              || !details.requestBody?.raw?.[0]?.bytes?.byteLength
              || details.requestBody.raw[0].bytes.byteLength < 5
            ),
            params,
            id,
          )) {
            return;
          }
          bodyData.set(details.url, details.requestBody!.raw![0].bytes!);
        },
      ),
    );

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeSendHeaders,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestHeadersDetails;
          const { href } = new URL(details.url);
          if (!isMatched(
            () => !(
              urlsProcessing.has(details.url)
              || details.method !== 'POST'
              || !microsoftDefenderPostsUrls.some(p => href.indexOf(p) > -1)
              || !bodyData.has(details.url)
              || !details.requestHeaders
            ),
            params,
            id,
          )) {
            return;
          }
          const bodyBytes = bodyData.get(details.url)!;
          const bodyStr = new TextDecoder().decode(bodyBytes);

          urlsProcessing.add(details.url);

          const removeAttached = () => {
            urlsProcessing.delete(details.url);
            bodyData.delete(details.url);
          };

          MicrosoftDefenderPlatform.sendLoading(details.tabId, true);

          http.post(
            {
              url: details.url,
              body: bodyBytes,
              headers: details.requestHeaders!.reduce((res: any, header: any) => {
                res[header.name] = header.value;
                return res;
              }, {}),
            },
            {
              onJSONSuccess: (response: any) => {
                const parsedResponse = this.parseResponse(response);
                sendMessageFromBackground<NormalizedParsedResult>(details.tabId, {
                  id: `parsed-response--${uuid()}`,
                  type: MessageToApp.AppTakeNewResourceData,
                  payload: {
                    services: normalizeParsedResource(parsedResponse.services),
                    assets: normalizeParsedResource(parsedResponse.assets),
                    accounts: normalizeParsedResource(parsedResponse.accounts),
                  },
                });
                this.lastResponse = response;
                removeAttached();
              },
              onError: (e: Error) => {
                loggers
                  .error()
                  .addPrefix('failed webRequest post')
                  .log(e, details.method, details.url, bodyStr);
                MicrosoftDefenderPlatform.sendLoading(details.tabId, false);
                removeAttached();
              },
            },
          );
        },
      ),
    );

    loggers.debug().log('registered');
  }

  unregister(): void {
    super.unregister();
    loggers.debug().log('unregistered');
  }

}