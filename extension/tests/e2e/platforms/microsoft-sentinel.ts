import { startTests, suiteGlobals } from '../index';
import { MessageToApp } from '../../../app/types/types-app-messages';
import { debugID } from '../../../common/loggers/loggers-helpers';
import { ExtensionMessage, ExtensionMessageType } from '../../../common/types/types-common';
import { SendToBackgroundPayload, SetQueryPayload, TakeQueryPayload } from '../../../common/types/types-common-payloads';
import { MessageToBackground } from '../../../background/types/types-background-messages';
import { sleep } from '../../../../common/helpers';
import { logSuccessMessage } from '../helpers/utils';

suiteGlobals.messages = {
  testIncludeAction: 'TestTable | where test0 == "account1"',
  testExcludeAction: 'TestTable | where test0 != "account1"',
  testShowAllAction: 'TestTable | where test0 == "account1"',
  testIncludeBulkAction: 'TestTable | where test0 == "account1" or test0 == 2 or test0 == "test\\\\domain.com" or test0 == 4 or test0 == "\\"process.exe\\" -a -g https://some.site/some-page"',
  test2IncludeBulkAction: 'TestTable | where test0 == "account1" or test0 == 2 or test0 == "test\\\\domain.com" or test0 == 4 or test0 == "\\"process.exe\\" -a -g https://some.site/some-page" or test2 == "account2" or test2 == 2 or test2 == 4',
  testExcludeBulkAction: 'TestTable | where test0 != "account1" and test0 != 2 and test0 != "test\\\\domain.com" and test0 != 4 and test0 != "\\"process.exe\\" -a -g https://some.site/some-page"',
  test2ExcludeBulkAction: 'TestTable | where test0 != "account1" and test0 != 2 and test0 != "test\\\\domain.com" and test0 != 4 and test0 != "\\"process.exe\\" -a -g https://some.site/some-page" and test2 != "account2" and test2 != 2 and test2 != 4',
  testShowAllBulkAction: 'TestTable | where test0 == "account1" or test0 == 2 or test0 == "test\\\\domain.com" or test0 == 4 or test0 == "\\"process.exe\\" -a -g https://some.site/some-page"',
  test2ShowAllBulkAction: 'TestTable | where test0 == "account1" or test0 == 2 or test0 == "test\\\\domain.com" or test0 == 4 or test0 == "\\"process.exe\\" -a -g https://some.site/some-page" or test2 == "account2" or test2 == 2 or test2 == 4',
};

suiteGlobals.clearValue = async () => {
  window.postMessage({
    type: MessageToApp.AppSendToBackground,
    externalType: debugID,
    payload: {
      type: MessageToBackground.BGSetQuery,
      payload: {
        value: 'TestTable',
      } as SetQueryPayload,
    } as SendToBackgroundPayload,
  } as ExtensionMessage);
  await sleep(0.3);
};

const messagesStack: unknown[] = [];

suiteGlobals.getValue = async () => {
  window.postMessage({
    type: MessageToApp.AppSendToBackground,
    externalType: debugID,
    payload: {
      type: MessageToBackground.BGGetQuery,
    } as SendToBackgroundPayload,
  } as ExtensionMessage);
  await sleep(0.3);
  const message = messagesStack.pop() as ExtensionMessage;
  if (!message) {
    return '';
  }
  const { queryValue } = message.payload as TakeQueryPayload;
  return queryValue;
};

(async () => {
  await suiteGlobals.getValue();
  await sleep(0.5);

  window.addEventListener('message', (event) => {
    const message = event.data as ExtensionMessage;
    if (message.type === 'MessageOutside' as ExtensionMessageType) {
      messagesStack.push(message);
    }
  });

  await startTests();

  logSuccessMessage('ALL TESTS PASSED!');
})();

