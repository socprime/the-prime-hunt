import { Context, createContext, useContext } from 'react';
import { configure } from 'mobx';
import { RootStore } from './RootStore';

configure({
  enforceActions: 'never',
});

export const RootStoreContext = createContext<RootStore | null>(null) as Context<RootStore>;

export const useRootStore = () => {
  return useContext(RootStoreContext);
};

export const useAppStore = () => {
  const rootStore = useRootStore();
  return rootStore.appStore;
};

export const useAppRouterStore = () => {
  const rootStore = useRootStore();
  return rootStore.appRouterStore;
};

export const useAppStorageStore = () => {
  const rootStore = useRootStore();
  return rootStore.appStorageStore;
};

export const useAppMessageStore = () => {
  const rootStore = useRootStore();
  return rootStore.appMessageStore;
};

export const useFormStore = () => {
  const rootStore = useRootStore();
  return rootStore.formStore;
};

export const useResourceStore = () => {
  const rootStore = useRootStore();
  return rootStore.resourceStore;
};

export const usePlatformStore = () => {
  const rootStore = useRootStore();
  return rootStore.platformStore;
};

export const useResourcesSelectionStore = () => {
  const rootStore = useRootStore();
  return rootStore.resourcesSelectionStore;
};

export const useIntegrationsStore = () => {
  const rootStore = useRootStore();
  return rootStore.integrationsStore;
};

export const useIntegrationStore = () => {
  const rootStore = useRootStore();
  return rootStore.integrationStore;
};

export const rootStore = new RootStore();
