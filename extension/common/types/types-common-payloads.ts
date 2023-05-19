import {
  ExtensionMessageType,
  ModifyQueryType,
  PlatformID,
} from './types-common';
import { WatchingResources } from '../../background/types/types-background-common';
import { LoadingKey } from '../../app/types/types-app-common';
import {
  NormalizedParsedResources,
  NormalizedResources,
} from '../../app/resources/resources-types';
import { MessageToBackground } from '../../background/types/types-background-messages';
import { Url } from '../../../common/types';

export type PlatformIDPayload = {
  platformID: PlatformID;
};

export type ParsedDataPayload = {
  cacheID: Url;
  resources: NormalizedResources;
  fieldsNames: string[];
};

export type ModifyQueryPayload = {
  modifyType: ModifyQueryType;
  resources: NormalizedParsedResources;
};

export type SetQueryPayload = {
  value: string;
};

export type TakeQueryPayload = {
  queryValue: string;
};

export type DirectMessagePayload<T = any> = {
  type: ExtensionMessageType;
  payload?: T;
};

export type ShowMessagePayload = {
  show: boolean;
};

export type SetWatchersPayload = PlatformIDPayload & {
  cacheID: Url;
  watchers: WatchingResources;
};

export type SyncWatchersPayload = {
  watchers: WatchingResources;
};

export type SetLoadingStatePayload = {
  key: LoadingKey;
  loading: boolean;
};

export type SendToBackgroundPayload = {
  type: MessageToBackground,
  payload: object;
};

export type SetDebugModePayload = {
  debugMode: boolean;
};
