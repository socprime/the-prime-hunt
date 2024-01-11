import { ModifyQueryType } from '../../common/types/types-common';
import { clearExtraSpaces, parseJSONSafe } from '../../../common/helpers';

export const getEditorByIndex = (index: number) => {
  return monaco.editor.getModels()[index];
};

export const checkEditorExists = (): boolean => {
  return !!monaco?.editor?.getModels?.();
};

export const getContentFocusedLines = (
  editor: monaco.editor.ITextModel,
): number[] => {
  const result: number[] = [];
  for (let i = 1; i <= editor.getLineCount(); i++) {
    if (
      editor.getLineDecorations(i).some((l) => l.options.className)
      && editor.getLineContent(i)?.trim() !== ''
    ) {
      result.push(i);
    }
  }
  return result;
};

export const getLastContentLine = (
  editor: monaco.editor.ITextModel,
): number => {
  const contentLines = editor.getLinesContent();
  while (contentLines[contentLines.length - 1]?.trim() === '') {
    contentLines.splice(contentLines.length - 1);
  }
  return contentLines.length > 0 ? contentLines.length : 1;
};

export const getEditorIndexByFormattedUri = (uri: string): number | null => {
  return monaco.editor.getModels().findIndex((model) => {
    // eslint-disable-next-line no-underscore-dangle
    return (model.uri as any)._formatted === uri;
  });
};

export const buildNewJsonQuery = (
  editor: monaco.editor.ITextModel,
  suffix: string,
  modifyType: ModifyQueryType,
): string => {
  const currentEditorValue = parseJSONSafe(
    editor.getValue(),
    null,
  ) as {
    Query: string;
  } | null;
  const currentQuery = (!currentEditorValue || !currentEditorValue.Query)
    ? ''
    : currentEditorValue.Query;

  const newQuery = `${
    modifyType === 'show all'
      ? currentQuery.split('|').shift()?.trim()
      || '<unknown>'
      : currentQuery
  } ${suffix}`;

  return JSON.stringify({
    Query: newQuery,
  }, null, 3);
};

export const buildNewQuery = (
  editor: monaco.editor.ITextModel,
  suffix: string,
  modifyType: ModifyQueryType,
  withPrefix = true,
): string => {
  let newQuery = '';
  const editorLines: string[] = editor.getLinesContent();
  const focusedLines = getContentFocusedLines(editor);

  if (modifyType === 'show all' && focusedLines.length < 1) {
    const prefix = editorLines
      .map((l: string) => l.split('|').shift())
      .filter(Boolean).pop()
      || '<unknown>';
    newQuery = `${withPrefix ? `${prefix} ` : ''}${suffix}`;
  }

  if (modifyType === 'show all' && focusedLines.length >= 1) {
    const prefix = editorLines[focusedLines[0] - 1].split('|').shift();
    editorLines.splice(
      focusedLines[0] - 1,
      focusedLines.length,
      `${withPrefix ? `${prefix} ` : ''}${suffix}`,
    );
    newQuery = editorLines.join('\n');
  }

  if (modifyType !== 'show all') {
    const lastEditorLineIndex = focusedLines.length > 0
      ? focusedLines[focusedLines.length - 1]
      : getLastContentLine(editor);
    const lastEditorLine: string = editor.getLineContent(lastEditorLineIndex) || '<unknown>';
    editorLines[lastEditorLineIndex - 1] = `${lastEditorLine} ${suffix}`;
    newQuery = editorLines.join('\n');
  }

  return clearExtraSpaces(newQuery);
};
