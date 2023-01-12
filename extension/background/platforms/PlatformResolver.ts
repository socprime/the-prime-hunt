import { Register } from '../../../common/Register';
import { PlatformID } from '../../common/types/types-common';
import { MicrosoftSentinelPlatform } from './MicrosoftSentinelPlatform';
import { BackgroundPlatform } from '../types/types-background-common';
import { backgroundPlatformIDFromENV } from '../../common/envs';
import { MicrosoftDefenderPlatform } from './MicrosoftDefenderPlatform';
import { SplunkPlatform } from './SplunkPlatform';
import { QRadarPlatform } from './QRadarPlatform';
import { ElasticPlatform } from './ElasticPlatform';
import { ArcSightPlatform } from './ArcSightPlatform';

export class PlatformResolver {
  private platforms;

  private getPlatformByID(platformID?: PlatformID): BackgroundPlatform | undefined {
    if (!this.platforms.has(platformID)) {
      switch (platformID) {
        case PlatformID.MicrosoftSentinel: {
          this.platforms.set<PlatformID, BackgroundPlatform>(platformID, new MicrosoftSentinelPlatform());
          break;
        }

        case PlatformID.MicrosoftDefender: {
          this.platforms.set<PlatformID, BackgroundPlatform>(platformID, new MicrosoftDefenderPlatform());
          break;
        }

        case PlatformID.Splunk: {
          this.platforms.set<PlatformID, BackgroundPlatform>(platformID, new SplunkPlatform());
          break;
        }

        case PlatformID.QRadar: {
          this.platforms.set<PlatformID, BackgroundPlatform>(platformID, new QRadarPlatform());
          break;
        }

        case PlatformID.Elastic: {
          this.platforms.set<PlatformID, BackgroundPlatform>(platformID, new ElasticPlatform());
          break;
        }

        case PlatformID.ArcSight: {
          this.platforms.set<PlatformID, BackgroundPlatform>(platformID, new ArcSightPlatform());
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