import { MessageToInline } from './types/types-inline-messages';
import { getDebugPrefix } from '../common/loggers/loggers-debug';
import { ExtensionMessage, PlatformID } from '../common/types/types-common';
import { ModifyQueryPayload } from '../common/types/types-common-payloads';
import { isMessageMatched } from '../common/common-listeners';
import { parseJSONSafe } from '../../common/helpers';
import { buildMicrosoftDefenderForEndpointQueryParts } from '../content/platforms/microsoft-defender-for-endpoint/microsoft-defender-for-endpoint-helpers';
import {
  checkEditorExists,
  getEditorByIndex, getEditorIndexByFormattedUri,
} from './helpers/monaco-editor-helpers';

const loggers = require('../common/loggers').loggers
  .addPrefix(getDebugPrefix('inline'))
  .addPrefix(PlatformID.microsoftDefenderForEndpoint);

let editorIndex = 2;

const setIndex = (index: number | null) => {
  if (index === null) {
    return loggers.warn().log('Can not determine the editor index', index);
  }
  if (editorIndex !== index) {
    editorIndex = index;
    loggers.debug().log('The editor index is set to', index);
  }
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
    if (!checkEditorExists(editorIndex)) {
      return loggers.error().log('editor not found', monaco);
    }
    setIndex(getCurrentEditorIndex());
    const editor = getEditorByIndex(editorIndex);

    const currentEditorValue = parseJSONSafe(
      editor.getValue(),
      null,
    ) as {
      Query: string;
    } | null;

    const currentQuery = (!currentEditorValue || !currentEditorValue.Query)
      ? ''
      : currentEditorValue.Query;

    const { resources, modifyType } = message.payload as ModifyQueryPayload;

    const newQuery = `${
      modifyType === 'show all'
        ? currentQuery.split('|').shift()?.trim()
          || '<unknown>'
        : currentQuery
    } | where ${buildMicrosoftDefenderForEndpointQueryParts(modifyType, resources)}`;

    editor.setValue(JSON.stringify({
      Query: newQuery,
    }, null, 3));
  }
});

loggers.debug().log('mounted');
