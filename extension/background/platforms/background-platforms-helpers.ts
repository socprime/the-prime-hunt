import { WatchingResources } from '../types/types-background-common';
import { FieldName } from '../../../common/types';
import { ResourceType } from '../../common/types/types-common';
import { deduplicateArray } from '../../../common/helpers';

export const addFieldToWatch = (
  watchers: WatchingResources,
  fieldName: FieldName,
  type: ResourceType,
): WatchingResources => {
  const fieldsNames = watchers[type] || [];
  if (!fieldsNames.includes(fieldName)) {
    fieldsNames.push(fieldName);
  }
  watchers[type] = deduplicateArray(fieldsNames);
  return watchers;
};

export const removeFieldFromWatching = (
  watchers: WatchingResources,
  fieldName: FieldName,
  type: ResourceType,
): WatchingResources => {
  watchers[type] = (watchers[type] || [])
    .filter(f => f !== fieldName);
  return watchers;
};

export const getNormalizedWatchers = (
  watchers: WatchingResources,
): {
  fieldsNames: Set<FieldName>;
  mapFieldNameToType: Map<FieldName, ResourceType[]>;
} => {
  const fieldsNames = new Set<FieldName>();
  const mapFieldNameToType = new Map<FieldName, ResourceType[]>();

  Object.keys(watchers).forEach((type: ResourceType) => {
    const names = watchers[type];
    names.forEach(name => {
      fieldsNames.add(name);
      const types = mapFieldNameToType.get(name) || [];
      types.push(type);
      mapFieldNameToType.set(name, types);
    });
  });

  return { fieldsNames, mapFieldNameToType };
};