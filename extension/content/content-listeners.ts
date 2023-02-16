import { addListener } from './services/content-services-listeners';
import { ListenerType, MessageListener } from './types/types-content-common';
import { isMessageMatched } from '../common/common-listeners';
import { MessageToContent } from './types/types-content-messages';
import { platformResolver } from './platforms/PlatformResolver';
import { SetDebugModePayload } from '../common/types/types-common-payloads';

const loggers = require('../common/loggers').loggers
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

    if (isMessageMatched(
      () => MessageToContent.CSSetDebugMode === message.type,
      message,
    )) {
      const { debugMode } = message.payload as SetDebugModePayload;
      require('../common/loggers').setDebugMode(debugMode);
    }
  },
);

loggers.debug().log('mounted');