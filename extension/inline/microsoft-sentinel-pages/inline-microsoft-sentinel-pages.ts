import { ExtensionMessage, PlatformID } from '../../common/types/types-common';
import { isMessageMatched } from '../../common/common-listeners';
import { MessageToInline } from '../types/types-inline-messages';
import { sendQueryToApp } from '../helpers';

const loggers = require('../../common/loggers').loggers
  .addPrefix(PlatformID.MicrosoftSentinel)
  .addPrefix('pages');

window.addEventListener('message', (event) => {
  const message = event.data as ExtensionMessage;

  if (isMessageMatched(
    () => MessageToInline.ISGetQuery === message.type,
    message,
    event,
  )) {
    let query = '';

    if (!query) {
      const ruleLabelElements = Array.from(
        document.querySelectorAll('label[data-testid="DetailsPanelBodyItemTitle"]') || [],
      ).filter((el: HTMLElement) => el.innerText === 'Rule query');

      if (ruleLabelElements.length) {
        ruleLabelElements.forEach((el: HTMLElement) => {
          const preQuery = (el.nextSibling as HTMLElement).innerText?.trim?.();
          if (preQuery && preQuery.length > 0) {
            query = preQuery;
          }
        });
      }
    }

    if (!query) {
      const ruleLabelElements = Array.from(
        document.querySelectorAll('label[data-testid="DetailsPanelBodyItemTitle"]') || [],
      ).filter((el: HTMLElement) => el.innerText === 'Source Query');

      if (ruleLabelElements.length) {
        ruleLabelElements.forEach((el: HTMLElement) => {
          const preQuery = (el.nextSibling as HTMLElement).innerText?.trim?.();
          if (preQuery && preQuery.length > 0) {
            query = preQuery;
          }
        });
      }
    }

    if (!query) {
      Array.from(document
        .querySelectorAll('.react-monaco-editor-container'))
        .forEach((el: HTMLElement) => {
          const preQuery = el.innerText?.trim?.();
          if (preQuery && preQuery.length > 0) {
            query = preQuery;
          }
        });
    }

    if (query) {
      sendQueryToApp(query);
    }
  }
});

loggers.debug().log('mounted');
