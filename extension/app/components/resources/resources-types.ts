import { NormalizedParsedResources } from '../../../common/types/types-common';
import { FieldName, ResourceName } from '../../../../common/types';

export type IResourceSelectionStore = {
  selected: Map<FieldName, Set<ResourceName>>;
  selectedFields: Set<FieldName>;
  normalisedSelected: NormalizedParsedResources;
  countSelected: number;
  uniqueSelected: ResourceName[];

  select(resourceName: ResourceName, fieldName: FieldName): void;
  unselect(resourceName: ResourceName, fieldName: FieldName): void;
};
