import { ExtensionMessage } from './types/types-common';
import { loggers } from './loggers';

export const isMessageMatched = (
  matchCondition: () => boolean,
  message: ExtensionMessage,
  ...otherInfo: any[]
): boolean => {
  if (matchCondition()) {
    loggers
      .debug()
      .log(`got ${message.type} message`, message, ...otherInfo);
    return true;
  }
  return false;
};
