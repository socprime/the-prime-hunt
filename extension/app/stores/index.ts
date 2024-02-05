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

export const useRouter = () => {
  const rootStore = useRootStore();
  return rootStore.routerStore;
};

// Todo remove store world suffix
export const useAppStorageStore = () => {
  const rootStore = useRootStore();
  return rootStore.appStorageStore;
};

export const useMail = () => {
  const rootStore = useRootStore();
  return rootStore.mailStore;
};

export const useAppMessageStore = () => {
  const rootStore = useRootStore();
  return rootStore.appMessageStore;
};

export const useForm = () => {
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
