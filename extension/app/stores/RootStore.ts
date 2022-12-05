import { AppStore } from '../root/App/AppStore';
import { ResourceStore } from '../resources/stores/ResourceStore';
import { PlatformStore } from '../resources/stores/PlatformStore';
import { IntegrationsStore } from '../integrations/stores/IntegrationsStore';
import { ResourcesSelectionStore } from '../resources/stores/ResourcesSelectionStore';

export class RootStore {
  public appStore: AppStore;

  public resourceStore: ResourceStore;

  public resourcesSelectionStore: ResourcesSelectionStore;

  public platformStore: PlatformStore;

  public integrationsStore: IntegrationsStore;

  constructor() {
    this.appStore = new AppStore();
    this.integrationsStore = new IntegrationsStore();
    this.resourceStore = new ResourceStore(this);
    this.platformStore = new PlatformStore(this);
    this.resourcesSelectionStore = new ResourcesSelectionStore(this);
  }
}
