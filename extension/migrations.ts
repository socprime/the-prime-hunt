/* eslint-disable camelcase */
import {
  setVersion,
  getVersion,
  getIntegrations,
  setIntegrations,
} from './common/local-storage';
import {
  version__1_3_1,
  version__1_2_5,
} from './app/integrations/integrations';
import { compareVersions } from './common/common-helpers';
import { version } from './common/envs';
import { Integration } from './app/integrations/integrations-types';

let needStoreIntegrations = false;
const storedIntegrations = getIntegrations();
const integrationsIDs = storedIntegrations.map((i) => i.id);

const updateIntegrations = (integrations: Integration[]) => {
  integrations.forEach((integration) => {
    if (!integrationsIDs.includes(integration.id)) {
      storedIntegrations.push(integration);
      needStoreIntegrations = true;
    }
  });
};

if (compareVersions(
  getVersion(),
  '1.2.5',
) === 'less') {
  updateIntegrations(version__1_2_5);
}

if (compareVersions(
  getVersion(),
  '1.3.1',
) === 'less') {
  updateIntegrations(version__1_3_1);
}

if (needStoreIntegrations) {
  setIntegrations(storedIntegrations);
}

setVersion(version);
