import { AbstractBackgroundPlatform } from './AbstractBackgroundPlatform';
import { PlatformID, PlatformName } from '../../common/types/types-common';
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

let loggers: Loggers;

export class QRadarPlatform extends AbstractBackgroundPlatform {
  private static postUrls: Url[] = [
    '/JSON-RPC/QRadar.getLatestStreamHTML',
    '/ariel/arielSearch',
    '/JSON-RPC/QRadar.stopArielStreaming',
    '/JSON-RPC/QRadar.startArielStreaming',
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
    this.watchingResources = {} as WatchingResources;
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

  private parseLastHtmlResponse(response: LastHtmlResponse): ParsedResult {
    const { mapFieldNameToTypes, fieldsNames } = AbstractBackgroundPlatform.getNormalizedWatchers(this.watchingResources);
    const result: ParsedResult = {};

    response.result?.rows?.forEach((r) => {
      const $ = require('cheerio').load(`<body><table>${r}</table></body>`);
      $('td').each((i: number, e: Element) => {
        const elem = $(e);
        const value = elem.text()?.trim();
        const fieldName = elem.attr('propertylabel')?.trim();
        if (this.checkValue(value) && fieldName && fieldsNames.has(fieldName)) {
          const types = mapFieldNameToTypes.get(fieldName)!;
          types.forEach(t => {
            if (typeof result[t] === 'undefined') {
              result[t] = {};
            }
            this.addValueToResource(result[t], fieldName, value);
          });
        }
      });
    });

    return result;
  }

  private parseAriaSearchResponse(response: string): ParsedResult {
    const { mapFieldNameToTypes, fieldsNames } = AbstractBackgroundPlatform.getNormalizedWatchers(this.watchingResources);
    const result: ParsedResult = {};

    const $ = require('cheerio').load(response);
    $('td').each((i: number, e: Element) => {
      const elem = $(e);
      const id = elem.attr('propertyname')?.trim();
      const fieldName = $(`th[columnid="${id}"]`).text()?.trim();
      const value =  elem.find('span[id]').text()?.trim();
      if (this.checkValue(value) && fieldName && fieldsNames.has(fieldName)) {
        const types = mapFieldNameToTypes.get(fieldName)!;
        types.forEach(t => {
          if (typeof result[t] === 'undefined') {
            result[t] = {};
          }
          this.addValueToResource(result[t], fieldName, value);
        });
      }
    });

    return result;
  }

  async parseResponse(response: object | string) {
    const id = uuid();
    loggers.debug().log('started parse response...', id, this.watchingResources);

    const result = typeof response === 'string'
      ? this.parseAriaSearchResponse(response)
      : this.parseLastHtmlResponse(response as LastHtmlResponse);

    loggers.debug().log('finished parse response', id, result);

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
                && QRadarPlatform.postUrls.some(u => details.url.indexOf(u) > -1);
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
              Object.keys(objectData).reduce((res) => {
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
                && details.method === 'POST'
                && details.tabId > 0
                && QRadarPlatform.postUrls.some(u => href.indexOf(u) > -1);
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
                onJSONSuccess: isAreaSearch
                  ? undefined
                  : async (response: object) => {
                    // TODO not working on firefox
                    const parsedResult = await this.parseResponse(response);
                    if (Object.keys(parsedResult).length < 1) {
                      removeAttached();
                      return;
                    }
                    AbstractBackgroundPlatform.sendParsedData(
                      details.tabId,
                      parsedResult,
                      isNew,
                    );
                    this.lastResponse = response;
                    isNew = false;
                    removeAttached();
                  },
                onTextSuccess: isAreaSearch
                  ? async (response: string) => {
                    const startIndex = response.indexOf('table_data:"') + 12;
                    const endIndex = response.indexOf('/table>"') + 7;
                    AbstractBackgroundPlatform.sendParsedData(
                      details.tabId,
                      await this.parseResponse(
                        response.substring(startIndex, endIndex)
                          .replace(/\\/g, ''),
                      ),
                      true,
                    );
                    this.lastResponse = response;
                    isNew = true;
                    removeAttached();
                  }
                  : undefined,
                onError: e => {
                  loggers
                    .warn()
                    .addPrefix('failed webRequest post')
                    .log(e, details.method, details.url, bodyStr);
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