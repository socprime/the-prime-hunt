import { ContentPlatform } from '../types/types-content-common';
import { MicrosoftSentinelPlatform } from './microsoft-sentinel/MicrosoftSentinelPlatform';
import { PlatformID } from '../../common/types/types-common';
import { Url } from '../../../common/types';
import { contentPlatformIDFromENV } from '../../common/envs';
import { MicrosoftDefenderForEndpointPlatform } from './microsoft-defender-for-endpoint/MicrosoftDefenderForEndpointPlatform';

export class PlatformResolver {
  private static getPlatform(platformID: PlatformID): ContentPlatform | undefined {
    switch (platformID) {
      case PlatformID.microsoftSentinel: {
        return new MicrosoftSentinelPlatform();
      }
      case PlatformID.microsoftDefenderForEndpoint: {
        return new MicrosoftDefenderForEndpointPlatform();
      }
    }
  }

  static resolveByUrl(url: Url): ContentPlatform | undefined {
    const { host, protocol, href } = new URL(url);
    if (protocol !== 'https:') {
      return;
    }
    return /(portal.azure.com|reactblade.portal.azure.net|logsextension.hosting.portal.azure.net)$/.test(host)
      ? PlatformResolver.getPlatform(PlatformID.microsoftSentinel)
      : /(security.microsoft.com)/.test(href)
        ? PlatformResolver.getPlatform(PlatformID.microsoftDefenderForEndpoint)
        : undefined;
  }

  resolve(): ContentPlatform | undefined {
    if (contentPlatformIDFromENV) {
      return PlatformResolver.getPlatform(contentPlatformIDFromENV);
    }

    return PlatformResolver.resolveByUrl(document.location.href);
  }
}
