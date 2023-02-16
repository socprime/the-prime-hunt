import { getExecutingContextByMessageType } from '../../common/loggers/loggers-helpers';

export enum MessageToBackground {
  BGRunClearData = 'BGRunClearData',
  BGModifyQuery = 'BGModifyQuery',
  BGSetQuery = 'BGSetQuery',
  BGGetQuery = 'BGGetQuery',
  BGSendMessageOutside = 'BGSendMessageOutside',
  BGSetWatchers = 'BGSetWatchers',
  BGRegisterPlatformTab = 'BGRegisterPlatformTab',
  BGToggleShowExtension = 'BGToggleShowExtension',
  BGSetDebugMode = 'BGSetDebugMode',
}

Object.values(MessageToBackground).forEach(type => {
  if (getExecutingContextByMessageType(type) !== 'background') {
    throw new Error(`Wrong background message type "${type}"`);
  }
});
