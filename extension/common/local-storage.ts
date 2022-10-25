import { WatchingResources } from '../background/types/types-background-common';
import { microsoftSentinelWatchers } from '../background/platforms/microsoft-sentinel/microsoft-sentinel-watchers';
import { microsoftDefenderWatchers } from '../background/platforms/microsoft-defender-for-endpoint/microsoft-defender-watchers';
import { PlatformID } from './types/types-common';
import { Position } from '../content/types/types-content-common';
import { Integration } from '../app/components/integrations/integrations-types';
import { integrations } from '../app/components/integrations/integrations';
import { splunkWatchers } from '../background/platforms/splunk/splunk-watchers';

export const watchersLocalStorageKey = 'the-prime-hunt--extension--watchers';

export const positionStorageKey = 'the-prime-hunt--extension--position';

export const integrationsStorageKey = 'the-prime-hunt--extension--integrations';

export const versionStorageKey = 'the-prime-hunt--extension--version';

export const setWatchers = (watchers: WatchingResources): WatchingResources => {
  localStorage.setItem(
    watchersLocalStorageKey,
    JSON.stringify(watchers),
  );
  return watchers;
};

const getDefaultWatchers = (
  platformID: PlatformID,
) => {
  let watchers = {} as WatchingResources;

  if (platformID === 'MicrosoftSentinel') {
    watchers = microsoftSentinelWatchers;
  }

  if (platformID === 'MicrosoftDefender') {
    watchers = microsoftDefenderWatchers;
  }

  if (platformID === 'Splunk') {
    watchers = splunkWatchers;
  }

  return watchers;
};

export const getWatchers = (
  platformID: PlatformID,
): WatchingResources => {
  try {
    const watchers =  JSON.parse(
      localStorage.getItem(watchersLocalStorageKey) || '',
    );
    return setWatchers(Object.keys(watchers).length > 0
      ? watchers
      : getDefaultWatchers(platformID));
  } catch (e) {
    return setWatchers(getDefaultWatchers(platformID));
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

export const getVersion = (): string => {
  return localStorage.getItem(versionStorageKey) || '0';
};

export const setVersion = (version: string) => {
  localStorage.setItem(versionStorageKey, version);
};
