import { getExecutingContextByMessageType } from '../../common/common-helpers';

export enum MessageToContent {
  CSModifyQuery = 'CSModifyQuery',
}

Object.values(MessageToContent).forEach(type => {
  if (getExecutingContextByMessageType(type) !== 'content') {
    throw new Error(`Wrong content message type "${type}"`);
  }
});
