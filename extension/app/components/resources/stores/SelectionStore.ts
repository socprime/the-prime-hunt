import { IResourceSelectionStore } from '../resources-types';
import { NormalizedParsedResources } from '../../../../common/types/types-common';
import { computed, makeObservable, observable } from 'mobx';
import { FieldName, ResourceName } from '../../../../../common/types';

export abstract class SelectionStore implements IResourceSelectionStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  public selected = new Map<FieldName, Set<ResourceName>>();

  @observable
  public selectedFields = new Set<FieldName>();

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
    return Array.from(this.selectedFields)
      .reduce((count, fieldName) => count += this.selected.get(fieldName)!.size, 0);
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

  select(resourceName: ResourceName, fieldName: FieldName) {
    const values = this.selected.get(fieldName) || new Set();
    values.add(resourceName);
    this.selected.set(fieldName, values);
    this.selectedFields.add(fieldName);
  }

  unselect(resourceName: ResourceName, fieldName: FieldName) {
    const values = this.selected.get(fieldName) || new Set();
    values.delete(resourceName);
    if (values.size < 1) {
      this.selected.delete(fieldName);
      this.selectedFields.delete(fieldName);
      return;
    }
    this.selected.set(fieldName, values);
    this.selectedFields.add(fieldName);
  }

  unselectAll() {
    this.selected = new Map();
    this.selectedFields = new Set();
  }
}