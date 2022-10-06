import { PlatformID } from '../common/types/types-common';

export const appStyles = 'app-styles.css';
export const microsoftSentinelInline = 'inline-microsoft-sentinel.js';
export const microsoftDefenderForEndpointInline = 'inline-microsoft-defender-for-endpoint.js';

export const accessibleResources: {
  [type: string]: string[];
} = {
  [PlatformID.microsoftSentinel]: [microsoftSentinelInline],
  [PlatformID.microsoftDefenderForEndpoint]: [microsoftDefenderForEndpointInline],
  app: [appStyles],
};
