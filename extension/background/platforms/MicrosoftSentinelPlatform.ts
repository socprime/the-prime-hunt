import { BGListenerType } from '../types/types-background-common';
import { BrowserTabInfo, PlatformID, PlatformName } from '../../common/types/types-common';
import { setBGInterceptor } from '../services/background-services-listeners';
import { Url } from '../../../common/types';
import { AbstractBackgroundPlatform } from './AbstractBackgroundPlatform';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { http } from '../../../common/Http';
import { uuid } from '../../../common/helpers';
import { ParsedResult } from '../../app/resources/resources-types';
import { Loggers } from '../../common/loggers';
import { normalizeParsedResources } from '../services/background-services';

let loggers: Loggers;

export class MicrosoftSentinelPlatform extends AbstractBackgroundPlatform {
  private static postUrls: Url[] = [
    'https://api.loganalytics.io',
  ];

  private static timestampFieldName = 'TimeGenerated';

  constructor() {
    super();
    this.watchingResources = {};
    this.mappedResourcesData = {};
    this.emptyFieldValues = [
      ...this.emptyFieldValues,
      '-',
    ];
  }

  static readonly id = PlatformID.MicrosoftSentinel;

  getID() {
    return MicrosoftSentinelPlatform.id;
  }

  getName() {
    return PlatformName.MicrosoftSentinel;
  }

  register() {
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
              || !MicrosoftSentinelPlatform.postUrls.some((p) => href.indexOf(p) > -1)
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
          const { href } = new URL(details.url);
          if (!isMatched(
            () => !(
              urlsProcessing.has(details.url)
              || details.method !== 'POST'
              || !MicrosoftSentinelPlatform.postUrls.some((p) => href.indexOf(p) > -1)
              || !bodyData.has(details.url)
              || !details.requestHeaders
            ),
            params,
            id,
          )) {
            return;
          }

          urlsProcessing.add(details.url);
          this.mappedResourcesData = {};

          const removeAttached = () => {
            urlsProcessing.delete(details.url);
            bodyData.delete(details.url);
            if (urlsProcessing.size < 1) {
              AbstractBackgroundPlatform.sendLoading(details.tabId, false);
            }
          };

          const bodyBytes = bodyData.get(details.url)!;
          const bodyStr = new TextDecoder().decode(bodyBytes);

          AbstractBackgroundPlatform.sendLoading(details.tabId, true);

          const { url } = details;
          const cacheID = url;

          http.post(
            {
              url,
              body: bodyBytes,
              headers: details.requestHeaders!.reduce((res: any, header: any) => {
                res[header.name] = header.value;
                return res;
              }, {}),
            },
            {
              onJSONSuccess: async (response: any) => {
                const resources = normalizeParsedResources(
                  await this.parseResponse(response, {
                    origin: new URL(details.url).origin,
                    id: details.tabId,
                  }),
                );
                AbstractBackgroundPlatform.sendParsedData(
                  details.tabId,
                  {
                    cacheID,
                    resources,
                    fieldsNames: [...this.fields],
                    mappedResourcesData: this.mappedResourcesData,
                  },
                  true,
                );
                this.lastResponse.set(cacheID, response);
                removeAttached();
              },
              onError: (e: Error) => {
                loggers
                  .error()
                  .addPrefix('failed webRequest post')
                  .log(e, details.method, url, bodyStr);
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

  async parseResponse(response: {
    tables: [{
      columns: {
        name: string;
        type: string;
      }[]
      rows: [];
    }];
  }, tabInfo: BrowserTabInfo) {
    const id = uuid();
    const watchingResources = this.getWatchers(tabInfo);

    const { fields } = this;
    fields.clear();

    loggers.debug().log(`[${tabInfo.id}] Started parse response...`, id, this.watchingResources, tabInfo);

    const result: ParsedResult = {};

    const {
      mapFieldNameToTypes,
      fieldsNames,
    } = AbstractBackgroundPlatform.getNormalizedWatchers(watchingResources);

    const mappedFieldNamesToIndex = (response?.tables?.[0]?.columns || [])
      .reduce((map, d, index) => {
        map.set(d.name, index);
        fields.add(d.name);
        return map;
      }, new Map()) || new Map();

    (response?.tables?.[0]?.rows || []).forEach((row: string[]) => {
      Array.from(fieldsNames).forEach((fieldName) => {
        if (mappedFieldNamesToIndex.has(fieldName)) {
          const types = mapFieldNameToTypes.get(fieldName)!;
          types.forEach((t) => {
            if (typeof result[t] === 'undefined') {
              result[t] = {};
            }
            const resourceName = row[mappedFieldNamesToIndex.get(fieldName)];
            this.addValueToResource(
              result[t],
              fieldName,
              resourceName,
            );
            const timestampFieldIndex = mappedFieldNamesToIndex.get(
              MicrosoftSentinelPlatform.timestampFieldName,
            );
            if (typeof timestampFieldIndex !== 'number' || !row[timestampFieldIndex]) {
              return;
            }
            const timestamp = row[timestampFieldIndex];
            this.collectResourceMeta(
              t,
              fieldName,
              resourceName,
              { timestamp },
            );
          });
        }
      });
    });

    loggers.debug().log(`[${tabInfo.id}] Finished parse response`, id, result, this.mappedResourcesData);

    return result;
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(MicrosoftSentinelPlatform.id);
