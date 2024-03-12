import { getBrowserContext } from './common-extension-helpers';

const loggers = require('./loggers').loggers.addPrefix('api-support');

export const isPostMessageSupported = (
  ...logData: any[]
): boolean => {
  if (!window?.postMessage) {
    loggers
      .warn()
      .log('API window.postMessage is not supported', ...logData);
    return false;
  }
  return true;
};

export const isAddEventListenerSupported = (
  ...logData: any[]
): boolean => {
  if (!window?.addEventListener) {
    loggers
      .warn()
      .log('API window.addEventListener is not supported', ...logData);
    return false;
  }
  return true;
};

export const isRuntimeSendMessageSupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext()?.runtime?.sendMessage) {
    loggers
      .warn()
      .log('API runtime.sendMessage is not supported', ...logData);
    return false;
  }
  return true;
};

export const isRuntimeOnInstalledSupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext().runtime?.onInstalled?.addListener) {
    loggers
      .warn()
      .log('API runtime.onInstalled.addListener is not supported', ...logData);
    return false;
  }
  return true;
};

export const isRuntimeOnMessageSupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext().runtime?.onMessage?.addListener) {
    loggers
      .warn()
      .log('API runtime.onMessage.addListener is not supported', ...logData);
    return false;
  }
  return true;
};

export const isRuntimeOnMessageExternalSupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext().runtime?.onMessageExternal?.addListener) {
    loggers
      .warn()
      .log('API runtime.onMessageExternal.addListener is not supported', ...logData);
    return false;
  }
  return true;
};

export const isTabsOnRemovedSupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext().tabs?.onRemoved?.addListener) {
    loggers
      .warn()
      .log('API tabs.onRemoved.addListener is not supported', ...logData);
    return false;
  }
  return true;
};

export const isActionOnClickedSupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext()?.action?.onClicked?.addListener) {
    loggers
      .warn()
      .log('API action.onClicked.addListener is not supported', ...logData);
    return false;
  }
  return true;
};

export const isBrowserActionOnClickedSupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext()?.browserAction?.onClicked?.addListener) {
    loggers
      .warn()
      .log('API browserAction.onClicked.addListener is not supported', ...logData);
    return false;
  }
  return true;
};

export const isOnBeforeRequestSupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext()?.webRequest?.onBeforeRequest?.addListener) {
    loggers
      .warn()
      .log('API webRequest.onBeforeRequest is not supported', ...logData);
    return false;
  }
  return true;
};

export const isOnBeforeSendHeadersSupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext()?.webRequest?.onBeforeSendHeaders?.addListener) {
    loggers
      .warn()
      .log('API webRequest.onBeforeSendHeaders is not supported', ...logData);
    return false;
  }
  return true;
};

export const isTabsQuerySupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext()?.tabs?.query) {
    loggers
      .warn()
      .log(
        'API tabs.query is not supported',
        ...logData,
      );
    return false;
  }
  return true;
};

export const isTabsSendMessageSupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext()?.tabs?.sendMessage) {
    loggers
      .warn()
      .log(
        'API tabs.sendMessage is not supported',
        ...logData,
      );
    return false;
  }
  return true;
};

export const isRuntimeGetUrlSupported = (
  ...logData: any[]
): boolean => {
  if (!getBrowserContext()?.runtime?.getURL) {
    loggers
      .warn()
      .log('API runtime.getURL is not supported', ...logData);
    return false;
  }
  return true;
};
