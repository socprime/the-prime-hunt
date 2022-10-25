import { platformResolver } from './content/platforms/PlatformResolver';
import { isInsideIframe } from './common/common-helpers';

require('./updates');

document.body.onload = (): any => {
  if (isInsideIframe()) {
    return require('./content/content-listeners');
  }

  require('./app/app-listeners');

  const platform = platformResolver.resolve();

  if (platform) {
    require('./app');
    require('./app/stores').rootStore.platformStore.setPlatform(platform);
  }
};
