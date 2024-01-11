import { MessageToInline } from '../types/types-inline-messages';
import { ExtensionMessage } from '../../common/types/types-common';
import {
  ModifyQueryPayload,
  SetDebugModePayload,
  SetQueryPayload,
  TakeQueryPayload,
} from '../../common/types/types-common-payloads';
import { isMessageMatched } from '../../common/common-listeners';
import {
  buildNewJsonQuery,
  buildNewQuery,
  checkEditorExists,
  getEditorByIndex, getEditorIndexByFormattedUri,
} from '../helpers/monaco-editor-helpers';
import {
  MicrosoftDefenderPlatform,
} from '../../content/platforms/MicrosoftDefenderPlatform';
import { ContentPlatform } from '../../content/types/types-content-common';
import { uuid } from '../../../common/helpers';
import { MessageToContent } from '../../content/types/types-content-messages';

const platform: ContentPlatform = new MicrosoftDefenderPlatform();

const loggers = require('../../common/loggers').loggers
  .addPrefix(platform.getID());

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
  const responseEditors = Array.from(
    document.querySelectorAll('.response-editor .monaco-editor[data-uri^="inmemory:"]'),
  ).filter((e) => e.scrollWidth > 5);
  const editorHtml = Array.from(
    document.querySelectorAll('.monaco-editor[data-uri^="inmemory:"]'),
  )
    .filter((e) => e.scrollWidth > 5)
    .filter((e) => !responseEditors.includes(e))[0];
  if (!editorHtml) {
    return null;
  }
  const uri = (editorHtml as HTMLElement)
    .getAttribute('data-uri') || '#failed';

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
    if (!checkEditorExists()) {
      loggers.error().log('editor not found', monaco);
      return;
    }
    if (!setIndex(getCurrentEditorIndex())) {
      loggers.info().log('Can not determine the editor index');
      return;
    }

    const { resources, modifyType } = message.payload as ModifyQueryPayload;

    const { href } = window.location;
    const suffix = `| ${platform.buildQueryParts(modifyType, resources, true)}`;

    const editor = getEditorByIndex(editorIndex);
    const newQuery = href.indexOf('security.microsoft.com/v2/advanced-hunting') > -1
      ? buildNewQuery(editor, suffix, modifyType)
      : buildNewJsonQuery(editor, suffix, modifyType);

    editor.setValue(newQuery);
  }

  if (isMessageMatched(
    () => MessageToInline.ISSetQuery === message.type,
    message,
    event,
  )) {
    const { editor } = getEditor();
    if (editor) {
      const { value } = message.payload as SetQueryPayload;
      editor.setValue(value);
    }
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

  // TODO dry
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
