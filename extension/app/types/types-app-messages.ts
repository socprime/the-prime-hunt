import { getExecutingContextByMessageType } from '../../common/loggers/loggers-helpers';

export enum MessageToApp {
  AppShowExtension = 'AppShowExtension',
  AppTakeResourceData = 'AppTakeResourceData',
  AppTakeNewResourceData = 'AppTakeNewResourceData',
  AppQueryHasHash = 'AppQueryHasHash',
  AppClearResourceData = 'AppClearResourceData',
  AppSetLoadingState = 'AppSetLoadingState',
  AppToggleShowExtension = 'AppToggleShowExtension',
  AppSendToBackground = 'AppSendToBackground',
  AppSendMessageOutside = 'AppSendMessageOutside',
  AppSetDebugMode = 'AppSetDebugMode',
}

Object.values(MessageToApp).forEach(type => {
  if (getExecutingContextByMessageType(type) !== 'app') {
    throw new Error(`Wrong app message type "${type}"`);
  }
});
