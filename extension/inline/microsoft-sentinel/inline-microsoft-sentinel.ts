import { MessageToInline } from '../types/types-inline-messages';
import { ExtensionMessage } from '../../common/types/types-common';
import { isMessageMatched } from '../../common/common-listeners';
import {
  ModifyQueryPayload, SetDebugModePayload,
  SetQueryPayload,
  TakeQueryPayload,
} from '../../common/types/types-common-payloads';
import {
  buildNewQuery,
  getEditorByIndex,
  getEditorIndexByFormattedUri,
} from '../helpers/monaco-editor-helpers';
import { MicrosoftSentinelPlatform } from '../../content/platforms/MicrosoftSentinelPlatform';
import { ContentPlatform } from '../../content/types/types-content-common';
import { MessageToContent } from '../../content/types/types-content-messages';
import { uuid } from '../../../common/helpers';

const platform: ContentPlatform = new MicrosoftSentinelPlatform();

const loggers = require('../../common/loggers').loggers
  .addPrefix(platform.getID());

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

const getEditor = () => {
  const index = getCurrentEditorIndex();
  if (typeof index !== 'number' || index < 0) {
    loggers.info().log('Can not determine the editor index');
    return {};
  }
  const editor = getEditorByIndex(index);
  if (!editor) {
    loggers.error().log('editor not found by index', index, monaco);
    return {};
  }
  return { editor, index };
};

window.addEventListener('message', (event) => {
  const message = event.data as ExtensionMessage;

  if (isMessageMatched(
    () => MessageToInline.ISModifyQuery === message.type,
    message,
    event,
  )) {
    const { editor } = getEditor();
    if (!editor) {
      return;
    }

    const { resources, modifyType } = message.payload as ModifyQueryPayload;

    const suffix = `| ${platform.buildQueryParts(modifyType, resources, true)}`;
    editor.setValue(buildNewQuery(editor, suffix, modifyType));
  }

  if (isMessageMatched(
    () => MessageToInline.ISSetQuery === message.type,
    message,
    event,
  )) {
    const { editor } = getEditor();
    if (!editor) {
      return;
    }
    const { value } = message.payload as SetQueryPayload;
    editor.setValue(value);
  }

  if (isMessageMatched(
    () => MessageToInline.ISGetQuery === message.type,
    message,
    event,
  )) {
    const { editor } = getEditor();
    if (!editor) {
      return;
    }
    window.postMessage({
      id: uuid(),
      type: MessageToContent.CSSendMessageOutside,
      payload: { queryValue: editor.getValue() } as TakeQueryPayload,
    } as ExtensionMessage);
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
