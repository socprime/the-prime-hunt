import { ExtensionMessage } from '../../common/types/types-common';
import { isMessageMatched } from '../../common/common-listeners';
import { MessageToInline } from '../types/types-inline-messages';
import { OpenSearchPlatform } from '../../content/platforms/OpenSearchPlatform';
import { ModifyQueryPayload, SetDebugModePayload } from '../../common/types/types-common-payloads';
import { sendQueryToApp } from '../helpers';

const platform = new OpenSearchPlatform();

const loggers = require('../../common/loggers').loggers
  .addPrefix(platform.getID());

const getInput = (): HTMLTextAreaElement | null => {
  return document.querySelector('.euiTextArea[data-test-subj="queryInput"]');
};

window.addEventListener('message', (event) => {
  const message = event.data as ExtensionMessage;
  if (isMessageMatched(
    () => MessageToInline.ISModifyQuery === message.type,
    message,
    event,
  )) {
    const input = getInput();
    if (!input) {
      loggers.warn().log('query input not found');
      return;
    }
    const currentValue = input.value;
    const { resources, modifyType } = message.payload as ModifyQueryPayload;

    if (modifyType === 'show all') {
      input.value = platform.buildQueryParts(modifyType, resources);
      input.click();
      return;
    }

    const suffix = platform.buildQueryParts(modifyType, resources, true);

    input.value = `${currentValue} ${suffix}`;
    input.click();
  }

  if (isMessageMatched(
    () => MessageToInline.ISGetQuery === message.type,
    message,
    event,
  )) {
    const input = getInput();
    if (!input) {
      loggers.warn().log('query input not found');
      return;
    }
    sendQueryToApp(input.value);
  }

  if (isMessageMatched(
    () => MessageToInline.ISSetDebugMode === message.type,
    message,
    event,
  )) {
    const { debugMode } = message.payload as SetDebugModePayload;
    require('../../common/loggers').setDebugMode(debugMode);
  }
});

loggers.debug().log('mounted');
