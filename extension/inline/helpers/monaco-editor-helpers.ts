export const getEditorByIndex = (index: number) => {
  return monaco.editor.getModels()[index];
};

export const checkEditorExists = (index: number): boolean => {
  return !!monaco?.editor?.getModels?.()?.[index]?.setValue;
};

export const getContentFocusedLines = (editorIndex: number): number[] => {
  const editor = getEditorByIndex(editorIndex);
  const result: number[] = [];
  for (let i = 1; i <= editor.getLineCount(); i++) {
    if (
      editor.getLineDecorations(i).some(l => l.options.className)
      && editor.getLineContent(i)?.trim() !== ''
    ) {
      result.push(i);
    }
  }
  return result;
};

export const getLastContentLine = (
  editorIndex: number,
): number => {
  const editor = getEditorByIndex(editorIndex);
  const contentLines = editor.getLinesContent();
  while (contentLines[contentLines.length - 1]?.trim() === '') {
    contentLines.splice(contentLines.length - 1);
  }
  return contentLines.length > 0 ? contentLines.length : 1;
};

export const getEditorIndexByFormattedUri = (uri: string): number | null => {
  return monaco.editor.getModels().findIndex(model => {
    return (model.uri as any)._formatted === uri;
  });
};
