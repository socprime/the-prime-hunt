import { getExecutingContextByMessageType } from '../../common/common-extension-helpers';

export enum MessageToInline {
  ISModifyQuery = 'ISModifyQuery',
}

Object.values(MessageToInline).forEach(type => {
  if (getExecutingContextByMessageType(type) !== 'inline') {
    throw new Error(`Wrong inline message type "${type}"`);
  }
});
