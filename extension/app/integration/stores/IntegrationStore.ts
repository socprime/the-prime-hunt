import { observable, makeObservable, computed } from 'mobx';
import { FC } from 'react';
import { getIntegrationModel } from '../../../integrations';
import { RootStore } from '../../stores/RootStore';
import { mappedIntegrations } from '../../integrations/integrations';
import { integrationGroupName } from '../../integrations/integrations-store';
import { SensitiveInfoWarningMessage } from '../messages/SensitiveInfoWarningMessage';
import { AsyncResult } from '../../../../common/types';
import { Integration } from '../integration-types';

export class IntegrationStore {
  private readonly rootStore: RootStore;

  @observable
  private message: FC | null = SensitiveInfoWarningMessage;

  @observable
  private integration: Integration | null = null;

  setIntegration(integration: Integration | null) {
    this.integration = integration;
  }

  getIntegration() {
    return this.integration;
  }

  @computed
  private get integrationIndex() {
    return this.rootStore.integrationsStore
      .integrations.findIndex(({ id }) => id === this.integration?.id);
  }

  @computed
  public get storage() {
    return (this.rootStore.appStorageStore.storage as any)[integrationGroupName]
      ?.[this.mapIdToName(this.integration?.id)] || {};
  }

  @computed
  private get model() {
    const { id } = this.integration || {};
    return getIntegrationModel(this.mapIdToName(id));
  }

  public mapIdToName(id: Integration['id'] | undefined) {
    const mappings = {
      '$open-cti$': 'openCTI',
    } as Record<Integration['id'], Parameters<typeof getIntegrationModel>[0]>;
    return (id ? mappings[id] : '') as Parameters<typeof getIntegrationModel>[0];
  }

  setMessage(Message: FC | null) {
    if (Message && !this.message) {
      this.message = Message;
    }

    if (!Message && this.message) {
      this.message = Message;
    }
  }

  getMessage() {
    return this.message;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  isNotDeletable() {
    return this.integration?.id?.[0] === '$';
  }

  async clearStorage() {
    return this.model?.clearStorage();
  }

  async getStorage(): Promise<AsyncResult> {
    return this.model?.getStorage() || { error: new Error('Storage not found') };
  }

  async setStorage(data: Record<string, unknown>): Promise<AsyncResult> {
    return this.model?.setStorage(data as any) || { error: new Error('Storage not found') };
  }

  setDefaults() {
    this.clearStorage();
    if (!this.integration) {
      return;
    }
    const defaultIntegration = mappedIntegrations.get(this.integration?.id as any);
    if (!defaultIntegration) {
      return;
    }
    this.integration = {
      ...defaultIntegration,
    };
    if (this.rootStore.integrationsStore.integrations[this.integrationIndex]) {
      this.rootStore.integrationsStore.integrations[this.integrationIndex] = this.integration;
    }
  }

  remove() {
    if (this.isNotDeletable()) {
      return;
    }
    this.clearStorage();
    this.rootStore.integrationsStore.integrations = this.rootStore.integrationsStore.integrations
      .filter(({ id }) => id !== this.integration?.id);
    this.integration = null;
    this.rootStore.integrationsStore.save();
  }
}
