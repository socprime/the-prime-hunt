import { getDebugPrefix } from './common/loggers/loggers-debug';
import { MessageToBackground } from './background/types/types-background-messages';
import { debounce } from '../common/helpers';

const isInsideIframe = require('./common/common-helpers').isInsideIframe;

if (isInsideIframe()) {
  require('./common/loggers').loggers
    .setPrefix(getDebugPrefix('content'));
} else {
  require('./common/loggers').loggers
    .setPrefix(getDebugPrefix('app'));
}

document.body.onload = (): any => {
  const sendMessageFromApp = require('./content/services/content-services').sendMessageFromApp;
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
    return require('./content/content-listeners');
  }

  require('./migrations');
  require('./app/app-listeners');

  const platform = require('./content/platforms/PlatformResolver')
    .platformResolver.resolve();

  if (platform) {
    require('./app');
    require('./app/stores').rootStore.platformStore.setPlatform(platform);
  }
};
