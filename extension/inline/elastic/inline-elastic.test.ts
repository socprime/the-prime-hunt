import { setLoggers } from '../../common/loggers';
import { getMockedLoggers } from '../../tests/mocks';
import { MessageToInline } from '../types/types-inline-messages';
import { ModifyQueryPayload } from '../../common/types/types-common-payloads';
import { ExtensionMessage } from '../../common/types/types-common';
import { sleep } from '../../../common/helpers';

describe('Elastic inline tests', () => {
  const logsStack: unknown[] = [];
  setLoggers(getMockedLoggers(logsStack));

  const textarea = document.createElement('textarea');
  textarea.classList.add('euiTextArea');
  textarea.setAttribute('data-test-subj', 'queryInput');
  document.body.append(textarea);

  require('./inline-elastic');

  test('should correctly build query', async () => {
    // include
    textarea.value = '';
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

    expect(textarea.value).toEqual(' AND test3:"account3"');

    // exclude
    textarea.value = '';
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

    expect(textarea.value).toEqual(' AND NOT test3:"account3"');

    // show all
    textarea.value = '';
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

    expect(textarea.value).toEqual('test3:"account3"');

    // bulk include
    textarea.value = '';
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

    expect(textarea.value).toEqual(' AND test3:("account3" OR "account1" OR "account2") AND test1:("account4" OR "account5") AND test0:"account0"');

    // bulk exclude
    textarea.value = '';
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

    expect(textarea.value).toEqual(' AND NOT test3:("account3" OR "account1") AND NOT test0:"account0"');

    // bulk show all
    textarea.value = '';
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

    expect(textarea.value).toEqual('test3:("account3" OR "account123") AND test1:("account1" OR "account22")');
  });
});