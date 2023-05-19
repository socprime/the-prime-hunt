import { addListener } from '../content/services/content-services-listeners';
import { ListenerType, MessageListener } from '../content/types/types-content-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToApp } from './types/types-app-messages';
import { rootStore } from './stores';
import { LoadingKey } from './types/types-app-common';
import { setWatchers } from '../common/local-storage';
import {
  ParsedDataPayload,
  SendToBackgroundPayload,
  SetDebugModePayload,
  SetLoadingStatePayload,
  ShowMessagePayload,
  SyncWatchersPayload,
} from '../common/types/types-common-payloads';
import { platformResolver } from '../content/platforms/PlatformResolver';
import { sendMessageFromApp } from '../content/services/content-services';
import { ExtensionMessage, ExtensionMessageType } from '../common/types/types-common';
import { MessageToBackground } from '../background/types/types-background-messages';
import { RemoveHashMessage } from './resources/messages/RemoveHashMessage/RemoveHashMessage';
import {
  RemoveFieldsSpecificationMessage,
} from './resources/messages/RemoveFieldsSpecificationMessage/RemoveFieldsSpecificationMessage';

const loggers = require('../common/loggers').loggers
  .addPrefix('listeners');

const setExtensionShowState = (
  isShow: boolean,
) => {
  if (!rootStore.platformStore.getID()) {
    rootStore.platformStore.setPlatform(platformResolver.resolve());
  }
  if (!rootStore.appStore.mounted) {
    require('./index');
  }
  rootStore.appStore.isExtensionOpen = isShow;
};

const handleResources = (payload: ParsedDataPayload, isNew?: boolean) => {
  const { resources, cacheID, fieldsNames } = payload;
  rootStore.appStore.startLoading(LoadingKey.resourcesAdding);
  if (isNew) {
    rootStore.resourceStore.clearResources();
  }

  setTimeout(() => {
    rootStore.resourceStore.addResources(resources);
    rootStore.resourceStore.cacheID = cacheID;
    rootStore.platformStore.setFieldsNames(fieldsNames);
    rootStore.platformStore.saveFieldsNames();
    rootStore.appStore.stopLoading(LoadingKey.resourcesAdding);
  }, 0);
};

(addListener as MessageListener)(
  ListenerType.OnMessage,
  (message) => {
    if (isMessageMatched(
      () => MessageToApp.AppShowExtension === message.type,
      message,
    )) {
      if (!rootStore.appStore.isExtensionOpen) {
        setExtensionShowState(true);
      }
    }

    if (isMessageMatched(
      () => MessageToApp.AppTakeNewResourceData === message.type,
      message,
    )) {
      handleResources(message.payload as ParsedDataPayload, true);
    }

    if (isMessageMatched(
      () => MessageToApp.AppTakeResourceData === message.type,
      message,
    )) {
      handleResources(message.payload as ParsedDataPayload, false);
    }

    if (isMessageMatched(
      () => MessageToApp.AppClearResourceData === message.type,
      message,
    )) {
      rootStore.resourceStore.clearResources();
    }

    if (isMessageMatched(
      () => MessageToApp.AppSetLoadingState === message.type,
      message,
    )) {
      const { loading, key } = message.payload as SetLoadingStatePayload;
      if (loading) {
        rootStore.appStore.startLoading(key);
      } else {
        rootStore.appStore.stopLoading(key);
      }
    }

    if (isMessageMatched(
      () => MessageToApp.AppToggleShowExtension === message.type,
      message,
    )) {
      setExtensionShowState(!rootStore.appStore.isExtensionOpen);
    }

    if (isMessageMatched(
      () => MessageToApp.AppSendToBackground === message.type,
      message,
    )) {
      const { type, payload } = message.payload as SendToBackgroundPayload;
      sendMessageFromApp({ type, payload });
    }

    if (isMessageMatched(
      () => MessageToApp.AppSendMessageOutside === message.type,
      message,
    )) {
      window.postMessage({
        ...message,
        type: 'MessageOutside' as ExtensionMessageType,
      } as ExtensionMessage);
    }

    if (isMessageMatched(
      () => MessageToApp.AppSetDebugMode === message.type,
      message,
    )) {
      const { debugMode } = message.payload as SetDebugModePayload;
      require('../common/loggers').setDebugMode(debugMode);
      sendMessageFromApp({
        ...message,
        id: `${message.id}--${message.type}`,
        type: MessageToBackground.BGSetDebugMode,
      });
    }

    if (isMessageMatched(
      () => MessageToApp.AppQueryHasHash === message.type,
      message,
    )) {
      if (rootStore.platformStore.getID()) {
        const { show } = message.payload as ShowMessagePayload;
        rootStore.platformStore.setMessage(show ? RemoveHashMessage : null);
      }
    }

    if (isMessageMatched(
      () => MessageToApp.AppQueryHasSpecifyFields === message.type,
      message,
    )) {
      if (rootStore.platformStore.getID()) {
        const { show } = message.payload as ShowMessagePayload;
        rootStore.platformStore.setMessage(show ? RemoveFieldsSpecificationMessage : null);
      }
    }

    if (isMessageMatched(
      () => MessageToApp.AppSyncWatchers === message.type,
      message,
    )) {
      const { watchers } = message.payload as SyncWatchersPayload;
      rootStore.resourceStore.setWatchers(watchers);
      // TODO should be inside store
      setWatchers(watchers);
    }
  },
);

loggers.debug().log('mounted');