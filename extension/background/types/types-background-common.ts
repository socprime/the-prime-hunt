import { BrowserTabID, IPlatform, ParsedResult, ResourceType } from '../../common/types/types-common';
import WebRequestBodyEvent = chrome.webRequest.WebRequestBodyEvent;
import ExtensionMessageEvent = chrome.runtime.ExtensionMessageEvent;
import PageActionClickedEvent = chrome.pageAction.PageActionClickedEvent;
import WebRequestHeadersSynchronousEvent = chrome.webRequest.WebRequestHeadersSynchronousEvent;
import TabRemovedEvent = chrome.tabs.TabRemovedEvent;
import { HTMLTextContent } from '../../../common/types';

export type TabID = number;

export interface BrowserTab extends chrome.tabs.Tab {}

export type MessageInfo = {
  tab: BrowserTab;
  origin: string;
  url: string;
};

export enum BGListenerType {
  OnMessage = 'OnMessage',
  OnBeforeRequest = 'OnBeforeRequest',
  OnBrowserTabRemoved = 'OnBrowserTabRemoved',
  OnBeforeSendHeaders = 'OnBeforeSendHeaders',
  OnExtensionIconClicked = 'OnExtensionIconClicked',
}

export type WatchingResources = {
  [key in ResourceType]: string[];
};

export type BackgroundPlatform = IPlatform & {
  register(): void;
  unregister(): void;
  parseContent(content: HTMLTextContent): ParsedResult;
  parseResponse(response: object): ParsedResult;
  setWatchers(watchers: WatchingResources, tabID: BrowserTabID): void;
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
  opt_extraInfoSpec: Parameters<WebRequestHeadersSynchronousEvent['addListener']>[2] & ('requestHeaders')[],
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
