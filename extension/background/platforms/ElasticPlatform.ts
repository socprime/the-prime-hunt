import { Loggers } from '../../common/loggers';
import { AbstractBackgroundPlatform } from './AbstractBackgroundPlatform';
import { BGListenerType, WatchingResources } from '../types/types-background-common';
import { FieldName, ParsedResult, ResourceTypeID } from '../../app/resources/resources-types';
import { PlatformID, PlatformName } from '../../common/types/types-common';
import { Url } from '../../../common/types';
import { setBGInterceptor } from '../services/background-services-listeners';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { http } from '../../../common/Http';
import { clearExtraSpaces, parseJSONSafe, splitByLines, uuid } from '../../../common/helpers';

let loggers: Loggers;

export class ElasticPlatform extends AbstractBackgroundPlatform {
  static readonly id = PlatformID.Elastic;

  private static postUrls: Url[] = [
    '/bsearch',
  ];

  private isRunningResponse = false;

  private isRunningResponseTimeout: null | NodeJS.Timeout = null;

  constructor() {
    super();
    this.watchingResources = {} as WatchingResources;
    this.emptyFieldValues = [
      ...this.emptyFieldValues,
      '-',
    ];
  }

  private async parseLine(
    line: string,
    mapFieldNameToTypes: Map<FieldName, ResourceTypeID[]>,
    fieldsNames: Set<FieldName>,
  ): Promise<NormalizedParsedDocument[]> {
    const result = [] as NormalizedParsedDocument[];
    const parsedDocument = parseJSONSafe(clearExtraSpaces(line), null);
    if (!parsedDocument) {
      return result;
    }

    const elasticResponse = parsedDocument as ElasticResponse;
    if (this.isRunningResponseTimeout) {
      clearTimeout(this.isRunningResponseTimeout);
    }
    this.isRunningResponse = elasticResponse?.result?.isRunning;
    this.isRunningResponseTimeout = setTimeout(() => {
      this.isRunningResponse = false;
    }, 3500);

    elasticResponse?.result?.rawResponse?.hits?.hits?.forEach(({ fields }) => {
      Array.from(fieldsNames).forEach(fieldName => {
        if (!fields[fieldName]) {
          return;
        }
        const types = mapFieldNameToTypes.get(fieldName)!;
        types.forEach(type => {
          result.push({
            type,
            fieldName,
            values: [...(fields[fieldName] as string[]).filter(v => this.checkValue(v))],
          });
        });
      });
    });

    return result;
  }

  async parseResponse(response: object | string): Promise<ParsedResult> {
    const lines = splitByLines(response as string, true);

    const result = {} as ParsedResult;

    if (lines.length < 1) {
      return result;
    }

    const id = uuid();
    loggers.debug().log('started parse response...', id, this.watchingResources, this.isRunningResponse);

    const { mapFieldNameToTypes, fieldsNames } = AbstractBackgroundPlatform.getNormalizedWatchers(this.watchingResources);

    const results = await Promise.all(
      lines.map(line => this.parseLine(
        line,
        mapFieldNameToTypes,
        fieldsNames,
      )),
    );

    results.forEach(r => {
      r.forEach(d => {
        const type = result[d.type] ? result[d.type] : {};
        const set = type[d.fieldName] || new Set();
        d.values?.forEach(v => set.add(v));
        if (!result[d.type]) {
          result[d.type] = {};
        }
        result[d.type][d.fieldName] = set;
      });
    });

    loggers.debug().log('finished parse response', id, result, this.isRunningResponse);

    return result;
  }

  getID(): PlatformID {
    return ElasticPlatform.id;
  }

  getName(): PlatformName {
    return PlatformName.Elastic;
  }

  register(): void {
    const urlsProcessing = new Set<Url>();
    const bodyData = new Map<Url, ArrayBuffer>();

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeRequest,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestBodyDetails;
          if (isMatched(
            () => {
              return details.method === 'POST'
                && !urlsProcessing.has(details.url)
                && !!details.requestBody?.raw?.[0]?.bytes?.byteLength
                && details.requestBody?.raw?.[0]?.bytes?.byteLength > 5
                && ElasticPlatform.postUrls.some(p => details.url.indexOf(p) > -1);
            },
            params,
            id,
          )) {
            bodyData.set(details.url, details.requestBody!.raw![0].bytes!);
          }
        },
      ),
    );

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeSendHeaders,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestHeadersDetails;
          if (isMatched(
            () => {
              return details.method === 'POST'
                && !urlsProcessing.has(details.url)
                && bodyData.has(details.url)
                && ElasticPlatform.postUrls.some(p => details.url.indexOf(p) > -1);
            },
            params,
            id,
          )) {
            const bodyBytes = bodyData.get(details.url)!;
            let bodyStr = new TextDecoder().decode(bodyBytes);
            // const parsedRequest = parseJSONSafe(bodyStr, null);
            // if (parsedRequest) {
            //   (parsedRequest as ElasticRequest).batch.forEach(r => {
            //     if (typeof r?.request?.params?.body?.size !== 'undefined') {
            //       r.request.params.body.size = 10000;
            //     }
            //   });
            //   bodyStr = JSON.stringify(parsedRequest);
            // }

            const urlDetails = new URL(details.url);
            urlDetails.searchParams.delete('compress');
            urlsProcessing.add(details.url);
            urlsProcessing.add(urlDetails.href);

            const tabID = details.tabId;

            const removeAttached = () => {
              urlsProcessing.delete(details.url);
              urlsProcessing.delete(urlDetails.href);
              bodyData.delete(details.url);
              if (urlsProcessing.size < 1) {
                AbstractBackgroundPlatform.sendLoading(tabID, false);
              }
            };

            AbstractBackgroundPlatform.sendLoading(tabID, true);

            http.post(
              {
                url: urlDetails.href,
                body: bodyBytes,
                headers: details.requestHeaders!.reduce((res: any, header: any) => {
                  res[header.name] = header.value;
                  return res;
                }, {}),
              },
              {
                onTextSuccess: async (response: string) => {
                  AbstractBackgroundPlatform.sendParsedData(
                    tabID,
                    await this.parseResponse(response),
                    !this.isRunningResponse,
                  );
                  this.lastResponse = response;
                  removeAttached();
                },
                onError: (e: Error) => {
                  this.isRunningResponse = false;
                  loggers
                    .error()
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

    loggers.debug().log('registered');
  }
}

type NormalizedParsedDocument = {
  fieldName: string;
  values: string[];
  type: string;
};

// type ElasticRequest = {
//   batch: {
//     request: {
//       id: string;
//       params: {
//         index: string;
//         body: {
//           size: number;
//         };
//       };
//     };
//   }[];
// };

type ElasticResponse = {
  id: number;
  result: {
    id: string;
    isPartial: boolean;
    isRestored: boolean;
    isRunning: boolean;
    loaded: number;
    rawResponse: {
      hits: {
        hits: {
          fields: Record<string, unknown>;
        }[];
      };
    };
  };
};

loggers = require('../../common/loggers').loggers
  .addPrefix(ElasticPlatform.id);