export const getInput = (): HTMLTextAreaElement | null => {
  return document.querySelector('.euiTextArea[data-test-subj="queryInput"]');
};
