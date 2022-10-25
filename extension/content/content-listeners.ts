import { addListener } from './services/content-services-listeners';
import { ListenerType, MessageListener } from './types/types-content-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToContent } from './types/types-content-messages';
import { platformResolver } from './platforms/PlatformResolver';
import { getDebugPrefix } from '../common/loggers/loggers-debug';

const loggers = require('../common/loggers').loggers
  .addPrefix(getDebugPrefix('content'))
  .addPrefix('listeners');

let platform = platformResolver.resolve();
if (platform) {
  platform.connect();
}

(addListener as MessageListener)(
  ListenerType.OnMessage,
  (message) => {
    if (isMessageMatched(
      () => MessageToContent.CSConnectPlatform === message.type,
      message,
    )) {
      if (!platform) {
        platformResolver.resolve()?.connect?.();
      }
    }
  },
);

loggers.debug().log('mounted');