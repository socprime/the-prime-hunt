import { WatchingResources } from '../background/types/types-background-common';
import { microsoftSentinelWatchers } from '../background/platforms/microsoft-sentinel/microsoft-sentinel-watchers';
import { microsoftDefenderForEndpointWatchers } from '../background/platforms/microsoft-defender-for-endpoint/microsoft-defender-for-endpoint-watchers';
import { PlatformID } from './types/types-common';
import { Position } from '../content/types/types-content-common';
import { Integration } from '../app/components/integrations/integrations-types';
import { integrations } from '../app/components/integrations/integrations';

export const watchersLocalStorageKey = 'the-prime-hunt--extension--watchers';

export const positionStorageKey = 'the-prime-hunt--extension--position';

export const integrationsStorageKey = 'the-prime-hunt--extension--integrations';

export const setWatchers = (watchers: WatchingResources): WatchingResources => {
  localStorage.setItem(
    watchersLocalStorageKey,
    JSON.stringify(watchers),
  );
  return watchers;
};

export const getWatchers = (
  platformID: PlatformID,
): WatchingResources => {
  try {
    return JSON.parse(
      localStorage.getItem(watchersLocalStorageKey) || '',
    );
  } catch (e) {
    const watchers = platformID === 'microsoftSentinel'
      ? microsoftSentinelWatchers
      : platformID === 'microsoftDefenderForEndpoint'
        ? microsoftDefenderForEndpointWatchers
        : {} as WatchingResources;

    return setWatchers(watchers);
  }
};

export const setPosition = (position: Position): Position => {
  localStorage.setItem(
    positionStorageKey,
    JSON.stringify(position),
  );
  return position;
};

export const getPosition = (): Position | null => {
  try {
    return JSON.parse(
      localStorage.getItem(positionStorageKey) || '',
    );
  } catch (e) {
    return null;
  }
};

export const setIntegrations = (values: Integration[]): Integration[] => {
  localStorage.setItem(
    integrationsStorageKey,
    JSON.stringify(values),
  );
  return values;
};

export const getIntegrations = (): Integration[] => {
  try {
    return JSON.parse(
      localStorage.getItem(integrationsStorageKey) || '',
    );
  } catch (e) {
    return integrations;
  }
};

export const restoreIntegrations = (): Integration[] => {
  setIntegrations(integrations);
  return integrations;
};
