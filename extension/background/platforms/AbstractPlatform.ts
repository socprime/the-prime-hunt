import { BackgroundPlatform, WatchingResources } from '../types/types-background-common';
import { UniqueHash } from '../../../common/types';
import { BrowserTabID, NormalizedParsedResult, ParsedResult, PlatformID } from '../../common/types/types-common';
import { removeBGInterceptor } from '../services/background-services-listeners';
import { normalizeParsedResource, sendMessageFromBackground } from '../services/background-services';
import { MessageToApp } from '../../app/types/types-app-messages';
import { uuid } from '../../../common/helpers';

export abstract class AbstractPlatform implements BackgroundPlatform {
  abstract getID(): PlatformID;

  abstract parseResponse(response: object): ParsedResult;

  abstract register(): void;

  protected lastResponse = null;

  protected watchingResources = {} as WatchingResources;

  protected emptyFieldValue = '';

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
      id: `re-parsed-last-response--${uuid()}`,
      type: MessageToApp.AppTakeResourceData,
      payload: {
        services: normalizeParsedResource(parsedResponse.services),
        assets: normalizeParsedResource(parsedResponse.assets),
        accounts: normalizeParsedResource(parsedResponse.accounts),
      },
    });
  }
}