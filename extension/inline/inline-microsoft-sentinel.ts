import { MessageToInline } from './types/types-inline-messages';
import { getDebugPrefix } from '../common/loggers/loggers-debug';
import { ExtensionMessage, PlatformID } from '../common/types/types-common';
import { isMessageMatched } from '../common/common-listeners';
import { ModifyQueryPayload } from '../common/types/types-common-payloads';
import { buildMicrosoftSentinelQueryParts } from '../content/platforms/microsoft-sentinel/microsoft-sentinel-helpers';
import { clearExtraSpaces } from '../../common/helpers';
import {
  checkEditorExists,
  getContentFocusedLines,
  getEditorByIndex, getEditorIndexByFormattedUri,
  getLastContentLine,
} from './helpers/monaco-editor-helpers';

const loggers = require('../common/loggers').loggers
  .addPrefix(getDebugPrefix('inline'))
  .addPrefix(PlatformID.microsoftSentinel);

let editorIndex = 0;

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
    if (!checkEditorExists(editorIndex)) {
      return loggers.error().log('editor not found', monaco);
    }
    setIndex(getCurrentEditorIndex());
    const editor = getEditorByIndex(editorIndex);
    const editorLines: string[] = editor.getLinesContent();
    
    const { resources, modifyType } = message.payload as ModifyQueryPayload;

    let newQuery = '';

    const suffix = `| where ${buildMicrosoftSentinelQueryParts(modifyType, resources)}`;
    const focusedLines = getContentFocusedLines(editorIndex);

    if (modifyType === 'show all' && focusedLines.length < 1) {
      const tableName = editorLines
        .map((l: string) => l.split('|').shift())
        .filter(Boolean).pop()
        || '<unknown>';
      newQuery = `${tableName} ${suffix}`;
    }

    if (modifyType === 'show all' && focusedLines.length >= 1) {
      const tableName = editorLines[focusedLines[0] - 1].split('|').shift();
      editorLines.splice(
        focusedLines[0] - 1,
        focusedLines.length,
        `${tableName} ${suffix}`,
      );
      newQuery = editorLines.join('\n');
    }

    if (modifyType !== 'show all') {
      const lastEditorLineIndex = focusedLines.length > 0
        ? focusedLines[focusedLines.length - 1]
        : getLastContentLine(editorIndex);
      const lastEditorLine: string = editor.getLineContent(lastEditorLineIndex) || '<unknown>';
      editorLines[lastEditorLineIndex - 1] = `${lastEditorLine} ${suffix}`;
      newQuery = editorLines.join('\n');
    }
    
    editor.setValue(clearExtraSpaces(newQuery));
  }
});

loggers.debug().log('mounted');