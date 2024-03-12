import { getExecutingContextByMessageType } from '../../common/loggers/loggers-helpers';

export enum MessageToBackground {
  BGDirectMessageToApp = 'BGDirectMessageToApp',
  BGDirectMessageToInline = 'BGDirectMessageToInline',
  BGSetWatchers = 'BGSetWatchers',
  BGRegisterPlatformTab = 'BGRegisterPlatformTab',
  BGToggleShowExtension = 'BGToggleShowExtension',
  BGSetDebugMode = 'BGSetDebugMode',
  BGTakeCallbackMessage = 'BGTakeCallbackMessage',
}

Object.values(MessageToBackground).forEach((type) => {
  if (getExecutingContextByMessageType(type) !== 'background') {
    throw new Error(`Wrong background message type "${type}"`);
  }
});
