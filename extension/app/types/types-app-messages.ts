import { getExecutingContextByMessageType } from '../../common/loggers/loggers-helpers';

export enum MessageToApp {
  AppShowExtension = 'AppShowExtension',
  AppTakeResourceData = 'AppTakeResourceData',
  AppTakeNewResourceData = 'AppTakeNewResourceData',
  AppSyncWatchers = 'AppSyncWatchers',
  AppQueryHasHash = 'AppQueryHasHash',
  AppQueryHasSpecifyFields = 'AppQueryHasSpecifyFields',
  AppSetLoadingState = 'AppSetLoadingState',
  AppToggleShowExtension = 'AppToggleShowExtension',
  AppSendToBackground = 'AppSendToBackground',
  AppSendMessageOutside = 'AppSendMessageOutside',
  AppTakeQuery = 'AppTakeQuery',
  AppSetDebugMode = 'AppSetDebugMode',
  AppTakeCallbackMessageResult = 'AppTakeCallbackMessageResult',
}

Object.values(MessageToApp).forEach((type) => {
  if (getExecutingContextByMessageType(type) !== 'app') {
    throw new Error(`Wrong app message type "${type}"`);
  }
});
