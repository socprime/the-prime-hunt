import { AbstractBackgroundPlatform } from './AbstractBackgroundPlatform';
import { FieldName, ParsedResult, ResourceName } from '../../app/resources/resources-types';
import { PlatformID, PlatformName } from '../../common/types/types-common';
import { Url } from '../../../common/types';
import { BGListenerType, WatchingResources } from '../types/types-background-common';
import { setBGInterceptor } from '../services/background-services-listeners';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import { http } from '../../../common/Http';
import { Loggers } from '../../common/loggers';
import { capitalizeFirstLetter, formatDate, parseJSONSafe, uuid } from '../../../common/helpers';
import { isDate } from '../../../common/checkers';

let loggers: Loggers;

export class ArcSightPlatform extends AbstractBackgroundPlatform {
  static id = PlatformID.ArcSight;

  private static postUrls: Url[] = [
    '/searchx/searchdata',
  ];

  private static normalizeResponse(response: string): (number | string[])[] | null {
    const normalizedResponse = (response || '').substring((response || '').indexOf('['));
    return parseJSONSafe(normalizedResponse, null);
  }

  constructor() {
    super();
    this.watchingResources = {} as WatchingResources;
    this.emptyFieldValues = [
      ...this.emptyFieldValues,
      '-',
    ];
  }

  private static mappedFieldsNames = new Map<string, string>([
    ['act', 'deviceAction'],
    ['app', 'applicationProtocol'],
    ['c6a1', 'deviceCustomIPv6Address1'],
    ['c6a1Label', 'deviceCustomIPv6Address1Label'],
    ['c6a3', 'deviceCustomIPv6Address3'],
    ['c6a3Label', 'deviceCustomIPv6Address3Label'],
    ['c6a4', 'deviceCustomIPv6Address4'],
    ['C6a4Label', 'deviceCustomIPv6Address4Label'],
    ['cat', 'deviceEventCategory'],
    ['cfp1', 'deviceCustomFloatingPoint1'],
    ['cfp1Label', 'deviceCustomFloatingPoint1Label'],
    ['cfp2', 'deviceCustomFloatingPoint2'],
    ['cfp2Label', 'deviceCustomFloatingPoint2Label'],
    ['cfp3', 'deviceCustomFloatingPoint3'],
    ['cfp3Label', 'deviceCustomFloatingPoint3Label'],
    ['cfp4', 'deviceCustomFloatingPoint4'],
    ['cfp4Label', 'deviceCustomFloatingPoint4Label'],
    ['cn1', 'deviceCustomNumber1'],
    ['cn1Label', 'deviceCustomNumber1Label'],
    ['cn2', 'DeviceCustomNumber2'],
    ['cn2Label', 'deviceCustomNumber2Label'],
    ['cn3', 'deviceCustomNumber3'],
    ['cn3Label', 'deviceCustomNumber3Label'],
    ['cnt', 'baseEventCount'],
    ['cs1', 'deviceCustomString1'],
    ['cs1Label', 'deviceCustomString1Label'],
    ['cs2', 'deviceCustomString2'],
    ['cs2Label', 'deviceCustomString2Label'],
    ['cs3', 'deviceCustomString3'],
    ['cs3Label', 'deviceCustomString3Label'],
    ['cs4', 'deviceCustomString4'],
    ['cs4Label', 'deviceCustomString4Label'],
    ['cs5', 'deviceCustomString5'],
    ['cs5Label', 'deviceCustomString5Label'],
    ['cs6', 'deviceCustomString6'],
    ['cs6Label', 'deviceCustomString6Label'],
    ['DeviceOutboundInterface', 'deviceOutboundInterface'],
    ['DevicePayloadId', 'devicePayloadId'],
    ['dhost', 'destinationHostName'],
    ['dmac', 'destinationMacAddress'],
    ['dntdom', 'destinationNtDomain'],
    ['dpid', 'destinationProcessId'],
    ['dpriv', 'destinationUserPrivileges'],
    ['dproc', 'destinationProcessName'],
    ['dpt', 'destinationPort'],
    ['dst', 'destinationAddress'],
    ['dtz', 'deviceTimeZone'],
    ['duid', 'destinationUserId'],
    ['duser', 'destinationUserName'],
    ['dvc', 'deviceAddress'],
    ['dvchost', 'deviceHostName'],
    ['dvcmac', 'deviceMacAddress'],
    ['dvcpid', 'deviceProcessId'],
    ['end', 'endTime'],
    ['fname', 'filename'],
    ['fsize', 'fileSize'],
    ['in', 'bytesIn'],
    ['msg', 'message'],
    ['out', 'bytesOut'],
    ['outcome', 'eventOutcome'],
    ['proto', 'transportProtocol'],
    ['reason', 'Reason'],
    ['request', 'requestUrl'],
    ['rt', 'deviceReceiptTime'],
    ['shost', 'sourceHostName'],
    ['smac', 'sourceMacAddress'],
    ['sntdom', 'sourceNtDomain'],
    ['spid', 'sourceProcessId'],
    ['spriv', 'sourceUserPrivileges'],
    ['sproc', 'sourceProcessName'],
    ['spt', 'sourcePort'],
    ['src', 'sourceAddress'],
    ['start', 'startTime'],
    ['suid', 'sourceUserId'],
    ['suser', 'sourceUserName'],
    ['agt', 'agentAddress'],
    ['ahost', 'agentHostName'],
    ['aid', 'agentId'],
    ['amac', 'agentMacAddress'],
    ['art', 'agentReceiptTime'],
    ['at', 'agentType'],
    ['atz', 'agentTimeZone'],
    ['av', 'agentVersion'],
    ['dlat', 'destinationGeoLatitude'],
    ['dlong', 'destinationGeoLongitude'],
    ['slat', 'sourceGeoLatitude'],
    ['slong', 'sourceGeoLongitude'],
    ['oAgtAddress', 'originalAgentAddress'],
    ['oAgtHostName', 'originalAgentHostName'],
    // final device
    ['fdeviceAssetId', 'finalDeviceAssetId'],
    ['fdeviceZone', 'finalDeviceZone'],
    ['fdvchost', 'finalDeviceHost'],
    // fdevice
    ['fDvcAddress', 'fDeviceAddress'],
    ['fDvcHostName', 'fDeviceHostName'],
    ['fDvcAssetId', 'fDeviceAssetId'],
    ['fDvcZone', 'fDeviceZone'],
    //
    ['mrt', 'managerReceiptTime'],
    ['oAgtAssetId', 'originalAgentAssetId'],
    ['oAgtZone', 'originalAgentZone'],
    ['oAgtId', 'originalAgentId'],
    ['oAgtType', 'originalAgentType'],
    ['oAgtVersion', 'originalAgentVersion'],
  ]);

  private static getFieldName(cef: string): string {
    return ArcSightPlatform.mappedFieldsNames.has(cef)
      ? ArcSightPlatform.mappedFieldsNames.get(cef)!
      : cef;
  }

  private static toCamelCase(str: string): string {
    return str.split('_').map((v, i) => i === 0 ? v : capitalizeFirstLetter(v)).join('');
  }

  private static parseClass(classStr: string) {
    return ArcSightPlatform.toCamelCase(classStr.split('=').shift()!.split('-').pop()!);
  }

  private parseCEFString = (cefString: string): Map<FieldName, ResourceName> => {
    const mappedFields = new Map<FieldName, ResourceName>();

    const arrayData = cefString.split('|');
    mappedFields.set('deviceVendor', arrayData[1]);
    mappedFields.set('deviceProduct', arrayData[2]);
    mappedFields.set('deviceVersion', arrayData[3]);
    mappedFields.set('deviceEventClassId', arrayData[4]);
    mappedFields.set('name', arrayData[5]);
    mappedFields.set('severity', arrayData[6]);
    arrayData[7].split(' ').forEach(pairs => {
      if (!pairs) {
        return;
      }
      const [fieldName, resourceName] = pairs.split('=');
      mappedFields.set(
        ArcSightPlatform.getFieldName(fieldName),
        isDate(resourceName) ? formatDate(
          '%Y/%M/%d %h:%m:%s EET',
          new Date(parseInt(resourceName)),
        ) : resourceName,
      );
    });
    return mappedFields;
  };

  private parseHTMLString(htmlString: string): Map<FieldName, ResourceName> {
    const mappedFields = new Map<FieldName, ResourceName>();

    const $ = require('cheerio').load(`<body>${htmlString}</body>`);

    const classStr = $('body > *').attr().class;

    if (!classStr || classStr.indexOf('-Raw-') > -1) {
      return mappedFields;
    }

    const resourceName = $.text();
    const fieldName = ArcSightPlatform.parseClass(classStr);

    mappedFields.set(
      ArcSightPlatform.getFieldName(fieldName),
      isDate(resourceName) ? formatDate(
        '%Y/%M/%d %h:%m:%s EET',
        new Date(parseInt(resourceName)),
      ) : resourceName,
    );
    
    return mappedFields;
  }

  async parseResponse(response: (number | string[])[]): Promise<ParsedResult> {
    const result = {} as ParsedResult;
    const fieldsNamesTest = new Set();

    const id = uuid();
    loggers.debug().log('started parse response...', id, this.watchingResources);

    const { mapFieldNameToTypes, fieldsNames } = AbstractBackgroundPlatform.getNormalizedWatchers(this.watchingResources);

    (response || [])?.forEach(v => {
      if (!Array.isArray(v)) {
        return;
      }

      (v as string[] || []).forEach(sv => {
        if (sv[0] !== '<') {
          return;
        }
        const $ = require('cheerio').load(`<body>${sv}</body>`);
        const str = $('body').text();

        const fields = str.substring(0, 6).toLowerCase() === 'cef:0|'
          ? this.parseCEFString(str)
          : this.parseHTMLString(sv);

        Array.from(fields).forEach(av => fieldsNamesTest.add(av[0]));

        Array.from(fieldsNames).forEach(fieldNameToParse => {
          if (fields.has(fieldNameToParse)) {
            const types = mapFieldNameToTypes.get(fieldNameToParse)!;
            types.forEach(t => {
              if (typeof result[t] === 'undefined') {
                result[t] = {};
              }
              this.addValueToResource(result[t], fieldNameToParse, fields.get(fieldNameToParse)!);
            });
          }
        });
      });
    });

    loggers.debug().log('finished parse response', id, result);

    return result;
  }

  getID() {
    return ArcSightPlatform.id;
  }

  getName() {
    return PlatformName.ArcSight;
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
                && !bodyData.has(details.url)
                && !!details.requestBody?.raw?.[0]?.bytes?.byteLength
                && details.requestBody?.raw?.[0]?.bytes?.byteLength > 5
                && ArcSightPlatform.postUrls.some(p => details.url.indexOf(p) > -1);
            },
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
                && ArcSightPlatform.postUrls.some(p => details.url.indexOf(p) > -1);
            },
            params,
            id,
          )) {
            let reconnectAttempts = 4;
            const bodyBytes = bodyData.get(details.url)!;
            let bodyStr = new TextDecoder().decode(bodyBytes);
            urlsProcessing.add(details.url);

            const removeAttached = () => {
              urlsProcessing.delete(details.url);
              bodyData.delete(details.url);
              if (urlsProcessing.size < 1) {
                AbstractBackgroundPlatform.sendLoading(details.tabId, false);
              }
            };

            const doRequest = () => {
              AbstractBackgroundPlatform.sendLoading(details.tabId, true);

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
                  onTextSuccess: async (response: string) => {
                    const data = ArcSightPlatform.normalizeResponse(response);
                    if (!data) {
                      loggers
                        .warn()
                        .addPrefix('failed parse json response')
                        .log(details.method, details.url, bodyStr);
                      return removeAttached();
                    }
                    AbstractBackgroundPlatform.sendParsedData(
                      details.tabId,
                      await this.parseResponse(data),
                      true,
                    );
                    this.lastResponse = data;
                    removeAttached();
                  },
                  onError: e => {
                    loggers
                      .warn()
                      .addPrefix('failed webRequest post')
                      .log(e, details.method, details.url, bodyStr);
                    if (reconnectAttempts > 0) {
                      loggers.info().log('retry request');
                      reconnectAttempts = reconnectAttempts - 1;
                      return doRequest();
                    }
                    removeAttached();
                  },
                },
              );
            };

            doRequest();
          }
        },
      ),
    );
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(ArcSightPlatform.id);