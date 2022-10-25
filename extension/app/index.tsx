import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import { rootStore, RootStoreContext } from './stores';
import { Mode } from '../../common/types';
import { getWebAccessibleUrl, mountHTMLElement } from '../common/common-helpers';
import { mode } from '../common/envs';
import { appStyles } from '../manifest/public-resources';

require('../app/scss/reset.scss');
require('../app/scss/scroll.scss');

const rootElement = mountHTMLElement('div', document.body, {
  attributes: {
    style: {
      all: 'initial',
      'z-index': 999999999,
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
      'z-index': 999999999,
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

rootStore.appStore.mounted = true;