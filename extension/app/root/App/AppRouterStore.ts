import { RootStore } from '../../stores/RootStore';
import { Integration } from '../../integrations/integrations-types';
import { ResourceName } from '../../resources/resources-types';

export class AppRouterStore {
  // TODO move view from appStore to here
  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  goToResourcesPage() {
    const { appStore } = this.rootStore;
    appStore.view = 'resources';
  }

  goToExportPage(resourceName: ResourceName) {
    const { appStore } = this.rootStore;
    appStore.pageProps.content = { resourceName };
    appStore.view = 'export-page';
  }

  goToIntegrationsPage() {
    const { appStore } = this.rootStore;
    appStore.view = 'integrations';
  }

  goToIntegrationPage(
    integration: Integration,
  ) {
    const { appStore, integrationStore } = this.rootStore;
    integrationStore.setIntegration(integration);
    appStore.view = 'integration';
  }
}
