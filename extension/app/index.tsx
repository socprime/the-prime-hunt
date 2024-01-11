import ReactDOM from 'react-dom/client';
import { rootStore } from './stores';
import { Mode } from '../../common/types';
import { mountHTMLElement } from '../common/common-helpers';
import { mode, version } from '../common/envs';
import { appStyles } from '../manifest/public-resources';
import { getWebAccessibleUrl } from '../common/common-extension-helpers';
import { RootApp } from './root';

require('./scss/reset.scss');
require('./scss/scroll.scss');

const rootElement = mountHTMLElement('div', document.body, {
  attributes: {
    style: {
      all: 'initial',
      'z-index': 999999999,
    },
    'data-version': version,
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
    class: 'overlay',
    style: {
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
  .render(<RootApp rootStore={rootStore} />);

rootStore.appStore.mounted = true;

setTimeout(() => {
  if (Array.from(
    document.querySelectorAll(
      'div[style^="all:initial"]',
    ),
  ).length > 1) {
    alert('Warning! The Prime Hunt Extension is already installed! Please remove previous version first to avoid conflicts.');
  }
}, 2000);
