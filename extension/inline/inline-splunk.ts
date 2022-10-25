import { ExtensionMessage, PlatformID } from '../common/types/types-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToInline } from './types/types-inline-messages';
import { buildNewQuery, getEditor } from './helpers/ace-editor-helpers';
import { getDebugPrefix } from '../common/loggers/loggers-debug';
import { ModifyQueryPayload } from '../common/types/types-common-payloads';
import { buildSplunkQueryParts } from '../content/platforms/splunk/splunk-helpers';

const loggers = require('../common/loggers').loggers
  .addPrefix(getDebugPrefix('inline'))
  .addPrefix(PlatformID.Splunk);

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

    const suffix = ` | where ${buildSplunkQueryParts(modifyType, resources)}`;

    editor.setValue(
      buildNewQuery(
        editor.getValue(),
        suffix,
        modifyType,
      ));
  }
});

loggers.debug().log('mounted');