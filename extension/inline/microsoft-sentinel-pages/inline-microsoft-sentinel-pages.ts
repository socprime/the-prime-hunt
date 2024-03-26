import { ExtensionMessage, PlatformID } from '../../common/types/types-common';
import { isMessageMatched } from '../../common/common-listeners';
import { MessageToInline } from '../types/types-inline-messages';
import { sendQueryToApp } from '../helpers';
import { getQueryByMonacoContainerInnerText, getQueryNextByLabelText } from './helpers';

const loggers = require('../../common/loggers').loggers
  .addPrefix(PlatformID.MicrosoftSentinel)
  .addPrefix('pages');

window.addEventListener('message', (event) => {
  const message = event.data as ExtensionMessage;

  if (isMessageMatched(
    () => MessageToInline.ISGetQuery === message.type,
    message,
    event,
  )) {
    let query = '';

    const { meta } = message.payload;

    if (!query && meta?.type === 'EditMigrationRule') {
      query = getQueryNextByLabelText('Source Query');
      sendQueryToApp(query);
      return;
    }

    if (!query) {
      query = getQueryNextByLabelText('Rule query');
    }

    if (!query) {
      query = getQueryNextByLabelText('Source Query');
    }

    if (!query) {
      query = getQueryByMonacoContainerInnerText();
    }

    sendQueryToApp(query);
  }
});

loggers.debug().log('mounted');
