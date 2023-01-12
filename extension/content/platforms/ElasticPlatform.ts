import { Loggers } from '../../common/loggers';
import { ContentPlatform, ListenerType, MessageListener } from '../types/types-content-common';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import { ModifyQueryType, PlatformID, PlatformName } from '../../common/types/types-common';
import { isNumberInString } from '../../../common/checkers';
import {
  buildQueryParts, mountHTMLElement,
} from '../../common/common-helpers';
import { elasticInline } from '../../manifest/public-resources';
import { addListener } from '../services/content-services-listeners';
import { isMessageMatched } from '../../common/common-listeners';
import { MessageToContent } from '../types/types-content-messages';
import { sendMessageFromContent } from '../services/content-services';
import { MessageToInline } from '../../inline/types/types-inline-messages';
import { getWebAccessibleUrl } from '../../common/common-extension-helpers';

let loggers: Loggers;

export class ElasticPlatform implements ContentPlatform {
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

  static readonly id = PlatformID.Elastic;

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
  };

  static normalizedValue = (value: string | number) => {
    let nValue = isNumberInString(value)
      ? parseFloat(value as string)
      : String(value).trim();

    if (typeof nValue === 'number') {
      return nValue;
    }

    nValue = nValue.replace(/\\/g, '\\\\');

    if (nValue[0] === '(' || nValue[nValue.length - 1] === ')') {
      return nValue;
    }

    return `"${nValue}"`;
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

    Object.keys(resources).forEach(fieldName => {
      if (resources[fieldName].length > 1) {
        normalizedResources[fieldName] = [
          `(${resources[fieldName]
            .map(rn => ElasticPlatform.normalizedValue(rn))
            .join(' OR ')
          })`,
        ];
      } else {
        normalizedResources[fieldName] = resources[fieldName];
      }
    });


    return buildQueryParts(
      normalizedResources,
      () => type === 'exclude' ? ':' : ':',
      type === 'exclude' ? ' AND NOT ' : ' OR ',
      type === 'exclude' ? ' AND NOT ' : ' AND ',
      {
        leftOperand: (v) => v,
        rightOperand: (v) => ElasticPlatform.normalizedValue(v),
      },
      withPrefix ? prefix : undefined,
    );
  }

  extensionDefaultPosition = ElasticPlatform.extensionDefaultPosition;

  getID() {
    return ElasticPlatform.id;
  }

  getName() {
    return PlatformName.Elastic;
  }

  private static setListeners() {
    (addListener as MessageListener)(
      ListenerType.OnMessage,
      (message) => {
        if (isMessageMatched(
          () => MessageToContent.CSModifyQuery === message.type,
          message,
        )) {
          sendMessageFromContent({
            ...message,
            id: `${message.id}--content-modify-query`,
            type: MessageToInline.ISModifyQuery,
          }, false);
        }
      },
    );

    loggers.debug().log('listeners were set');
  }

  private static connectInlineListener() {
    mountHTMLElement('script', document.body, {
      attributes: {
        src: getWebAccessibleUrl(elasticInline),
        type: 'text/javascript',
        'data-type': 'inline-listener',
      },
    });
    loggers.debug().log('inline mounted');
  }

  connect(): void {
    ElasticPlatform.setListeners();
    ElasticPlatform.connectInlineListener();

    loggers.debug().log('connected');
  }

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix?: boolean,
  ): string {
    return ElasticPlatform.buildQueryParts(type, resources, withPrefix);
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(ElasticPlatform.id);