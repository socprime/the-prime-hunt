import { WatchingResources } from '../../background/types/types-background-common';
import { PlatformID } from '../types/types-common';
import { Position } from '../../content/types/types-content-common';
import { integrations } from '../../app/integrations/integrations';
import { Integration } from '../../app/integration/integration-types';
import { ExtensionSettings } from './types';

export const watchersLocalStorageKey = 'the-prime-hunt--extension--watchers';

export const positionStorageKey = 'the-prime-hunt--extension--position';

export const integrationsStorageKey = 'the-prime-hunt--extension--models';

export const versionStorageKey = 'the-prime-hunt--extension--version';

export const fieldsNamesStorageKey = 'the-prime-hunt--extension--fields';

export const settingsStorageKey = 'the-prime-hunt--extension--settings';

export const setExtensionSettings = (settings: ExtensionSettings): ExtensionSettings => {
  const newSettings = {
    ...getExtensionSettings(),
    ...(settings || {}),
  };
  localStorage.setItem(
    settingsStorageKey,
    JSON.stringify(newSettings),
  );
  return newSettings;
};

export const getExtensionSettings = (): ExtensionSettings => {
  try {
    return JSON.parse(
      localStorage.getItem(settingsStorageKey) || '',
    );
  } catch (e) {
    return {} as ExtensionSettings;
  }
};

export const setFieldsNames = (fields: string[]): string[] => {
  localStorage.setItem(
    fieldsNamesStorageKey,
    JSON.stringify({
      fields,
      time: new Date().toString(),
    }),
  );
  return fields;
};

const oneDay = 1000 * 60 * 60 * 24;

export const getFieldsNames = () => {
  try {
    const data = JSON.parse(localStorage.getItem(fieldsNamesStorageKey) || '');
    data.time = new Date(data.time);
    if ((new Date()).getTime() - data.time.getTime() >= oneDay) {
      return setFieldsNames([]);
    }
    return data.fields;
  } catch (e) {
    return setFieldsNames([]);
  }
};

export const setWatchers = (watchers: WatchingResources): WatchingResources => {
  localStorage.setItem(
    watchersLocalStorageKey,
    JSON.stringify(watchers),
  );
  return watchers;
};

const getDefaultWatchers = (
  platformID?: PlatformID,
) => {
  return require('../../content/platforms/PlatformResolver').platformResolver.getPlatformByID(platformID)?.defaultWatchers || {};
};

export const getWatchers = (
  platformID?: PlatformID,
): WatchingResources => {
  try {
    const watchers = JSON.parse(
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

export const isStoredIntegrations = (): boolean => {
  try {
    return JSON.parse(
      localStorage.getItem(integrationsStorageKey) || '',
    ).length > 0;
  } catch (e) {
    return false;
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
