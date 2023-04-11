import { ContentPlatform } from '../types/types-content-common';
import { PlatformID } from '../../common/types/types-common';
import { Url } from '../../../common/types';
import { contentPlatformIDFromENV, mode } from '../../common/envs';
import { isAllowedProtocol } from '../../../common/checkers';
import { Register } from '../../../common/Register';

export class PlatformResolver {
  private platforms;

  getPlatformByID(platformID?: PlatformID): ContentPlatform | undefined {
    if (!this.platforms.has(platformID)) {
      switch (platformID) {
        case PlatformID.Athena: {
          this.platforms.set<PlatformID, ContentPlatform>(
            platformID,
            new (require('./AmazonAthenaPlatform').AmazonAthenaPlatform)(),
          );
          break;
        }

        case PlatformID.MicrosoftSentinel: {
          this.platforms.set<PlatformID, ContentPlatform>(
            platformID,
            new (require('./MicrosoftSentinelPlatform').MicrosoftSentinelPlatform)(),
          );
          break;
        }

        case PlatformID.MicrosoftDefender: {
          this.platforms.set<PlatformID, ContentPlatform>(
            platformID,
            new (require('./MicrosoftDefenderPlatform').MicrosoftDefenderPlatform)(),
          );
          break;
        }

        case PlatformID.Splunk: {
          this.platforms.set<PlatformID, ContentPlatform>(
            platformID,
            new (require('./SplunkPlatform').SplunkPlatform)(),
          );
          break;
        }

        case PlatformID.QRadar: {
          this.platforms.set<PlatformID, ContentPlatform>(
            platformID,
            new (require('./QRadarPlatform').QRadarPlatform)(),
          );
          break;
        }

        case PlatformID.Elastic: {
          this.platforms.set<PlatformID, ContentPlatform>(
            platformID,
            new (require('./ElasticPlatform').ElasticPlatform)(),
          );
          break;
        }

        case PlatformID.OpenSearch: {
          this.platforms.set<PlatformID, ContentPlatform>(
            platformID,
            new (require('./OpenSearchPlatform').OpenSearchPlatform)(),
          );
          break;
        }

        case PlatformID.ArcSight: {
          this.platforms.set<PlatformID, ContentPlatform>(
            platformID,
            new (require('./ArcSightPlatform').ArcSightPlatform)(),
          );
          break;
        }

        default:
          return undefined;
      }
    }

    return this.platforms.get(platformID);
  }

  resolveByUrl(url: Url): ContentPlatform | undefined {
    const { host, protocol, href } = new URL(url);

    if (!isAllowedProtocol(protocol, mode)) {
      return;
    }

    if (/(aws.amazon.com\/athena\/)/.test(href)) {
      return this.getPlatformByID(PlatformID.Athena);
    }

    if (/(portal.azure.com|reactblade.portal.azure.net|logsextension.hosting.portal.azure.net)$/.test(host)) {
      return this.getPlatformByID(PlatformID.MicrosoftSentinel);
    }

    if (/(security.microsoft.com\/)/.test(href)) {
      return this.getPlatformByID(PlatformID.MicrosoftDefender);
    }

    if (/(console\/qradar\/jsp\/QRadar.jsp|console\/do\/ariel\/arielSearch)/.test(href)) {
      return this.getPlatformByID(PlatformID.QRadar);
    }

    if (/(\/\w\w\w\/ui-phoenix\/com.arcsight.phoenix.PhoenixLauncher|logger\/search\.ftl)/.test(href)) {
      return this.getPlatformByID(PlatformID.ArcSight);
    }

    return undefined;
  }

  resolveByContent(): ContentPlatform | undefined {
    if (document.querySelector('a[aria-label^="splunk"]')) {
      return this.getPlatformByID(PlatformID.Splunk);
    }

    if (
      document.querySelector('a.euiHeaderLogo[aria-label^="Elastic"]')
      || document.querySelector('#kibana-body')
    ) {
      return this.getPlatformByID(PlatformID.Elastic);
    }

    if (document.querySelector('#opensearch-dashboards-body')) {
      return this.getPlatformByID(PlatformID.OpenSearch);
    }

    return undefined;
  }

  constructor() {
    this.platforms = new Register();
  }

  resolve(): ContentPlatform | undefined {
    if (contentPlatformIDFromENV) {
      return this.getPlatformByID(contentPlatformIDFromENV);
    }

    return this.resolveByUrl(document.location.href)
      || this.resolveByContent();
  }
}

export const platformResolver = new PlatformResolver();
