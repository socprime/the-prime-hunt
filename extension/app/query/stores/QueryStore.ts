import { makeObservable, observable } from 'mobx';
import { RootStore } from '../../stores/RootStore';
import { rootStore } from '../../stores';

export class QueryStore {
  @observable
  private query = {
      value: '',
      meta: {} as Record<string, string>,
    };

  public rootStore: RootStore = {} as RootStore;

  constructor() {
    makeObservable(this);
  }

  setQuery(query: string, meta?: Record<string, string>) {
    this.query = {
      value: query,
      meta: meta || {},
    };
  }

  getQuery() {
    return this.query.value;
  }

  getQueryMeta() {
    return this.query.meta;
  }

  getQueryFromPlatform() {
    let isEditMigrationRule = false;
    document
      .querySelectorAll('iframe[name="EditSiemMigrationRule.ReactView"]')
      .forEach((el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        if (rect.height < 1 && rect.width < 1) {
          return;
        }
        isEditMigrationRule = true;
      });
    this.rootStore.platformStore.getQuery(isEditMigrationRule ? {
      type: 'EditMigrationRule',
    } : undefined);
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
