import { PlatformResolver } from './content/platforms/PlatformResolver';
import { sendMessageFromApp } from './content/content-services';
import { MessageToBackground } from './background/types/types-background-messages';
import { PlatformIDPayload, SetWatchersPayload } from './common/types/types-common-payloads';
import { mountHTMLElement, isInsideIframe } from './common/common-helpers';
import { getWatchers } from './common/local-storage';

const platformResolver = new PlatformResolver();

document.body.onload = (): any => {
  const platform = platformResolver.resolve();
  platform?.connect();

  if (isInsideIframe()) {
    return mountHTMLElement('div', document.body, {
      attributes: {
        'data-worker': 'mounted',
      },
    });
  }

  require('./app/scss/reset.scss');
  require('./app/scss/scroll.scss');
  require('./app');
  
  if (platform) {
    const rootStore = require('./app/stores').rootStore;

    rootStore.platformStore.platform = platform;
    rootStore.appStore.view = 'resources';
    rootStore.appStore.setPosition(platform.extensionDefaultPosition);

    sendMessageFromApp<PlatformIDPayload>({
      type: MessageToBackground.BGRegisterPlatformTab,
      payload: {
        platformID: platform.getID(),
      },
    });

    sendMessageFromApp<SetWatchersPayload>({
      type: MessageToBackground.BGSetWatchers,
      payload: {
        watchers: getWatchers(platform.getID()),
        platformID: platform.getID(),
        action: 'add',
      },
    });
  }
};
