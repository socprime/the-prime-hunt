import { ExtensionMessage } from '../../../common/types/types-common';
import { sendMessageFromApp } from '../../../content/services/content-services';
import { uuid } from '../../../../common/helpers';
import { AsyncResult } from '../../../../common/types';
import { AsyncProcessPayload } from '../../../common/types/types-common-payloads';
import { makeObservable, observable } from 'mobx';

type AsyncProcessID = string;
type Resolve = (value: unknown) => void;

export class AppMessageStore {
  private resolvers = new Map<AsyncProcessID, Resolve>();

  private timeoutInterval = 3000;

  @observable
  public inProgress = false;

  @observable
  public error: {
    error: Error | null,
  } = {
        error: null,
      };

  @observable
  public test: Record<string, any> = {};

  constructor() {
    makeObservable(this);
  }

  async sendMessageWithCallback(
    message: ExtensionMessage,
  ): Promise<AsyncResult> {
    this.inProgress = true;
    const id = uuid();
    const timeoutID = setTimeout(() => {
      this.resolve(id, {
        error: new Error('timeout'),
      });
    }, this.timeoutInterval);

    return new Promise((resolve) => {
      this.resolvers.set(id, (result: AsyncResult) => {
        clearTimeout(timeoutID);
        resolve(result);
      });
      sendMessageFromApp({
        ...message,
        payload: {
          ...(message.payload || {}),
          processID: id,
        },
      } as ExtensionMessage<AsyncProcessPayload>);
    });
  }

  resolve(id: AsyncProcessID, result: AsyncResult) {
    if (result.error && typeof result.error === 'string') {
      result.error = new Error(result.error);
    }
    if (result.error) {
      this.error.error = (result.error as Error);
    }
    (this.resolvers.get(id) as Resolve)(result);
    this.resolvers.delete(id);
    this.inProgress = false;
  }
}
