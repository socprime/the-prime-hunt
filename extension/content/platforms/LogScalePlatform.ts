import { AbstractContentPlatform } from './AbstractContentPlatform';
import { Loggers } from '../../common/loggers';
import { WatchingResources } from '../../background/types/types-background-common';
import { ModifyQueryType, PlatformID, PlatformName, SiemType } from '../../common/types/types-common';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import { isNumberInString } from '../../../common/checkers';
import {
  buildQueryParts,
  mountHTMLElement,
} from '../../common/common-helpers';
import { getWebAccessibleUrl } from '../../common/common-extension-helpers';
import { logScaleInline } from '../../manifest/public-resources';
import { addListener } from '../services/content-services-listeners';
import { ListenerType, MessageListener } from '../types/types-content-common';

let loggers: Loggers;

export class LogScalePlatform extends AbstractContentPlatform {
  static id = PlatformID.LogScale;

  static platformName = PlatformName.LogScale;

  defaultWatchers: WatchingResources = {
    [BoundedResourceTypeID.Accounts]: [
      'windows.UserID',
      'windows.EventData.User',
      'windows.EventData.SubjectUserName',
    ],
    [BoundedResourceTypeID.Assets]: [
      '@collect.host',
      'windows.Computer',
      'windows.EventData.DestinationIp',
      'windows.EventData.DestinationHostname',
      'windows.EventData.SourceIp',
      'windows.EventData.SourceHostname',
    ],
  };

  extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
  };

  static normalizedValue(value: string | number) {
    const nValue = isNumberInString(value)
      ? parseFloat(value as string)
      : value;
    return typeof nValue === 'number'
      ? nValue
      : `"${
        nValue
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
      }"`;
  }

  static buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix = false,
  ) {
    const prefix = type === 'exclude' ? 'NOT' : '';
    const newResources = Object.keys(resources)
      .reduce((res, resourceName) => {
        if (resources[resourceName]?.length > 1) {
          res[`$$$${resourceName}`] = [
            `$$$in(field="${resourceName}", values=${JSON.stringify(
              resources[resourceName].map((v) => (isNumberInString(v) ? parseInt(v, 10) : v)),
            )})`,
          ];
        } else {
          res[resourceName] = resources[resourceName];
        }
        return res;
      }, {} as Record<string, string[]>);
    const result = buildQueryParts(
      newResources,
      (v) => {
        if (v[0] === '$' && v[1] === '$' && v[2] === '$') {
          return '';
        }
        return type === 'exclude' ? ' = ' : ' = ';
      },
      type === 'exclude' ? ' | NOT ' : ' | ',
      type === 'exclude' ? ' | NOT ' : ' | ',
      {
        leftOperand: (v) => {
          if (v[0] === '$' && v[1] === '$' && v[2] === '$') {
            return '';
          }
          return v;
        },
        rightOperand: (v) => {
          if (typeof v === 'string' && v[0] === '$' && v[1] === '$' && v[2] === '$') {
            return v.substring(3, v.length);
          }
          return LogScalePlatform.normalizedValue(v);
        },
      },
      withPrefix ? prefix : undefined,
    );
    return result;
  }

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix?: boolean,
  ) {
    return LogScalePlatform.buildQueryParts(type, resources, withPrefix);
  }

  private static connectInlineListener() {
    mountHTMLElement('script', document.body, {
      attributes: {
        src: getWebAccessibleUrl(logScaleInline),
        type: 'text/javascript',
        'data-type': 'inline-listener',
      },
    });
  }

  private static setListeners() {
    (addListener as MessageListener)(
      ListenerType.OnMessage,
      async (message) => {
        AbstractContentPlatform.processInlineListeners(message);
      },
    );

    loggers.debug().log('listeners were set');
  }

  connect(): void {
    LogScalePlatform.setListeners();
    LogScalePlatform.connectInlineListener();

    loggers.debug().log('connected');
  }

  getID(): PlatformID {
    return LogScalePlatform.id;
  }

  getName(): PlatformName {
    return LogScalePlatform.platformName;
  }

  getType(): SiemType {
    return SiemType.LogScale;
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(LogScalePlatform.id);
