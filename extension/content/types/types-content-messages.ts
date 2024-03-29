import { getExecutingContextByMessageType } from '../../common/loggers/loggers-helpers';

export enum MessageToContent {
  // CSSendMessageOutside = 'CSSendMessageOutside',
  CSConnectPlatform = 'CSConnectPlatform',
  CSSetDebugMode = 'CSSetDebugMode',
  CSDirectMessageToApp = 'CSDirectMessageToApp',
  CSDirectMessageToInline = 'CSDirectMessageToInline',
}

Object.values(MessageToContent).forEach((type) => {
  if (getExecutingContextByMessageType(type) !== 'content') {
    throw new Error(`Wrong content message type "${type}"`);
  }
});
