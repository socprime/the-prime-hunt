import {
  registerPlatformsOnOpenedTabs,
  registerPlatformTab,
  sendMessageFromBackground,
  unregisterPlatformTabs,
} from './background/background-services';
import { MessageToBackground } from './background/types/types-background-messages';
import {
  BeforeRequestBodyListener,
  BeforeSendHeadersListener,
  BGListenerType,
  BrowserTabRemovedListener,
  IconClickedListener,
  MessageListener,
} from './background/types/types-background-common';
import { ExtensionMessage } from './common/types/types-common';
import { addListener } from './background/background-listeners';
import { PlatformIDPayload, SetLoadingStatePayload, SetWatchersPayload } from './common/types/types-common-payloads';
import { MessageToApp } from './app/types/types-app-messages';
import { MessageToContent } from './content/types/types-content-messages';
import { getDebugPrefix } from './common/loggers/loggers-debug';
import { isMessageMatched } from './common/common-listeners';
import { platformResolver } from './background/platforms/PlatformResolver';
import { LoadingKey } from './app/types/types-app-common';

const loggers = require('./common/loggers').loggers.addPrefix(getDebugPrefix('background'));

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
        type: MessageToContent.CSModifyQuery,
      });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGSetWatchers === message.type,
      message,
      sender,
    )) {
      const { platformID, watchers, action } = message.payload as SetWatchersPayload;
      platformResolver.resolve(platformID)?.setWatchers(watchers, sender.tab.id);
      sendMessageFromBackground<SetLoadingStatePayload>(sender.tab.id, {
        type: MessageToApp.AppSetLoadingState,
        payload: {
          loading: false,
          key: action === 'add'
            ? LoadingKey.fieldAdding
            : LoadingKey.fieldRemoving,
        },
      });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGAddFieldToWatch === message.type,
      message,
      sender,
    )) {
      sendMessageFromBackground(sender.tab.id, {
        ...message,
        type: MessageToApp.AppAddFieldToWatch,
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
  },
);

registerPlatformsOnOpenedTabs();
