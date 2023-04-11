import { Register } from '../../../common/Register';
import { PlatformID } from '../../common/types/types-common';
import { BackgroundPlatform } from '../types/types-background-common';
import { backgroundPlatformIDFromENV } from '../../common/envs';

export class PlatformResolver {
  private platforms;

  private getPlatformByID(platformID?: PlatformID): BackgroundPlatform | undefined {
    if (!this.platforms.has(platformID)) {
      switch (platformID) {
        case PlatformID.Athena: {
          this.platforms.set<PlatformID, BackgroundPlatform>(
            platformID,
            new (require('./AmazonAthenaPlatform').AmazonAthenaPlatform)(),
          );
          break;
        }

        case PlatformID.MicrosoftSentinel: {
          this.platforms.set<PlatformID, BackgroundPlatform>(
            platformID,
            new (require('./MicrosoftSentinelPlatform').MicrosoftSentinelPlatform)(),
          );
          break;
        }

        case PlatformID.MicrosoftDefender: {
          this.platforms.set<PlatformID, BackgroundPlatform>(
            platformID,
            new (require('./MicrosoftDefenderPlatform').MicrosoftDefenderPlatform)(),
          );
          break;
        }

        case PlatformID.Splunk: {
          this.platforms.set<PlatformID, BackgroundPlatform>(
            platformID,
            new (require('./SplunkPlatform').SplunkPlatform)(),
          );
          break;
        }

        case PlatformID.QRadar: {
          this.platforms.set<PlatformID, BackgroundPlatform>(
            platformID,
            new (require('./QRadarPlatform').QRadarPlatform)(),
          );
          break;
        }

        case PlatformID.Elastic: {
          this.platforms.set<PlatformID, BackgroundPlatform>(
            platformID,
            new (require('./ElasticPlatform').ElasticPlatform)(),
          );
          break;
        }

        case PlatformID.OpenSearch: {
          this.platforms.set<PlatformID, BackgroundPlatform>(
            platformID,
            new (require('./OpenSearchPlatform').OpenSearchPlatform)(),
          );
          break;
        }

        case PlatformID.ArcSight: {
          this.platforms.set<PlatformID, BackgroundPlatform>(
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

  constructor() {
    this.platforms = new Register();
  }

  resolve(platformID?: PlatformID): BackgroundPlatform | undefined {
    return backgroundPlatformIDFromENV
      ? this.getPlatformByID(backgroundPlatformIDFromENV)
      : this.getPlatformByID(platformID);
  }
}

export const platformResolver = new PlatformResolver();