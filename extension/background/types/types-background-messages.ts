import { getExecutingContextByMessageType } from '../../common/common-helpers';

export enum MessageToBackground {
  BGRunClearData = 'BGRunClearData',
  BGModifyQuery = 'BGModifyQuery',
  BGSetWatchers = 'BGSetWatchers',
  BGRegisterPlatformTab = 'BGRegisterPlatformTab',
  BGToggleShowExtension = 'BGToggleShowExtension',
}

Object.values(MessageToBackground).forEach(type => {
  if (getExecutingContextByMessageType(type) !== 'background') {
    throw new Error(`Wrong background message type "${type}"`);
  }
});
