import { ContentPlatform } from '../../content/types/types-content-common';
import { ExtensionMessage } from '../../common/types/types-common';
import { isMessageMatched } from '../../common/common-listeners';
import { MessageToInline } from '../types/types-inline-messages';
import { getEditor as getAceEditor } from '../helpers/ace-editor-helpers';
import {
  DirectMessagePayload,
  ModifyQueryPayload,
  SetDebugModePayload,
  SetQueryPayload,
  ShowRemoveHashMessagePayload,
  TakeQueryPayload,
} from '../../common/types/types-common-payloads';
import { addWhere, buildNewQuery, parseQueryString } from '../helpers/aql-builder';
import { uuid } from '../../../common/helpers';
import { MessageToContent } from '../../content/types/types-content-messages';
import { AmazonAthenaPlatform } from '../../content/platforms/AmazonAthenaPlatform';
import { waitHTMLElement } from '../../common/common-helpers';
import { MessageToApp } from '../../app/types/types-app-messages';

const platform: ContentPlatform = new AmazonAthenaPlatform();

const loggers = require('../../common/loggers').loggers
  .addPrefix(platform.getID());

const getEditor = () => {
  return getAceEditor(
    document.querySelector('.ace_editor'),
  );
};

const regExp = /((\s?)+,?to_hex(\s?)+\((\s?)+)?SHA256(\s?)+\((\s?)+CAST(\s?)+\((.*)AS\s+VARBINARY(\s?)+\)(\s?)+\)(\s?)+\)\s+(AS\s+(.*)\s+)?FROM/gi;

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

    let parsedQuery = parseQueryString(editor.getValue());

    if (modifyType === 'show all') {
      parsedQuery = {
        select: parsedQuery.select,
        from: parsedQuery.from,
      };
    }

    parsedQuery.where = addWhere(
      parsedQuery.where || '',
      platform.buildQueryParts(modifyType, resources),
      'AND',
    );

    editor.setValue(
      buildNewQuery(parsedQuery),
    );
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

  if (isMessageMatched(
    () => MessageToInline.ISRemoveHash === message.type,
    message,
    event,
  )) {
    const editor = getEditor();
    if (!editor) {
      return;
    }

    const matchedValues = Array.from(editor
      .getValue()
      .matchAll(regExp) || []);

    if (!matchedValues[0] || !matchedValues[0]?.[8]) {
      return;
    }

    const name = matchedValues[0][8].trim();
    const expression = matchedValues[0][0] || '';
    const alias = matchedValues[0][13] || '';

    let value = editor.getValue();
    value = value.split(expression).join(` ${name} FROM `);

    if (alias.trim()) {
      value = value.split(alias.trim()).join(` ${name} `);
    }

    editor.setValue(value);
  }
});

const observer = new MutationObserver(() => {
  const editor = getEditor();
  if (!editor) {
    return;
  }
  const matchedValues = Array.from(editor
    .getValue()
    .matchAll(regExp) || []);

  const isShow = !!matchedValues?.[0]?.[8]?.trim();

  window.postMessage({
    id: uuid(),
    type: MessageToContent.CSDirectMessageToApp,
    payload: {
      type: MessageToApp.AppQueryHasHash,
      payload: {
        show: isShow,
      } as ShowRemoveHashMessagePayload,
    } as DirectMessagePayload,
  } as ExtensionMessage);
});
const aceContent = document.querySelector('.ace_content');

const observe = (element: HTMLElement | Element) => {
  observer.observe(element, { childList: true, subtree: true });
};

if (aceContent) {
  observe(aceContent);
} else {
  waitHTMLElement('.ace_content', document.querySelector('body')!)
    .then(element => observe(element));
}

loggers.debug().log('mounted');