import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import { rootStore, RootStoreContext } from './stores';
import { addListener } from '../content/content-listeners';
import { ListenerType, MessageListener } from '../content/types/types-content-common';
import {
  AddFieldToWatchPayload,
  ParsedDataPayload,
  SetLoadingStatePayload,
} from '../common/types/types-common-payloads';
import { Mode } from '../../common/types';
import { getWebAccessibleUrl, mountHTMLElement } from '../common/common-helpers';
import { MessageToApp } from './types/types-app-messages';
import { isMessageMatched } from '../common/common-listeners';
import { mode } from '../common/envs';
import { appStyles } from '../manifest/public-resources';
import { LoadingKey } from './types/types-app-common';

const rootElement = mountHTMLElement('div', document.body, {
  attributes: {
    style: {
      all: 'initial',
      'z-index': 9999999,
    },
  },
});

mountHTMLElement('link', rootElement, {
  attributes: {
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    'data-type': 'app-fonts',
    rel: 'stylesheet',
  },
});

const host = rootElement.attachShadow({
  mode: mode === Mode.production ? 'closed' : 'open',
});

mountHTMLElement('style', host, {
  attributes: {
    'data-type': 'scroll-styles',
  },
  innerText: require('simplebar-react/dist/simplebar.min.css'),
});

mountHTMLElement('link', host, {
  attributes: {
    href: getWebAccessibleUrl(appStyles),
    'data-type': 'app-styles',
    rel: 'stylesheet',
  },
});

const overlay = mountHTMLElement('div', host, {
  attributes: {
    'data-type': 'overlay',
    'class': 'overlay',
    'style': {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      'background-color': 'transparent',
    },
  },
});

rootStore.appStore.overlay = overlay;

ReactDOM.createRoot(overlay)
  .render(
    <RootStoreContext.Provider value={rootStore}>
      <App />
    </RootStoreContext.Provider>,
  );

(addListener as MessageListener)(
  ListenerType.OnMessage,
  (message) => {
    if (isMessageMatched(
      () => MessageToApp.AppShowExtension === message.type,
      message,
    )) {
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