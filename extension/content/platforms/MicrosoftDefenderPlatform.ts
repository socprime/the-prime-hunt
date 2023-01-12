import { ContentPlatform, ListenerType, MessageListener } from '../types/types-content-common';
import { ModifyQueryType, PlatformID, PlatformName } from '../../common/types/types-common';
import { addListener } from '../services/content-services-listeners';
import {
  buildQueryParts,
  mountHTMLElement,
} from '../../common/common-helpers';
import { sendMessageFromContent } from '../services/content-services';
import { isMessageMatched } from '../../common/common-listeners';
import { MessageToContent } from '../types/types-content-messages';
import { MessageToInline } from '../../inline/types/types-inline-messages';
import { microsoftDefenderInline } from '../../manifest/public-resources';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import { isNumberInString } from '../../../common/checkers';
import { Loggers } from '../../common/loggers';
import { getWebAccessibleUrl } from '../../common/common-extension-helpers';

let loggers: Loggers;

export class MicrosoftDefenderPlatform implements ContentPlatform {
  defaultWatchers = {
    [BoundedResourceTypeID.Accounts]: [
      'AccountName',
      'InitiatingProcessName',
      'RequestAccountName',
    ],
    [BoundedResourceTypeID.Assets]: [
      'DeviceName',
    ],
  };

  static readonly id = PlatformID.MicrosoftDefender;

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
  };

  static buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix = false,
  ) {
    const prefix = 'where';
    return buildQueryParts(
      resources,
      () => type === 'exclude' ? ' != ' : ' == ',
      type === 'exclude' ? ' and ' : ' or ',
      type === 'exclude' ? ' and ' : ' or ',
      {
        leftOperand: (v) => v,
        rightOperand: (v) => MicrosoftDefenderPlatform.normalizedValue(v),
      },
      withPrefix ? prefix : undefined,
    );
  }

  static normalizedValue = (value: string | number) => {
    const nValue = isNumberInString(value)
      ? parseFloat(value as string)
      : value;
    return typeof nValue === 'number'
      ? nValue
      : `\"${nValue.replace(/\\/g, '\\\\')}\"`;
  };

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix?: boolean,
  ) {
    return MicrosoftDefenderPlatform.buildQueryParts(type, resources, withPrefix);
  }

  extensionDefaultPosition = MicrosoftDefenderPlatform.extensionDefaultPosition;

  getID() {
    return MicrosoftDefenderPlatform.id;
  }

  getName() {
    return PlatformName.MicrosoftDefender;
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
        src: getWebAccessibleUrl(microsoftDefenderInline),
        type: 'text/javascript',
        'data-type': 'inline-listener',
      },
    });
  }

  connect(): void {
    MicrosoftDefenderPlatform.setListeners();
    MicrosoftDefenderPlatform.connectInlineListener();

    loggers.debug().log('connected');
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(MicrosoftDefenderPlatform.id);