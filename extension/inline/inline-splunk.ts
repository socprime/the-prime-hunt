import { ExtensionMessage } from '../common/types/types-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToInline } from './types/types-inline-messages';
import { buildNewQuery, getEditor } from './helpers/ace-editor-helpers';
import { ModifyQueryPayload } from '../common/types/types-common-payloads';
import { SplunkPlatform } from '../content/platforms/SplunkPlatform';
import { ContentPlatform } from '../content/types/types-content-common';

const platform: ContentPlatform = new SplunkPlatform();

const loggers = require('../common/loggers').loggers
  .addPrefix(platform.getID());

window.addEventListener('message', (event) => {
  const message = event.data as ExtensionMessage;

  if (isMessageMatched(
    () => MessageToInline.ISModifyQuery === message.type,
    message,
    event,
  )) {
    const element = document.querySelector('pre.ace_editor');
    const editor = getEditor(element);
    if (!editor) {
      return loggers.error().log('editor not found', ace);
    }

    const { resources, modifyType } = message.payload as ModifyQueryPayload;

    const suffix = ` | ${platform.buildQueryParts(modifyType, resources, true)}`;

    editor.setValue(
      buildNewQuery(
        editor.getValue(),
        suffix,
        modifyType,
      ));
  }
});

loggers.debug().log('mounted');