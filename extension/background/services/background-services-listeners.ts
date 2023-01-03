import { BGInterceptor, BGListenerType, MessageInfo } from '../types/types-background-common';
import { mapType, UniqueHash } from '../../../common/types';
import { uuid } from '../../../common/helpers';
import { DebugID, DebugMessage } from '../../common/loggers/loggers-debug';
import {
  isActionOnClickedSupported,
  isBrowserActionOnClickedSupported,
  isOnBeforeRequestSupported,
  isOnBeforeSendHeadersSupported,
  isRuntimeOnMessageExternalSupported,
  isRuntimeOnMessageSupported,
  isTabsOnRemovedSupported,
} from '../../common/api-support';
import { getBrowserContext } from '../../common/common-extension-helpers';

const loggers = require('../../common/loggers').loggers
  .addPrefix('listeners');

const listeners: {
  [key in BGListenerType]?: Function;
} = {};

export const interceptors: {
  [key in BGListenerType]?: BGInterceptor[];
} = {};

listeners[BGListenerType.OnMessage] = (listener: Function, ...otherProps: any[]) => {
  if (isRuntimeOnMessageSupported()) {
    getBrowserContext().runtime.onMessage.addListener(listener, ...otherProps);
  }

  if (!isRuntimeOnMessageExternalSupported()) {
    return;
  }

  const boundedListener = (...params: any[]) => {
    const message: DebugMessage = params[0];
    const info: MessageInfo = params[1];
    if (
      new URL(info.url).origin !== info.origin
      || message.externalType !== DebugID.debugIDExternal
    ) {
      return;
    }
    listener(...params);
  };

  getBrowserContext().runtime.onMessageExternal.addListener(boundedListener);
};

listeners[BGListenerType.OnBrowserTabRemoved] = (listener: Function, ...otherProps: any[]) => {
  if (!isTabsOnRemovedSupported()) {
    return;
  }
  getBrowserContext().tabs.onRemoved.addListener(listener, ...otherProps);
};

listeners[BGListenerType.OnExtensionIconClicked] = (listener: Function, ...otherProps: any[]) => {
  const context = getBrowserContext();
  const contextAction = typeof context.action !== 'undefined' ? 'action' : 'browserAction';
  if (contextAction === 'action' && !isActionOnClickedSupported()) {
    return;
  }
  if (contextAction === 'browserAction' && !isBrowserActionOnClickedSupported()) {
    return;
  }

  context[contextAction].onClicked.addListener(listener, ...otherProps);
};

listeners[BGListenerType.OnBeforeRequest] = (listener: Function, ...otherProps: any[]) => {
  if (!isOnBeforeRequestSupported()) {
    return;
  }
  getBrowserContext().webRequest.onBeforeRequest.addListener(listener, ...otherProps);
};

listeners[BGListenerType.OnBeforeSendHeaders] = (listener: Function, ...otherProps: any[]) => {
  if (!isOnBeforeSendHeadersSupported()) {
    return;
  }
  getBrowserContext().webRequest.onBeforeSendHeaders.addListener(listener, ...otherProps);
};

export const isBGInterceptorMatched = (
  type: BGListenerType,
  matchCondition: () => boolean,
  ...otherInfo: any[]
): boolean => {
  if (matchCondition()) {
    loggers
      .debug()
      .log(`intercepted ${type}`, ...otherInfo);
    return true;
  }
  return false;
};

export const setBGInterceptor = (
  type: BGListenerType,
  interceptor: (
    id: UniqueHash,
    params: {
      listenerParams: any[],
      createListenerParams: any[],
    },
    isMatched: (
      matchCondition: () => boolean,
      ...otherInfo: any[]
    ) => boolean,
  ) => void,
  onUnregister?: () => void,
): UniqueHash => {
  const identifiedInterceptor = mapType<BGInterceptor>(interceptor);
  identifiedInterceptor.id = uuid();
  if (typeof onUnregister === 'function') {
    identifiedInterceptor.unregister = onUnregister;
  }
  interceptors[type] = [
    ...(interceptors[type] || []),
    identifiedInterceptor,
  ];

  return identifiedInterceptor.id;
};

export const removeBGInterceptor = (
  id: UniqueHash,
  type?: BGListenerType,
) => {
  (type ? [type] : Object.keys(interceptors)).forEach((t: BGListenerType) => {
    interceptors[t] = interceptors[t]!.filter(interceptor => {
      if (interceptor.id === id && typeof interceptor.unregister === 'function') {
        interceptor.unregister();
      }
      return interceptor.id !== id;
    });
  });
};

export const addListener = (
  type: BGListenerType,
  listener: any,
  ...otherProps: any[]
) => {
  listeners[type]?.(
    (...params: any[]) => {
      (interceptors[type] || []).forEach(interceptor => {
        if (!interceptor || typeof interceptor !== 'function') {
          return;
        }
        interceptor(
          interceptor.id,
          {
            listenerParams: params,
            createListenerParams: [listener, ...otherProps],
          },
          (
            matchCondition: () => boolean,
            ...otherInfo: any[]
          ) => isBGInterceptorMatched(
            type,
            matchCondition,
            ...otherInfo,
          ),
        );
      });
      listener(...params);
    },
    ...otherProps,
  );
};
