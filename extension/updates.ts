import { getIntegrations, getVersion, setIntegrations, setVersion } from './common/local-storage';
import { compareVersions } from './common/common-helpers';
import { version } from './common/envs';
import { integrations } from './app/components/integrations/integrations';

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
  setVersion(version);
}
