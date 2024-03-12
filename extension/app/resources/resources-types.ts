export type FieldName = string;
export type ResourceName = string;

export enum BoundedResourceTypeID {
  Accounts = 'Accounts',
  Assets = 'Assets',
}

export const QueryTabID = '@@#Query#';

export const boundedResourcesTypeIDs = Object.keys(BoundedResourceTypeID);

export const serviceResourcesTypesIDs = [QueryTabID, ...boundedResourcesTypeIDs];

export type ResourceTypeID =
  BoundedResourceTypeID.Accounts
  | BoundedResourceTypeID.Assets
  | string;

export type TabName = ResourceTypeID;
export type TabID = TabName;

export type Resources = {
  [typeID: ResourceTypeID]: ParsedResources;
};

export type NormalizedResources = {
  [typeID: ResourceTypeID]: NormalizedParsedResources;
};

export type ParsedResources = {
  [fieldName: FieldName]: Set<ResourceName>;
};

export type NormalizedParsedResources = {
  [fieldName: FieldName]: ResourceName[];
};

export type ParsedResult = {
  [key in ResourceTypeID]: ParsedResources;
};

export type IResourceSelectionStore = {
  selected: Map<FieldName, Set<ResourceName>>;
  selectedFields: Set<FieldName>;
  normalisedSelected: NormalizedParsedResources;
  countSelected: number;
  uniqueSelected: ResourceName[];

  select(resourceName: ResourceName, fieldName: FieldName): void;
  unselect(resourceName: ResourceName, fieldName: FieldName): void;
};

export type ResourceType = 'unknown' | 'email' | 'md5' | 'sha1' | 'sha256' | 'sha512' | 'url' | 'ipv4' | 'ipv6' | 'mac-address' | 'domain-name';
