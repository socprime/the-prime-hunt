import { MessageToBackground } from '../../background/types/types-background-messages';
import { MessageToContent } from '../../content/types/types-content-messages';
import { MessageToInline } from '../../inline/types/types-inline-messages';
import { MessageToApp } from '../../app/types/types-app-messages';
import { UniqueHash } from '../../../common/types';

export enum Browser {
  chrome = 'chrome',
  // safari = 'safari',
  firefox = 'firefox',
  edge = 'edge',
}

export type BrowserTabID = number;

export type ResourceType = 'services' | 'accounts' | 'assets';

export type ParsedResources = {
  [fieldName: string]: Set<string>;
};

export type NormalizedParsedResources = {
  [fieldName: string]: string[];
};

export type ParsedResult = {
  [key in ResourceType]: ParsedResources;
};

export type NormalizedParsedResult = {
  [key in ResourceType]: NormalizedParsedResources;
};

export type ExtensionMessageType = MessageToBackground | MessageToContent | MessageToInline | MessageToApp;

export type ExecutingContext = 'background' | 'app' | 'content' | 'inline';

export type ExtensionMessage<T = any> = {
  type: ExtensionMessageType;
  id?: UniqueHash;
  payload?: T;
};

export enum PlatformID {
  microsoftSentinel = 'microsoftSentinel',
  microsoftDefenderForEndpoint = 'microsoftDefenderForEndpoint',
}

export type IPlatform = {
  getID(): PlatformID;
};

export type ModifyQueryType = 'include' | 'exclude' | 'show all';
