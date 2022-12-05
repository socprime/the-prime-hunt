import {
  getIntegrations,
  getVersion,
  getWatchers,
  setIntegrations,
  setVersion,
  setWatchers,
} from './common/local-storage';
import { compareVersions } from './common/common-helpers';
import { version } from './common/envs';
import { integrations } from './app/integrations/integrations';
import { platformResolver } from './content/platforms/PlatformResolver';
import { PlatformID } from './common/types/types-common';

if (compareVersions(
  getVersion(),
  '1.0.2',
) === 'less') {
  const storedIntegrations = getIntegrations();
  const ids = storedIntegrations.map(i => i.id);

  if (!ids.includes('$echo-trail')) {
    storedIntegrations.push(integrations.find(i => i.id === '$echo-trail')!);
  }
  if (!ids.includes('$ultimate-windows-security')) {
    storedIntegrations.push(integrations.find(i => i.id === '$ultimate-windows-security')!);
  }

  setIntegrations(storedIntegrations);
}

if (compareVersions(
  getVersion(),
  '1.1.0',
) === 'less') {
  const watchers = getWatchers();
  if (typeof watchers.accounts !== 'undefined') {
    watchers.Accounts = [
      ...(Array.isArray(watchers.accounts) ? watchers.accounts : []),
      ...(Array.isArray(watchers.Accounts) ? watchers.Accounts : []),
    ];
    delete watchers.accounts;
  }
  if (typeof watchers.assets !== 'undefined') {
    watchers.Assets = [
      ...(Array.isArray(watchers.assets) ? watchers.assets : []),
      ...(Array.isArray(watchers.Assets) ? watchers.Assets : []),
    ];
    delete watchers.assets;
  }
  if (
    typeof watchers.services !== 'undefined'
    && watchers.services?.length === 0
  ) {
    delete watchers.services;
  }

  // TODO check this
  if (
    platformResolver.resolve()?.getID() === PlatformID.MicrosoftDefender
  ) {
    watchers.Accounts = [
      ...(Array.isArray(watchers.Accounts) ? watchers.Accounts : []),
      'InitiatingProcessName',
      'RequestAccountName',
    ];
  }

  setWatchers(watchers);
}


setVersion(version);