import { ExtensionMessage } from './types/types-common';
import { loggers } from './loggers';
import { getDebugPrefix } from './loggers/loggers-debug';
import { getExecutingContextByMessageType } from './common-helpers';

export const isMessageMatched = (
  matchCondition: () => boolean,
  message: ExtensionMessage,
  ...otherInfo: any[]
): boolean => {
  if (matchCondition()) {
    loggers
      .debug()
      .addPrefix(getDebugPrefix(getExecutingContextByMessageType(message.type)))
      .log(`got ${message.type} message`, message, ...otherInfo);
    return true;
  }
  return false;
};
