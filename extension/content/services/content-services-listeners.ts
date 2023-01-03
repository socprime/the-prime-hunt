import { ListenerType } from '../types/types-content-common';
import { DebugID, DebugMessage } from '../../common/loggers/loggers-debug';
import { isAddEventListenerSupported, isRuntimeOnMessageSupported } from '../../common/api-support';
import { getBrowserContext } from '../../common/common-extension-helpers';

const listeners: {
  [key in ListenerType]?: Function;
} = {};

export const addListener = (
  type: ListenerType,
  listener: any,
  ...otherProps: any[]
) => {
  listeners[type]?.(
    (...params: any[]) => {
      listener(...params);
    },
    ...otherProps,
  );
};

const removeListenersCallbacks: Function[] = [];

listeners[ListenerType.OnMessage] = (listener: Function, ...otherProps: any[]) => {
  if (isRuntimeOnMessageSupported()) {
    const action = getBrowserContext().runtime.onMessage;
    removeListenersCallbacks.push(() => {
      action.removeListener(listener);
    });
    action.addListener((...params: any[]) => {
      listener(...params);
    }, ...otherProps);
  }
  
  if (!isAddEventListenerSupported()) {
    return;
  }

  const boundedListener = (event: MessageEvent) => {
    const message: DebugMessage = event.data;
    if (
      event.origin !== window.location.origin
      || message.externalType !== DebugID.debugIDExternal
    ) {
      return;
    }
    listener(event.data, ...otherProps);
  };

  removeListenersCallbacks.push(() => {
    window.removeEventListener('message', boundedListener);
  });
  window.addEventListener('message', boundedListener);
};
