import { RootStore } from '../../stores/RootStore';
import { computed, makeObservable, observable } from 'mobx';
import { rootStore } from '../../stores';
import {
  SocPrimeCustomTags,
  SocPrimeData, SocPrimeRepositories, SocPrimeTags, StorageGroupNames,
} from '../../../models/socprime/types';
import { getSocPrimeModel } from '../../../models/socprime/model';
import { getInitialCustomTagsValues, getInitialTagsValues } from '../../../models/socprime/helpers';

const model = getSocPrimeModel();

export class SocPrimeStore {
  public rootStore: RootStore = {} as RootStore;

  @computed
  private get data(): SocPrimeData {
    return {
      ...((this.rootStore.appStorageStore.storage as any)?.[StorageGroupNames.socprime] || {}),
    };
  }

  static getInitialTagsValues() {
    return getInitialTagsValues();
  }

  static getInitialCustomTagsValues() {
    return getInitialCustomTagsValues();
  }

  public getInitialTagsValues(): SocPrimeTags {
    return SocPrimeStore.getInitialTagsValues();
  }

  public getInitialCustomTagsValues(): SocPrimeCustomTags {
    return SocPrimeStore.getInitialCustomTagsValues();
  }

  @observable
  public tags: SocPrimeTags = SocPrimeStore.getInitialTagsValues();

  @observable
  public customTags: SocPrimeCustomTags = SocPrimeStore.getInitialCustomTagsValues();

  @observable
  public repositories: SocPrimeRepositories = [];

  public get apiKey(): SocPrimeData['apiKey'] {
    return this.data.apiKey;
  }

  public get keyExpirationData(): SocPrimeData['expirationData'] {
    return this.data.expirationData;
  }

  public async setApiKey(apiKey: SocPrimeData['apiKey']) {
    return model.setApiKey(apiKey);
  }

  public async setKeyExpirationDate(expirationDate: SocPrimeData['expirationData']) {
    return model.setExpirationDate(expirationDate);
  }

  constructor() {
    makeObservable(this);
  }
}

const socprime = new SocPrimeStore();

export const useSocPrime = () => {
  if (!((socprime.rootStore as any) instanceof RootStore)) {
    socprime.rootStore = rootStore;
  }

  return socprime;
};
