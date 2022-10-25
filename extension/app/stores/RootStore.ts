import { AppStore } from '../components/App/AppStore';
import { ResourceStore } from '../components/resources/stores/ResourceStore';
import { ServicesSelectionStore } from '../components/resources/stores/ServicesSelectionStore';
import { AssetsSelectionStore } from '../components/resources/stores/AssetsSelectionStore';
import { AccountsSelectionStore } from '../components/resources/stores/AccountsSelectionStore';
import { PlatformStore } from '../components/resources/stores/PlatformStore';
import { IntegrationsStore } from '../components/integrations/stores/IntegrationsStore';

export class RootStore {
  public appStore: AppStore;

  public resourceStore: ResourceStore;

  public servicesSelectionStore: ServicesSelectionStore;

  public assetsSelectionStore: AssetsSelectionStore;

  public accountsSelectionStore: AccountsSelectionStore;

  public platformStore: PlatformStore;

  public integrationsStore: IntegrationsStore;

  constructor() {
    this.appStore = new AppStore();
    this.resourceStore = new ResourceStore(this);
    this.integrationsStore = new IntegrationsStore();
    this.servicesSelectionStore = new ServicesSelectionStore();
    this.assetsSelectionStore = new AssetsSelectionStore();
    this.accountsSelectionStore = new AccountsSelectionStore();
    this.platformStore = new PlatformStore(this);
  }
}
