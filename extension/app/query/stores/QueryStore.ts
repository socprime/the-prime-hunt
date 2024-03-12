import { makeObservable, observable } from 'mobx';
import { RootStore } from '../../stores/RootStore';
import { rootStore } from '../../stores';

export class QueryStore {
  @observable
  public query = {
      value: '',
    };

  public rootStore: RootStore = {} as RootStore;

  constructor() {
    makeObservable(this);
  }

  getQueryFromPlatform() {
    this.rootStore.platformStore.getQuery();
  }
}

const store = new QueryStore();

export const getStore = () => {
  if (!((store.rootStore as any) instanceof RootStore)) {
    store.rootStore = rootStore;
  }

  return store;
};

export const useQuery = () => {
  return getStore();
};
