import { getExecutingContextByMessageType } from '../../common/loggers/loggers-helpers';

export enum MessageToBackground {
  BGRunClearData = 'BGRunClearData',
  BGModifyQuery = 'BGModifyQuery',
  BGSetQuery = 'BGSetQuery',
  BGGetQuery = 'BGGetQuery',
  BGDirectMessageToApp = 'BGDirectMessageToApp',
  BGSendMessageOutside = 'BGSendMessageOutside',
  BGSetWatchers = 'BGSetWatchers',
  BGRegisterPlatformTab = 'BGRegisterPlatformTab',
  BGToggleShowExtension = 'BGToggleShowExtension',
  BGSetDebugMode = 'BGSetDebugMode',
  BGDirectMessageToInline = 'BGDirectMessageToInline',
  BGIntegrationWork = 'BGIntegrationWork',
}

Object.values(MessageToBackground).forEach((type) => {
  if (getExecutingContextByMessageType(type) !== 'background') {
    throw new Error(`Wrong background message type "${type}"`);
  }
});
