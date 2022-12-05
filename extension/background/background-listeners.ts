import { addListener } from './services/background-services-listeners';
import {
  BeforeRequestBodyListener,
  BeforeSendHeadersListener,
  BGListenerType,
  BrowserTabRemovedListener,
  IconClickedListener,
  MessageListener,
} from './types/types-background-common';
import { registerPlatformTab, sendMessageFromBackground, unregisterPlatformTabs } from './services/background-services';
import { MessageToApp } from '../app/types/types-app-messages';
import { ExtensionMessage } from '../common/types/types-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToBackground } from './types/types-background-messages';
import { MessageToContent } from '../content/types/types-content-messages';
import { PlatformIDPayload, SetLoadingStatePayload, SetWatchersPayload } from '../common/types/types-common-payloads';
import { platformResolver } from './platforms/PlatformResolver';
import { LoadingKey } from '../app/types/types-app-common';

const loggers = require('../common/loggers').loggers
  .addPrefix('listeners');

(addListener as IconClickedListener)(
  BGListenerType.OnExtensionIconClicked,
  (tab) => {
    if (!tab.id) {
      return loggers
        .error()
        .log(`${BGListenerType.OnExtensionIconClicked}: there is no tab id`, tab);
    }
    sendMessageFromBackground(tab.id, {
      type: MessageToApp.AppShowExtension,
    });
    sendMessageFromBackground(tab.id, {
      type: MessageToContent.CSConnectPlatform,
    });
  },
);

(addListener as BrowserTabRemovedListener)(
  BGListenerType.OnBrowserTabRemoved,
  (tabId) => {
    unregisterPlatformTabs([tabId]);
  },
);

(addListener as BeforeRequestBodyListener)(
  BGListenerType.OnBeforeRequest,
  () => {},
  {
    urls: ['<all_urls>'],
  },
  ['requestBody'],
);

(addListener as BeforeSendHeadersListener)(
  BGListenerType.OnBeforeSendHeaders,
  () => {},
  {
    urls: ['<all_urls>'],
  },
  ['requestHeaders'],
);

(addListener as MessageListener)(
  BGListenerType.OnMessage,
  (message : ExtensionMessage, sender) => {
    if (!sender.tab?.id) {
      return loggers
        .error()
        .log(`${BGListenerType.OnMessage} ${message.type}: there is no tab id`, sender, message);
    }

    if (isMessageMatched(
      () => MessageToBackground.BGRunClearData === message.type,
      message,
      sender,
    )) {
      sendMessageFromBackground(sender.tab.id, {
        type: MessageToApp.AppClearResourceData,
      });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGModifyQuery === message.type,
      message,
      sender,
    )) {
      sendMessageFromBackground(sender.tab.id, {
        ...message,
        id: `${message.id}--background-modify-query`,
        type: MessageToContent.CSModifyQuery,
      });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGSetWatchers === message.type,
      message,
      sender,
    )) {
      const { platformID, watchers } = message.payload as SetWatchersPayload;
      platformResolver.resolve(platformID)?.setWatchers(watchers, sender.tab.id);
      sendMessageFromBackground<SetLoadingStatePayload>(sender.tab.id, {
        id: 'background-set-watchers',
        type: MessageToApp.AppSetLoadingState,
        payload: {
          loading: false,
          key: LoadingKey.watchersChanging,
        },
      });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGRegisterPlatformTab === message.type,
      message,
      sender,
    )) {
      const { platformID } = message.payload as PlatformIDPayload;
      registerPlatformTab(platformID, sender.tab.id);
    }
    
    if (isMessageMatched(
      () => MessageToBackground.BGToggleShowExtension === message.type,
      message,
      sender,
    )) {
      sendMessageFromBackground(sender.tab.id, {
        ...message,
        id: `${message.id ? message.id : ''}--background-toggle-show-extension`,
        type: MessageToApp.AppToggleShowExtension,
      });
      sendMessageFromBackground(sender.tab.id, {
        type: MessageToContent.CSConnectPlatform,
      });
    }
  },
);

loggers.debug().log('mounted');