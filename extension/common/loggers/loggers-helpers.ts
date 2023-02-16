import { ExecutingContext, ExtensionMessageType } from '../types/types-common';

export const getDebugPrefix = (context: ExecutingContext) => {
  return context === 'background'
    ? 'bg ==>'
    : context === 'content'
      ? 'cs ==>'
      : context === 'inline'
        ? 'is ==>'
        : context === 'app'
          ? 'app ==>'
          : 'unknown ==>';
};

export const getExecutingContextByMessageType = (
  messageType: ExtensionMessageType,
): ExecutingContext => {
  let prefix = (messageType as string || '').slice(0, 3).toLowerCase();
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

export const debugID = 'debug-external-der3edc3op3e4dde44rt';