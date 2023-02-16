import { ListenerType, MessageListener, Position } from '../types/types-content-common';
import { ModifyQueryType, PlatformID, PlatformName } from '../../common/types/types-common';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import { WatchingResources } from '../../background/types/types-background-common';
import { Loggers } from '../../common/loggers';
import { isDate, isNumberInString } from '../../../common/checkers';
import {
  buildQueryParts,
  mountHTMLElement,
  waitHTMLElement,
} from '../../common/common-helpers';
import { addListener } from '../services/content-services-listeners';
import { contentPlatformIDFromENV } from '../../common/envs';
import { arcSightInline } from '../../manifest/public-resources';
import { getWebAccessibleUrl } from '../../common/common-extension-helpers';
import { AbstractContentPlatform } from './AbstractContentPlatform';

let loggers: Loggers;

export class ArcSightPlatform extends AbstractContentPlatform {
  static normalizedValue = (value: string | number) => {
    if (typeof value === 'number') {
      return value;
    }

    if (isNumberInString(value)) {
      return String(parseFloat(value as string));
    }

    return `\"${value.replace(/"/g, '\\"')}\"`;
  };

  static buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix?: boolean | undefined,
  ): string {
    const prefix = 'AND';
    const result = buildQueryParts(
      resources,
      (fieldName, resourceName) => {
        if (
          resourceName.indexOf('EET') > -1
            && isDate(resourceName.split('EET').shift()!)
        ) {
          return type === 'exclude' ? ' <= ' : ' >= ';
        }
        return type === 'exclude' ? ' != ' : ' = ';
      },
      type === 'exclude' ? ' AND ' : ' OR ',
      type === 'exclude' ? ' AND ' : ' OR ',
      {
        leftOperand: (v) => v,
        rightOperand: (v) => ArcSightPlatform.normalizedValue(v),
      },
      withPrefix && type !== 'include' ? prefix : undefined,
    );

    if (type !== 'include' || !withPrefix) {
      return result;
    }

    if (result.indexOf(' OR ') > -1) {
      return `${prefix} (${result})`;
    }

    return `${prefix} ${result}`;
  }

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix?: boolean | undefined,
  ): string {
    return ArcSightPlatform.buildQueryParts(type, resources, withPrefix);
  }

  connect(): void {
    ArcSightPlatform.setListeners();

    loggers.debug().log('connected');
  }

  static id = PlatformID.ArcSight;

  defaultWatchers: WatchingResources = {
    [BoundedResourceTypeID.Accounts]: [
      'sourceUserName',
      'destinationUserName',
    ],
    [BoundedResourceTypeID.Assets]: [
      'sourceAddress',
      'destinationAddress',
    ],
  };

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
  };

  extensionDefaultPosition: Position = ArcSightPlatform.extensionDefaultPosition;

  getID(): PlatformID {
    return ArcSightPlatform.id;
  }

  getName(): PlatformName {
    return PlatformName.ArcSight;
  }

  private static connectInlineListener() {
    mountHTMLElement('script', document.body, {
      attributes: {
        src: getWebAccessibleUrl(arcSightInline),
        type: 'text/javascript',
        'data-type': 'inline-listener',
      },
    });

    loggers.debug().log('inline were set');
  }

  private static setListeners() {
    (addListener as MessageListener)(
      ListenerType.OnMessage,
      async (message) => {
        if (
          !document.querySelector('textarea#queryInput')
          && !contentPlatformIDFromENV
        ) {
          return;
        }

        const query = `script[src$="${arcSightInline}"]`;

        if (!document.querySelector(query)) {
          ArcSightPlatform.connectInlineListener();
          await waitHTMLElement(query);
        }

        AbstractContentPlatform.processInlineListeners(message);
      },
    );

    loggers.debug().log('listeners were set');
  }

}

loggers = require('../../common/loggers').loggers
  .addPrefix(ArcSightPlatform.id);