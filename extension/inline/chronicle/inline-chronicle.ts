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
import { ChroniclePlatform } from '../../content/platforms/ChroniclePlatform';
import { ContentPlatform } from '../../content/types/types-content-common';
import { MessageToContent } from '../../content/types/types-content-messages';
import { clearExtraSpaces, uuid } from '../../../common/helpers';

const platform: ContentPlatform = new ChroniclePlatform();

const loggers = require('../../common/loggers').loggers
  .addPrefix(platform.getID());

const getEditor = () => {
  if (typeof monaco?.editor?.getModels === 'undefined') {
    loggers.error().log('monaco not found', monaco);
    return {};
  }
  return { editor: monaco.editor.getModels()[0] };
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

    const suffix = platform.buildQueryParts(modifyType, resources, true);
    const newValue = buildNewQuery(editor, suffix, modifyType)
      .replace('<unknown> AND ', '');

    if (modifyType !== 'show all') {
      const prefix = newValue.split(suffix)[0];
      let newPrefix = prefix.trim();
      if (newPrefix[0] !== '(') {
        newPrefix = `( ${newPrefix} )`;
      }
      editor.setValue(clearExtraSpaces(newValue.replace(prefix, `${newPrefix} `)));
      return;
    }

    editor.setValue(clearExtraSpaces(`( ${suffix}`));
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
