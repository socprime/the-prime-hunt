import { MessageToInline } from './types/types-inline-messages';
import { getDebugPrefix } from '../common/loggers/loggers-debug';
import { ExtensionMessage, PlatformID } from '../common/types/types-common';
import { ModifyQueryPayload } from '../common/types/types-common-payloads';
import { isMessageMatched } from '../common/common-listeners';
import { buildMicrosoftDefenderQueryParts } from '../content/platforms/microsoft-defender-for-endpoint/microsoft-defender-helpers';
import {
  buildNewJsonQuery,
  buildNewQuery,
  checkEditorExists,
  getEditorByIndex, getEditorIndexByFormattedUri,
} from './helpers/monaco-editor-helpers';

const loggers = require('../common/loggers').loggers
  .addPrefix(getDebugPrefix('inline'))
  .addPrefix(PlatformID.MicrosoftDefender);

let editorIndex = 2;

const setIndex = (index: number | null): boolean => {
  if (index === null) {
    return false;
  }
  if (editorIndex !== index) {
    editorIndex = index;
    loggers.debug().log('The editor index is set to', index);
  }
  return true;
};

const getCurrentEditorIndex = (): number | null => {
  let responseEditors = Array.from(
    document.querySelectorAll('.response-editor .monaco-editor[data-uri^="inmemory:"]'),
  ).filter(e => e.scrollWidth > 5);
  const editorHtml = Array.from(
    document.querySelectorAll('.monaco-editor[data-uri^="inmemory:"]'),
  )
    .filter(e => e.scrollWidth > 5)
    .filter(e => !responseEditors.includes(e))[0];
  if (!editorHtml) {
    return null;
  }
  const uri = (editorHtml as HTMLElement)
    .getAttribute('data-uri') || '#failed';

  const index = getEditorIndexByFormattedUri(uri);
  return typeof index === 'number' && index > -1 ? index : null;
};

window.addEventListener('message', (event) => {
  const message = event.data as ExtensionMessage;
  if (isMessageMatched(
    () => MessageToInline.ISModifyQuery === message.type,
    message,
    event,
  )) {
    if (!checkEditorExists()) {
      return loggers.error().log('editor not found', monaco);
    }
    if (!setIndex(getCurrentEditorIndex())) {
      return loggers.info().log('Can not determine the editor index');
    }

    const { resources, modifyType } = message.payload as ModifyQueryPayload;

    const { href } = document.location;
    const suffix = ` | where ${buildMicrosoftDefenderQueryParts(modifyType, resources)}`;

    const editor = getEditorByIndex(editorIndex);
    const newQuery = href.indexOf('security.microsoft.com/v2/advanced-hunting') > -1
      ? buildNewQuery(editorIndex, suffix, modifyType)
      : buildNewJsonQuery(editorIndex, suffix, modifyType);

    editor.setValue(newQuery);
  }
});

loggers.debug().log('mounted');
