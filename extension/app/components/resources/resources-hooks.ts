import {
  useAccountsSelectionStore,
  useAssetsSelectionStore,
  useResourceStore,
  useServicesSelectionStore,
} from '../../stores';

export const useResourceSelection = () => {
  const { activeTab } = useResourceStore();
  const servicesSelection = useServicesSelectionStore();
  const assetsSelection = useAssetsSelectionStore();
  const accountsSelection = useAccountsSelectionStore();

  return activeTab === 'services'
    ? servicesSelection
    : activeTab === 'accounts'
      ? accountsSelection
      : assetsSelection;
};
