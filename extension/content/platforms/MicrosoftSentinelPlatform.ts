import { sendMessageFromContent } from '../services/content-services';
import { ModifyQueryType, PlatformID, PlatformName } from '../../common/types/types-common';
import { ContentPlatform, ListenerType, MessageListener } from '../types/types-content-common';
import { addListener } from '../services/content-services-listeners';
import { MessageToContent } from '../types/types-content-messages';
import {
  buildQueryParts,
  getWebAccessibleUrl,
  mountHTMLElement,
  waitHTMLElement,
} from '../../common/common-helpers';
import { MessageToInline } from '../../inline/types/types-inline-messages';
import { isMessageMatched } from '../../common/common-listeners';
import { contentPlatformIDFromENV } from '../../common/envs';
import { microsoftSentinelInline } from '../../manifest/public-resources';
import { isNumberInString } from '../../../common/checkers';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import { Loggers } from '../../common/loggers';

let loggers: Loggers;

export class MicrosoftSentinelPlatform implements ContentPlatform {
  static readonly id = PlatformID.MicrosoftSentinel;

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 500,
    height: 400,
  };

  static normalizedValue(value: string | number) {
    const nValue = isNumberInString(value)
      ? parseFloat(value as string)
      : value;
    return typeof nValue === 'number'
      ? nValue
      : `"${nValue.replace(/\\/g, '\\\\')}"`;
  }

  static buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
  ) {
    return buildQueryParts(
      resources,
      type === 'exclude' ? '!=' : '==',
      type === 'exclude' ? ' and ' : ' or ',
      {
        leftOperand: (v) => v,
        rightOperand: (v) => MicrosoftSentinelPlatform.normalizedValue(v),
      },
    );
  }

  defaultWatchers = {
    [BoundedResourceTypeID.Accounts]: [
      'UserName',
      'Account',
      'SubjectUserName',
      'TargetUserName',
    ],
    [BoundedResourceTypeID.Assets]: [
      'Computer',
    ],
  };

  extensionDefaultPosition = MicrosoftSentinelPlatform.extensionDefaultPosition;

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
  ) {
    return MicrosoftSentinelPlatform.buildQueryParts(type, resources);
  }

  getID() {
    return MicrosoftSentinelPlatform.id;
  }

  getName() {
    return PlatformName.MicrosoftSentinel;
  }

  private static connectInlineListener() {
    mountHTMLElement('script', document.body, {
      attributes: {
        src: getWebAccessibleUrl(microsoftSentinelInline),
        type: 'text/javascript',
        'data-type': 'inline-listener',
      },
    });
  }

  private static setListeners() {
    (addListener as MessageListener)(
      ListenerType.OnMessage,
      async (message) => {
        if (
          !contentPlatformIDFromENV
          && !document.querySelector('la-main-view')
        ) {
          return;
        }

        const query = `script[src$="${microsoftSentinelInline}"]`;

        if (!document.querySelector(query)) {
          MicrosoftSentinelPlatform.connectInlineListener();
          await waitHTMLElement(query);
        }

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

  connect() {
    MicrosoftSentinelPlatform.setListeners();

    loggers.debug().log('connected');
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(MicrosoftSentinelPlatform.id);
