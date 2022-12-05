import { BrowserTab, BGListenerType, TabID } from '../types/types-background-common';
import { getBrowserContext } from '../../common/common-helpers';
import {
  ExtensionMessage,
  PlatformID,
} from '../../common/types/types-common';
import { platformResolver } from '../platforms/PlatformResolver';
import { MessageToBackground } from '../types/types-background-messages';
import { removeBGInterceptor, setBGInterceptor } from './background-services-listeners';
import { uuid } from '../../../common/helpers';
import { isTabsSendMessageSupported } from '../../common/api-support';
import {
  NormalizedParsedResources,
  NormalizedResources,
  ParsedResources,
  Resources,
} from '../../app/resources/resources-types';

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

const registeredPlatforms: Map<number, PlatformID> = new Map();

export const registerPlatformTab = (platformID: PlatformID, tabID: BrowserTab['id']) => {
  if (!tabID) {
    return loggers.warn().log('No tab id for register', platformID);
  }
  const platform = platformResolver.resolve(platformID);
  const alreadyRegisteredPlatformID = registeredPlatforms.get(tabID);
  if (
    !platform
    || alreadyRegisteredPlatformID === platformID
  ) {
    return;
  }

  platform.register();
  registeredPlatforms.set(tabID, platformID);

  loggers.debug().log('registered platform tab', platformID, tabID);
};

const isExistPlatformTab = (platformID: PlatformID): boolean =>
  Array.from(registeredPlatforms).some(
    ([, id]) => id === platformID,
  );

export const unregisterPlatformTabs = (tabsIDs: BrowserTab['id'][]) => {
  const deletedPlatformIDs: Set<PlatformID> =
    (tabsIDs || []).reduce(
      (ids, tabID) => {
        if (!tabID) {
          return loggers.warn().log('No tab id for unregister', tabID);
        }
        const platformID = registeredPlatforms.get(tabID);
        if (platformID) {
          ids.add(platformID);
          registeredPlatforms.delete(tabID);
          loggers.debug().log('unregistered platform tab', tabID);
        }
        return ids;
      }, new Set<PlatformID>(),
    );

  Array.from(deletedPlatformIDs).forEach(platformID => {
    if (isExistPlatformTab(platformID)) {
      return;
    }
    const platform = platformResolver.resolve(platformID);
    if (!platform) {
      return loggers.warn().log('can not resolve platform for unregister', platformID);
    }
    platform.unregister();
  });

  if (registeredPlatforms.size < 1) {
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