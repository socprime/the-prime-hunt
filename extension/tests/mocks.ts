import { NormalizedResources } from '../app/resources/resources-types';
import { ILoggers } from '../../common/types';
import { PlatformID } from '../common/types/types-common';

export const getMockedBrowserContext = (
  messageStack: unknown[],
) => ({
  runtime: {
    onMessage: {
      addListener: () => {},
    },
    sendMessage: (...params: any) => {
      messageStack.push(params);
    },
  },
});

export const getMockedLoggers = (
  logsStack: unknown[],
): ILoggers => {
  return {
    log: (...params: any) => {
      logsStack.push(params);
    },
    setLevel: function () {
      return this;
    },
    addPrefix: function () {
      return this;
    },
    setPrefix: function () {
      return this;
    },
    debug: function () {
      return this;
    },
    error: function () {
      return this;
    },
    info: function () {
      return this;
    },
    warn: function () {
      return this;
    },
  };
};

export const getMockedResourcesData = (): NormalizedResources => ({
  Accounts: {
    'test0': ['account1', '2', 'test2', '4', 'test\\domain.com', '"process.exe" -a -g https://some.site/some-page'],
    'test2': ['account2', '2', '4'],
    'test3': ['account3', 'test2', '4'],
    'test4': ['account4', '2', 'test2', '4'],
    'field': ['2'],
  },
  Assets: {
    'test5': ['asset1', '2', 'test2', '4'],
    'test2': ['asset2'],
  },
});

export const getNewRootStore = () => {
  return new (require('../app/stores/RootStore').RootStore)();
};

export const getPlatformByID = (platformID: PlatformID) => {
  return require('../content/platforms/PlatformResolver')
    .platformResolver.getPlatformByID(platformID);
};

export const getMockedResizeObserver = () => {
  return require('@jest/globals').jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
};

export const getMockedMonaco = (
  valuesStack: string[],
  getCurrentValue = () => 'currentValue',
) => {
  return {
    editor: {
      getModels: () => [
        {
          uri: { _formatted: 'inmemory:123' },
          getLinesContent: () => ['index'],
          getLineContent: () => 'index',
          getLineCount: () => 1,
          getLineDecorations: () => [],
          setValue: (value: string) => {
            valuesStack.push(value);
          },
          getValue: () => {
            return getCurrentValue();
          },
        },
      ],
    },
  } as any;
};

export const getMockedAce = (
  valuesStack: string[],
  getCurrentValue = () => 'currentValue',
) => {
  return {
    edit: () => {
      return {
        getValue: () => {
          return getCurrentValue();
        },
        setValue: (value: string) => {
          valuesStack.push(value);
        },
      };
    },
  } as any;
};