import { PlatformID } from '../common/types/types-common';

export const appStyles = 'app-styles.css';
export const microsoftSentinelInline = 'inline-microsoft-sentinel.js';
export const microsoftDefenderInline = 'inline-microsoft-defender.js';
export const splunkInline = 'inline-splunk.js';
export const qRadarInline = 'inline-qradar.js';
export const elasticInline = 'inline-elastic.js';

export const accessibleResources: {
  [type: string]: string[];
} = {
  [PlatformID.MicrosoftSentinel]: [microsoftSentinelInline],
  [PlatformID.MicrosoftDefender]: [microsoftDefenderInline],
  [PlatformID.Splunk]: [splunkInline],
  [PlatformID.QRadar]: [qRadarInline],
  [PlatformID.Elastic]: [elasticInline],
  app: [appStyles],
};
