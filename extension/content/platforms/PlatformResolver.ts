import { ContentPlatform } from '../types/types-content-common';
import { MicrosoftSentinelPlatform } from './microsoft-sentinel/MicrosoftSentinelPlatform';
import { PlatformID } from '../../common/types/types-common';
import { Url } from '../../../common/types';
import { contentPlatformIDFromENV, mode } from '../../common/envs';
import { MicrosoftDefenderPlatform } from './microsoft-defender-for-endpoint/MicrosoftDefenderPlatform';
import { SplunkPlatform } from './splunk/SplunkPlatform';
import { isAllowedProtocol } from '../../../common/checkers';

export class PlatformResolver {
  private static getPlatform(platformID: PlatformID): ContentPlatform | undefined {
    switch (platformID) {
      case PlatformID.MicrosoftSentinel: {
        return new MicrosoftSentinelPlatform();
      }
      case PlatformID.MicrosoftDefender: {
        return new MicrosoftDefenderPlatform();
      }
      case PlatformID.Splunk: {
        return new SplunkPlatform();
      }
    }
  }

  static resolveByUrl(url: Url): ContentPlatform | undefined {
    const { host, protocol, href } = new URL(url);
    if (!isAllowedProtocol(protocol, mode)) {
      return;
    }
    return /(portal.azure.com|reactblade.portal.azure.net|logsextension.hosting.portal.azure.net)$/.test(host)
      ? PlatformResolver.getPlatform(PlatformID.MicrosoftSentinel)
      : /(security.microsoft.com\/)/.test(href)
        ? PlatformResolver.getPlatform(PlatformID.MicrosoftDefender)
        : undefined;
  }

  static resolveByContent(): ContentPlatform | undefined {
    if (document.querySelector('a[aria-label^="splunk"]')) {
      return PlatformResolver.getPlatform(PlatformID.Splunk);
    }
    return undefined;
  }

  resolve(): ContentPlatform | undefined {
    if (contentPlatformIDFromENV) {
      return PlatformResolver.getPlatform(contentPlatformIDFromENV);
    }

    return PlatformResolver.resolveByUrl(document.location.href)
      || PlatformResolver.resolveByContent();
  }
}

export const platformResolver = new PlatformResolver();
