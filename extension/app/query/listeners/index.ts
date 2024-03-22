import { isMessageMatched } from '../../../common/common-listeners';
import { MessageToApp } from '../../types/types-app-messages';
import { TakeQueryPayload } from '../../../common/types/types-common-payloads';
import { IncomingListenerData } from '../../../common/types/types-common';
import { getStore } from '../stores/QueryStore';

export const listenQueryModule = (
  data: IncomingListenerData,
  callback?: () => void,
) => {
  const { message } = data;

  if (isMessageMatched(
    () => MessageToApp.AppTakeQuery === message.type,
    message,
  )) {
    const { queryValue = '', queryMeta = {} } = message.payload as TakeQueryPayload;
    const queryStore = getStore();
    queryStore.setQuery(queryValue, queryMeta);
    callback?.();
  }
};
