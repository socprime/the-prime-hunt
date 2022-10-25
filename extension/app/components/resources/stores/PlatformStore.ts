import { makeObservable, observable } from 'mobx';
import { ContentPlatform } from '../../../../content/types/types-content-common';
import { ModifyQueryType, NormalizedParsedResources, PlatformID } from '../../../../common/types/types-common';
import { sendMessageFromApp } from '../../../../content/services/content-services';
import {
  ModifyQueryPayload,
  PlatformIDPayload,
  SetWatchersPayload,
} from '../../../../common/types/types-common-payloads';
import { MessageToBackground } from '../../../../background/types/types-background-messages';
import {
  buildMicrosoftSentinelQueryParts,
} from '../../../../content/platforms/microsoft-sentinel/microsoft-sentinel-helpers';
import {
  buildMicrosoftDefenderQueryParts,
} from '../../../../content/platforms/microsoft-defender-for-endpoint/microsoft-defender-helpers';
import { RootStore } from '../../../stores/RootStore';
import { getWatchers } from '../../../../common/local-storage';
import { buildSplunkQueryParts } from '../../../../content/platforms/splunk/splunk-helpers';
import { uuid } from '../../../../../common/helpers';

export class PlatformStore {
  // TODO store platform ID here
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

    sendMessageFromApp<PlatformIDPayload>({
      id: `platform-set--${uuid()}`,
      type: MessageToBackground.BGRegisterPlatformTab,
      payload: {
        platformID: platform.getID(),
      },
    });

    sendMessageFromApp<SetWatchersPayload>({
      id: `platform-set--${uuid()}`,
      type: MessageToBackground.BGSetWatchers,
      payload: {
        watchers: getWatchers(platform.getID()),
        platformID: platform.getID(),
        action: 'add',
      },
    });
  }

  modifyQuery(
    modifyType: ModifyQueryType,
    resources: NormalizedParsedResources,
  ): void {
    sendMessageFromApp<ModifyQueryPayload>({
      id: `modify-query--${uuid()}`,
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
    const platformID = this.platform?.getID?.();

    if (platformID === PlatformID.MicrosoftSentinel) {
      return buildMicrosoftSentinelQueryParts(modifyType, resources);
    }

    if (platformID === PlatformID.MicrosoftDefender) {
      return buildMicrosoftDefenderQueryParts(modifyType, resources);
    }

    if (platformID === PlatformID.Splunk) {
      return buildSplunkQueryParts(modifyType, resources);
    }

    return 'undefined platform';
  }
}
