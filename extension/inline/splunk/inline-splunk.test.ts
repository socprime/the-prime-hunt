import { describe, test, expect } from '@jest/globals';
import { setLoggers } from '../../common/loggers';
import { getMockedAce, getMockedLoggers } from '../../tests/mocks';
import { MessageToInline } from '../types/types-inline-messages';
import { ModifyQueryPayload } from '../../common/types/types-common-payloads';
import { ExtensionMessage } from '../../common/types/types-common';
import { sleep } from '../../../common/helpers';

describe('Splunk inline tests', () => {
  const logsStack: unknown[] = [];
  setLoggers(getMockedLoggers(logsStack));

  const valuesStack: string[] = [];
  window.ace = getMockedAce(valuesStack);

  require('./inline-splunk');

  test('should correctly build query', async () => {
    // include
    valuesStack.length = 0;
    window.postMessage({
      type: MessageToInline.ISModifyQuery,
      payload: {
        modifyType: 'include',
        resources: {
          test3: ['account3'],
        },
      } as ModifyQueryPayload,
    } as ExtensionMessage, '*');

    await sleep(0.1);

    expect(valuesStack[0]).toEqual('currentValue | where test3 == "account3"');

    // exclude
    valuesStack.length = 0;
    window.postMessage({
      type: MessageToInline.ISModifyQuery,
      payload: {
        modifyType: 'exclude',
        resources: {
          test3: ['account3'],
        },
      } as ModifyQueryPayload,
    } as ExtensionMessage, '*');

    await sleep(0.1);

    expect(valuesStack[0]).toEqual('currentValue | where test3 != "account3"');

    // show all
    valuesStack.length = 0;
    window.postMessage({
      type: MessageToInline.ISModifyQuery,
      payload: {
        modifyType: 'show all',
        resources: {
          test3: ['account3'],
        },
      } as ModifyQueryPayload,
    } as ExtensionMessage, '*');

    await sleep(0.1);

    expect(valuesStack[0]).toEqual('currentValue | where test3 == "account3"');

    // bulk include
    valuesStack.length = 0;
    window.postMessage({
      type: MessageToInline.ISModifyQuery,
      payload: {
        modifyType: 'include',
        resources: {
          test3: ['account3', 'account1', 'account2'],
          test1: ['account4', 'account5'],
          test0: ['account0'],
        },
      } as ModifyQueryPayload,
    } as ExtensionMessage, '*');

    await sleep(0.1);

    expect(valuesStack[0]).toEqual('currentValue | where test3 == "account3" or test3 == "account1" or test3 == "account2" or test1 == "account4" or test1 == "account5" or test0 == "account0"');

    // bulk exclude
    valuesStack.length = 0;
    window.postMessage({
      type: MessageToInline.ISModifyQuery,
      payload: {
        modifyType: 'exclude',
        resources: {
          test3: ['account3', 'account1'],
          test0: ['account0'],
        },
      } as ModifyQueryPayload,
    } as ExtensionMessage, '*');

    await sleep(0.1);

    expect(valuesStack[0]).toEqual('currentValue | where test3 != "account3" and test3 != "account1" and test0 != "account0"');

    // bulk show all
    valuesStack.length = 0;
    window.postMessage({
      type: MessageToInline.ISModifyQuery,
      payload: {
        modifyType: 'show all',
        resources: {
          test3: ['account3', 'account123'],
          test1: ['account1', 'account22'],
        },
      } as ModifyQueryPayload,
    } as ExtensionMessage, '*');

    await sleep(0.1);

    expect(valuesStack[0]).toEqual('currentValue | where test3 == "account3" or test3 == "account123" or test1 == "account1" or test1 == "account22"');
  });
});