import { AbstractContentPlatform } from './AbstractContentPlatform';
import { Loggers } from '../../common/loggers';
import {
  ModifyQueryType, PlatformID, PlatformName, SiemType,
} from '../../common/types/types-common';
import { WatchingResources } from '../../background/types/types-background-common';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import { ListenerType, MessageListener, Position } from '../types/types-content-common';
import { addListener } from '../services/content-services-listeners';
import { mountHTMLElement, buildQueryParts } from '../../common/common-helpers';
import { getWebAccessibleUrl } from '../../common/common-extension-helpers';
import { chronicleInline } from '../../manifest/public-resources';

let loggers: Loggers;

export class ChroniclePlatform extends AbstractContentPlatform {
  static id = PlatformID.Chronicle;

  static platformName = PlatformName.Chronicle;

  defaultWatchers: WatchingResources = {
    [BoundedResourceTypeID.Accounts]: [
      'user',
      'principal.user.userid',
      'target.user.userid',
      'source.user.userid',
    ],
    [BoundedResourceTypeID.Assets]: [
      'hostname',
      'IP',
      'src.ip',
      'dst.ip',
      'target.asset.hostname',
      'target.hostname',
      'source.hostname',
      'source.asset.hostname',
      'principal.ip',
    ],
  };

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
  };

  extensionDefaultPosition: Position = ChroniclePlatform.extensionDefaultPosition;

  static normalizedValue = (value: string) => {
    return `"${
      value
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
    }"`;
  };

  static buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix = false,
  ) {
    let prefix = type === 'include' ? 'AND (' : 'AND';
    if (type === 'show all') {
      prefix = '';
    }
    return `${buildQueryParts(
      resources,
      () => (type === 'exclude' ? ' != ' : ' = '),
      type === 'exclude' ? ' AND ' : ' OR ',
      type === 'exclude' ? ' AND ' : ') AND (',
      {
        leftOperand: (v) => v,
        rightOperand: (v) => ChroniclePlatform.normalizedValue(v as string),
      },
      withPrefix ? prefix : undefined,
    )} ${type === 'exclude' ? '' : ')'}`;
  }

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix?: boolean,
  ): string {
    return ChroniclePlatform.buildQueryParts(type, resources, withPrefix);
  }

  private static connectInlineListener() {
    mountHTMLElement('script', document.body, {
      attributes: {
        src: getWebAccessibleUrl(chronicleInline),
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
    ChroniclePlatform.setListeners();
    ChroniclePlatform.connectInlineListener();

    loggers.debug().log('connected');
  }

  getID(): PlatformID {
    return ChroniclePlatform.id;
  }

  getName(): PlatformName {
    return ChroniclePlatform.platformName;
  }

  getType(): SiemType {
    return SiemType.Chronicle;
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(ChroniclePlatform.id);
