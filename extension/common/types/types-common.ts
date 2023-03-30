import { MessageToBackground } from '../../background/types/types-background-messages';
import { MessageToContent } from '../../content/types/types-content-messages';
import { MessageToInline } from '../../inline/types/types-inline-messages';
import { MessageToApp } from '../../app/types/types-app-messages';
import { UniqueHash } from '../../../common/types';

export enum Browser {
  chrome = 'chrome',
  firefox = 'firefox',
  edge = 'edge',
}

export type BrowserTabID = number;

export type ExtensionMessageType = MessageToBackground | MessageToContent | MessageToInline | MessageToApp;

export type ExecutingContext = 'background' | 'app' | 'content' | 'inline';

export type ExtensionMessage<T = any> = {
  type: ExtensionMessageType;
  id?: UniqueHash;
  payload?: T;
};

export enum PlatformID {
  MicrosoftSentinel = 'MicrosoftSentinel',
  MicrosoftDefender = 'MicrosoftDefender',
  Splunk = 'Splunk',
  QRadar = 'QRadar',
  Elastic = 'Elastic',
  ArcSight = 'ArcSight',
  Athena = 'Athena',
}

export enum PlatformName {
  MicrosoftSentinel = 'Microsoft Sentinel',
  MicrosoftDefender = 'Microsoft Defender For Endpoint',
  Splunk = 'Splunk',
  QRadar = 'IBM QRadar',
  Elastic = 'Elastic',
  ArcSight = 'ArcSight',
  Athena = 'Amazon Athena',
}

export type IPlatform = {
  getID(): PlatformID;
  getName(): PlatformName;
};

export type ModifyQueryType = 'include' | 'exclude' | 'show all';
