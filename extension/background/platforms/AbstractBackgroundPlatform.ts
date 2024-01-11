import pako from 'pako';
import { BackgroundPlatform, TabID, WatchingResources } from '../types/types-background-common';
import { UniqueHash, Url } from '../../../common/types';
import { BrowserTabInfo, PlatformID, PlatformName } from '../../common/types/types-common';
import { removeBGInterceptor } from '../services/background-services-listeners';
import { sendMessageFromBackground } from '../services/background-services';
import { MessageToApp } from '../../app/types/types-app-messages';
import { FieldName, ParsedResult, ResourceTypeID } from '../../app/resources/resources-types';
import { ParsedDataPayload, SetLoadingStatePayload } from '../../common/types/types-common-payloads';
import { LoadingKey } from '../../app/types/types-app-common';
import { loggers } from '../../common/loggers';

type Origin = string;

export abstract class AbstractBackgroundPlatform implements BackgroundPlatform {
  abstract getID(): PlatformID;

  abstract getName(): PlatformName;

  abstract parseResponse(response: object | string, tabInfo: BrowserTabInfo): Promise<ParsedResult>;

  abstract register(): void;

  protected fields = new Set<string>();

  protected static sendParsedData(
    tabID: TabID,
    payload: ParsedDataPayload,
    isNew = false,
  ) {
    const { cacheID, resources, fieldsNames } = payload;
    if (
      isNew
      || (Object.keys(resources).length > 0 || fieldsNames.length > 0)
    ) {
      sendMessageFromBackground<ParsedDataPayload>(tabID, {
        id: 'parsed-response',
        type: isNew ? MessageToApp.AppTakeNewResourceData : MessageToApp.AppTakeResourceData,
        payload: { cacheID, resources, fieldsNames },
      });
    }
  }

  protected static sendLoading(tabID: TabID, loading: boolean) {
    sendMessageFromBackground<SetLoadingStatePayload>(tabID, {
      type: MessageToApp.AppSetLoadingState,
      payload: {
        loading,
        key: LoadingKey.resourcesAdding,
      },
    });
  }

  protected lastResponse: Map<string, object | string> = new Map();

  protected emptyFieldValues = [''];

  protected interceptorsIDs = new Set<UniqueHash>();

  protected checkValue(value: string): boolean {
    return !this.emptyFieldValues.some((v) => v.toLowerCase() === String(value).toLowerCase());
  }

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
    if (normalizedValue && this.checkValue(normalizedValue)) {
      values.add(normalizedValue);
    }
    if (values.size) {
      parent[key] = values;
    }
  }

  protected static decompress(response: string): string {
    if (
      response?.trim().length < 11
      || response.slice(0, 10).indexOf('{') > -1
    ) {
      return response;
    }
    try {
      const gzipedDataArray = Uint8Array.from(atob(response), (c) => c.charCodeAt(0));
      return new TextDecoder()
        .decode(pako.ungzip(gzipedDataArray));
    } catch (e) {
      return response;
    }
  }

  protected static getNormalizedWatchers(
    watchers: WatchingResources,
  ): {
      fieldsNames: Set<FieldName>;
      mapFieldNameToTypes: Map<FieldName, ResourceTypeID[]>;
    } {
    const fieldsNames = new Set<FieldName>();
    const mapFieldNameToType = new Map<FieldName, ResourceTypeID[]>();

    Object.keys(watchers).forEach((type: ResourceTypeID) => {
      const names = watchers[type];
      names.forEach((name) => {
        fieldsNames.add(name);
        const types = mapFieldNameToType.get(name) || [];
        types.push(type);
        mapFieldNameToType.set(name, types);
      });
    });

    return { fieldsNames, mapFieldNameToTypes: mapFieldNameToType };
  }

  unregister() {
    Array.from(this.interceptorsIDs).forEach((id) => {
      removeBGInterceptor(id);
      this.interceptorsIDs.delete(id);
    });
  }

  protected watchingResources = {} as {
    [origin: Origin]: WatchingResources;
  } | {
    [tabID: string]: Origin;
  };

  setWatchers(
    watchers: WatchingResources,
    tabInfo: BrowserTabInfo,
  ) {
    const { origin, id } = tabInfo;
    this.watchingResources[origin] = watchers;
    this.watchingResources[String(id)] = origin;
  }

  getWatchers(
    tabInfo: BrowserTabInfo,
  ): WatchingResources {
    const { origin, id } = tabInfo;
    const watchingResources = this.watchingResources[origin] as WatchingResources;
    if (watchingResources) {
      return watchingResources;
    }
    const savedOriginForCurrentTab = this.watchingResources[String(id)] as string;
    if (savedOriginForCurrentTab) {
      return this.watchingResources[savedOriginForCurrentTab] as WatchingResources;
    }

    return {};
  }

  async reparseCached(cacheID: Url, tabInfo: BrowserTabInfo) {
    if (!this.lastResponse.has(cacheID)) {
      loggers.debug().log(`no data was found by cache id: ${cacheID}`);
      return Promise.resolve({});
    }
    return this.parseResponse(this.lastResponse.get(cacheID)!, tabInfo);
  }
}
