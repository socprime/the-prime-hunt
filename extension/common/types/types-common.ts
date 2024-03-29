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

export type BrowserTabInfo = {
  id: BrowserTabID;
  origin: string;
}

export type ExtensionMessageType = MessageToBackground
  | MessageToContent
  | MessageToInline
  | MessageToApp;

export type ExecutingContext = 'background' | 'app' | 'content' | 'inline';

export type ExtensionMessage<T = any> = {
  type: ExtensionMessageType;
  id?: UniqueHash;
  payload?: T;
}

export type IncomingListenerData = {
  message: ExtensionMessage;
}

export enum PlatformID {
  MicrosoftSentinel = 'MicrosoftSentinel',
  MicrosoftDefender = 'MicrosoftDefender',
  Splunk = 'Splunk',
  QRadar = 'QRadar',
  Elastic = 'Elastic',
  OpenSearch = 'OpenSearch',
  ArcSight = 'ArcSight',
  Athena = 'Athena',
  LogScale = 'LogScale',
  Chronicle = 'Chronicle'
}

export enum PlatformQueryID {
  ElasticEQl = 'ElasticEql'
}

export enum SiemType {
  Sentinel = 'ala',
  Defender = 'mdatp',
  Splunk = 'splunk',
  Qradar = 'qradar',
  ElasticEQL = 'es-eql',
  ElasticLucene = 'elasticsearch',
  ArcSight = 'arcsight-keyword',
  Athena = 'athena',
  LogScale = 'humio',
  Chronicle = 'chronicle-query',
  OpenSearch = 'opendistro-query',
}

export enum PlatformName {
  MicrosoftSentinel = 'Microsoft Sentinel',
  MicrosoftDefender = 'Microsoft Defender For Endpoint',
  Splunk = 'Splunk',
  QRadar = 'IBM QRadar',
  Elastic = 'Elastic',
  OpenSearch = 'OpenSearch',
  ArcSight = 'ArcSight',
  Athena = 'Amazon Athena',
  LogScale = 'Falcon LogScale',
  Chronicle = 'Chronicle'
}

export type IPlatform = {
  getID(): PlatformID;
  getName(): PlatformName;
};

export type ModifyQueryType = 'include' | 'exclude' | 'show all';
