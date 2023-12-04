import { getBrowserContext } from '../../../common/common-extension-helpers';
import { makeObservable, observable } from 'mobx';

export class AppStorageStore {
  @observable
  public storage = {};

  private listener = () => {
    this.init();
  };

  constructor() {
    getBrowserContext().storage?.onChanged?.removeListener?.(this.listener);
    getBrowserContext().storage?.onChanged?.addListener?.(this.listener);
    this.init();
    makeObservable(this);
  }

  private async init() {
    getBrowserContext().storage?.local.get().then((result: Record<string, unknown>) => {
      this.storage = result || {};
    });
  }
}
