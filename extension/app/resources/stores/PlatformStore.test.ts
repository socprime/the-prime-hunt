import { setLoggers } from '../../../common/loggers';
import { getMockedBrowserContext, getMockedLoggers, getNewRootStore, getPlatformByID } from '../../../tests/mocks';
import { ExtensionMessage, PlatformID, PlatformName } from '../../../common/types/types-common';
import { MessageToBackground } from '../../../background/types/types-background-messages';
import { sleep } from '../../../../common/helpers';
import { ModifyQueryPayload } from '../../../common/types/types-common-payloads';

const mockedCopyToClipboard = jest.fn();

jest.mock('../../../common/common-helpers', () => {
  return {
    ...jest.requireActual('../../../common/common-helpers'),
    copyToClipboard: mockedCopyToClipboard,
  };
});

describe('PlatformStore test', () => {
  let logsStack: unknown[] = [];
  let messageStack: unknown[] = [];
  setLoggers(getMockedLoggers(logsStack));
  (global as any).browser = getMockedBrowserContext(messageStack);

  let rootStore = getNewRootStore();
  let platform = getPlatformByID(PlatformID.MicrosoftSentinel);

  beforeEach(() => {
    logsStack.length = 0;
    messageStack.length = 0;
    rootStore = getNewRootStore();
    platform = getPlatformByID(PlatformID.MicrosoftSentinel);
  });

  test('setPlatform test', () => {
    rootStore.platformStore.setPlatform(platform);
    expect(rootStore.appStore.view).toEqual('resources');
    expect(rootStore.platformStore.platform.getID()).toEqual(PlatformID.MicrosoftSentinel);

    const normalizedLogStack = logsStack.flat(10);
    expect(normalizedLogStack.includes('connected')).toEqual(true);

    const normalizedMessageStack = messageStack.flat(10);
    expect(normalizedMessageStack.length).toEqual(2);

    const registerPlatformMessage = normalizedMessageStack.find(
      (stack: any) => stack && typeof stack === 'object' && stack.type === MessageToBackground.BGRegisterPlatformTab,
    ) as ExtensionMessage;
    expect(!!registerPlatformMessage).toEqual(true);
    expect(registerPlatformMessage.payload.platformID).toEqual(PlatformID.MicrosoftSentinel);
    expect(registerPlatformMessage.id!.indexOf('platform-set')).toEqual(0);

    const setWatchersMessage = normalizedMessageStack.find(
      (stack: any) => stack && typeof stack === 'object' && stack.type === MessageToBackground.BGSetWatchers,
    ) as ExtensionMessage;
    expect(!!setWatchersMessage).toEqual(true);
    expect((setWatchersMessage as ExtensionMessage).payload.platformID).toEqual(PlatformID.MicrosoftSentinel);
    expect((setWatchersMessage as ExtensionMessage).id!.indexOf('save-watchers')).toEqual(0);
    expect((setWatchersMessage as ExtensionMessage).id!.indexOf(registerPlatformMessage.id!) > -1).toEqual(true);
  });

  test('copyToClipboard test', async () => {
    rootStore.platformStore.setPlatform(platform);

    rootStore.platformStore.copyToClipboard({
      Accounts: ['account1'],
    }, 0);

    await sleep(0.1);

    expect(mockedCopyToClipboard.mock.calls[0][0]).toEqual('where Accounts == "account1"');

    rootStore.platformStore.copyToClipboard({
      Accounts: ['account1', 'account2'],
      Assets: ['assets1', 'assets2'],
    }, 0);

    await sleep(0.1);

    expect(mockedCopyToClipboard.mock.calls[1][0]).toEqual('where Accounts == "account1" or Accounts == "account2" or Assets == "assets1" or Assets == "assets2"');
  });

  test('modifyQuery test', async () => {
    rootStore.platformStore.setPlatform(platform);

    const resources = {
      Accounts: ['account', 'account2'],
      Assets: ['assets', 'assets2'],
    };

    rootStore.platformStore.modifyQuery(
      'include',
      resources,
    );

    let normalizedMessageStack = messageStack.flat(10) as ExtensionMessage[];
    let modifyQueryMessage = normalizedMessageStack.find(
      m => m.type === MessageToBackground.BGModifyQuery,
    )!;

    expect(!!modifyQueryMessage).toEqual(true);
    expect(modifyQueryMessage.id!.indexOf('modify-query') > -1).toEqual(true);
    expect(JSON.stringify(modifyQueryMessage.payload)).toEqual(JSON.stringify({
      resources: resources,
      modifyType: 'include',
    } as ModifyQueryPayload));
  });

  test('buildQueryParts test', () => {
    const resources = {
      Accounts: ['account', 'account2'],
      Assets: ['assets', 'assets2'],
    };

    let result = rootStore.platformStore.buildQueryParts(
      'include',
      resources,
    );

    expect(result).toEqual('Undefined platform');

    rootStore.platformStore.setPlatform(platform);

    result = rootStore.platformStore.buildQueryParts(
      'include',
      resources,
    );

    expect(result).toEqual('Accounts == "account" or Accounts == "account2" or Assets == "assets" or Assets == "assets2"');
  });

  test('getName test', () => {
    expect(rootStore.platformStore.getName()).toEqual('Undefined platform');

    rootStore.platformStore.setPlatform(platform);
    expect(rootStore.platformStore.getName()).toEqual(PlatformName.MicrosoftSentinel);
  });

  test('getID test', () => {
    expect(rootStore.platformStore.getID()).toEqual(null);

    rootStore.platformStore.setPlatform(platform);
    expect(rootStore.platformStore.getID()).toEqual(PlatformID.MicrosoftSentinel);
  });
});