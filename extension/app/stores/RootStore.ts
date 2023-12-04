import { AppStore } from '../root/App/AppStore';
import { ResourceStore } from '../resources/stores/ResourceStore';
import { PlatformStore } from '../resources/stores/PlatformStore';
import { IntegrationsStore } from '../integrations/stores/IntegrationsStore';
import { ResourcesSelectionStore } from '../resources/stores/ResourcesSelectionStore';
import { AppRouterStore } from '../root/App/AppRouterStore';
import { IntegrationStore } from '../integration/stores/IntegrationStore';
import { AppMessageStore } from '../root/App/AppMessageStore';
import { WithFormStore } from '../components/extends/WithForm/store';
import { AppStorageStore } from '../root/App/AppStorageStore';

export class RootStore {
  public appStore: AppStore;

  public appMessageStore: AppMessageStore;

  public appRouterStore: AppRouterStore;

  public appStorageStore: AppStorageStore;

  public resourceStore: ResourceStore;

  public resourcesSelectionStore: ResourcesSelectionStore;

  public platformStore: PlatformStore;

  public integrationsStore: IntegrationsStore;

  public integrationStore: IntegrationStore;

  public formStore: WithFormStore;

  constructor() {
    this.appStore = new AppStore();
    this.appMessageStore = new AppMessageStore();
    this.integrationsStore = new IntegrationsStore();
    this.formStore = new WithFormStore();
    this.appStorageStore = new AppStorageStore();
    this.integrationStore = new IntegrationStore(this);
    this.resourceStore = new ResourceStore(this);
    this.platformStore = new PlatformStore(this);
    this.resourcesSelectionStore = new ResourcesSelectionStore(this);
    this.appRouterStore = new AppRouterStore(this);
  }
}
