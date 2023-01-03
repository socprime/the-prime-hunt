import { ContentPlatform, ListenerType, MessageListener } from '../types/types-content-common';
import { ModifyQueryType, PlatformID, PlatformName } from '../../common/types/types-common';
import { BoundedResourceTypeID, NormalizedParsedResources } from '../../app/resources/resources-types';
import {
  buildQueryParts, mountHTMLElement, waitHTMLElement,
} from '../../common/common-helpers';
import { isNumberInString } from '../../../common/checkers';
import { addListener } from '../services/content-services-listeners';
import { isMessageMatched } from '../../common/common-listeners';
import { MessageToContent } from '../types/types-content-messages';
import { sendMessageFromContent } from '../services/content-services';
import { MessageToInline } from '../../inline/types/types-inline-messages';
import { qRadarInline } from '../../manifest/public-resources';
import { Loggers } from '../../common/loggers';
import { getWebAccessibleUrl } from '../../common/common-extension-helpers';

let loggers: Loggers;

export class QRadarPlatform implements ContentPlatform {
  static normalizedValue(value: string | number) {
    const nValue = isNumberInString(value)
      ? parseFloat(value as string)
      : value;
    return typeof nValue === 'number'
      ? nValue
      : `'${nValue}'`;
  }

  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
    withPrefix = false,
  ): string {
    const prefix = 'where';
    return buildQueryParts(
      resources,
      type === 'exclude' ? ' != ' : ' == ',
      type === 'exclude' ? ' AND ' : ' OR ',
      type === 'exclude' ? ' AND ' : ' OR ',
      {
        leftOperand: (v) => `"${v}"`,
        rightOperand: (v) => QRadarPlatform.normalizedValue(v),
      },
      withPrefix ? prefix : undefined,
    );
  }

  connect(): void {
    QRadarPlatform.setListeners();
    loggers.debug().log('connected');
  }

  private static setListeners() {
    (addListener as MessageListener)(
      ListenerType.OnMessage,
      async (message) => {
        if (!document.querySelector('#aceEditor')) {
          return;
        }

        const query = `script[src$="${qRadarInline}"]`;

        if (!document.querySelector(query)) {
          QRadarPlatform.connectInlineListener();
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
  }

  private static connectInlineListener() {
    mountHTMLElement('script', document.body, {
      attributes: {
        src: getWebAccessibleUrl(qRadarInline),
        type: 'text/javascript',
        'data-type': 'inline-listener',
      },
    });
  }

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 500,
    height: 400,
  };

  defaultWatchers = {
    [BoundedResourceTypeID.Accounts]: [
      'Account Name',
      'Recipients',
      'Sender',
      'Target Username',
      'Username',
    ],
    [BoundedResourceTypeID.Assets]: [
      'Client Hostname',
      'Destination Hostname',
      'Destination IP',
      'Hostname',
      'Machine Identifier',
      'Recipient Host',
      'Sender Host',
      'Source Hostname',
      'Source Workstation',
      'Source IP',
      'Source Asset Name',
      'Destination Asset Name',
    ],
  };

  extensionDefaultPosition = QRadarPlatform.extensionDefaultPosition;

  static id = PlatformID.QRadar;

  getID() {
    return PlatformID.QRadar;
  }

  getName() {
    return PlatformName.QRadar;
  }
}

loggers = require('../../common/loggers').loggers
  .addPrefix(QRadarPlatform.id);