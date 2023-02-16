import { describe, expect, test } from '@jest/globals';
import { setLoggers } from '../../common/loggers';
import { getMockedLoggers, getMockedMonaco } from '../../tests/mocks';
import { MessageToInline } from '../types/types-inline-messages';
import { ModifyQueryPayload } from '../../common/types/types-common-payloads';
import { ExtensionMessage } from '../../common/types/types-common';
import { sleep } from '../../../common/helpers';

describe('Microsoft Defender inline tests', () => {
  const logsStack: unknown[] = [];
  setLoggers(getMockedLoggers(logsStack));

  const valuesStack: string[] = [];
  window.monaco = getMockedMonaco(valuesStack);
  const model = {
    ...window.monaco.editor.getModels()[0],
    getValue: (() => {
      return JSON.stringify({
        Query: 'currentValue',
      });
    }) as any,
  };
  window.monaco.editor.getModels = () => {
    return [model];
  };
  const el = document.createElement('div');
  el.classList.add('monaco-editor');
  el.setAttribute('data-uri', 'inmemory:123');
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 500 });

  const wrapper = document.createElement('div');
  el.classList.add('response-editor');

  wrapper.append(el);
  document.body.append(wrapper);

  require('./inline-microsoft-defender');

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

    expect(valuesStack[0]).toEqual(JSON.stringify({
      Query: 'currentValue | where test3 == "account3"',
    }, null, 3));

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

    expect(valuesStack[0]).toEqual(JSON.stringify({
      Query: 'currentValue | where test3 != "account3"',
    }, null, 3));

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

    expect(valuesStack[0]).toEqual(JSON.stringify({
      Query: 'currentValue | where test3 == "account3"',
    }, null, 3));

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

    expect(valuesStack[0]).toEqual(JSON.stringify({
      Query: 'currentValue | where test3 == "account3" or test3 == "account1" or test3 == "account2" or test1 == "account4" or test1 == "account5" or test0 == "account0"',
    }, null, 3));

    // bulk exclude
    valuesStack.length = 0;
    window.postMessage({
      type: MessageToInline.ISModifyQuery,
      payload: {
        modifyType: 'exclude',
        resources: {
          test3: ['account3', 'account1', 'account2'],
          test1: ['account4', 'account5'],
          test0: ['account0'],
        },
      } as ModifyQueryPayload,
    } as ExtensionMessage, '*');

    await sleep(0.1);

    expect(valuesStack[0]).toEqual(JSON.stringify({
      Query: 'currentValue | where test3 != "account3" and test3 != "account1" and test3 != "account2" and test1 != "account4" and test1 != "account5" and test0 != "account0"',
    }, null, 3));

    // bulk show all
    valuesStack.length = 0;
    window.postMessage({
      type: MessageToInline.ISModifyQuery,
      payload: {
        modifyType: 'show all',
        resources: {
          test3: ['account3', 'account1', 'account2'],
          test1: ['account4', 'account5'],
          test0: ['account0'],
        },
      } as ModifyQueryPayload,
    } as ExtensionMessage, '*');

    await sleep(0.1);

    expect(valuesStack[0]).toEqual(JSON.stringify({
      Query: 'currentValue | where test3 == "account3" or test3 == "account1" or test3 == "account2" or test1 == "account4" or test1 == "account5" or test0 == "account0"',
    }, null, 3));

    // not json query builder tests
    (global as any).window = {};
    Object.defineProperty(window, 'location', {
      value: {
        href: 'security.microsoft.com/v2/advanced-hunting',
      },
    });

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

    expect(valuesStack[0]).toEqual('index | where test3 == "account3"');

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

    expect(valuesStack[0]).toEqual('index | where test3 != "account3"');

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

    expect(valuesStack[0]).toEqual('index | where test3 == "account3"');

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

    expect(valuesStack[0]).toEqual('index | where test3 == "account3" or test3 == "account1" or test3 == "account2" or test1 == "account4" or test1 == "account5" or test0 == "account0"');

    // bulk exclude
    valuesStack.length = 0;
    window.postMessage({
      type: MessageToInline.ISModifyQuery,
      payload: {
        modifyType: 'exclude',
        resources: {
          test3: ['account3', 'account1', 'account2'],
          test1: ['account4', 'account5'],
          test0: ['account0'],
        },
      } as ModifyQueryPayload,
    } as ExtensionMessage, '*');

    await sleep(0.1);

    expect(valuesStack[0]).toEqual('index | where test3 != "account3" and test3 != "account1" and test3 != "account2" and test1 != "account4" and test1 != "account5" and test0 != "account0"');

    // bulk show all
    valuesStack.length = 0;
    window.postMessage({
      type: MessageToInline.ISModifyQuery,
      payload: {
        modifyType: 'show all',
        resources: {
          test3: ['account3', 'account1', 'account2'],
          test1: ['account4', 'account5'],
          test0: ['account0'],
        },
      } as ModifyQueryPayload,
    } as ExtensionMessage, '*');

    await sleep(0.1);

    expect(valuesStack[0]).toEqual('index | where test3 == "account3" or test3 == "account1" or test3 == "account2" or test1 == "account4" or test1 == "account5" or test0 == "account0"');
  });
});