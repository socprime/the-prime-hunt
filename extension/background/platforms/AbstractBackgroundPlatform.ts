import { BackgroundPlatform, TabID, WatchingResources } from '../types/types-background-common';
import { UniqueHash } from '../../../common/types';
import { BrowserTabID, PlatformID, PlatformName } from '../../common/types/types-common';
import { removeBGInterceptor } from '../services/background-services-listeners';
import {
  normalizeParsedResources,
  sendMessageFromBackground,
} from '../services/background-services';
import { MessageToApp } from '../../app/types/types-app-messages';
import { FieldName, NormalizedResources, ParsedResult, ResourceTypeID } from '../../app/resources/resources-types';
import { SetLoadingStatePayload } from '../../common/types/types-common-payloads';
import { LoadingKey } from '../../app/types/types-app-common';

export abstract class AbstractBackgroundPlatform implements BackgroundPlatform {
  abstract getID(): PlatformID;

  abstract getName(): PlatformName;

  abstract parseResponse(response: object | string): Promise<ParsedResult>;

  abstract register(): void;

  protected static sendParsedData(
    tabID: TabID,
    parsedResponse: ParsedResult,
    isNew = false,
  ) {
    const result = normalizeParsedResources(parsedResponse);
    if (isNew || Object.keys(result).length > 0) {
      sendMessageFromBackground<NormalizedResources>(tabID, {
        id: 'parsed-response',
        type: isNew ? MessageToApp.AppTakeNewResourceData : MessageToApp.AppTakeResourceData,
        payload: normalizeParsedResources(parsedResponse),
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

  protected lastResponse: object | string | null = null;

  protected watchingResources = {} as WatchingResources;

  protected emptyFieldValues = [''];

  protected interceptorsIDs = new Set<UniqueHash>();

  protected checkValue(value: string): boolean {
    return !this.emptyFieldValues.some(v => v.toLowerCase() === String(value).toLowerCase());
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
      names.forEach(name => {
        fieldsNames.add(name);
        const types = mapFieldNameToType.get(name) || [];
        types.push(type);
        mapFieldNameToType.set(name, types);
      });
    });

    return { fieldsNames, mapFieldNameToTypes: mapFieldNameToType };
  }

  unregister() {
    Array.from(this.interceptorsIDs).forEach(id => {
      removeBGInterceptor(id);
      this.interceptorsIDs.delete(id);
    });
  }

  async setWatchers(watchers: WatchingResources, tabID: BrowserTabID) {
    this.watchingResources = watchers;
    if (!this.lastResponse) {
      return;
    }
    const parsedResponse = await this.parseResponse(this.lastResponse);
    sendMessageFromBackground<NormalizedResources>(tabID, {
      id: 're-parsed-last-response',
      type: MessageToApp.AppTakeResourceData,
      payload: normalizeParsedResources(parsedResponse),
    });
  }
}