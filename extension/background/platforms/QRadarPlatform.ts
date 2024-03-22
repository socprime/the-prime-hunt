import { AbstractBackgroundPlatform } from './AbstractBackgroundPlatform';
import { BrowserTabInfo, PlatformID, PlatformName } from '../../common/types/types-common';
import { ParsedResult } from '../../app/resources/resources-types';
import { BGListenerType, WatchingResources } from '../types/types-background-common';
import { setBGInterceptor } from '../services/background-services-listeners';
import { Url } from '../../../common/types';
import { http } from '../../../common/Http';
import { Loggers } from '../../common/loggers';
import { createFormDataString } from '../../common/common-helpers';
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import { uuid } from '../../../common/helpers';
import { normalizeParsedResources } from '../services/background-services';
import { isNumberInString } from '../../../common/checkers';

let loggers: Loggers;

export class QRadarPlatform extends AbstractBackgroundPlatform {
  private static postUrls: Url[] = [
    '/JSON-RPC/QRadar.getLatestStreamHTML',
    // '/ariel/arielSearch',
    '/JSON-RPC/QRadar.stopArielStreaming',
    '/JSON-RPC/QRadar.startArielStreaming',
  ];

  private static getUrls: Url[] = [
    '/ariel/arielSearch?appName',
  ];

  private static isAreaSearchUrl(url: Url): boolean {
    return url.indexOf(QRadarPlatform.postUrls[1]) > -1;
  }

  private static isStopStreamingUrl(url: Url): boolean {
    return url.indexOf(QRadarPlatform.postUrls[2]) > -1;
  }

  static id = PlatformID.QRadar;

  constructor() {
    super();
    this.watchingResources = {};
    this.emptyFieldValues = [
      ...this.emptyFieldValues,
      'N/A',
      '-',
    ];
  }

  getID() {
    return QRadarPlatform.id;
  }

  getName() {
    return PlatformName.QRadar;
  }

  private parseLastHtmlResponse(
    response: LastHtmlResponse,
    watchingResources: WatchingResources,
  ): ParsedResult {
    const {
      mapFieldNameToTypes,
      fieldsNames,
    } = AbstractBackgroundPlatform.getNormalizedWatchers(watchingResources);
    const result: ParsedResult = {};

    const { fields } = this;

    response.result?.rows?.forEach((r) => {
      const $ = require('cheerio').load(`<body><table>${r}</table></body>`);
      let timestamp = '';
      $('td').each((i: number, e: Element) => {
        const elem = $(e);
        const value = elem.text()?.trim();
        const fieldName = elem.attr('propertylabel')?.trim();
        if (fieldName) {
          fields.add(fieldName);
        }
        if (fieldName && fieldName === QRadarPlatform.timestampFieldName) {
          timestamp = value;
        }
        if (this.checkValue(value) && fieldName && fieldsNames.has(fieldName)) {
          const types = mapFieldNameToTypes.get(fieldName)!;
          types.forEach((t) => {
            if (typeof result[t] === 'undefined') {
              result[t] = {};
            }
            this.addValueToResource(result[t], fieldName, value);
            this.collectResourceMeta(
              t,
              fieldName,
              value,
              { timestamp },
            );
          });
        }
      });
    });

    return result;
  }

  private static timestampFieldName = 'Time';

  private parseAriaSearchResponse(
    response: string,
    watchingResources: WatchingResources,
  ): ParsedResult {
    const {
      mapFieldNameToTypes,
      fieldsNames,
    } = AbstractBackgroundPlatform.getNormalizedWatchers(watchingResources);
    const result: ParsedResult = {};
    const { fields } = this;

    const $ = require('cheerio').load(response);
    $('tr').each((i: number, r: Element) => {
      const row = $(r);
      let timestamp: string | number = '';
      row.find('td').each((i: number, e: Element) => {
        const elem = $(e);
        const id = elem.attr('propertyname')?.trim();
        const fieldName = $(`th[columnid="${id}"]`).text()?.trim();
        const value = elem.find('span[id]').text()?.trim();
        if (fieldName) {
          fields.add(fieldName);
        }
        if (fieldName && fieldName === QRadarPlatform.timestampFieldName) {
          timestamp = isNumberInString(value) ? parseInt(value, 10) : String(value);
        }
        if (this.checkValue(value) && fieldName && fieldsNames.has(fieldName)) {
          const types = mapFieldNameToTypes.get(fieldName)!;
          types.forEach((t) => {
            if (typeof result[t] === 'undefined') {
              result[t] = {};
            }
            this.addValueToResource(result[t], fieldName, value);
            this.collectResourceMeta(
              t,
              fieldName,
              value,
              { timestamp },
            );
          });
        }
      });
    });

    return result;
  }

  async parseResponse(response: object | string, tabInfo: BrowserTabInfo) {
    const id = uuid();
    const watchingResources = this.getWatchers(tabInfo);
    loggers.debug().log(`[${tabInfo.id}] Started parse response...`, id, this.watchingResources, tabInfo);

    const result = typeof response === 'string'
      ? this.parseAriaSearchResponse(response, watchingResources)
      : this.parseLastHtmlResponse(response as LastHtmlResponse, watchingResources);

    loggers.debug().log(`[${tabInfo.id}] Finished parse response`, id, result);

    return result;
  }

  register(): void {
    const urlsProcessing = new Set<Url>();
    const bodyData = new Map<Url, ArrayBuffer | string>();
    let isNew = true;

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeSendHeaders,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestBodyDetails;
          if (isMatched(
            () => QRadarPlatform.isStopStreamingUrl(details.url),
            params,
            id,
          )) {
            setTimeout(() => {
              isNew = true;
            }, 0);
          }
        },
      ),
    );

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeRequest,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestBodyDetails;
          if (isMatched(
            () => {
              return !urlsProcessing.has(details.url)
                && details.method === 'POST'
                && QRadarPlatform.postUrls.some((u) => details.url.indexOf(u) > -1);
            },
            params,
            id,
          )) {
            const isAreaSearch = QRadarPlatform.isAreaSearchUrl(details.url);

            if (!isAreaSearch) {
              bodyData.set(details.url, details.requestBody!.raw![0].bytes!);
              return;
            }

            const objectData = details.requestBody!.formData as Record<string, any>;

            bodyData.set(details.url, createFormDataString(
              Object.keys(objectData || {}).reduce((res) => {
                // eslint-disable-next-line guard-for-in
                for (const key in objectData) {
                  const value = objectData[key]?.[0];
                  if (value) {
                    res[key] = value;
                  }
                }
                return res;
              }, {} as Record<string, unknown>),
            ));
          }
        },
      ),
    );

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeSendHeaders,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestHeadersDetails;
          const { href } = new URL(details.url);
          if (isMatched(
            () => {
              return !urlsProcessing.has(details.url)
                && details.method === 'GET'
                && QRadarPlatform.getUrls.some((u) => href.indexOf(u) > -1);
            },
            params,
            id,
          )) {
            urlsProcessing.add(details.url);
            const cacheID = details.url;

            const removeAttached = () => {
              urlsProcessing.delete(details.url);
            };

            http.get({
              url: details.url,
              headers: details.requestHeaders!.reduce((res: any, header: any) => {
                res[header.name] = header.value;
                return res;
              }, {}),
            }, {
              onTextSuccess: async (response: string) => {
                const startIndex = response.indexOf('<div id="tableSection');
                const endIndex = response.indexOf('/div>', startIndex) + 5;
                const resources = normalizeParsedResources(
                  await this.parseResponse(
                    response.substring(startIndex, endIndex)
                      .replace(/\\/g, ''),
                    {
                      origin: new URL(details.url).origin,
                      id: details.tabId,
                    },
                  ),
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
                isNew = true;
                removeAttached();
              },
              onError: (e) => {
                loggers
                  .warn()
                  .addPrefix('failed webRequest get')
                  .log(e, details.method, details.url);
                removeAttached();
              },
            });
          }
        },
      ),
    );

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeSendHeaders,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestHeadersDetails;
          const { href } = new URL(details.url);
          if (isMatched(
            () => {
              return !urlsProcessing.has(details.url)
                && details.method === 'POST'
                && details.tabId > 0
                && QRadarPlatform.postUrls.some((u) => href.indexOf(u) > -1);
            },
            params,
            id,
          )) {
            urlsProcessing.add(details.url);

            const isAreaSearch = QRadarPlatform.isAreaSearchUrl(details.url);
            const bodyBytes = bodyData.get(details.url)!;
            const bodyStr = isAreaSearch
              ? bodyBytes
              : new TextDecoder().decode(bodyBytes as ArrayBuffer);

            const removeAttached = () => {
              urlsProcessing.delete(details.url);
              bodyData.delete(details.url);
              if (urlsProcessing.size < 1) {
                AbstractBackgroundPlatform.sendLoading(details.tabId, false);
              }
            };

            QRadarPlatform.sendLoading(details.tabId, true);

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
                onJSONSuccess: isAreaSearch
                  ? undefined
                  : async (response: object) => {
                    // TODO not working on firefox
                    const parsedResult = await this.parseResponse(response, {
                      origin: new URL(details.url).origin,
                      id: details.tabId,
                    });
                    if (Object.keys(parsedResult).length < 1) {
                      removeAttached();
                      return;
                    }
                    const resources = normalizeParsedResources(parsedResult);
                    AbstractBackgroundPlatform.sendParsedData(
                      details.tabId,
                      {
                        cacheID,
                        resources,
                        fieldsNames: [...this.fields],
                        mappedResourcesData: this.mappedResourcesData,
                      },
                      isNew,
                    );
                    this.lastResponse.set(cacheID, response);
                    isNew = false;
                    removeAttached();
                  },
                onTextSuccess: isAreaSearch
                  ? async (response: string) => {
                    const startIndex = response.indexOf('table_data:"') + 12;
                    const endIndex = response.indexOf('/table>"') + 7;
                    const resources = normalizeParsedResources(
                      await this.parseResponse(
                        response.substring(startIndex, endIndex)
                          .replace(/\\/g, ''),
                        {
                          origin: new URL(details.url).origin,
                          id: details.tabId,
                        },
                      ),
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
                    isNew = true;
                    removeAttached();
                  }
                  : undefined,
                onError: (e) => {
                  loggers
                    .warn()
                    .addPrefix('failed webRequest post')
                    .log(e, details.method, url, bodyStr);
                  removeAttached();
                },
              },
            );
          }
        },
      ),
    );
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(QRadarPlatform.id);

type LastHtmlResponse = {
  id: string;
  result: {
    rows: string[];
    totalDropped: number;
    totalMatched: number;
    totalNotMatched: number;
    total: number;
    dropped: number;
  };
  error: string | null;
};
