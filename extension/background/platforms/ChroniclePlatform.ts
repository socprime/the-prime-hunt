import { AbstractBackgroundPlatform } from './AbstractBackgroundPlatform';
import { BrowserTabInfo, PlatformID, PlatformName } from '../../common/types/types-common';
import { ParsedResult } from '../../app/resources/resources-types';
import { Loggers } from '../../common/loggers';
import { Url } from '../../../common/types';
import { setBGInterceptor } from '../services/background-services-listeners';
import { BGListenerType, WatchingResources } from '../types/types-background-common';
import { parseJSONSafe, uuid } from '../../../common/helpers';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { http } from '../../../common/Http';
import { normalizeParsedResources } from '../services/background-services';

let loggers: Loggers;

export class ChroniclePlatform extends AbstractBackgroundPlatform {
  static id = PlatformID.Chronicle;

  static platformName = PlatformName.Chronicle;

  // private static timestampFieldName = '';

  private static postUrls: Url[] = [
    '/legacy:legacyFetchUdmSearchView',
  ];

  getID(): PlatformID {
    return ChroniclePlatform.id;
  }

  getName(): PlatformName {
    return ChroniclePlatform.platformName;
  }

  constructor() {
    super();
    this.watchingResources = {};
    this.emptyFieldValues = [
      ...this.emptyFieldValues,
      '-',
    ];
  }

  async parseFields(
    siemFields: Fields['fields'],
    watchingResources: WatchingResources,
    result: ParsedResult,
  ) {
    const {
      mapFieldNameToTypes,
      fieldsNames,
    } = AbstractBackgroundPlatform.getNormalizedWatchers(watchingResources);
    const { fields } = this;

    (siemFields || []).forEach((field) => {
      const { fieldName, allValues } = field || {};
      if (!fieldName || !allValues) {
        return;
      }
      (allValues || []).forEach((v) => {
        const type = Object.keys(v?.value || {})?.[0];
        const value = v?.value[type];

        if (!value) {
          return;
        }

        fields.add(fieldName);

        if (fieldsNames.has(fieldName)) {
          const types = mapFieldNameToTypes.get(fieldName)!;
          types.forEach((t) => {
            if (typeof result[t] === 'undefined') {
              result[t] = {};
            }
            this.addValueToResource(result[t], fieldName, String(value));
          });
        }
      });
    });
  }

  async parseResponse(
    response: ResponsePackage[],
    tabInfo: BrowserTabInfo,
  ): Promise<ParsedResult> {
    const id = uuid();
    loggers.debug().log(`[${tabInfo.id}] Started parse response...`, id, this.watchingResources, tabInfo);
    const result: ParsedResult = {};
    const watchingResources = this.getWatchers(tabInfo);

    await Promise.all(
      (response || [])
        .reduce((promises, rp) => {
          promises.push(
            this.parseFields(rp?.fieldAggregations?.fields, watchingResources, result),
            this.parseFields(rp?.groupedFieldAggregations?.fields, watchingResources, result),
          );
          return promises;
        }, [] as Promise<void>[]),
    );

    loggers.debug().log(`[${tabInfo.id}] Finished parse response`, id, result);

    return result;
  }

  register(): void {
    const requests = new Map();

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeRequest,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestBodyDetails;
          if (isMatched(() => {
            if (
              details.method !== 'POST'
              || !ChroniclePlatform.postUrls.some((u) => details.url.indexOf(u) > -1)
              || !details.requestBody?.raw?.[0]?.bytes?.byteLength
              || details.requestBody?.raw?.[0]?.bytes?.byteLength < 5
            ) {
              return false;
            }

            const bodyStr = new TextDecoder().decode(details.requestBody!.raw![0].bytes!);
            const body: any = parseJSONSafe(bodyStr, false);

            if (
              !body
              || !body.baselineQuery
              || body.baselineQuery.length < 1
              || requests.has(body.baselineQuery)
            ) {
              return false;
            }

            requests.set(body.baselineQuery, body);

            return true;
          })) {
            Promise.resolve();
          }
        },
      ),
    );

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeSendHeaders,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestHeadersDetails;
          if (isMatched(() => {
            return details.method === 'POST'
              && ChroniclePlatform.postUrls.some((u) => details.url.indexOf(u) > -1)
              && (details.requestHeaders || []).some(({ name, value }) => {
                return requests.size > 0
                  && (name.toLowerCase() === 'origin'
                    && value
                    && value.indexOf('http') === 0);
              });
          })) {
            const body = requests.values().next().value;
            const baselineQuery = body?.baselineQuery;

            const { url } = details;
            const headers = details.requestHeaders!.reduce((res: any, header: any) => {
              res[header.name] = header.value;
              return res;
            }, {});

            const onFinish = () => {
              requests.delete(baselineQuery);
            };

            http.post({
              url, body: JSON.stringify(body), headers,
            }, {
              onJSONSuccess: async (response) => {
                const resources = normalizeParsedResources(
                  await this.parseResponse(response as any, {
                    origin: new URL(details.url).origin,
                    id: details.tabId,
                  }),
                );
                AbstractBackgroundPlatform.sendParsedData(
                  details.tabId,
                  {
                    cacheID: url,
                    resources,
                    fieldsNames: [...this.fields],
                    mappedResourcesData: this.mappedResourcesData,
                  },
                  false,
                );
                this.lastResponse.set(url, response);
                onFinish();
              },
              onError: (e) => {
                onFinish();
                loggers
                  .warn()
                  .addPrefix('failed webRequest post')
                  .log(e, details.method, url, JSON.stringify(body));
              },
            });
          }
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
  .addPrefix(ChroniclePlatform.id);

type ResponsePackage = {
  groupedFieldAggregations: Fields;
  fieldAggregations: Fields
};

type Fields = {
  fields: {
    fieldName: string;
    allValues: {
      value: {
        [key: string]: string;
      };
    }[];
  }[];
}
