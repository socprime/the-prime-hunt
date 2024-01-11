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
import { getWatchers, getFieldsNames, setFieldsNames } from '../../../common/local-storage';
import { NormalizedParsedResources } from '../resources-types';
import { copyToClipboard } from '../../../common/common-helpers';

export class PlatformStore {
  @observable
  public platform: ContentPlatform | null = null;

  @observable
  private message: FC | null = null;

  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  getFieldsNames(): string[] {
    return [...(this.platform?.fields || [])];
  }

  setFieldsNames(fields: string[]) {
    fields?.forEach((f) => this.platform?.fields?.add?.(f));
  }

  saveFieldsNames(fields?: string[]) {
    setFieldsNames([
      ...(new Set([
        ...(fields || []),
        ...(this.getFieldsNames() || []),
      ])),
    ]);
  }

  setPlatform(platform?: ContentPlatform) {
    if (!platform) {
      return;
    }
    platform.connect();
    this.platform = platform;
    this.setFieldsNames(getFieldsNames());
    this.rootStore.appStore.view = 'resources';
    this.rootStore.appStore.setPosition(platform.extensionDefaultPosition);
    const watchers = getWatchers(platform.getID());

    const message = sendMessageFromApp<PlatformIDPayload>({
      id: 'platform-set',
      type: MessageToBackground.BGRegisterPlatformTab,
      payload: {
        platformID: platform.getID(),
      },
    });

    this.rootStore.resourceStore.setWatchers(watchers);
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
