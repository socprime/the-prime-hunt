import { MessageToBackground } from './background/types/types-background-messages';
import { debounce } from '../common/helpers';
import { getDebugPrefix } from './common/loggers/loggers-helpers';
import { loggers } from './common/loggers';

const { isInsideIframe } = require('./common/common-helpers');

// TODO content not always inside iframe
if (isInsideIframe()) {
  loggers.setPrefix(getDebugPrefix('content'));
} else {
  loggers.setPrefix(getDebugPrefix('app'));
}

const { sendMessageFromApp } = require('./content/services/content-services');

const toggleShowExtension = debounce(() => {
  sendMessageFromApp({
    id: 'toggle-show-extension',
    type: MessageToBackground.BGToggleShowExtension,
  });
}, 100);

document.addEventListener('keydown', (e: KeyboardEvent) => {
  const code = e.code?.toLowerCase?.() || '';
  if (code === 'keyq' && e.ctrlKey) {
    toggleShowExtension();
  }
});

if (isInsideIframe()) {
  require('./content/content-listeners');
} else {
  require('./migrations');
  require('./app/app-listeners');

  const platform = require('./content/platforms/PlatformResolver')
    .platformResolver.resolve();

  if (platform) {
    require('./app');
    require('./app/stores').rootStore.platformStore.setPlatform(platform);
  }
}
