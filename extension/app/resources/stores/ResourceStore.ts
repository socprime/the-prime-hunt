import { action, computed, makeObservable, observable } from 'mobx';
import { RootStore } from '../../stores/RootStore';
import { sendMessageFromApp } from '../../../content/services/content-services';
import { MessageToBackground } from '../../../background/types/types-background-messages';
import { SetWatchersPayload } from '../../../common/types/types-common-payloads';
import { setWatchers } from '../../../common/local-storage';
import {
  BoundedResourceTypeID,
  FieldName,
  NormalizedResources,
  ParsedResources,
  ResourceName,
  Resources,
  ResourceTypeID,
  TabID,
  TabName,
} from '../resources-types';
import { WatchingResources } from '../../../background/types/types-background-common';
import { Url } from '../../../../common/types';

export class ResourceStore {
  private readonly rootStore: RootStore;

  private refreshResources() {
    this.resources = { ...this.resources };
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable
  public cacheID: Url;

  @observable
  public resources: Resources = {
      [BoundedResourceTypeID.Accounts]: {},
      [BoundedResourceTypeID.Assets]: {},
    };

  @computed
  get tabsNames(): TabName[] {
    return Object.keys(this.resources || {});
  }

  @observable
  public activeTabID: ResourceTypeID = BoundedResourceTypeID.Accounts;

  @computed
  get countAllResources(): number {
    let result = 0;
    Object.keys(this.resources).forEach(typeID => {
      Object.keys(this.resources[typeID]).forEach(fieldName => {
        result += this.resources[typeID][fieldName]?.size || 0;
      });
    });
    return result;
  }

  isTabExist(tabID: TabID): boolean {
    return typeof this.resources[tabID] !== 'undefined';
  }

  isFieldExist(tabID: TabID, fieldName: FieldName): boolean {
    return typeof this.resources[tabID][fieldName] !== 'undefined';
  }

  getFieldsNames(typeID: ResourceTypeID = this.activeTabID): FieldName[] {
    return Object.keys(this.resources[typeID] || []);
  }

  @action
  addResources(resources: NormalizedResources) {
    let needSaveWatchers = false;

    Object.keys(resources || {}).forEach(tabID => {
      if (!this.isTabExist(tabID)) {
        this.addTab(tabID);
        needSaveWatchers = true;
      }
      Object.keys(resources[tabID]).forEach(fieldName => {
        if (!this.isFieldExist(tabID, fieldName)) {
          needSaveWatchers = true;
          this.addField(fieldName, false, tabID);
        }
        let set = this.resources[tabID][fieldName];
        resources[tabID][fieldName].forEach(resourceName => {
          if (!set.has(resourceName)) {
            set.add(resourceName);
          }
        });
        this.resources[tabID][fieldName] = set;
      });
    });

    if (needSaveWatchers) {
      this.saveWatchers('add-resources');
    }

    this.refreshResources();
  }

  clearResources() {
    const newResources: Resources = {};
    Object.keys(this.resources).forEach(typeID => {
      newResources[typeID] = {};
      Object.keys(this.resources[typeID]).forEach(fieldName => {
        newResources[typeID][fieldName] = new Set();
      });
    });
    this.rootStore.resourcesSelectionStore.unselectAll();
    this.resources = newResources;
  }

  getResources(
    fieldName: string,
    tabID = this.activeTabID,
  ): ResourceName[] {
    return Array.from(this.resources[tabID][fieldName]);
  }

  addTab(tabID: TabID, save = false) {
    if (this.resources[tabID]) {
      return;
    }
    this.resources[tabID] = {};

    if (save) {
      this.saveWatchers('add-tab');
    }

    this.refreshResources();
  }

  removeTab(tabID: TabID, save = false) {
    if (!this.resources[tabID]) {
      return;
    }
    delete this.resources[tabID];
    if (tabID === this.activeTabID) {
      this.activeTabID = Object.keys(this.resources)[0];
    }

    if (save) {
      this.saveWatchers('remove-tab');
    }

    this.refreshResources();
  }

  renameTab(tabID: TabID, tabName: TabName, save = false) {
    if (tabID === tabName) {
      return;
    }
    this.resources[tabName] = this.resources[tabID];
    delete this.resources[tabID];

    if (save) {
      this.saveWatchers('rename-tab');
    }

    this.refreshResources();
  }

  addField(
    fieldName: FieldName,
    save = false,
    tabID = this.activeTabID,
  ) {
    if (this.resources[tabID][fieldName]) {
      return;
    }
    this.resources[tabID][fieldName] = new Set();

    if (save) {
      this.saveWatchers('add-field');
    }

    this.refreshResources();
  }

  removeField(
    fieldName: FieldName,
    save = false,
    tabID = this.activeTabID,
  ) {
    const selectionStore = this.rootStore.resourcesSelectionStore;

    selectionStore.selectedFields.delete(fieldName);
    selectionStore.selected.delete(fieldName);

    let resource = this.resources[tabID];
    this.resources[tabID] = Object
      .keys(resource)
      .reduce((r, name) => {
        if (name !== fieldName) {
          r[name] = resource[name];
        }
        return r;
      }, {} as ParsedResources);

    if (save) {
      this.saveWatchers('remove-field');
    }

    this.refreshResources();
  }

  setWatchers(watchers: WatchingResources) {
    Object.keys(watchers).forEach(typeID => {
      this.addTab(typeID);
      let currentFieldsNames = Object.keys(this.resources[typeID] || {});
      watchers[typeID].forEach(fieldName => {
        this.addField(fieldName, false, typeID);
        currentFieldsNames = currentFieldsNames.filter(fn => fn !== fieldName);
      });
      currentFieldsNames.forEach(fn => {
        this.removeField(fn, false, typeID);
      });
    });
  }

  saveWatchers(
    messageId?: string,
  ) {
    const platformID = this.rootStore.platformStore.getID();
    if (!platformID) {
      return;
    }

    sendMessageFromApp<SetWatchersPayload>({
      id: `save-watchers${messageId ? `--${messageId}` : ''}`,
      type: MessageToBackground.BGSetWatchers,
      payload: {
        platformID,
        cacheID: this.cacheID,
        watchers: setWatchers(
          Object.keys(this.resources).reduce((watchingResources, typeID) => {
            watchingResources[typeID] = Object.keys(this.resources[typeID]);
            return watchingResources;
          }, {} as WatchingResources),
        ),
      },
    });
  }
}
