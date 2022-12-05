import { AbstractBackgroundPlatform } from './AbstractBackgroundPlatform';
import { PlatformID, PlatformName } from '../../common/types/types-common';
import { setBGInterceptor } from '../services/background-services-listeners';
import { BGListenerType, WatchingResources } from '../types/types-background-common';
import { http } from '../../../common/Http';
import { uuid } from '../../../common/helpers';
import { Url } from '../../../common/types';
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { FieldName, ParsedResult } from '../../app/resources/resources-types';
import { isAllowedProtocol } from '../../../common/checkers';
import { mode } from '../../common/envs';
import { Loggers } from '../../common/loggers';

let loggers: Loggers;

export class SplunkPlatform extends AbstractBackgroundPlatform {
  private static matchSplunkSummaryUrl(url: Url): SplunkJobID | undefined {
    const { protocol, href } = new URL(url);
    if (!isAllowedProtocol(protocol, mode)) {
      return undefined;
    }
    return href.match(/\/search\/jobs\/([.0-9]+)\/summary/)?.[1];
  }
  
  private static matchSplunkResultsUrl(url: Url): SplunkJobID | undefined {
    const { protocol, href } = new URL(url);
    if (!isAllowedProtocol(protocol, mode)) {
      return undefined;
    }
    return href.match(/\/search\/jobs\/([.0-9]+)\/results/)?.[1];
  }

  constructor() {
    super();
    this.watchingResources = {} as WatchingResources;
    this.emptyFieldValues = [
      ...this.emptyFieldValues,
      '-',
    ];
  }

  static id = PlatformID.Splunk;

  getID() {
    return SplunkPlatform.id;
  }

  getName() {
    return PlatformName.Splunk;
  }

  private parseSummary(response: SummaryResponse): ParsedResult {
    const result: ParsedResult = {};

    const { mapFieldNameToType, fieldsNames } = AbstractBackgroundPlatform.getNormalizedWatchers(this.watchingResources);

    const fields = response?.fields || {} as SummaryFields;

    if (Object.keys(fields).length > 0) {
      Array.from(fieldsNames).forEach(fieldName => {
        if (fields?.[fieldName]) {
          const distinctValues = fields[fieldName]?.modes?.map(m => m?.value) || [];
          if (distinctValues.length < 1) {
            return;
          }
          const types = mapFieldNameToType.get(fieldName)!;
          types.forEach(t => {
            distinctValues.forEach(v => {
              if (typeof result[t] === 'undefined') {
                result[t] = {};
              }
              this.addValueToResource(result[t], fieldName, v);
            });
          });
        }
      });
    }

    return result;
  }

  private parseStatistic(response: StatisticResponse): ParsedResult {
    const result: ParsedResult = {};

    const { mapFieldNameToType, fieldsNames } = AbstractBackgroundPlatform.getNormalizedWatchers(this.watchingResources);

    (response?.rows || []).forEach(row => {
      row.forEach((fieldsValues, index) => {
        const fieldName = response?.fields?.[index]?.name;
        if (!fieldName || !fieldsNames.has(fieldName)) {
          return;
        }
        const types = mapFieldNameToType.get(fieldName)!;
        types.forEach(t => {
          if (typeof result[t] === 'undefined') {
            result[t] = {};
          }
          if (Array.isArray(fieldsValues)) {
            fieldsValues.forEach(v => {
              this.addValueToResource(result[t], fieldName, v);
            });
          } else {
            this.addValueToResource(result[t], fieldName, fieldsValues);
          }
        });
      });
    });

    return result;
  }

  parseResponse(response: SummaryResponse | StatisticResponse): ParsedResult {
    const id = uuid();
    loggers.debug().log('started parse response...', id, this.watchingResources);

    const parsedResult = (response as StatisticResponse)?.rows
      ? this.parseStatistic(response as StatisticResponse)
      : this.parseSummary(response as SummaryResponse);

    loggers.debug().log('finished parse response', id, parsedResult);

    return parsedResult;
  }

  register(): void {
    let currentJobID = '';
    let countRequests = 0;
    let timeoutID: number | NodeJS.Timeout;
    const urlsProcessing = new Set<Url>();

    this.interceptorsIDs.add(
      setBGInterceptor(
        BGListenerType.OnBeforeSendHeaders,
        (id, params, isMatched) => {
          const details = params.listenerParams[0] as WebRequestHeadersDetails;
          const { href } = new URL(details.url);
          if (isMatched(
            () => {
              if (details.method !== 'GET' || urlsProcessing.has(href)) {
                return false;
              }
              const jobID = SplunkPlatform.matchSplunkSummaryUrl(href);
              if (jobID && jobID === currentJobID) {
                SplunkPlatform.sendLoading(details.tabId, true);
                countRequests++;
              }
              if (!jobID || jobID === currentJobID) {
                return false;
              }
              clearTimeout(timeoutID);
              countRequests = 0;
              currentJobID = jobID;
              return true;
            },
            params,
            id,
          )) {
            const urlDetails = new URL(details.url);
            urlDetails.searchParams.set('top_count', '9999999999');
            urlDetails.searchParams.set('output_mode', 'json');
            urlDetails.searchParams.delete('_');
            urlsProcessing.add(urlDetails.href);

            const cleanArtifacts = () => {
              currentJobID = '';
              countRequests = 0;
              urlsProcessing.delete(urlDetails.href);
            };

            const getData = (isFirst = false) => {
              SplunkPlatform.sendLoading(details.tabId, true);
              const totalRequests = countRequests;
              http.get(
                {
                  url: urlDetails.href,
                  headers: details.requestHeaders!.reduce((res: any, header: any) => {
                    res[header.name] = header.value;
                    return res;
                  }, {}),
                },
                {
                  onJSONSuccess: (response: any) => {
                    SplunkPlatform.sendParsedData(
                      details.tabId,
                      this.parseResponse(response),
                      isFirst,
                    );
                    this.lastResponse = response;
                    timeoutID = setTimeout(() => {
                      if (countRequests > totalRequests) {
                        getData();
                      } else {
                        cleanArtifacts();
                      }
                    }, 3000);
                  },
                  onError: (e) => {
                    loggers.error().log(e, details.url);
                    clearTimeout(timeoutID);
                    cleanArtifacts();
                    SplunkPlatform.sendLoading(details.tabId, false);
                  },
                },
              );
            };

            timeoutID = setTimeout(() => {
              getData(true);
            }, 1000);
          }
        },
        () => {
          clearTimeout(timeoutID);
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
              if (details.method !== 'GET' || urlsProcessing.has(href)) {
                return false;
              }
              const jobID = SplunkPlatform.matchSplunkResultsUrl(href);
              if (jobID && jobID === currentJobID) {
                SplunkPlatform.sendLoading(details.tabId, true);
                countRequests++;
              }
              if (!jobID || jobID === currentJobID) {
                return false;
              }
              clearTimeout(timeoutID);
              countRequests = 0;
              currentJobID = jobID;
              return true;
            },
            params,
            id,
          )) {
            const urlDetails = new URL(details.url);
            urlDetails.searchParams.set('count', '9999999999');
            urlDetails.searchParams.set('show_metadata', 'true');
            urlDetails.searchParams.set('offset', '0');
            urlDetails.searchParams.set('output_mode', 'json_rows');
            urlDetails.searchParams.delete('_');
            urlsProcessing.add(urlDetails.href);

            const cleanArtifacts = () => {
              currentJobID = '';
              countRequests = 0;
              urlsProcessing.delete(urlDetails.href);
            };

            const getData = (isFirst = false) => {
              AbstractBackgroundPlatform.sendLoading(details.tabId, true);
              const totalRequests = countRequests;
              http.get(
                {
                  url: urlDetails.href,
                  headers: details.requestHeaders!.reduce((res: any, header: any) => {
                    res[header.name] = header.value;
                    return res;
                  }, {}),
                },
                {
                  onJSONSuccess: (response: any) => {
                    SplunkPlatform.sendParsedData(
                      details.tabId,
                      this.parseResponse(response),
                      isFirst,
                    );
                    this.lastResponse = response;
                    timeoutID = setTimeout(() => {
                      if (countRequests > totalRequests) {
                        getData();
                      } else {
                        cleanArtifacts();
                      }
                    }, 3000);
                  },
                  onError: (e) => {
                    loggers.error().log(e, details.url);
                    clearTimeout(timeoutID);
                    cleanArtifacts();
                    AbstractBackgroundPlatform.sendLoading(details.tabId, false);
                  },
                },
              );
            };

            timeoutID = setTimeout(() => {
              getData(true);
            }, 1000);
          }
        },
        () => {
          clearTimeout(timeoutID);
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
  .addPrefix(SplunkPlatform.id);

export type SplunkJobID = string;

export type SummaryFields = {
  [fieldName: string]: {
    modes: {
      value: string;
    }[];
  };
};

type StatisticFields = {
  name: FieldName;
}[];

type StatisticRows = (string | string[])[][];

type SummaryResponse = {
  fields: SummaryFields;
};

type StatisticResponse = {
  fields: StatisticFields;
  rows: StatisticRows;
};