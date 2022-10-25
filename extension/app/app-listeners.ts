import { addListener } from '../content/services/content-services-listeners';
import { ListenerType, MessageListener } from '../content/types/types-content-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToApp } from './types/types-app-messages';
import { rootStore } from './stores';
import { LoadingKey } from './types/types-app-common';
import {
  AddFieldToWatchPayload,
  ParsedDataPayload,
  SetLoadingStatePayload,
} from '../common/types/types-common-payloads';
import { platformResolver } from '../content/platforms/PlatformResolver';
import { getDebugPrefix } from '../common/loggers/loggers-debug';

const loggers = require('../common/loggers').loggers
  .addPrefix(getDebugPrefix('app'))
  .addPrefix('listeners');

(addListener as MessageListener)(
  ListenerType.OnMessage,
  (message) => {
    if (isMessageMatched(
      () => MessageToApp.AppShowExtension === message.type,
      message,
    )) {
      if (!rootStore.platformStore.platform) {
        rootStore.platformStore.setPlatform(platformResolver.resolve());
      }
      if (!rootStore.appStore.mounted) {
        require('./index');
      }
      if (!rootStore.appStore.isExtensionOpen) {
        rootStore.appStore.isExtensionOpen = true;
      }
    }

    if (isMessageMatched(
      () => MessageToApp.AppTakeNewResourceData === message.type,
      message,
    )) {
      rootStore.appStore.startLoading(LoadingKey.resourcesAdding);
      rootStore.resourceStore.clearAllData();
      setTimeout(() => {
        rootStore.resourceStore.addAllData(message.payload as ParsedDataPayload);
        rootStore.appStore.stopLoading(LoadingKey.resourcesAdding);
      }, 0);
    }

    if (isMessageMatched(
      () => MessageToApp.AppTakeResourceData === message.type,
      message,
    )) {
      rootStore.appStore.startLoading(LoadingKey.resourcesAdding);
      rootStore.resourceStore.addAllData(message.payload as ParsedDataPayload);
      rootStore.appStore.stopLoading(LoadingKey.resourcesAdding);
    }

    if (isMessageMatched(
      () => MessageToApp.AppClearResourceData === message.type,
      message,
    )) {
      rootStore.resourceStore.clearAllData();
    }

    if (isMessageMatched(
      () => MessageToApp.AppAddFieldToWatch === message.type,
      message,
    )) {
      const { fieldName } = message.payload as AddFieldToWatchPayload;
      rootStore.appStore.startLoading(LoadingKey.fieldAdding);
      rootStore.resourceStore.addField(fieldName);
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
  },
);

loggers.debug().log('mounted');