import { getExecutingContextByMessageType } from '../../common/common-helpers';

export enum MessageToApp {
  AppShowExtension = 'AppShowExtension',
  AppTakeResourceData = 'AppTakeResourceData',
  AppTakeNewResourceData = 'AppTakeNewResourceData',
  AppClearResourceData = 'AppClearResourceData',
  AppAddFieldToWatch = 'AppAddFieldToWatch',
  AppSetLoadingState = 'AppSetLoadingState',
}

Object.values(MessageToApp).forEach(type => {
  if (getExecutingContextByMessageType(type) !== 'app') {
    throw new Error(`Wrong app message type "${type}"`);
  }
});
