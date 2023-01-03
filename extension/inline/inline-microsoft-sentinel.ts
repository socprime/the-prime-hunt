import { MessageToInline } from './types/types-inline-messages';
import { ExtensionMessage } from '../common/types/types-common';
import { isMessageMatched } from '../common/common-listeners';
import { ModifyQueryPayload } from '../common/types/types-common-payloads';
import {
  buildNewQuery,
  checkEditorExists,
  getEditorByIndex,
  getEditorIndexByFormattedUri,
} from './helpers/monaco-editor-helpers';
import { MicrosoftSentinelPlatform } from '../content/platforms/MicrosoftSentinelPlatform';
import { ContentPlatform } from '../content/types/types-content-common';

const platform: ContentPlatform = new MicrosoftSentinelPlatform();

const loggers = require('../common/loggers').loggers
  .addPrefix(platform.getID());

let editorIndex = 0;

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
  const editorHtml = document
    .querySelector('.monaco-editor[data-uri^="inmemory:"]') as HTMLElement;
  if (!editorHtml) {
    return null;
  }
  const uri = editorHtml.getAttribute('data-uri') || '#failed';
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
    const editor = getEditorByIndex(editorIndex);

    const { resources, modifyType } = message.payload as ModifyQueryPayload;

    const suffix = `| ${platform.buildQueryParts(modifyType, resources, true)}`;
    editor.setValue(buildNewQuery(editorIndex, suffix, modifyType));
  }
});

loggers.debug().log('mounted');