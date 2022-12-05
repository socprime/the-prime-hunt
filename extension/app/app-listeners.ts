import { addListener } from '../content/services/content-services-listeners';
import { ListenerType, MessageListener } from '../content/types/types-content-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToApp } from './types/types-app-messages';
import { rootStore } from './stores';
import { LoadingKey } from './types/types-app-common';
import {
  ParsedDataPayload,
  SetLoadingStatePayload,
} from '../common/types/types-common-payloads';
import { platformResolver } from '../content/platforms/PlatformResolver';

const loggers = require('../common/loggers').loggers
  .addPrefix('listeners');

const setExtensionShowState = (
  isShow: boolean,
) => {
  if (!rootStore.platformStore.platform) {
    rootStore.platformStore.setPlatform(platformResolver.resolve());
  }
  if (!rootStore.appStore.mounted) {
    require('./index');
  }
  rootStore.appStore.isExtensionOpen = isShow;
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
      rootStore.appStore.startLoading(LoadingKey.resourcesAdding);
      rootStore.resourceStore.clearResources();
      setTimeout(() => {
        rootStore.resourceStore.addResources(message.payload as ParsedDataPayload);
        rootStore.appStore.stopLoading(LoadingKey.resourcesAdding);
      }, 0);
    }

    if (isMessageMatched(
      () => MessageToApp.AppTakeResourceData === message.type,
      message,
    )) {
      rootStore.appStore.startLoading(LoadingKey.resourcesAdding);
      rootStore.resourceStore.addResources(message.payload as ParsedDataPayload);
      rootStore.appStore.stopLoading(LoadingKey.resourcesAdding);
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
  },
);

loggers.debug().log('mounted');