import { getExecutingContextByMessageType } from '../../common/common-extension-helpers';

export enum MessageToApp {
  AppShowExtension = 'AppShowExtension',
  AppTakeResourceData = 'AppTakeResourceData',
  AppTakeNewResourceData = 'AppTakeNewResourceData',
  AppClearResourceData = 'AppClearResourceData',
  AppSetLoadingState = 'AppSetLoadingState',
  AppToggleShowExtension = 'AppToggleShowExtension',
}

Object.values(MessageToApp).forEach(type => {
  if (getExecutingContextByMessageType(type) !== 'app') {
    throw new Error(`Wrong app message type "${type}"`);
  }
});
