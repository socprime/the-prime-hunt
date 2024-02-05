import { addListener } from './services/background-services-listeners';
import {
  BeforeRequestBodyListener,
  BeforeSendHeadersListener,
  BGListenerType,
  BrowserTabRemovedListener,
  IconClickedListener,
  MessageListener,
  OnInstalledListener,
} from './types/types-background-common';
import {
  getOriginFromSender,
  getTabsInfosByPlatformID,
  normalizeParsedResources,
  registerPlatformTab,
  sendMessageFromBackground,
  unregisterPlatformTabs,
} from './services/background-services';
import { MessageToApp } from '../app/types/types-app-messages';
import { ExtensionMessage } from '../common/types/types-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToBackground } from './types/types-background-messages';
import { MessageToContent } from '../content/types/types-content-messages';
import {
  AsyncProcessPayload,
  DirectMessagePayload,
  IntegrationWorkPayload,
  ParsedDataPayload,
  PlatformIDPayload,
  ResultProcessPayload,
  SetDebugModePayload,
  SetLoadingStatePayload,
  SetWatchersPayload,
  SyncWatchersPayload,
} from '../common/types/types-common-payloads';
import { platformResolver } from './platforms/PlatformResolver';
import { LoadingKey } from '../app/types/types-app-common';
import { getIntegrationModel } from '../integrations';
import { serializeDataInResult } from '../../common/helpers';
import { setMailsData } from '../app/mail/mail-store';
import { defaultPatterns } from '../app/mail/patterns';
import { Mail } from '../app/mail/mail-types';

const loggers = require('../common/loggers').loggers
  .addPrefix('listeners');

(addListener as IconClickedListener)(
  BGListenerType.OnExtensionIconClicked,
  (tab) => {
    if (!tab.id) {
      loggers
        .error()
        .log(`${BGListenerType.OnExtensionIconClicked}: there is no tab id`, tab);
      return;
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
  [
    'requestHeaders',
    ...((typeof $browser === 'undefined' || $browser !== 'firefox') ? ['extraHeaders'] : []) as any,
  ],
);

(addListener as MessageListener)(
  BGListenerType.OnMessage,
  (message : ExtensionMessage, sender) => {
    if (!sender.tab?.id) {
      loggers
        .error()
        .log(`${BGListenerType.OnMessage} ${message.type}: there is no tab id`, sender, message);
      return;
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
      const { platformID, watchers, cacheID } = message.payload as SetWatchersPayload;
      const tabID = sender.tab.id;
      const platform = platformResolver.resolve(platformID);
      if (!platform) {
        loggers.warn().log(`${message.type}: There is no platform with passed ID: '${platformID}'`);
        return;
      }

      platform.setWatchers(watchers, {
        origin: getOriginFromSender(sender),
        id: sender.tab.id,
      });

      getTabsInfosByPlatformID(platformID).forEach((tabInfo) => {
        const senderOrigin = getOriginFromSender(sender);
        if (tabInfo.origin !== senderOrigin || tabInfo.id === tabID) {
          return;
        }
        sendMessageFromBackground<SyncWatchersPayload>(tabInfo.id, {
          id: 'sync-watchers',
          type: MessageToApp.AppSyncWatchers,
          payload: { watchers },
        });
      });

      platform.reparseCached(cacheID, {
        origin: getOriginFromSender(sender),
        id: sender.tab.id,
      })
        .then((parsedResponse) => {
          sendMessageFromBackground<ParsedDataPayload>(tabID, {
            id: 're-parsed-last-response',
            type: MessageToApp.AppTakeResourceData,
            payload: {
              fieldsNames: [],
              cacheID,
              resources: normalizeParsedResources(parsedResponse),
            },
          });

          sendMessageFromBackground<SetLoadingStatePayload>(tabID, {
            id: message.type,
            type: MessageToApp.AppSetLoadingState,
            payload: {
              loading: false,
              key: LoadingKey.watchersChanging,
            },
          });
        });
    }

    if (isMessageMatched(
      () => MessageToBackground.BGRegisterPlatformTab === message.type,
      message,
      sender,
    )) {
      const { platformID } = message.payload as PlatformIDPayload;
      registerPlatformTab(platformID, {
        id: sender.tab.id,
        origin: getOriginFromSender(sender),
      });
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

    if (isMessageMatched(
      () => MessageToBackground.BGIntegrationWork === message.type,
      message,
      sender,
    )) {
      const {
        processID,
        work,
        modelType,
        data,
      } = message.payload as AsyncProcessPayload & IntegrationWorkPayload;
      const tabID = sender.tab.id;
      const model = getIntegrationModel(modelType);

      const response: ExtensionMessage<AsyncProcessPayload & ResultProcessPayload> = {
        id: `${message.id}--${message.type}`,
        type: MessageToApp.AppGetIntegrationWorkResult,
        payload: {
          processID,
          result: { error: new Error('Model not found') },
        },
      };

      if (!model) {
        sendMessageFromBackground(tabID, response);
        return;
      }

      if (work === 'check-connection') {
        model.checkConnection()
          .then((result) => {
            response.payload!.result = serializeDataInResult(result);
            sendMessageFromBackground(tabID, response);
          });
      }

      if (work === 'export-data') {
        model.exportData(data || {})
          .then((result) => {
            response.payload!.result = serializeDataInResult(result);
            sendMessageFromBackground(tabID, response);
          });
      }

      if (work === 'import-data') {
        model.importData()
          .then((result) => {
            response.payload!.result = serializeDataInResult(result);
            sendMessageFromBackground(tabID, response);
          });
      }
    }
  },
);

(addListener as OnInstalledListener)(
  BGListenerType.OnInstalled,
  () => {
    setMailsData(defaultPatterns.reduce((res, pattern) => {
      res[pattern.id] = pattern;
      return res;
    }, {} as Record<string, Mail>));
  },
);

loggers.debug().log('mounted');
