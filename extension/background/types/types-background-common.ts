import { BrowserTabInfo, IPlatform } from '../../common/types/types-common';
import WebRequestBodyEvent = chrome.webRequest.WebRequestBodyEvent;
import ExtensionMessageEvent = chrome.runtime.ExtensionMessageEvent;
import PageActionClickedEvent = chrome.pageAction.PageActionClickedEvent;
import WebRequestHeadersSynchronousEvent = chrome.webRequest.WebRequestHeadersSynchronousEvent;
import TabRemovedEvent = chrome.tabs.TabRemovedEvent;
import { HTMLTextContent, IdentifiedFunction } from '../../../common/types';
import { FieldName, ParsedResult, ResourceTypeID } from '../../app/resources/resources-types';

export type TabID = number;

export type BrowserTab = chrome.tabs.Tab;

export type MessageInfo = {
  tab: BrowserTab;
  origin: string;
  url: string;
};

export type BGInterceptor = IdentifiedFunction & {
  unregister?: () => void;
};

export enum BGListenerType {
  OnMessage = 'OnMessage',
  OnBeforeRequest = 'OnBeforeRequest',
  OnBrowserTabRemoved = 'OnBrowserTabRemoved',
  OnBeforeSendHeaders = 'OnBeforeSendHeaders',
  OnExtensionIconClicked = 'OnExtensionIconClicked',
}

export type WatchingResources = {
  [key in ResourceTypeID]: FieldName[];
};

export type BackgroundPlatform = IPlatform & {
  register(): void;
  unregister(): void;
  setWatchers(watchers: WatchingResources, tabInfo: BrowserTabInfo): void;
  reparseCached(cacheID: string, tabInfo: BrowserTabInfo): Promise<ParsedResult>;
  parseResponse(response: object, tabInfo: BrowserTabInfo): Promise<ParsedResult>;
  parseContent?(content: HTMLTextContent): Promise<ParsedResult>;
};

export type BeforeRequestBodyListener = (
  type: BGListenerType.OnBeforeRequest,
  callback: Parameters<WebRequestBodyEvent['addListener']>[0],
  filter: Parameters<WebRequestBodyEvent['addListener']>[1],
  opt_extraInfoSpec: Parameters<WebRequestBodyEvent['addListener']>[2] & ('requestBody')[],
) => void;

export type BeforeSendHeadersListener = (
  type: BGListenerType.OnBeforeSendHeaders,
  callback: Parameters<WebRequestHeadersSynchronousEvent['addListener']>[0],
  filter: Parameters<WebRequestHeadersSynchronousEvent['addListener']>[1],
  opt_extraInfoSpec: Parameters<WebRequestHeadersSynchronousEvent['addListener']>[2] & ('requestHeaders'|'extraHeaders')[],
) => void;

export type IconClickedListener = (
  type: BGListenerType.OnExtensionIconClicked,
  callback: Parameters<PageActionClickedEvent['addListener']>[0],
) => void;

export type MessageListener = (
  type: BGListenerType.OnMessage,
  callback: Parameters<ExtensionMessageEvent['addListener']>[0],
) => void;

export type BrowserTabRemovedListener = (
  type: BGListenerType.OnBrowserTabRemoved,
  callback: Parameters<TabRemovedEvent['addListener']>[0],
) => void;
