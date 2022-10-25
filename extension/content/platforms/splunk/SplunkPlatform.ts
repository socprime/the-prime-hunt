import { ContentPlatform, ListenerType, MessageListener } from '../../types/types-content-common';
import { PlatformID } from '../../../common/types/types-common';
import { addListener } from '../../services/content-services-listeners';
import { isMessageMatched } from '../../../common/common-listeners';
import { MessageToContent } from '../../types/types-content-messages';
import { sendMessageFromContent } from '../../services/content-services';
import { MessageToInline } from '../../../inline/types/types-inline-messages';
import { getDebugPrefix } from '../../../common/loggers/loggers-debug';
import {
  getElementsUnderCursor,
  getWebAccessibleUrl,
  mountHTMLElement,
  removeDoubleQuotesAround,
} from '../../../common/common-helpers';
import { splunkInline } from '../../../manifest/public-resources';
import { AddFieldToWatchPayload } from '../../../common/types/types-common-payloads';
import { MessageToBackground } from '../../../background/types/types-background-messages';
import { uuid } from '../../../../common/helpers';

const loggers = require('../../../common/loggers').loggers
  .addPrefix(getDebugPrefix('content'))
  .addPrefix(PlatformID.Splunk);

export class SplunkPlatform implements ContentPlatform {
  static id = PlatformID.Splunk;

  static readonly extensionDefaultPosition = {
    top: 0,
    left: 0,
    width: 480,
    height: 480,
  };

  extensionDefaultPosition = SplunkPlatform.extensionDefaultPosition;

  private static normalizeValue(value: unknown): string {
    if (typeof value !== 'string') {
      return '';
    }
    return removeDoubleQuotesAround(
      value
        .replace('=', '')
        .trim(),
    );
  }

  getID(): PlatformID {
    return SplunkPlatform.id;
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
  }

  private static connectMouseDown() {
    document.addEventListener('mousedown', (e) => {
      if (!e.altKey) {
        return;
      }
      const elements = getElementsUnderCursor(e, elem => {
        return (
          elem.tagName === 'SPAN'
            && elem.classList.contains('t')
            && elem.classList.contains('h')
            && !!elem.closest('.event')
        ) || (
          elem.tagName === 'SPAN'
            && elem.classList.contains('field')
            && !!elem.closest('.event')
        ) || (
          Array.from(elem.attributes)
            .map(el => el.name)
            .includes('data-sort-key')
        );
      });
      const text = elements.length > 1
        ? null
        : SplunkPlatform.normalizeValue(
          elements[0]?.innerText || elements[0]?.getAttribute('data-sort-key'),
        );
      if (!text) {
        return;
      }
      sendMessageFromContent<AddFieldToWatchPayload>({
        id: `content-add-field--${uuid()}`,
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
        src: getWebAccessibleUrl(splunkInline),
        type: 'text/javascript',
        'data-type': 'inline-listener',
      },
    });
  }

  connect(): void {
    SplunkPlatform.setListeners();
    SplunkPlatform.connectMouseDown();
    SplunkPlatform.connectInlineListener();
    loggers.debug().log('connected');
  }
}
