import { AbstractBackgroundPlatform } from './AbstractBackgroundPlatform';
import { PlatformID, PlatformName } from '../../common/types/types-common';
import { Url } from '../../../common/types';
import { setBGInterceptor } from '../services/background-services-listeners';
import { BGListenerType, WatchingResources } from '../types/types-background-common';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { uuid } from '../../../common/helpers';
import { http } from '../../../common/Http';
import { ParsedResult } from '../../app/resources/resources-types';
import { Loggers } from '../../common/loggers';

let loggers: Loggers;

export class MicrosoftDefenderPlatform extends AbstractBackgroundPlatform {
  private static postUrls: Url[] = [
    'https://api-eu.securitycenter.windows.com/api/',
    'https://security.microsoft.com/apiproxy/mtp/huntingService/queryExecutor',
  ];

  static id = PlatformID.MicrosoftDefender;

  constructor() {
    super();
    this.watchingResources = {} as WatchingResources;
  }
  
  getID() {
    return MicrosoftDefenderPlatform.id;
  }

  getName() {
    return PlatformName.MicrosoftDefender;
  }

  async parseResponse(response: {
    Results: Record<string, string>[];
  }) {
    const id = uuid();
    loggers.debug().log('started parse response...', id, this.watchingResources);

    const result: ParsedResult = {};

    const { mapFieldNameToTypes, fieldsNames } = AbstractBackgroundPlatform.getNormalizedWatchers(this.watchingResources);

    (response?.Results || []).forEach(document => {
      Array.from(fieldsNames).forEach(fieldName => {
        if (document?.[fieldName]) {
          const types = mapFieldNameToTypes.get(fieldName)!;
          types.forEach(t => {
            if (typeof result[t] === 'undefined') {
              result[t] = {};
            }
            this.addValueToResource(result[t], fieldName, document[fieldName]);
          });
        }
      });
    });

    loggers.debug().log('finished parse response', id, result);

    return result;
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
              || !MicrosoftDefenderPlatform.postUrls.some(p => href.indexOf(p) > -1)
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
              || !MicrosoftDefenderPlatform.postUrls.some(p => href.indexOf(p) > -1)
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
            if (urlsProcessing.size < 1) {
              AbstractBackgroundPlatform.sendLoading(details.tabId, false);
            }
          };

          AbstractBackgroundPlatform.sendLoading(details.tabId, true);

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
              onJSONSuccess: async (response: any) => {
                AbstractBackgroundPlatform.sendParsedData(
                  details.tabId,
                  await this.parseResponse(response),
                  true,
                );
                this.lastResponse = response;
                removeAttached();
              },
              onError: e => {
                loggers
                  .error()
                  .addPrefix('failed webRequest post')
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

loggers = require('../../common/loggers').loggers
  .addPrefix(MicrosoftDefenderPlatform.id);
