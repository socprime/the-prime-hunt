import { Loggers } from '../../common/loggers';
import { ListenerType, MessageListener } from '../types/types-content-common';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import { ModifyQueryType, PlatformID, PlatformName } from '../../common/types/types-common';
import { isNumberInString } from '../../../common/checkers';
import {
  buildQueryParts, mountHTMLElement,
} from '../../common/common-helpers';
import { openSearchInline } from '../../manifest/public-resources';
import { addListener } from '../services/content-services-listeners';
import { getWebAccessibleUrl } from '../../common/common-extension-helpers';
import { AbstractContentPlatform } from './AbstractContentPlatform';

let loggers: Loggers;

export class OpenSearchPlatform extends AbstractContentPlatform {
  defaultWatchers = {
    [BoundedResourceTypeID.Accounts]: [
      'user.name',
      'related.user',
      'user.full_name',
      'winlog.event_data.SubjectUserName',
      'winlog.event_data.TargetUserName',
      'winlog.user.name',
    ],
    [BoundedResourceTypeID.Assets]: [
      'host.hostname',
      'host.name',
      'winlog.computer_name',
    ],
  };

  static readonly id = PlatformID.OpenSearch;

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
  };

  static normalizedValue = (value: string | number) => {
    const nValue = isNumberInString(value)
      ? parseFloat(value as string)
      : String(value).trim();

    if (typeof nValue === 'number') {
      return nValue;
    }

    if (nValue[0] === '(' || nValue[nValue.length - 1] === ')') {
      return nValue;
    }

    return `"${
      nValue
        .replace(/"/g, '\\"')
    }"`;
  };

  static buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix = false,
  ) {
    const prefix = type === 'include'
      ? 'AND'
      : 'AND NOT';

    const normalizedResources: NormalizedParsedResources = {};

    Object.keys(resources).forEach((fieldName) => {
      if (resources[fieldName].length > 1) {
        normalizedResources[fieldName] = [
          `(${resources[fieldName]
            .map((rn) => OpenSearchPlatform.normalizedValue(rn))
            .join(' OR ')
          })`,
        ];
      } else {
        normalizedResources[fieldName] = resources[fieldName];
      }
    });

    return buildQueryParts(
      normalizedResources,
      () => (type === 'exclude' ? ':' : ':'),
      type === 'exclude' ? ' AND NOT ' : ' OR ',
      type === 'exclude' ? ' AND NOT ' : ' AND ',
      {
        leftOperand: (v) => v,
        rightOperand: (v) => OpenSearchPlatform.normalizedValue(v),
      },
      withPrefix ? prefix : undefined,
    );
  }

  extensionDefaultPosition = OpenSearchPlatform.extensionDefaultPosition;

  getID() {
    return OpenSearchPlatform.id;
  }

  getName() {
    return PlatformName.OpenSearch;
  }

  private static setListeners() {
    (addListener as MessageListener)(
      ListenerType.OnMessage,
      (message) => {
        AbstractContentPlatform.processInlineListeners(message);
      },
    );

    loggers.debug().log('listeners were set');
  }

  private static connectInlineListener() {
    mountHTMLElement('script', document.body, {
      attributes: {
        src: getWebAccessibleUrl(openSearchInline),
        type: 'text/javascript',
        'data-type': 'inline-listener',
      },
    });
    loggers.debug().log('inline mounted');
  }

  connect(): void {
    OpenSearchPlatform.setListeners();
    OpenSearchPlatform.connectInlineListener();

    loggers.debug().log('connected');
  }

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix?: boolean,
  ): string {
    return OpenSearchPlatform.buildQueryParts(type, resources, withPrefix);
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(OpenSearchPlatform.id);
