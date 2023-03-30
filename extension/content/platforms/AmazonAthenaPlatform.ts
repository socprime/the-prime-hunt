import { AbstractContentPlatform } from './AbstractContentPlatform';
import { WatchingResources } from '../../background/types/types-background-common';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import { ListenerType, MessageListener, Position } from '../types/types-content-common';
import { ModifyQueryType, PlatformID, PlatformName } from '../../common/types/types-common';
import { isNumberInString } from '../../../common/checkers';
import {
  buildQueryParts, mountHTMLElement,
} from '../../common/common-helpers';
import { Loggers } from '../../common/loggers';
import { addListener } from '../services/content-services-listeners';
import { amazonAthenaInline } from '../../manifest/public-resources';
import { getWebAccessibleUrl } from '../../common/common-extension-helpers';

let loggers: Loggers;

export class AmazonAthenaPlatform extends AbstractContentPlatform {
  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
  };

  defaultWatchers: WatchingResources = {
    [BoundedResourceTypeID.Accounts]: [
      'actor.user.name',
    ],
    [BoundedResourceTypeID.Assets]: [
      'device.name',
    ],
  };

  extensionDefaultPosition: Position = AmazonAthenaPlatform.extensionDefaultPosition;

  static normalizedValue(value: string | number) {
    const nValue = isNumberInString(value)
      ? parseFloat(value as string)
      : value;
    return typeof nValue === 'number'
      ? nValue
      : `'${
        nValue.replace(/'/g, '"')
      }'`;
  }

  static id = PlatformID.Athena;

  static buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix?: boolean | undefined,
  ): string {
    const prefix = 'where';
    return buildQueryParts(
      resources,
      () => type === 'exclude' ? ' != ' : ' = ',
      type === 'exclude' ? ' AND ' : ' OR ',
      type === 'exclude' ? ' AND ' : ' OR ',
      {
        leftOperand: (v) => v,
        rightOperand: (v) => AmazonAthenaPlatform.normalizedValue(v),
      },
      withPrefix ? prefix : undefined,
    );
  }

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix?: boolean,
  ): string {
    return AmazonAthenaPlatform.buildQueryParts(type, resources, withPrefix);
  }

  private static connectInlineListener() {
    mountHTMLElement('script', document.body, {
      attributes: {
        src: getWebAccessibleUrl(amazonAthenaInline),
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
    AmazonAthenaPlatform.setListeners();
    AmazonAthenaPlatform.connectInlineListener();

    loggers.debug().log('connected');
  }

  getID() {
    return AmazonAthenaPlatform.id;
  }

  getName() {
    return PlatformName.Athena;
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(AmazonAthenaPlatform.id);