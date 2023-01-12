import { ExtensionMessage } from '../common/types/types-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToInline } from './types/types-inline-messages';
import { ArcSightPlatform } from '../content/platforms/ArcSightPlatform';
import { ModifyQueryPayload } from '../common/types/types-common-payloads';

const platform = new ArcSightPlatform();

const loggers = require('../common/loggers').loggers
  .addPrefix(platform.getID());

const getInput = (): HTMLTextAreaElement | null => {
  return document.querySelector('#queryInput');
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
      return loggers.warn().log('query input not found');
    }
    const currentValue = input.value;
    const { resources, modifyType } = message.payload as ModifyQueryPayload;

    if (modifyType === 'show all') {
      input.value = platform.buildQueryParts(modifyType, resources);
      return;
    }
    const suffix = platform.buildQueryParts(modifyType, resources, true);

    input.value = `${currentValue} ${suffix}`;
  }
});

loggers.debug().log('mounted');