import { startTests, suiteGlobals } from '../index';
import { MessageToApp } from '../../../app/types/types-app-messages';
import { debugID } from '../../../common/loggers/loggers-helpers';
import { MessageToBackground } from '../../../background/types/types-background-messages';
import {
  SendToBackgroundPayload,
  SetQueryPayload,
  TakeQueryPayload,
} from '../../../common/types/types-common-payloads';
import { ExtensionMessage, ExtensionMessageType } from '../../../common/types/types-common';
import { sleep } from '../../../../common/helpers';
import { logSuccessMessage } from '../helpers/utils';

suiteGlobals.messages = {
  testIncludeAction: 'SELECT TestTable WHERE test0 = \'account1\'',
  testExcludeAction: 'SELECT TestTable WHERE test0 != \'account1\'',
  testShowAllAction: 'SELECT TestTable WHERE test0 = \'account1\'',
  testIncludeBulkAction: 'SELECT TestTable WHERE test0 = \'account1\' OR test0 = 2 OR test0 = \'test\\domain.com\' OR test0 = 4 OR test0 = \'"process.exe" -a -g https://some.site/some-page\'',
  test2IncludeBulkAction: 'SELECT TestTable WHERE test0 = \'account1\' OR test0 = 2 OR test0 = \'test\\domain.com\' OR test0 = 4 OR test0 = \'"process.exe" -a -g https://some.site/some-page\' OR test2 = \'account2\' OR test2 = 2 OR test2 = 4',
  testExcludeBulkAction: 'SELECT TestTable WHERE test0 != \'account1\' AND test0 != 2 AND test0 != \'test\\domain.com\' AND test0 != 4 AND test0 != \'"process.exe" -a -g https://some.site/some-page\'',
  test2ExcludeBulkAction: 'SELECT TestTable WHERE test0 != \'account1\' AND test0 != 2 AND test0 != \'test\\domain.com\' AND test0 != 4 AND test0 != \'"process.exe" -a -g https://some.site/some-page\' AND test2 != \'account2\' AND test2 != 2 AND test2 != 4',
  testShowAllBulkAction: 'SELECT TestTable WHERE test0 = \'account1\' OR test0 = 2 OR test0 = \'test\\domain.com\' OR test0 = 4 OR test0 = \'"process.exe" -a -g https://some.site/some-page\'',
  test2ShowAllBulkAction: 'SELECT TestTable WHERE test0 = \'account1\' OR test0 = 2 OR test0 = \'test\\domain.com\' OR test0 = 4 OR test0 = \'"process.exe" -a -g https://some.site/some-page\' OR test2 = \'account2\' OR test2 = 2 OR test2 = 4',
};

suiteGlobals.clearValue = async () => {
  window.postMessage({
    type: MessageToApp.AppSendToBackground,
    externalType: debugID,
    payload: {
      type: MessageToBackground.BGSetQuery,
      payload: {
        value: 'SELECT TestTable',
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

window.addEventListener('message', (event) => {
  const message = event.data as ExtensionMessage;
  if (message.type === 'MessageOutside' as ExtensionMessageType) {
    messagesStack.push(message);
  }
});

(async () => {
  await startTests();

  logSuccessMessage('ALL TESTS PASSED!');
})();
