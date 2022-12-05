import {
  FieldName,
  IResourceSelectionStore,
  NormalizedParsedResources,
  ResourceName,
  ResourceTypeID,
} from '../resources-types';
import { computed, makeObservable, observable } from 'mobx';
import { RootStore } from '../../stores/RootStore';

export class ResourcesSelectionStore implements IResourceSelectionStore {
  private rootStore: RootStore;

  private getActiveTypeID(): ResourceTypeID {
    return this.rootStore.resourceStore.activeTabID;
  }

  private refreshSelections() {
    this.selectedResources = { ...this.selectedResources };
    this.selectedResourcesFields = { ...this.selectedResourcesFields };
  }

  private countByTypeID(typeID: ResourceTypeID): number {
    return Array.from(this.selectedResourcesFields[typeID] || [])
      .reduce((count, fieldName) => count += (this.selectedResources[typeID] || new Map()).get(fieldName)?.size || 0, 0);
  }

  private unselectByTypeID(typeID: ResourceTypeID) {
    this.selectedResources[typeID] = new Map();
    this.selectedResourcesFields[typeID] = new Set();
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable
  public selectedResources: {
    [key in ResourceTypeID]: Map<FieldName, Set<ResourceName>>;
  } = {};

  @observable
  public selectedResourcesFields: {
    [key in ResourceTypeID]: Set<FieldName>;
  } = {};

  @computed
  get selected() {
    const typeID = this.getActiveTypeID();
    if (!this.selectedResources[typeID]) {
      this.selectedResources[typeID] = new Map();
    }

    return this.selectedResources[typeID];
  }

  @computed
  get selectedFields() {
    const typeID = this.getActiveTypeID();
    if (!this.selectedResourcesFields[typeID]) {
      this.selectedResourcesFields[typeID] = new Set();
    }

    return this.selectedResourcesFields[typeID];
  }

  @computed
  get normalisedSelected(): NormalizedParsedResources {
    return Array.from(this.selectedFields)
      .reduce((result, fieldName) => {
        result[fieldName] = Array.from(this.selected.get(fieldName)!);
        return result;
      }, {} as NormalizedParsedResources);
  }

  @computed
  get countSelected(): number {
    return this.countByTypeID(this.getActiveTypeID());
  }

  @computed
  get countAllSelected(): number {
    let result = 0;
    Object.keys(this.selectedResources).forEach(typeID => {
      result = result + this.countByTypeID(typeID);
    });
    return result;
  }

  @computed
  get uniqueSelected(): ResourceName[] {
    return Array.from(
      Array.from(this.selectedFields).reduce((res, fieldName) => {
        Array.from(this.selected.get(fieldName)!).forEach(v => res.add(v));
        return res;
      }, new Set<string>()),
    );
  }

  select(
    fieldName: FieldName,
    resourceName?: ResourceName,
    tabID = this.getActiveTypeID(),
  ) {
    if (typeof resourceName === 'undefined') {
      this.selectedResources[tabID].set(
        fieldName,
        new Set(this.rootStore.resourceStore.getResources(fieldName, tabID)),
      );
      this.selectedResourcesFields[tabID].add(fieldName);
      this.refreshSelections();
      return;
    }

    const values = this.selected.get(fieldName) || new Set();
    values.add(resourceName);
    this.selectedResources[tabID].set(fieldName, values);
    this.selectedResourcesFields[tabID].add(fieldName);
    this.refreshSelections();
  }

  unselect(
    fieldName: FieldName,
    resourceName?: ResourceName,
    tabID = this.getActiveTypeID(),
  ) {
    let values = this.selected.get(fieldName) || new Set();
    if (typeof resourceName === 'undefined') {
      values = new Set();
    } else {
      values.delete(resourceName);
    }
    if (values.size < 1) {
      this.selectedResources[tabID].delete(fieldName);
      this.selectedResourcesFields[tabID].delete(fieldName);
      this.refreshSelections();
      return;
    }
    this.selectedResources[tabID].set(fieldName, values);
    this.selectedResourcesFields[tabID].add(fieldName);
    this.refreshSelections();
  }

  unselectAll() {
    Object.keys(this.selectedResources).forEach(typeID => {
      this.unselectByTypeID(typeID);
    });
    this.refreshSelections();
  }
}