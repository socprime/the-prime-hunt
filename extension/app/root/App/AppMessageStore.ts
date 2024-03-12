import { ExtensionMessage } from '../../../common/types/types-common';
import { sendMessageFromApp } from '../../../content/services/content-services';
import { deserializeDataInResult, uuid } from '../../../../common/helpers';
import { AsyncResult } from '../../../../common/types';
import { AsyncProcessPayload, CallBackMessagePayload } from '../../../common/types/types-common-payloads';
import { computed, makeObservable, observable } from 'mobx';
import { MessageToBackground } from '../../../background/types/types-background-messages';
import { RootStore } from '../../stores/RootStore';

type AsyncProcessID = string;
type Resolve = (value: unknown) => void;

export class AppMessageStore {
  private static loadingKeyPrefix = 'callback-message-loading';

  private static getLoadingKey(processID: string) {
    return `${AppMessageStore.loadingKeyPrefix}--${processID}`;
  }

  @observable
  private resolvers = new Map<AsyncProcessID, Resolve>();

  private timeoutInterval = 3000;

  private rootStore = {} as RootStore;

  @computed
  public get inProgress() {
    return this.resolvers.size > 0;
  }

  @observable
  public error: {
    error: Error | null,
    id: string,
  } = {
        id: '',
        error: null,
      };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  async sendMessageWithCallback<T = any>(
    payload: CallBackMessagePayload,
    processID?: string,
  ): Promise<AsyncResult<T>> {
    const id = processID || uuid();
    const timeoutID = setTimeout(() => {
      this.resolve(id, {
        error: new Error('Request timeout exceed'),
      });
    }, this.timeoutInterval);

    return new Promise((resolve) => {
      this.rootStore.appStore.startLoading(
        AppMessageStore.getLoadingKey(id),
      );
      this.resolvers.set(id, (result: AsyncResult) => {
        clearTimeout(timeoutID);
        resolve(result);
      });

      const message = {
        type: MessageToBackground.BGTakeCallbackMessage,
        payload: {
          ...payload,
          processID: id,
        } as AsyncProcessPayload,
      } as ExtensionMessage;

      sendMessageFromApp(message);
    });
  }

  resolve(id: AsyncProcessID, result: AsyncResult) {
    const {
      result: deserializedResult,
      errors,
    } = deserializeDataInResult(result);

    if (errors.length) {
      this.setError(errors[0], id);
    } else {
      this.cleanError();
    }

    (this.resolvers.get(id) as Resolve)?.(deserializedResult);
    this.resolvers.delete(id);

    if (this.resolvers.size < 1) {
      this.resolvers = new Map();
    }

    this.rootStore.appStore.stopLoading(
      AppMessageStore.getLoadingKey(id),
    );
  }

  setError(error: Error | null, id: string) {
    this.error.error = error;
    this.error.id = id;
  }

  cleanError() {
    this.error.error = null;
    this.error.id = '';
  }
}
