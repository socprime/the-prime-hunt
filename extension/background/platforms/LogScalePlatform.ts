import { AbstractBackgroundPlatform } from './AbstractBackgroundPlatform';
import { BrowserTabInfo, PlatformID, PlatformName } from '../../common/types/types-common';
import { ParsedResult } from '../../app/resources/resources-types';
import { Loggers } from '../../common/loggers';
import { parseJSONSafe, uuid } from '../../../common/helpers';
import { Url } from '../../../common/types';
import { http } from '../../../common/Http';
import { setBGInterceptor } from '../services/background-services-listeners';
import { BGListenerType } from '../types/types-background-common';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { normalizeParsedResources } from '../services/background-services';

let loggers: Loggers;

export class LogScalePlatform extends AbstractBackgroundPlatform {
  static id = PlatformID.LogScale;

  static platformName = PlatformName.LogScale;

  private static postUrls: Url[] = [
    '/queryjobs',
  ];

  getID(): PlatformID {
    return LogScalePlatform.id;
  }

  getName(): PlatformName {
    return LogScalePlatform.platformName;
  }

  constructor() {
    super();
    this.watchingResources = {};
    this.emptyFieldValues = [
      ...this.emptyFieldValues,
      '-',
    ];
  }

  async parseResponse(
    response: {
      events: Record<string, unknown>[],
    },
    tabInfo: BrowserTabInfo,
  ): Promise<ParsedResult> {
    const id = uuid();
    const watchingResources = this.getWatchers(tabInfo);
    loggers.debug().log(`[${tabInfo.id}] Started parse response...`, id, this.watchingResources, tabInfo);
    const result: ParsedResult = {};
    const { fields } = this;

    const {
      mapFieldNameToTypes,
      fieldsNames,
    } = AbstractBackgroundPlatform.getNormalizedWatchers(watchingResources);

    (response?.events || []).forEach((item) => {
      Object.keys(item).forEach((fieldName) => {
        if (fieldName) {
          fields.add(fieldName);
        }
        if (fieldsNames.has(fieldName)) {
          const types = mapFieldNameToTypes.get(fieldName)!;
          types.forEach((t) => {
            if (typeof result[t] === 'undefined') {
              result[t] = {};
            }
            this.addValueToResource(result[t], fieldName, String(item[fieldName]));
          });
        }
      });
    });

    loggers.debug().log(`[${tabInfo.id}] Finished parse response`, id, result);

    return result;
  }

  private obtainData(
    id: string,
    details: WebRequestHeadersDetails,
    headers: Record<string, string>,
    attempts: number,
  ) {
    const readyUrl = `${details.url}/${id}?filterMatches=true`;

    http.get({
      url: readyUrl,
      headers,
    }, {
      onJSONSuccess: async (response: {
        done: boolean;
      }) => {
        const resources = normalizeParsedResources(
          await this.parseResponse(response as any, {
            origin: new URL(details.url).origin,
            id: details.tabId,
          }),
        );
        AbstractBackgroundPlatform.sendParsedData(
          details.tabId,
          {
            cacheID: readyUrl,
            resources,
            fieldsNames: [...this.fields],
          },
          false,
        );
        this.lastResponse.set(readyUrl, response);
        if (!response.done && attempts > 0) {
          this.obtainData(id, details, headers, attempts - 1);
        }
      },
      onError: (e) => {
        loggers
          .warn()
          .addPrefix('failed webRequest get')
          .log(e, readyUrl);
      },
    });
  }

  register(): void {
    const bodyRequests = new Set<string>();

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeRequest,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestBodyDetails;
          if (isMatched(() => {
            return details.method === 'POST'
              && LogScalePlatform.postUrls.some((u) => details.url.indexOf(u) > -1)
              && !!details.requestBody?.raw?.[0]?.bytes?.byteLength
              && details.requestBody?.raw?.[0]?.bytes?.byteLength > 5;
          })) {
            const bodyStr = new TextDecoder().decode(details.requestBody!.raw![0].bytes!);
            const body: any = parseJSONSafe(bodyStr, false);
            if (!body || !body.queryString || body.queryString.length < 1) {
              return;
            }
            bodyRequests.add(bodyStr);
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
              && LogScalePlatform.postUrls.some((u) => details.url.indexOf(u) > -1)
              && (details.requestHeaders || []).some(({ name, value }) => {
                return bodyRequests.size > 0
                  && (name.toLowerCase() === 'origin'
                  && value
                  && value.indexOf('http') === 0);
              });
          })) {
            const bodyStr = bodyRequests.values().next().value;
            bodyRequests.delete(bodyStr);
            if (!bodyStr) {
              return;
            }

            const { url } = details;
            const headers = details.requestHeaders!.reduce((res: any, header: any) => {
              res[header.name] = header.value;
              return res;
            }, {});

            http.post({
              url,
              body: bodyStr,
              headers,
            }, {
              onJSONSuccess: async (response: {
                id: string;
              }) => {
                if (!response.id || response.id.length < 1) {
                  return;
                }
                this.obtainData(response.id, details, headers, 10);
              },
              onError: (e) => {
                loggers
                  .warn()
                  .addPrefix('failed webRequest post')
                  .log(e, details.method, url, bodyStr);
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
  .addPrefix(LogScalePlatform.id);
