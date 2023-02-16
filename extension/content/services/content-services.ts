import { ExtensionMessage } from '../../common/types/types-common';
import { uuid } from '../../../common/helpers';
import { isPostMessageSupported, isRuntimeSendMessageSupported } from '../../common/api-support';
import { Loggers } from '../../common/loggers';
import { getBrowserContext } from '../../common/common-extension-helpers';

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
      return message;
    }
    if (!runtime) {
      window.postMessage(message);
      loggers.debug().log('postMessage', message);
      return message;
    }

    if (!isRuntimeSendMessageSupported()) {
      return message;
    }

    getBrowserContext().runtime.sendMessage(message)
      ?.catch((e: Error) => loggers.error().addPrefix(logPrefix).log(e, message));
    loggers.debug().addPrefix(logPrefix).log(message);

    return message;
  } catch (e) {
    loggers.error().addPrefix(logPrefix).log(e, message);
    return message;
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
