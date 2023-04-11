import {
  setVersion,
  getVersion,
  getIntegrations,
  setIntegrations,
} from './common/local-storage';
import { integrations } from './app/integrations/integrations';
import { compareVersions } from './common/common-helpers';
import { version } from './common/envs';

if (compareVersions(
  getVersion(),
  '1.2.5',
) === 'less') {
  const storedIntegrations = getIntegrations();
  const ids = storedIntegrations.map(i => i.id);

  if (!ids.includes('$cyber-chef$')) {
    storedIntegrations.push(integrations.find(i => i.id === '$cyber-chef$')!);
  }
  if (!ids.includes('$cyber-chef-magic$')) {
    storedIntegrations.push(integrations.find(i => i.id === '$cyber-chef-magic$')!);
  }

  setIntegrations(storedIntegrations);
}

setVersion(version);