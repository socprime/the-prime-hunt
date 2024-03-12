import { suiteGlobals, startTests } from '../index';
import { logWarningMessage, testCase } from '../helpers/utils';

suiteGlobals.messages = {
  testIncludeAction: 'AND test0:"account1"',
  testExcludeAction: 'AND NOT test0:"account1"',
  testShowAllAction: 'test0:"account1"',
  testIncludeBulkAction: 'AND test0:("account1" OR 2 OR "test\\domain.com" OR 4 OR "\\"process.exe\\" -a -g https://some.site/some-page")',
  test2IncludeBulkAction: 'AND test0:("account1" OR 2 OR "test\\domain.com" OR 4 OR "\\"process.exe\\" -a -g https://some.site/some-page") AND test2:("account2" OR 2 OR 4)',
  testExcludeBulkAction: 'AND NOT test0:("account1" OR 2 OR "test\\domain.com" OR 4 OR "\\"process.exe\\" -a -g https://some.site/some-page")',
  test2ExcludeBulkAction: 'AND NOT test0:("account1" OR 2 OR "test\\domain.com" OR 4 OR "\\"process.exe\\" -a -g https://some.site/some-page") AND NOT test2:("account2" OR 2 OR 4)',
  testShowAllBulkAction: 'test0:("account1" OR 2 OR "test\\domain.com" OR 4 OR "\\"process.exe\\" -a -g https://some.site/some-page")',
  test2ShowAllBulkAction: 'test0:("account1" OR 2 OR "test\\domain.com" OR 4 OR "\\"process.exe\\" -a -g https://some.site/some-page") AND test2:("account2" OR 2 OR 4)',
};

const textarea = document.querySelector(
  '.euiTextArea[data-test-subj="queryInput"]',
) as HTMLTextAreaElement;

testCase('textarea should be in document', false)
  .expect(!!textarea)
  .toEqual(true);

suiteGlobals.clearValue = async () => {
  textarea.value = '';
  return Promise.resolve();
};

suiteGlobals.getValue = async () => Promise.resolve(textarea.value);

(async () => {
  await startTests();

  logWarningMessage('ALL TESTS PASSED!');
})();
