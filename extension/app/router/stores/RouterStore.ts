import { RootStore } from '../../stores/RootStore';
import { ResourceName } from '../../resources/resources-types';
import {
  Page, ResourcesPage, SettingsPage, SocPrimePage,
} from '../pages';
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

  goToResourcesPage(page: ResourcesPage = 'resources') {
    if (this.page !== page) {
      this.page = page;
    }
    const tab = this.rootStore.resourceStore.activeTabID;
    if (page === 'resources' && !tab) {
      this.rootStore.resourceStore.activeTabID = 'Accounts';
    }
  }

  goToExportPage(resourceName: ResourceName) {
    if (this.page !== 'export') {
      this.pageProps.content = { resourceName };
      this.page = 'export';
    }
  }

  goToSettingsPage(page: SettingsPage) {
    if (this.page !== page) {
      this.page = page;
    }
  }

  goToIntegrationPage(
    integration: Integration,
  ) {
    if (this.page !== 'integration') {
      this.rootStore.integrationStore.setIntegration(integration);
      this.page = 'integration';
    }
  }

  goToSocPrimePage(page: SocPrimePage) {
    if (this.page !== page) {
      this.page = page;
    }
  }

  goToMailPage(pattern: Mail) {
    if (this.page !== 'mail') {
      this.rootStore.mailStore.pattern = pattern;
      this.page = 'mail';
    }
  }
}
