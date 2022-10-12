import { ContentPlatform, ListenerType, MessageListener } from '../../types/types-content-common';
import { getDebugPrefix } from '../../../common/loggers/loggers-debug';
import { PlatformID } from '../../../common/types/types-common';
import { addListener } from '../../content-listeners';
import {
  getElementsUnderCursor,
  getWebAccessibleUrl,
  mountHTMLElement, removeDoubleQuotesAround,
} from '../../../common/common-helpers';
import { sendMessageFromContent } from '../../content-services';
import { MessageToBackground } from '../../../background/types/types-background-messages';
import { isMessageMatched } from '../../../common/common-listeners';
import { MessageToContent } from '../../types/types-content-messages';
import { MessageToInline } from '../../../inline/types/types-inline-messages';
import { AddFieldToWatchPayload } from '../../../common/types/types-common-payloads';
import { microsoftDefenderInline } from '../../../manifest/public-resources';

const loggers = require('../../../common/loggers').loggers
  .addPrefix(getDebugPrefix('content'))
  .addPrefix(PlatformID.MicrosoftDefender);

export class MicrosoftDefenderPlatform implements ContentPlatform {
  static readonly id = PlatformID.MicrosoftDefender;

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
  };

  extensionDefaultPosition = MicrosoftDefenderPlatform.extensionDefaultPosition;

  getID(): PlatformID {
    return MicrosoftDefenderPlatform.id;
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
            type: MessageToInline.ISModifyQuery,
          }, false);
        }
      },
    );
  }

  private static connectMouseDown() {
    document.addEventListener('mousedown', (e) => {
      if (!e.altKey) {
        return;
      }
      const elements = getElementsUnderCursor(e, elem => {
        return elem.classList.contains('mtk20')
        || (
          elem.tagName === 'SPAN'
          && Array.from(elem.classList).join(',').indexOf('cellName') > -1
          && !!elem.closest('[role="columnheader"]')
        );
      });
      const text = elements.length > 1
        ? null
        : removeDoubleQuotesAround(elements[0]?.innerText?.trim() || '');
      if (!text) {
        return;
      }
      sendMessageFromContent<AddFieldToWatchPayload>({
        type: MessageToBackground.BGAddFieldToWatch,
        payload: {
          fieldName: text,
        },
      });
    });

    loggers.debug().log('mousedown event was set successfully');
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
    MicrosoftDefenderPlatform.connectMouseDown();
    MicrosoftDefenderPlatform.connectInlineListener();

    loggers.debug().log('connected');
  }
}