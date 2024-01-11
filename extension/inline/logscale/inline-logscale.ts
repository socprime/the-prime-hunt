import { MessageToInline } from '../types/types-inline-messages';
import { ExtensionMessage } from '../../common/types/types-common';
import { isMessageMatched } from '../../common/common-listeners';
import {
  ModifyQueryPayload,
  SetDebugModePayload,
  SetQueryPayload,
  TakeQueryPayload,
} from '../../common/types/types-common-payloads';
import {
  buildNewQuery,
} from '../helpers/monaco-editor-helpers';
import { LogScalePlatform } from '../../content/platforms/LogScalePlatform';
import { ContentPlatform } from '../../content/types/types-content-common';
import { MessageToContent } from '../../content/types/types-content-messages';
import { uuid } from '../../../common/helpers';

const platform: ContentPlatform = new LogScalePlatform();

const loggers = require('../../common/loggers').loggers
  .addPrefix(platform.getID());

const getEditor = () => {
  const editor = (document.querySelector('#query-input') as any)?.editor?.model;
  if (!editor) {
    loggers.error().log('editor not found');
    return {};
  }
  return { editor };
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

    let suffix = platform.buildQueryParts(modifyType, resources, true);
    if (modifyType !== 'show all') {
      suffix = `| ${suffix}`;
    }

    editor.setValue(buildNewQuery(editor, suffix, modifyType, false));
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
