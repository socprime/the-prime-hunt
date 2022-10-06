import { observable } from 'mobx';
import { ContentPlatform } from '../../../../content/types/types-content-common';
import {
  ModifyQueryType,
  NormalizedParsedResources,
  PlatformID,
} from '../../../../common/types/types-common';
import { sendMessageFromApp } from '../../../../content/content-services';
import { ModifyQueryPayload } from '../../../../common/types/types-common-payloads';
import { MessageToBackground } from '../../../../background/types/types-background-messages';
import { buildMicrosoftSentinelQueryParts } from '../../../../content/platforms/microsoft-sentinel/microsoft-sentinel-helpers';
import { buildMicrosoftDefenderForEndpointQueryParts } from '../../../../content/platforms/microsoft-defender-for-endpoint/microsoft-defender-for-endpoint-helpers';

export class PlatformStore {
  @observable
  public platform: ContentPlatform;

  modifyQuery(
    modifyType: ModifyQueryType,
    resources: NormalizedParsedResources,
  ): void {
    sendMessageFromApp<ModifyQueryPayload>({
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

    if (platformID === PlatformID.microsoftSentinel) {
      return buildMicrosoftSentinelQueryParts(modifyType, resources);
    }

    if (platformID === PlatformID.microsoftDefenderForEndpoint) {
      return buildMicrosoftDefenderForEndpointQueryParts(modifyType, resources);
    }

    return 'undefined platform';
  }
  
}
