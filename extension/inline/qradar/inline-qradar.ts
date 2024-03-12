import { ContentPlatform } from '../../content/types/types-content-common';
import { QRadarPlatform } from '../../content/platforms/QRadarPlatform';
import { ExtensionMessage } from '../../common/types/types-common';
import { isMessageMatched } from '../../common/common-listeners';
import { MessageToInline } from '../types/types-inline-messages';
import { getEditor as getAceEditor } from '../helpers/ace-editor-helpers';
import {
  ModifyQueryPayload,
  SetDebugModePayload,
  SetQueryPayload,
} from '../../common/types/types-common-payloads';
import { addWhere, parseQueryString, buildNewQuery } from '../helpers/aql-builder';
import { sendQueryToApp } from '../helpers';

const platform: ContentPlatform = new QRadarPlatform();

const loggers = require('../../common/loggers').loggers
  .addPrefix(platform.getID());

const getEditor = () => {
  return getAceEditor(
    document.querySelector('#aceEditor'),
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
      loggers.error().log('editor not found', ace);
      return;
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

    sendQueryToApp(editor.getValue());
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
