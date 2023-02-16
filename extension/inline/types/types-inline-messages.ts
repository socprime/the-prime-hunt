import { getExecutingContextByMessageType } from '../../common/loggers/loggers-helpers';

export enum MessageToInline {
  ISModifyQuery = 'ISModifyQuery',
  ISSetQuery = 'ISSetQuery',
  ISGetQuery = 'ISGetQuery',
  ISSetDebugMode = 'ISSetDebugMode',
}

Object.values(MessageToInline).forEach(type => {
  if (getExecutingContextByMessageType(type) !== 'inline') {
    throw new Error(`Wrong inline message type "${type}"`);
  }
});
