import { isRuntimeGetUrlSupported } from './api-support';

export const getBrowserContext = () => typeof browser !== 'undefined' ? browser : chrome;

export const getWebAccessibleUrl = (path: string): string => {
  return isRuntimeGetUrlSupported(path)
    ? getBrowserContext().runtime.getURL(path)
    : '';
};
