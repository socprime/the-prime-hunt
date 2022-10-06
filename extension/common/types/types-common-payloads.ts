import {
  ModifyQueryType,
  NormalizedParsedResources,
  NormalizedParsedResult,
  PlatformID,
} from './types-common';
import { FieldName } from '../../../common/types';
import { WatchingResources } from '../../background/types/types-background-common';
import { LoadingKey } from '../../app/types/types-app-common';

export type PlatformIDPayload = {
  platformID: PlatformID;
};

export type ParsedDataPayload = NormalizedParsedResult;

export type ModifyQueryPayload = {
  modifyType: ModifyQueryType;
  resources: NormalizedParsedResources;
};

export type SetWatchersPayload = PlatformIDPayload & {
  watchers: WatchingResources;
  action: 'remove' | 'add';
};

export type AddFieldToWatchPayload = {
  fieldName: FieldName;
};

export type SetLoadingStatePayload = {
  key: LoadingKey;
  loading: boolean;
};
