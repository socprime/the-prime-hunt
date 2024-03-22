import { uuid } from '../../../common/helpers';
import { MessageToContent } from '../../content/types/types-content-messages';
import { MessageToApp } from '../../app/types/types-app-messages';
import { TakeQueryPayload } from '../../common/types/types-common-payloads';
import { ExtensionMessage } from '../../common/types/types-common';

export const sendQueryToApp = (query: string, meta?: Record<string, string>) => {
  window.postMessage({
    id: uuid(),
    type: MessageToContent.CSDirectMessageToApp,
    payload: {
      type: MessageToApp.AppTakeQuery,
      payload: { queryValue: query, queryMeta: meta } as TakeQueryPayload,
    },
  } as ExtensionMessage);
};
