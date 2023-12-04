/* eslint-disable camelcase */
import {
  setVersion,
  getVersion,
  getIntegrations,
  setIntegrations, isStoredIntegrations,
} from './common/local-storage';
import {
  version__1_0_2,
  version__1_2_5,
  version__1_3_1,
  version__1_4_0,
} from './app/integrations/integrations';
import { compareVersions } from './common/common-helpers';
import { version } from './common/envs';
import { Integration } from './app/integrations/integrations-types';
import { sortStrings } from '../common/helpers';

let needStoreIntegrations = false;
let storedIntegrations = getIntegrations();
if (!isStoredIntegrations()) {
  needStoreIntegrations = true;
}
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
  '1.0.2',
) === 'less') {
  updateIntegrations(version__1_0_2);
}

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

if (compareVersions(
  getVersion(),
  '1.4.0',
) === 'less') {
  const oldOpenCTIIntegration = storedIntegrations
    .find((i) => i.id === 'open-cti');

  updateIntegrations(version__1_4_0);

  if (oldOpenCTIIntegration) {
    storedIntegrations = storedIntegrations
      .filter((i) => i.id !== 'open-cti');
    needStoreIntegrations = true;
  }

  const newOpenCTIIntegrationIndex = storedIntegrations
    .findIndex((i) => i.id === '$open-cti$');

  if (oldOpenCTIIntegration && newOpenCTIIntegrationIndex > -1) {
    storedIntegrations[newOpenCTIIntegrationIndex].url = oldOpenCTIIntegration.url;
    storedIntegrations[newOpenCTIIntegrationIndex].name = oldOpenCTIIntegration.name;
  }
}

if (needStoreIntegrations) {
  setIntegrations(storedIntegrations
    .sort((a, b) => sortStrings(b.name, a.name, 'ascending')));
}

setVersion(version);
