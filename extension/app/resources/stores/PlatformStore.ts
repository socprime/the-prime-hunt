import { makeObservable, observable } from 'mobx';
import { ContentPlatform } from '../../../content/types/types-content-common';
import { ModifyQueryType } from '../../../common/types/types-common';
import { sendMessageFromApp } from '../../../content/services/content-services';
import {
  ModifyQueryPayload,
  PlatformIDPayload,
} from '../../../common/types/types-common-payloads';
import { MessageToBackground } from '../../../background/types/types-background-messages';
import { RootStore } from '../../stores/RootStore';
import { getWatchers } from '../../../common/local-storage';
import { NormalizedParsedResources } from '../resources-types';

export class PlatformStore {
  // TODO should be private
  @observable
  public platform: ContentPlatform;

  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  setPlatform(platform: ContentPlatform | undefined) {
    if (!platform) {
      return;
    }
    platform.connect();
    this.platform = platform;
    this.rootStore.appStore.view = 'resources';
    this.rootStore.appStore.setPosition(platform.extensionDefaultPosition);
    const watchers = getWatchers(platform.getID());

    Object.keys(getWatchers(platform.getID())).forEach(typeID => {
      this.rootStore.resourceStore.addTab(typeID);
      watchers[typeID].forEach(fieldName => {
        this.rootStore.resourceStore.addField(fieldName, false, typeID);
      });
    });

    sendMessageFromApp<PlatformIDPayload>({
      id: 'platform-set',
      type: MessageToBackground.BGRegisterPlatformTab,
      payload: {
        platformID: platform.getID(),
      },
    });

    this.rootStore.resourceStore.saveWatchers('platform-set');
  }

  modifyQuery(
    modifyType: ModifyQueryType,
    resources: NormalizedParsedResources,
  ): void {
    sendMessageFromApp<ModifyQueryPayload>({
      id: 'modify-query',
      type: MessageToBackground.BGModifyQuery,
      payload: {
        resources,
        modifyType,
      },
    });
  }

  buildQueryParts(
    modifyType: ModifyQueryType,
    resources: NormalizedParsedResources,
  ): string {
    if (!this.platform) {
      return 'Undefined platform';
    }

    return this.platform.buildQueryParts(modifyType, resources);
  }

  getName() {
    if (!this.platform) {
      return 'Undefined platform';
    }

    return this.platform.getName();
  }
}
