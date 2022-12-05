import { ContentPlatform } from '../content/types/types-content-common';
import { QRadarPlatform } from '../content/platforms/QRadarPlatform';
import { ExtensionMessage } from '../common/types/types-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToInline } from './types/types-inline-messages';
import { getEditor } from './helpers/ace-editor-helpers';
import { ModifyQueryPayload } from '../common/types/types-common-payloads';
import { addWhere, parseQueryString, buildNewQuery } from './helpers/aql-builder';

const platform: ContentPlatform = new QRadarPlatform();

const loggers = require('../common/loggers').loggers
  .addPrefix(platform.getID());

window.addEventListener('message', (event) => {
  const message = event.data as ExtensionMessage;

  if (isMessageMatched(
    () => MessageToInline.ISModifyQuery === message.type,
    message,
    event,
  )) {
    const element = document.querySelector('#aceEditor');
    const editor = getEditor(element);
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
});

loggers.debug().log('mounted');