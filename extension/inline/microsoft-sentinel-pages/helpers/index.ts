export const getQueryNextByLabelText = (labelText: string): string => {
  let query = '';

  const ruleLabelElements = Array.from(
    document.querySelectorAll('label[data-testid="DetailsPanelBodyItemTitle"]') || [],
  ).filter((el: HTMLElement) => el.innerText === labelText);

  if (ruleLabelElements.length < 1) {
    return '';
  }

  ruleLabelElements.forEach((el: HTMLElement) => {
    const preQuery = (el.nextSibling as HTMLElement).innerText?.trim?.();
    if (preQuery && preQuery.length > 0) {
      query = preQuery;
    }
  });

  return query;
};

export const getQueryByMonacoContainerInnerText = (): string => {
  let query = '';

  Array.from(document
    .querySelectorAll('.react-monaco-editor-container'))
    .forEach((el: HTMLElement) => {
      const preQuery = el.innerText?.trim?.();
      if (preQuery && preQuery.length > 0) {
        query = preQuery;
      }
    });

  return query;
};
