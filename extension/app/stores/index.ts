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

export const rootStore = new RootStore();