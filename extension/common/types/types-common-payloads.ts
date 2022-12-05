import {
  ModifyQueryType,
  PlatformID,
} from './types-common';
import { WatchingResources } from '../../background/types/types-background-common';
import { LoadingKey } from '../../app/types/types-app-common';
import {
  NormalizedParsedResources,
  NormalizedResources,
} from '../../app/resources/resources-types';

export type PlatformIDPayload = {
  platformID: PlatformID;
};

export type ParsedDataPayload = NormalizedResources;

export type ModifyQueryPayload = {
  modifyType: ModifyQueryType;
  resources: NormalizedParsedResources;
};

export type SetWatchersPayload = PlatformIDPayload & {
  watchers: WatchingResources;
};

export type SetLoadingStatePayload = {
  key: LoadingKey;
  loading: boolean;
};
