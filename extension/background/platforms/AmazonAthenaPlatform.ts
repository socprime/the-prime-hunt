import { AbstractBackgroundPlatform } from './AbstractBackgroundPlatform';
import { Loggers } from '../../common/loggers';
import { FieldName, ParsedResult, ResourceTypeID } from '../../app/resources/resources-types';
import { BrowserTabInfo, PlatformID, PlatformName } from '../../common/types/types-common';
import { iterateObjectsRecursively, parseJSONSafe, uuid } from '../../../common/helpers';
import { BGListenerType } from '../types/types-background-common';
import { SHA256, Url } from '../../../common/types';
import { setBGInterceptor } from '../services/background-services-listeners';
import { sha256 } from 'js-sha256';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { http } from '../../../common/Http';
import { normalizeParsedResources } from '../services/background-services';

let loggers: Loggers;

export class AmazonAthenaPlatform extends AbstractBackgroundPlatform {
  private static postUrls: Url[] = [
    '.amazonaws.com',
  ];

  private static replacements = new Map();

  private static replacementsStrings = new Map();

  private static replacementID = '@@replacement@@';

  private static replacementsCounter = 0;

  private static repairStrWithReplacements(str: string) {
    if (str.indexOf(AmazonAthenaPlatform.replacementID) < 0) {
      return str;
    }

    let newStr = str;

    (str.match(new RegExp(`${AmazonAthenaPlatform.replacementID}[0-9]+`, 'g')) || []).forEach(id => {
      newStr = newStr.split(id).join(AmazonAthenaPlatform.replacements.get(id));
    });

    return newStr;
  }

  private static getScopeIndexes = (
    string: string,
    openScopeSymbol: string,
    closeScopeSymbol: string,
  ): {
    start: number;
    end: number;
  } => {
    const result = {
      start: 0,
      end: string.length - 1,
    };

    result.start = string.indexOf(openScopeSymbol);
    if (result.start < 0) {
      result.start = 0;
    }

    result.end = string.indexOf(closeScopeSymbol) + 1;
    if (result.end < 0) {
      result.end = string.length - 1;
    }

    if (string.lastIndexOf(openScopeSymbol, result.end) > -1) {
      result.start = string.lastIndexOf(openScopeSymbol, result.end);
    }

    return result;
  };

  private static replaceScopes(str: string): string {
    let result = str;

    let firstBracketIndex = result.indexOf('[');
    let firstCurlyBracketIndex = result.indexOf('{');

    while (firstCurlyBracketIndex > -1 || firstBracketIndex > -1) {
      const openScopeSymbol = firstCurlyBracketIndex > firstBracketIndex ? '{' : '[';
      const closeScopeSymbol = firstCurlyBracketIndex > firstBracketIndex ? '}' : ']';

      const indexes = AmazonAthenaPlatform.getScopeIndexes(result, openScopeSymbol, closeScopeSymbol);

      const replacementStr = result.substring(indexes.start, indexes.end);

      const replacementsKey = AmazonAthenaPlatform.replacementsStrings.has(replacementStr)
        ? AmazonAthenaPlatform.replacementsStrings.get(replacementStr)
        : `${AmazonAthenaPlatform.replacementID}${++AmazonAthenaPlatform.replacementsCounter}`;

      AmazonAthenaPlatform.replacements.set(replacementsKey, replacementStr);
      AmazonAthenaPlatform.replacementsStrings.set(replacementStr, replacementsKey);

      result = result.split(replacementStr).join(replacementsKey);

      firstBracketIndex = result.indexOf('[');
      firstCurlyBracketIndex = result.indexOf('{');
    }
    return result;
  }

  private static getArrayObj(value: string): string[] | null {
    let normalizedValue = value.trim();

    if (
      normalizedValue[0] !== '['
      || normalizedValue[normalizedValue.length - 1] !== ']'
    ) {
      return null;
    }

    normalizedValue = normalizedValue.substring(1, normalizedValue.length - 1).trim();

    normalizedValue = AmazonAthenaPlatform.replaceScopes(normalizedValue);

    return normalizedValue
      .split(', ')
      .map(v => AmazonAthenaPlatform.replacements.get(v) || v)
      .map(v => AmazonAthenaPlatform.repairStrWithReplacements(v.trim()).trim());
  }

  private static parseObj(value: string): ParsedStruct {
    let str = AmazonAthenaPlatform.repairStrWithReplacements(value.trim()).trim();

    const result: ParsedStruct = {
      $$value$$: str,
    };

    if (
      str[0] === '{'
      && str[str.length - 1] === '}'
    ) {
      str = str.substring(1, str.length - 1).trim();
    }

    if (
      str[0] === '['
      && str[str.length - 1] === ']'
    ) {
      return AmazonAthenaPlatform.parseStruct(str);
    }

    str = AmazonAthenaPlatform.replaceScopes(str);

    let separateIndex = str.lastIndexOf('=');

    do {
      separateIndex = str.lastIndexOf(', ', separateIndex);
      const [key, v] = str
        .substring(separateIndex > -1 ? separateIndex + 2 : 0)
        .split('=');

      str = str.substring(0, separateIndex);
      separateIndex = str.lastIndexOf('=', separateIndex);

      if (!v) {
        continue;
      }

      if (AmazonAthenaPlatform.replacements.has(v)) {
        result[key.trim()] = AmazonAthenaPlatform.parseStruct(
          AmazonAthenaPlatform.replacements.get(v),
        );
        continue;
      }

      result[key.trim()] = AmazonAthenaPlatform.parseObj(v.trim());

    } while (separateIndex > -1);

    return result;
  }

  private static parseStruct(value: string): ParsedStruct {
    const nValue = AmazonAthenaPlatform.repairStrWithReplacements(value.trim()).trim();

    if (nValue[0] === '[' && nValue[nValue.length - 1] === ']') {
      return {
        $$value$$: nValue,
        $$array$$: (AmazonAthenaPlatform.getArrayObj(nValue) || [])
          .map(v => AmazonAthenaPlatform.parseObj(v)),
      };
    }

    return AmazonAthenaPlatform.parseObj(nValue);
  }

  private fieldsNames: Set<FieldName>;

  private mapFieldNameToTypes: Map<FieldName, ResourceTypeID[]>;

  private result: ParsedResult = {};

  private parse(
    obj: Record<string, unknown>,
    kp = '',
  ) {
    let result: string[] = [];
    const nonArrayResult = iterateObjectsRecursively(obj, kp, {
      onIteration: (keyPath, key, value, prevKeyPath) => {
        if (this.fieldsNames.has(keyPath)) {
          const types = this.mapFieldNameToTypes.get(keyPath)!;
          types.forEach(t => {
            if (typeof this.result[t] === 'undefined') {
              this.result[t] = {};
            }
            this.addValueToResource(this.result[t], keyPath, (value as any).$$value$$);
          });
        }
        if (key === '$$array$$') {
          (value as Record<string, unknown>[]).forEach((o) => {
            result = [
              ...result,
              ...this.parse(o, prevKeyPath),
            ];
          });
        }
        return key !== '$$value$$' && key !== '$$array$$';
      },
    });
    return [
      ...result,
      ...nonArrayResult,
    ];
  }

  async parseResponse(response: AthenaQueryResults, tabInfo: BrowserTabInfo): Promise<ParsedResult> {
    const id = uuid();
    const watchingResources = this.getWatchers(tabInfo);
    const { fields } = this;
    loggers.debug().log(`[${tabInfo.id}] Started parse response...`, id, this.watchingResources, tabInfo);

    const { mapFieldNameToTypes, fieldsNames } = AbstractBackgroundPlatform.getNormalizedWatchers(watchingResources);

    this.result = {};
    this.mapFieldNameToTypes = mapFieldNameToTypes;
    this.fieldsNames = fieldsNames;

    (response?.ResultSet?.Rows || []).slice(1).forEach((row) => {
      ((row || {}).Data || []).forEach((data, index) => {
        const label = response?.ResultSet?.ResultSetMetadata?.ColumnInfo?.[index]?.Label || '';
        if (!label) {
          return;
        }
        fields.add(label);
        const value = Object.values(data || {})[0];
        if (!value) {
          return;
        }

        if (fieldsNames.has(label)) {
          const types = mapFieldNameToTypes.get(label)!;
          types.forEach(t => {
            if (typeof this.result[t] === 'undefined') {
              this.result[t] = {};
            }
            this.addValueToResource(this.result[t], label, value);
          });
        }

        this.parse(AmazonAthenaPlatform.parseStruct(value), label)
          .forEach(fn => fields.add(fn));
      });
    });

    loggers.debug().log(`[${tabInfo.id}] Finished parse response`, id, this.result);

    return this.result;
  }

  static id = PlatformID.Athena;

  getID() {
    return AmazonAthenaPlatform.id;
  }

  getName() {
    return PlatformName.Athena;
  }

  register(): void {
    const urlsProcessing = new Set<Url>();
    const bodyData = new Map<SHA256, string>();

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
                && AmazonAthenaPlatform.postUrls.some(p => details.url.indexOf(p) > -1);
            },
            params,
            id,
          )) {
            const bodyBytes = details.requestBody!.raw![0].bytes!;
            let bodyStr = new TextDecoder().decode(bodyBytes);
            const parsedBodyData = parseJSONSafe(bodyStr, null) as unknown as Record<string, string>;
            if (parsedBodyData && !parsedBodyData.QueryExecutionId) {
              return;
            }
            bodyData.set(sha256(bodyStr), bodyStr);
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
                && AmazonAthenaPlatform.postUrls.some(p => details.url.indexOf(p) > -1);
            },
            params,
            id,
          )) {
            const headers = details.requestHeaders!.reduce((res: any, header: any) => {
              res[header.name] = header.value;
              return res;
            }, {});

            const bodySha256 = headers['X-Amz-Content-Sha256'];

            if (
              !bodyData.has(bodySha256)
              || headers['X-Amz-Target'] !== 'AmazonAthena.GetQueryResults'
            ) {
              return;
            }

            const bodyStr = bodyData.get(bodySha256);

            urlsProcessing.add(details.url);

            const removeAttached = () => {
              urlsProcessing.delete(details.url);
              bodyData.delete(bodySha256);
              if (urlsProcessing.size < 1) {
                AbstractBackgroundPlatform.sendLoading(details.tabId, false);
              }
            };

            AbstractBackgroundPlatform.sendLoading(details.tabId, true);

            const url = details.url;
            const cacheID = url;

            http.post(
              {
                url,
                body: bodyStr,
                headers,
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
                    },
                    true,
                  );
                  this.lastResponse.set(cacheID, response);
                  removeAttached();
                },
                onError: e => {
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
  }

  constructor() {
    super();
    this.watchingResources = {};
    this.emptyFieldValues = [
      ...this.emptyFieldValues,
      '-',
      'null',
    ];
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(AmazonAthenaPlatform.id);

type AthenaQueryResults = {
  ResultSet: {
    ResultSetMetadata: {
      ColumnInfo: {
        CaseSensitive: boolean;
        CatalogName: string;
        Label: string;
        Name: string;
      }[];
    };
    Rows: {
      Data: {
        [valueType: string]: string;
      }[];
    }[];
  };
};

type ParsedStruct = {
  [fieldName: '$$value$$'
  | '$$array$$'
  | string
  ]: string | ParsedStruct | ParsedStruct[];
};