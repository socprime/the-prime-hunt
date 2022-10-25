import { AbstractPlatform } from '../AbstractPlatform';
import { NormalizedParsedResult, ParsedResult, PlatformID } from '../../../common/types/types-common';
import { getDebugPrefix } from '../../../common/loggers/loggers-debug';
import { setBGInterceptor } from '../../services/background-services-listeners';
import { BGListenerType, TabID } from '../../types/types-background-common';
import { matchSplunkResultsUrl, matchSplunkSummaryUrl, splunkWatchers } from './splunk-watchers';
import { http } from '../../../../common/Http';
import { uuid } from '../../../../common/helpers';
import { getNormalizedWatchers } from '../background-platforms-helpers';
import { normalizeParsedResource, sendMessageFromBackground } from '../../services/background-services';
import { MessageToApp } from '../../../app/types/types-app-messages';
import { StatisticResponse, SummaryFields, SummaryResponse } from './splunk-types';
import { Url } from '../../../../common/types';
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { SetLoadingStatePayload } from '../../../common/types/types-common-payloads';
import { LoadingKey } from '../../../app/types/types-app-common';

const loggers = require('../../../common/loggers').loggers
  .addPrefix(getDebugPrefix('background'))
  .addPrefix(PlatformID.Splunk);

export class SplunkPlatform extends AbstractPlatform {
  private static sendLoading(tabID: TabID, loading: boolean) {
    sendMessageFromBackground<SetLoadingStatePayload>(tabID, {
      type: MessageToApp.AppSetLoadingState,
      payload: {
        loading,
        key: LoadingKey.resourcesAdding,
      },
    });
  }

  private static sendParsedData(
    tabID: TabID,
    parsedResponse: ParsedResult,
    isNew = false,
  ) {
    sendMessageFromBackground<NormalizedParsedResult>(tabID, {
      id: `parsed-response--${uuid()}`,
      type: isNew ? MessageToApp.AppTakeNewResourceData : MessageToApp.AppTakeResourceData,
      payload: {
        services: normalizeParsedResource(parsedResponse.services),
        assets: normalizeParsedResource(parsedResponse.assets),
        accounts: normalizeParsedResource(parsedResponse.accounts),
      },
    });
  }

  constructor() {
    super();
    this.watchingResources = splunkWatchers;
    this.emptyFieldValue = '-';
  }

  static id = PlatformID.Splunk;

  getID(): PlatformID {
    return SplunkPlatform.id;
  }

  parseContent(): ParsedResult {
    const results: ParsedResult = {
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

  private parseSummary(response: SummaryResponse): ParsedResult {
    const results: ParsedResult = {
      'assets': {},
      'accounts': {},
      'services': {},
    };

    const { mapFieldNameToType, fieldsNames } = getNormalizedWatchers(this.watchingResources);

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
              this.addValueToResource(results[t], fieldName, v);
            });
          });
        }
      });
    }

    return {
      accounts: results.accounts,
      assets: results.assets,
      services: results.services,
    };
  }

  private parseStatistic(response: StatisticResponse): ParsedResult {
    const results: ParsedResult = {
      'assets': {},
      'accounts': {},
      'services': {},
    };

    const { mapFieldNameToType, fieldsNames } = getNormalizedWatchers(this.watchingResources);

    (response?.rows || []).forEach(row => {
      row.forEach((fieldsValues, index) => {
        const fieldName = response?.fields?.[index]?.name;
        if (!fieldName || !fieldsNames.has(fieldName)) {
          return;
        }
        const types = mapFieldNameToType.get(fieldName)!;
        types.forEach(t => {
          if (Array.isArray(fieldsValues)) {
            fieldsValues.forEach(v => {
              this.addValueToResource(results[t], fieldName, v);
            });
          } else {
            this.addValueToResource(results[t], fieldName, fieldsValues);
          }
        });
      });
    });

    return {
      accounts: results.accounts,
      assets: results.assets,
      services: results.services,
    };
  }

  parseResponse(response: SummaryResponse | StatisticResponse): ParsedResult {
    const id = uuid();
    loggers.debug().log('started parse response...', id, this.watchingResources);

    const parsedResult = (response as StatisticResponse)?.rows
      ? this.parseStatistic(response as StatisticResponse)
      : this.parseSummary(response as SummaryResponse);

    loggers.debug().log('finished parse response', id);

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
              const jobID = matchSplunkSummaryUrl(href);
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
              const jobID = matchSplunkResultsUrl(href);
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

    loggers.debug().log('registered');
  }

  unregister(): void {
    super.unregister();
    loggers.debug().log('unregistered');
  }
}