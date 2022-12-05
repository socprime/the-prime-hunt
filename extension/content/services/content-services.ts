import { getBrowserContext } from '../../common/common-helpers';
import { ExtensionMessage } from '../../common/types/types-common';
import { uuid } from '../../../common/helpers';
import { isPostMessageSupported, isRuntimeSendMessageSupported } from '../../common/api-support';
import { Loggers } from '../../common/loggers';

const serviceLoggers = require('../../common/loggers').loggers
  .addPrefix('services');

export const sendMessage = <T = unknown>(
  loggers: Loggers,
  message: ExtensionMessage<T>,
  runtime = true,
) => {
  message.id = `${message.id ? `${message.id}--` : ''}${uuid()}`;
  const logPrefix = 'sendMessage';

  try {
    if (!runtime && !isPostMessageSupported(message)) {
      return;
    }
    if (!runtime) {
      window.postMessage(message);
      return loggers.debug().log('postMessage', message);
    }

    if (!isRuntimeSendMessageSupported()) {
      return;
    }

    getBrowserContext().runtime.sendMessage(message)
      ?.catch((e: Error) => loggers.error().addPrefix(logPrefix).log(e, message));
    loggers.debug().addPrefix(logPrefix).log(message);

  } catch (e) {
    loggers.error().addPrefix(logPrefix).log(e, message);
  }
};

export const sendMessageFromContent = <T = unknown>(
  message: ExtensionMessage<T>,
  runtime = true,
) => {
  return sendMessage<T>(
    serviceLoggers.addPrefix('message-from-content'),
    message,
    runtime,
  );
};

export const sendMessageFromApp = <T = unknown>(
  message: ExtensionMessage<T>,
  runtime = true,
) => {
  return sendMessage<T>(
    serviceLoggers.addPrefix('message-from-app'),
    message,
    runtime,
  );
};
