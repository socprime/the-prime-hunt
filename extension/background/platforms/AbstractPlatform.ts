import { BackgroundPlatform, WatchingResources } from '../types/types-background-common';
import { HTMLTextContent, UniqueHash } from '../../../common/types';
import { BrowserTabID, NormalizedParsedResult, ParsedResult, PlatformID } from '../../common/types/types-common';
import { removeBGInterceptor } from '../background-listeners';
import { normalizeParsedResource, sendMessageFromBackground } from '../background-services';
import { MessageToApp } from '../../app/types/types-app-messages';
import { http } from '../../../common/Http';
import HttpHeader = chrome.webRequest.HttpHeader;

export abstract class AbstractPlatform implements BackgroundPlatform {
  abstract getID(): PlatformID;

  abstract parseContent(content: HTMLTextContent): ParsedResult;

  abstract parseResponse(response: object): ParsedResult;

  abstract register(): void;

  protected lastResponse = null;

  protected watchingResources = {} as WatchingResources;

  protected emptyFieldValue = '';

  protected getResourceData(
    tabID: BrowserTabID,
    params: {
      url: string;
      bodyBytes: ArrayBuffer;
      requestHeaders: HttpHeader[];
    },
    callbacks: {
      onJSONSuccess: (response: any) => void;
      onError: (e: Error) => void;
    },
  ) {
    http.post(
      {
        url: params.url,
        body: params.bodyBytes,
        headers: params.requestHeaders.reduce((res: any, header: any) => {
          res[header.name] = header.value;
          return res;
        }, {}),
      },
      {
        onJSONSuccess: (response: any) => {
          const parsedResponse = this.parseResponse(response);
          sendMessageFromBackground<NormalizedParsedResult>(tabID, {
            type: MessageToApp.AppTakeNewResourceData,
            payload: {
              services: normalizeParsedResource(parsedResponse.services),
              assets: normalizeParsedResource(parsedResponse.assets),
              accounts: normalizeParsedResource(parsedResponse.accounts),
            },
          });
          this.lastResponse = response;
          callbacks.onJSONSuccess(response);
        },
        onError: (e: Error) => {
          callbacks.onError(e);
        },
      },
    );
  }

  protected interceptorsIDs = new Set<UniqueHash>();

  protected addValueToResource(
    parent: {
      [fieldName: string]: Set<string>;
    },
    key: string,
    value: string | number,
  ) {
    const values = parent[key] || new Set<string>();
    const normalizedValue = typeof value === 'number'
      ? String(value)
      : value?.trim?.();
    if (normalizedValue && normalizedValue !== this.emptyFieldValue) {
      values.add(normalizedValue);
    }
    if (values.size) {
      parent[key] = values;
    }
  }

  unregister() {
    Array.from(this.interceptorsIDs).forEach(id => {
      removeBGInterceptor(id);
      this.interceptorsIDs.delete(id);
    });
  }

  setWatchers(watchers: WatchingResources, tabID: BrowserTabID) {
    this.watchingResources = watchers;
    if (!this.lastResponse) {
      return;
    }
    const parsedResponse = this.parseResponse(this.lastResponse);
    sendMessageFromBackground<NormalizedParsedResult>(tabID, {
      type: MessageToApp.AppTakeResourceData,
      payload: {
        services: normalizeParsedResource(parsedResponse.services),
        assets: normalizeParsedResource(parsedResponse.assets),
        accounts: normalizeParsedResource(parsedResponse.accounts),
      },
    });
  }
}