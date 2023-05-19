import { Loggers } from '../../common/loggers';
import { AbstractBackgroundPlatform } from './AbstractBackgroundPlatform';
import { BGListenerType } from '../types/types-background-common';
import { FieldName, ParsedResult, ResourceTypeID } from '../../app/resources/resources-types';
import { BrowserTabInfo, PlatformID, PlatformName } from '../../common/types/types-common';
import { Url } from '../../../common/types';
import { setBGInterceptor } from '../services/background-services-listeners';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { http } from '../../../common/Http';
import {
  clearExtraSpaces,
  iterateObjectsRecursively,
  parseJSONSafe,
  splitByLines,
  uuid,
} from '../../../common/helpers';
import { normalizeParsedResources } from '../services/background-services';

let loggers: Loggers;

export class ElasticPlatform extends AbstractBackgroundPlatform {
  static readonly id = PlatformID.Elastic;

  private static postUrls: Url[] = [
    '_search',
    'bsearch',
    'search',
  ];

  private isRunningResponse = false;

  private isRunningResponseTimeout: null | NodeJS.Timeout = null;

  constructor() {
    super();
    this.watchingResources = {};
    this.emptyFieldValues = [
      ...this.emptyFieldValues,
      '-',
    ];
  }

  async parseResponseStringObject(
    line: string,
    mapFieldNameToTypes: Map<FieldName, ResourceTypeID[]>,
    fieldsNames: Set<FieldName>,
  ): Promise<ParsedResult> {
    const result = {} as ParsedResult;
    const parsedObject: any = parseJSONSafe(clearExtraSpaces(line), null);
    if (!parsedObject) {
      return result;
    }

    loggers.debug().log('Parsed response', parsedObject);

    const response = (typeof parsedObject.result !== 'undefined'
      ? parsedObject.result
      : parsedObject) as ResponseResult;

    const rawResponse = (typeof response.rawResponse !== 'undefined'
      ? response.rawResponse
      : response) as RawResponse;

    if (this.isRunningResponseTimeout) {
      clearTimeout(this.isRunningResponseTimeout);
    }

    this.isRunningResponse = false;

    if (typeof response.isRunning !== 'undefined') {
      this.isRunningResponse = response.isRunning;
    }

    if (this.isRunningResponse) {
      this.isRunningResponseTimeout = setTimeout(() => {
        this.isRunningResponse = false;
      }, 3500);
    }

    const watchingFieldsNames = this.fields;

    (rawResponse?.hits?.hits || []).forEach(({ fields, _source }) => {
      Array.from(fieldsNames).forEach(fieldName => {
        let fieldValue: string | number | (number | string)[] = undefined as any;

        if (fields && typeof fields[fieldName] !== 'undefined') {
          Object.keys(fields).forEach((fn) => watchingFieldsNames.add(fn));
          fieldValue = fields[fieldName];
        }

        if (!fieldValue && _source) {
          iterateObjectsRecursively(_source, '', {
            onIteration: (keyPath, key, value) => {
              if (keyPath === fieldName) {
                fieldValue = value as string;
              }
              return true;
            },
          }).forEach((fn) => watchingFieldsNames.add(fn));
        }

        if (typeof fieldValue === 'undefined') {
          return;
        }

        const types = mapFieldNameToTypes.get(fieldName)!;
        types.forEach(t => {
          if (typeof result[t] === 'undefined') {
            result[t] = {};
          }
          if (Array.isArray(fieldValue)) {
            (fieldValue || []).forEach((v) => {
              this.addValueToResource(result[t], fieldName, v);
            });
          } else {
            this.addValueToResource(result[t], fieldName, fieldValue);
          }
        });
      });
    });

    return result;
  }

  async parseResponse(response: object | string, tabInfo: BrowserTabInfo): Promise<ParsedResult> {
    const decompressedResponse = ElasticPlatform.decompress(response as string);

    const lines = splitByLines(decompressedResponse, true);

    const result = {} as ParsedResult;

    if (lines.length < 1) {
      return result;
    }

    const id = uuid();
    const watchingResources = this.getWatchers(tabInfo);
    loggers.debug().log(`[${tabInfo.id}] Started parse response...`, id, this.watchingResources, tabInfo);

    const { mapFieldNameToTypes, fieldsNames } = AbstractBackgroundPlatform.getNormalizedWatchers(watchingResources);

    const results = await Promise.all(
      lines.map(line => this.parseResponseStringObject(
        line,
        mapFieldNameToTypes,
        fieldsNames,
      )),
    );

    results.forEach(parsedResult => {
      Object.keys(parsedResult).forEach(resourceTypeID => {
        if (!result[resourceTypeID]) {
          result[resourceTypeID] = {};
        }
        const alreadyAppendResources = result[resourceTypeID];
        const parsedResources = parsedResult[resourceTypeID];
        Object.keys(parsedResources).forEach(fieldName => {
          const values = parsedResources[fieldName];
          if (!alreadyAppendResources[fieldName]) {
            alreadyAppendResources[fieldName] = new Set();
          }
          Array.from(values)
            .forEach(v => alreadyAppendResources[fieldName].add(v));
        });
        result[resourceTypeID] = alreadyAppendResources;
      });
    });

    loggers.debug().log(`[${tabInfo.id}] Finished parse response`, id, result);

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

            const url = urlDetails.href;
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
                onTextSuccess: async (response: string) => {
                  const resources = normalizeParsedResources(
                    await this.parseResponse(response, {
                      origin: new URL(details.url).origin,
                      id: details.tabId,
                    }),
                  );
                  AbstractBackgroundPlatform.sendParsedData(
                    tabID,
                    {
                      cacheID,
                      resources,
                      fieldsNames: [...this.fields],
                    },
                    !this.isRunningResponse,
                  );
                  this.lastResponse.set(cacheID, response);
                  removeAttached();
                },
                onError: (e: Error) => {
                  this.isRunningResponse = false;
                  loggers
                    .error()
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

    loggers.debug().log('registered');
  }
}

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

type RawResponse = {
  hits: {
    hits: {
      fields: Record<FieldName, (string | number)[]>;
      _source: {
        [fieldName: string]: string | Response['result']['rawResponse']['hits']['hits'][0]['_source'];
      },
    }[];
  }
};

type ResponseResult = {
  id: string;
  isPartial: boolean;
  isRestored: boolean;
  isRunning: boolean;
  loaded: number;
  rawResponse: RawResponse;
};

type Response = {
  id: number;
  result: ResponseResult;
};

loggers = require('../../common/loggers').loggers
  .addPrefix(ElasticPlatform.id);