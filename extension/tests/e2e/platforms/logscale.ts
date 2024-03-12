import { startTests, suiteGlobals } from '../index';
import {
  ExtensionMessage,
} from '../../../common/types/types-common';
import { TakeQueryPayload } from '../../../common/types/types-common-payloads';
import { logWarningMessage } from '../helpers/utils';
import { getQueryFromPlatform, mapListenerMessages, setQueryToPlatform } from '../helpers/scenarios';
import { MessageToApp } from '../../../app/types/types-app-messages';

suiteGlobals.messages = {
  testIncludeAction: 'TestTable | test0 = "account1"',
  testExcludeAction: 'TestTable | NOT test0 = "account1"',
  testShowAllAction: 'test0 = "account1"',
  testIncludeBulkAction: 'TestTable | in(field="test0", values=["account1",2,"test\\\\domain.com",4,"\\"process.exe\\" -a -g https://some.site/some-page"])',
  testExcludeBulkAction: 'TestTable | NOT in(field="test0", values=["account1",2,"test\\\\domain.com",4,"\\"process.exe\\" -a -g https://some.site/some-page"])',
  testShowAllBulkAction: 'in(field="test0", values=["account1",2,"test\\\\domain.com",4,"\\"process.exe\\" -a -g https://some.site/some-page"])',
  test2IncludeBulkAction: 'TestTable | in(field="test0", values=["account1",2,"test\\\\domain.com",4,"\\"process.exe\\" -a -g https://some.site/some-page"]) | in(field="test2", values=["account2",2,4])',
  test2ExcludeBulkAction: 'TestTable | NOT in(field="test0", values=["account1",2,"test\\\\domain.com",4,"\\"process.exe\\" -a -g https://some.site/some-page"]) | NOT in(field="test2", values=["account2",2,4])',
  test2ShowAllBulkAction: 'in(field="test0", values=["account1",2,"test\\\\domain.com",4,"\\"process.exe\\" -a -g https://some.site/some-page"]) | in(field="test2", values=["account2",2,4])',
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
