import { AppStore } from '../root/App/AppStore';
import { ResourceStore } from '../resources/stores/ResourceStore';
import { PlatformStore } from '../resources/stores/PlatformStore';
import { IntegrationsStore } from '../integrations/stores/IntegrationsStore';
import { ResourcesSelectionStore } from '../resources/stores/ResourcesSelectionStore';
import { RouterStore } from '../router/stores/RouterStore';
import { IntegrationStore } from '../integration/stores/IntegrationStore';
import { AppMessageStore } from '../root/App/AppMessageStore';
import { WithFormStore } from '../components/extends/WithForm/store';
import { AppStorageStore } from '../root/App/AppStorageStore';
import { MailStore } from '../mail/stores/MailStore';
import { Register } from '../../../common/Register';

export class RootStore {
  private stores = new Register();

  public appStore: AppStore;

  public appMessageStore: AppMessageStore;

  public routerStore: RouterStore;

  public appStorageStore: AppStorageStore;

  public resourceStore: ResourceStore;

  public resourcesSelectionStore: ResourcesSelectionStore;

  public platformStore: PlatformStore;

  public integrationsStore: IntegrationsStore;

  public integrationStore: IntegrationStore;

  public formStore: WithFormStore;

  public mailStore: MailStore;

  public register(name: string, getter: Function) {
    this.stores.set(name, getter);
  }

  public getStore(storeName: string) {
    return this.stores.get(storeName);
  }

  constructor() {
    this.appStore = new AppStore();
    this.appMessageStore = new AppMessageStore(this);
    this.integrationsStore = new IntegrationsStore();
    this.formStore = new WithFormStore();
    this.appStorageStore = new AppStorageStore();
    this.integrationStore = new IntegrationStore(this);
    this.resourceStore = new ResourceStore(this);
    this.platformStore = new PlatformStore(this);
    this.resourcesSelectionStore = new ResourcesSelectionStore(this);
    this.routerStore = new RouterStore(this);
    this.mailStore = new MailStore(this);
  }
}
