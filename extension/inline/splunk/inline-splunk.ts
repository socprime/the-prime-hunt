import { ExtensionMessage } from '../../common/types/types-common';
import { isMessageMatched } from '../../common/common-listeners';
import { MessageToInline } from '../types/types-inline-messages';
import { buildNewQuery, getEditor as getAceEditor } from '../helpers/ace-editor-helpers';
import {
  ModifyQueryPayload,
  SetDebugModePayload,
  SetQueryPayload,
  TakeQueryPayload,
} from '../../common/types/types-common-payloads';
import { SplunkPlatform } from '../../content/platforms/SplunkPlatform';
import { ContentPlatform } from '../../content/types/types-content-common';
import { uuid } from '../../../common/helpers';
import { MessageToContent } from '../../content/types/types-content-messages';

const platform: ContentPlatform = new SplunkPlatform();

const loggers = require('../../common/loggers').loggers
  .addPrefix(platform.getID());

const getEditor = () => {
  return getAceEditor(
    document.querySelector('pre.ace_editor'),
  );
};

window.addEventListener('message', (event) => {
  const message = event.data as ExtensionMessage;

  if (isMessageMatched(
    () => MessageToInline.ISModifyQuery === message.type,
    message,
    event,
  )) {
    const editor = getEditor();
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

  if (isMessageMatched(
    () => MessageToInline.ISSetQuery === message.type,
    message,
    event,
  )) {
    const editor = getEditor();
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
    const editor = getEditor();
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