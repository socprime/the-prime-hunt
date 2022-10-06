import { BGListenerType } from '../../types/types-background-common';
import { ParsedResult, PlatformID, ResourceType } from '../../../common/types/types-common';
import { setBGInterceptor } from '../../background-listeners';
import { Url } from '../../../../common/types';
import { getDebugPrefix } from '../../../common/loggers/loggers-debug';
import { AbstractPlatform } from '../AbstractPlatform';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { microsoftSentinelWatchers } from './microsoft-sentinel-watchers';
import { getNormalizedWatchers } from '../background-platforms-helpers';
import { sendMessageFromBackground } from '../../background-services';
import { SetLoadingStatePayload } from '../../../common/types/types-common-payloads';
import { MessageToApp } from '../../../app/types/types-app-messages';
import { LoadingKey } from '../../../app/types/types-app-common';

const loggers = require('../../../common/loggers').loggers
  .addPrefix(getDebugPrefix('background'))
  .addPrefix(PlatformID.microsoftSentinel);

export class MicrosoftSentinelPlatform extends AbstractPlatform {
  constructor() {
    super();
    this.watchingResources = microsoftSentinelWatchers;
    this.emptyFieldValue = '-';
  }

  static readonly id = PlatformID.microsoftSentinel;

  getID() {
    return MicrosoftSentinelPlatform.id;
  }

  register() {
    const urlsProcessing = new Set<Url>();
    const bodyData = new Map<Url, ArrayBuffer>();

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeRequest,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestBodyDetails;
          const { host } = new URL(details.url);
          if (!isMatched(
            () => !(
              urlsProcessing.has(details.url)
              || details.method !== 'POST'
              || !/(api.loganalytics.io)$/.test(host)
              || !details.requestBody?.raw?.[0]?.bytes?.byteLength
              || details.requestBody?.raw[0].bytes.byteLength < 5
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
          const { host } = new URL(details.url);
          if (!isMatched(
            () => !(
              urlsProcessing.has(details.url)
              || details.method !== 'POST'
              || !/(api.loganalytics.io)$/.test(host)
              || !bodyData.has(details.url)
              || !details.requestHeaders
            ),
            params,
            id,
          )) {
            return;
          }

          urlsProcessing.add(details.url);

          const removeAttached = () => {
            urlsProcessing.delete(details.url);
            bodyData.delete(details.url);
          };

          const bodyBytes = bodyData.get(details.url)!;
          const bodyStr = new TextDecoder().decode(bodyBytes);

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

  unregister() {
    super.unregister();
    loggers.debug().log('unregistered');
  }

  parseResponse(response: {
    tables: [{
      columns: {
        name: string;
        type: string;
      }[]
      rows: [];
    }];
  }): ParsedResult {
    loggers.debug().log('started parse response...');

    const results: ParsedResult = {
      'assets': {},
      'accounts': {},
      'services': {},
    };

    const { mapFieldNameToType, fieldsNames } = getNormalizedWatchers(this.watchingResources);

    const mappedFieldNamesToIndex = (response?.tables?.[0]?.columns || [])
      .reduce((map, d, index) => {
        map.set(d.name, index);
        return map;
      }, new Map()) || new Map();

    (response?.tables?.[0]?.rows || []).forEach((row: string[]) => {
      Array.from(fieldsNames).forEach(fieldName => {
        if (mappedFieldNamesToIndex.has(fieldName)) {
          const types = mapFieldNameToType.get(fieldName)!;
          types.forEach(t => {
            this.addValueToResource(
              results[t],
              fieldName,
              row[mappedFieldNamesToIndex.get(fieldName)],
            );
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

  parseContent(): ParsedResult {
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
}