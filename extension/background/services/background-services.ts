import { BrowserTab, BGListenerType, TabID, BackgroundPlatform } from '../types/types-background-common';
import {
  BrowserTabInfo,
  ExtensionMessage,
  PlatformID,
} from '../../common/types/types-common';
import { platformResolver } from '../platforms/PlatformResolver';
import { MessageToBackground } from '../types/types-background-messages';
import { removeBGInterceptor, setBGInterceptor } from './background-services-listeners';
import { getUrlParamsSafe, uuid } from '../../../common/helpers';
import { isTabsSendMessageSupported } from '../../common/api-support';
import {
  NormalizedParsedResources,
  NormalizedResources,
  ParsedResources,
  Resources,
} from '../../app/resources/resources-types';
import { getBrowserContext } from '../../common/common-extension-helpers';

const loggers = require('../../common/loggers').loggers
  .addPrefix('services');

export const sendMessageFromBackground = <T = unknown>(tabID: TabID, message: ExtensionMessage<T>) => {
  const context = getBrowserContext();
  message.id = `${message.id ? `${message.id}--` : ''}${uuid()}`;

  if (!isTabsSendMessageSupported(message, tabID)) {
    return;
  }

  const logPrefix = 'sendMessageFromBackground';

  try {
    context.tabs.sendMessage(tabID, message)
      ?.catch((e: Error) => loggers.error().addPrefix(logPrefix).log(e, message));
    loggers.debug().addPrefix(logPrefix).log(message);
  } catch (e) {
    loggers.error().addPrefix(logPrefix).log(e, message);
  }
};

export const normalizeParsedResource = (parsedResource: ParsedResources): NormalizedParsedResources => {
  const result = {} as NormalizedParsedResources;
  Object.keys(parsedResource || {})
    .forEach(fieldName => {
      result[fieldName] = Array.from(parsedResource[fieldName]);
    });
  return result;
};

export const normalizeParsedResources = (resources: Resources): NormalizedResources => {
  const result = {} as NormalizedResources;
  Object.keys(resources).forEach(typeID => {
    result[typeID] = normalizeParsedResource(resources[typeID]);
  });
  return result;
};

const registeredPlatforms: Map<
TabID,
{
  platform: BackgroundPlatform;
  tabInfo: BrowserTabInfo;
}
> = new Map();

export const registerPlatformTab = (platformID: PlatformID, tabInfo: BrowserTabInfo) => {
  const tabID = tabInfo.id;
  if (!tabID) {
    return loggers.warn().log('No tab id for register', platformID);
  }
  const platform = platformResolver.resolve(platformID);
  const isAlreadyRegisteredPlatform = registeredPlatforms.get(tabID)?.platform?.getID() === platformID;
  if (!platform || isAlreadyRegisteredPlatform) {
    return;
  }

  platform.register();
  registeredPlatforms.set(tabID, { platform, tabInfo });

  loggers.debug().log('registered platform tab', platformID, tabID);
};

export const getTabsInfosByPlatformID = (id: PlatformID): BrowserTabInfo[] => {
  const result: BrowserTabInfo[] = [];
  Array.from(registeredPlatforms).forEach(([, { platform, tabInfo }]) => {
    if (platform.getID() === id) {
      result.push(tabInfo);
    }
  });
  return result;
};

export const unregisterPlatformTabs = (tabsIDs: BrowserTab['id'][]) => {
  const normalizedTabsIDs = tabsIDs.reduce((res, tabID) => {
    if (typeof tabID === 'number') {
      res.push(tabID);
    }
    return res;
  }, [] as number[]);

  const stillALivePlatform = {} as Record<PlatformID, boolean>;
  const deletedPlatform: Map<PlatformID, BackgroundPlatform> = new Map();

  Array.from(registeredPlatforms).forEach(([tabID, { platform }]) => {
    if (normalizedTabsIDs.includes(tabID)) {
      registeredPlatforms.delete(tabID);
      deletedPlatform.set(platform.getID(), platform);
      loggers.debug().log('unregistered platform tab', tabID);
      return;
    }

    stillALivePlatform[platform.getID()] = true;
  });

  Array.from(deletedPlatform).forEach(([platformID, platform]) => {
    if (!stillALivePlatform[platformID]) {
      platform.unregister();
      loggers.debug().log('unregistered platform', platformID);
    }
  });

  if (Object.keys(stillALivePlatform).length < 1) {
    loggers.info().log('there are no platforms tabs left');
  }
};

export const waitBGMessage = async <T = unknown>(type: MessageToBackground): Promise<T> => {
  return new Promise((resolve) => {
    setBGInterceptor(
      BGListenerType.OnMessage,
      (id, params, isMatched) => {
        const message = params.listenerParams[0] as ExtensionMessage;
        if (isMatched(() => message.type === type, message, params, id)) {
          resolve(message.payload);
          removeBGInterceptor(id, BGListenerType.OnMessage);
        }
      },
    );
  });
};

export const getOriginFromSender = (sender: chrome.runtime.MessageSender): string => {
  const origin = (getUrlParamsSafe(
    sender.origin || sender.url || sender.tab?.url,
    'origin',
  ) || '').trim();
  if (!origin) {
    loggers.error().log(`There is no origin from tab ID: ${sender.tab?.id}`, sender);
  }
  return origin;
};