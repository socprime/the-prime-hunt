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
import {
  DirectMessagePayload,
  PlatformIDPayload,
  SetDebugModePayload,
  SetLoadingStatePayload,
  SetWatchersPayload,
} from '../common/types/types-common-payloads';
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
        id: `${message.id}--${message.type}`,
        type: MessageToContent.CSModifyQuery,
      });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGSetQuery === message.type,
      message,
      sender,
    )) {
      sendMessageFromBackground(sender.tab.id, {
        ...message,
        id: `${message.id}--${message.type}`,
        type: MessageToContent.CSSetQuery,
      });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGGetQuery === message.type,
      message,
      sender,
    )) {
      sendMessageFromBackground(sender.tab.id, {
        ...message,
        id: `${message.id}--${message.type}`,
        type: MessageToContent.CSGetQuery,
      });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGSendMessageOutside === message.type,
      message,
      sender,
    )) {
      sendMessageFromBackground(sender.tab.id, {
        ...message,
        id: `${message.id}--${message.type}`,
        type: MessageToApp.AppSendMessageOutside,
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
        id: message.type,
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
        id: `${message.id}--${message.type}`,
        type: MessageToApp.AppToggleShowExtension,
      });
      sendMessageFromBackground(sender.tab.id, {
        type: MessageToContent.CSConnectPlatform,
      });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGSetDebugMode === message.type,
      message,
      sender,
    )) {
      const { debugMode } = message.payload as SetDebugModePayload;
      require('../common/loggers').setDebugMode(debugMode);
      sendMessageFromBackground(sender.tab.id, {
        ...message,
        id: `${message.id}--${message.type}`,
        type: MessageToContent.CSSetDebugMode,
      });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGDirectMessageToApp === message.type,
      message,
      sender,
    )) {
      const { type, payload } = message.payload as DirectMessagePayload;
      sendMessageFromBackground(sender.tab.id, {
        id: `${message.id}--${message.type}`,
        type,
        payload,
      });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGDirectMessageToInline === message.type,
      message,
      sender,
    )) {
      sendMessageFromBackground(sender.tab.id, {
        id: `${message.id}--${message.type}`,
        type: MessageToContent.CSDirectMessageToInline,
        payload: message.payload,
      });
    }
  },
);

loggers.debug().log('mounted');