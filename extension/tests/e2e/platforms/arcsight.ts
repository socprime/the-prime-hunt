import { startTests, suiteGlobals } from '../index';
import { logWarningMessage } from '../helpers/utils';
import {
  TakeQueryPayload,
} from '../../../common/types/types-common-payloads';
import { ExtensionMessage } from '../../../common/types/types-common';
import { getQueryFromPlatform, mapListenerMessages, setQueryToPlatform } from '../helpers/scenarios';
import { MessageToApp } from '../../../app/types/types-app-messages';

suiteGlobals.messages = {
  testIncludeAction: 'TestTable AND test0 = "account1"',
  testExcludeAction: 'TestTable AND test0 != "account1"',
  testShowAllAction: 'test0 = "account1"',
  testIncludeBulkAction: 'TestTable AND (test0 = "account1" OR test0 = 2 OR test0 = "test\\domain.com" OR test0 = 4 OR test0 = "\\"process.exe\\" -a -g https://some.site/some-page")',
  test2IncludeBulkAction: 'TestTable AND (test0 = "account1" OR test0 = 2 OR test0 = "test\\domain.com" OR test0 = 4 OR test0 = "\\"process.exe\\" -a -g https://some.site/some-page" OR test2 = "account2" OR test2 = 2 OR test2 = 4)',
  testExcludeBulkAction: 'TestTable AND test0 != "account1" AND test0 != 2 AND test0 != "test\\domain.com" AND test0 != 4 AND test0 != "\\"process.exe\\" -a -g https://some.site/some-page"',
  test2ExcludeBulkAction: 'TestTable AND test0 != "account1" AND test0 != 2 AND test0 != "test\\domain.com" AND test0 != 4 AND test0 != "\\"process.exe\\" -a -g https://some.site/some-page" AND test2 != "account2" AND test2 != 2 AND test2 != 4',
  testShowAllBulkAction: 'test0 = "account1" OR test0 = 2 OR test0 = "test\\domain.com" OR test0 = 4 OR test0 = "\\"process.exe\\" -a -g https://some.site/some-page"',
  test2ShowAllBulkAction: 'test0 = "account1" OR test0 = 2 OR test0 = "test\\domain.com" OR test0 = 4 OR test0 = "\\"process.exe\\" -a -g https://some.site/some-page" OR test2 = "account2" OR test2 = 2 OR test2 = 4',
};

suiteGlobals.clearValue = async () => {
  await setQueryToPlatform('TestTable');
};

let messagesStack: ExtensionMessage[] = [];

suiteGlobals.getValue = async () => {
  await getQueryFromPlatform();
  const message = messagesStack.pop() as ExtensionMessage;
  if (!message) {
    return '';
  }
  const { queryValue } = message.payload as TakeQueryPayload;
  return queryValue;
};

mapListenerMessages(
  (message) => message.type === MessageToApp.AppTakeQuery,
  () => messagesStack,
);

(async () => {
  messagesStack = [];
  await startTests();

  logWarningMessage('ALL TESTS PASSED!');
})();
