import { RootStore } from '../../stores/RootStore';
import { ResourceName } from '../../resources/resources-types';
import { Page } from '../pages';
import { makeObservable, observable } from 'mobx';
import { Integration } from '../../integration/integration-types';
import { Mail } from '../../mail/mail-types';

export class RouterStore {
  private readonly rootStore: RootStore;

  @observable
  public page: Page = 'not-found';

  public pageProps = {
    header: {} as any,
    content: {} as any,
    footer: {} as any,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  goToResourcesPage() {
    this.page = 'resources';
  }

  goToExportPage(resourceName: ResourceName) {
    this.pageProps.content = { resourceName };
    this.page = 'export';
  }

  goToSettingsPage(
    page: Extract<Page, 'settings:integrations' | 'settings:mail'>,
  ) {
    this.page = page;
  }

  goToIntegrationPage(
    integration: Integration,
  ) {
    this.rootStore.integrationStore.setIntegration(integration);
    this.page = 'integration';
  }

  goToMailPage(
    mail: Mail,
  ) {
    this.page = 'mail';
  }
}
