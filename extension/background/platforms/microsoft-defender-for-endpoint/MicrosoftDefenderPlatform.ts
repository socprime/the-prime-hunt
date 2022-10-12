import { AbstractPlatform } from '../AbstractPlatform';
import { ParsedResult, PlatformID, ResourceType } from '../../../common/types/types-common';
import { Url } from '../../../../common/types';
import { getDebugPrefix } from '../../../common/loggers/loggers-debug';
import { setBGInterceptor } from '../../background-listeners';
import { BGListenerType } from '../../types/types-background-common';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { microsoftDefenderPostsUrls, microsoftDefenderWatchers } from './microsoft-defender-watchers';
import { getNormalizedWatchers } from '../background-platforms-helpers';
import { sendMessageFromBackground } from '../../background-services';
import { SetLoadingStatePayload } from '../../../common/types/types-common-payloads';
import { MessageToApp } from '../../../app/types/types-app-messages';
import { LoadingKey } from '../../../app/types/types-app-common';

const loggers = require('../../../common/loggers').loggers
  .addPrefix(getDebugPrefix('background'))
  .addPrefix(PlatformID.MicrosoftDefender);

export class MicrosoftDefenderPlatform extends AbstractPlatform {
  constructor() {
    super();
    this.watchingResources = microsoftDefenderWatchers;
    this.emptyFieldValue = '';
  }
  
  getID() {
    return PlatformID.MicrosoftDefender;
  }

  parseContent() {
    const results: {
      [key in ResourceType]: {
        [fieldName: string]: Set<string>;
      };
    } = {
      'assets': {},
      'accounts': {},
      'services': {},
    };

    return {
      accounts: results.accounts,
      assets: results.assets,
      services: results.services,
    };
  }

  parseResponse(response: {
    Results: Record<string, string>[];
  }) {
    loggers.debug().log('started parse response...');

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

    loggers.debug().log('finished parse response');

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

          sendMessageFromBackground<SetLoadingStatePayload>(details.tabId, {
            type: MessageToApp.AppSetLoadingState,
            payload: {
              loading: true,
              key: LoadingKey.resourcesAdding,
            },
          });

          this.getResourceData(
            details.tabId,
            {
              bodyBytes,
              url: details.url,
              requestHeaders: details.requestHeaders!,
            },
            {
              onJSONSuccess: () => {
                removeAttached();
              },
              onError: (e) => {
                loggers
                  .error()
                  .addPrefix('Failed webRequest post')
                  .log(e, details.method, details.url, bodyStr);
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