import { isRuntimeGetUrlSupported } from './api-support';
import { ExecutingContext, ExtensionMessageType } from './types/types-common';

export const getBrowserContext = () => typeof browser !== 'undefined' ? browser : chrome;

export const getWebAccessibleUrl = (path: string): string => {
  return isRuntimeGetUrlSupported(path)
    ? getBrowserContext().runtime.getURL(path)
    : '';
};

export const getExecutingContextByMessageType = (
  message: ExtensionMessageType,
): ExecutingContext => {
  let prefix = (message as string).slice(0, 3).toLowerCase();
  if (prefix === 'app') {
    return 'app';
  }
  prefix = prefix.slice(0, 2);
  return prefix === 'bg'
    ? 'background'
    : prefix === 'cs'
      ? 'content'
      : prefix === 'is'
        ? 'inline'
        : 'unknown' as ExecutingContext;
};
