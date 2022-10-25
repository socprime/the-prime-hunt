import { computed, makeObservable, observable } from 'mobx';
import { NormalizedParsedResources, ParsedResources, ResourceType } from '../../../../common/types/types-common';
import { RootStore } from '../../../stores/RootStore';
import { sendMessageFromApp } from '../../../../content/services/content-services';
import { MessageToBackground } from '../../../../background/types/types-background-messages';
import { ResourceName } from '../../../../../common/types';
import { SetWatchersPayload } from '../../../../common/types/types-common-payloads';
import {
  addFieldToWatch,
  removeFieldFromWatching,
} from '../../../../background/platforms/background-platforms-helpers';
import { getWatchers, setWatchers } from '../../../../common/local-storage';
import { uuid } from '../../../../../common/helpers';

export class ResourceStore {
  private addResource(
    resource: ParsedResources,
    appendResource: NormalizedParsedResources,
  ): ParsedResources {
    const fieldNames = Object.keys(appendResource);
    fieldNames.forEach(fieldName => {
      const set = resource[fieldName] || new Set();
      appendResource[fieldName].forEach(resourceName => set.add(resourceName));
      resource[fieldName] = set;
    });
    return fieldNames.length ? { ...resource } : resource;
  }

  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable
  public activeTab: ResourceType = 'accounts';

  @observable
  public services: ParsedResources = {};

  @observable
  public assets: ParsedResources = {};

  @observable
  public accounts: ParsedResources = {};

  @computed
  get countAllResources(): number {
    let result = 0;
    Object.keys(this.services).forEach(fieldName => {
      result += this.services[fieldName]?.size || 0;
    });
    Object.keys(this.assets).forEach(fieldName => {
      result += this.assets[fieldName]?.size || 0;
    });
    Object.keys(this.accounts).forEach(fieldName => {
      result += this.accounts[fieldName]?.size || 0;
    });
    return result;
  }

  addServices(services: NormalizedParsedResources = {}) {
    this.services = this.addResource(this.services, services);
  }

  addAccounts(accounts: NormalizedParsedResources = {}) {
    this.accounts = this.addResource(this.accounts, accounts);
  }

  addAssets(assets: NormalizedParsedResources = {}) {
    this.assets = this.addResource(this.assets, assets);
  }

  clearAllSelections() {
    this.rootStore.servicesSelectionStore.unselectAll();
    this.rootStore.accountsSelectionStore.unselectAll();
    this.rootStore.assetsSelectionStore.unselectAll();
  }

  addAllData(resources: {
    [key in ResourceType]: NormalizedParsedResources;
  }) {
    this.addAssets(resources.assets);
    this.addAccounts(resources.accounts);
    this.addServices(resources.services);
  }

  clearAllData() {
    this.services = {};
    this.assets = {};
    this.accounts = {};
    this.clearAllSelections();
  }

  getResources(fieldName: string): ResourceName[] {
    return Array.from(this[this.activeTab][fieldName]);
  }

  addField(fieldName: string) {
    const platformID = this.rootStore.platformStore.platform?.getID();

    sendMessageFromApp<SetWatchersPayload>({
      id: `add-field--${uuid()}`,
      type: MessageToBackground.BGSetWatchers,
      payload: {
        platformID,
        action: 'add',
        watchers: setWatchers(
          addFieldToWatch(
            getWatchers(platformID),
            fieldName,
            this.activeTab,
          ),
        ),
      },
    });
  }

  removeField(fieldName: string) {
    const resourceType = this.activeTab;
    const selectionStore = resourceType === 'assets'
      ? this.rootStore.assetsSelectionStore
      : resourceType === 'services'
        ? this.rootStore.servicesSelectionStore
        : this.rootStore.accountsSelectionStore;

    selectionStore.selectedFields.delete(fieldName);
    selectionStore.selected.delete(fieldName);

    let resource = resourceType === 'assets'
      ? this.assets
      : resourceType === 'services'
        ? this.services
        : this.accounts;
    this[resourceType] = Object.keys(resource).reduce((r, name) => {
      if (name !== fieldName) {
        r[name] = resource[name];
      }
      return r;
    }, {} as ParsedResources);

    const platformID = this.rootStore.platformStore.platform.getID();

    sendMessageFromApp<SetWatchersPayload>({
      id: `remove-field--${uuid()}`,
      type: MessageToBackground.BGSetWatchers,
      payload: {
        platformID,
        action: 'remove',
        watchers: setWatchers(
          removeFieldFromWatching(
            getWatchers(platformID),
            fieldName,
            resourceType,
          ),
        ),
      },
    });
  }
}
