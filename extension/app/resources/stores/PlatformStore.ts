import { FC } from 'react';
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
import { copyToClipboard } from '../../../common/common-helpers';

export class PlatformStore {
  @observable
  private platform: ContentPlatform;

  @observable
  private message: FC | null = null;

  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  setPlatform(platform?: ContentPlatform) {
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

    const message = sendMessageFromApp<PlatformIDPayload>({
      id: 'platform-set',
      type: MessageToBackground.BGRegisterPlatformTab,
      payload: {
        platformID: platform.getID(),
      },
    });

    this.rootStore.resourceStore.saveWatchers(message.id);
  }

  copyToClipboard(
    resources: NormalizedParsedResources,
    timeout = 300,
  ) {
    setTimeout(() => {
      copyToClipboard(
        this.buildQueryParts(
          'include',
          resources,
          true,
        ),
      );
    }, timeout);
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
    withPrefix?: boolean,
  ): string {
    if (!this.platform) {
      return 'Undefined platform';
    }

    return this.platform.buildQueryParts(modifyType, resources, withPrefix);
  }

  getName() {
    if (!this.platform) {
      return 'Undefined platform';
    }

    return this.platform.getName();
  }

  getID() {
    if (!this.platform) {
      return null;
    }

    return this.platform.getID();
  }

  setMessage(Message: FC | null) {
    if (Message && !this.message) {
      this.message = Message;
    }

    if (!Message && this.message) {
      this.message = Message;
    }
  }

  getMessage() {
    return this.message;
  }
}
