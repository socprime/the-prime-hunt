import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useResourceStore } from '../../../stores';
import { TabsPanel } from '../../atoms/TabsPanel/TabsPanel';
import { ResourceType } from '../../../../common/types/types-common';
import { HoverButton } from '../../buttons/HoverButton/HoverButton';
import { WindowIcon } from '../../atoms/icons/WindowIcon/WindowIcon';
import { UserIcon } from '../../atoms/icons/UserIcon/UserIcon';
import { AssetIcon } from '../../atoms/icons/AssetIcon/AssetIcon';
import './styles.scss';

type TabID = ResourceType;

export const TabsPlatformResources: React.FC<React.PropsWithChildren> = observer(({ children }) => {
  const resourceStore = useResourceStore();
  const { assets, accounts, activeTab } = resourceStore;

  const countAccounts = useMemo(() => {
    return Object.keys(accounts).reduce((count, fieldName) => count += accounts[fieldName].size, 0);
  }, [accounts]);

  const countAssets = useMemo(() => {
    return Object.keys(assets).reduce((count, fieldName) => count += assets[fieldName].size, 0);
  }, [assets]);

  const getTab = useCallback((
    id: TabID,
    size: number,
    isHovered = false,
  ) => {
    let icon: React.ReactNode;
    let name: string;
    switch (id) {
      case 'services': {
        icon = <WindowIcon />;
        name = 'Services';
        break;
      }
      case 'accounts': {
        icon = <UserIcon />;
        name = 'Accounts';
        break;
      }
      case 'assets': {
        icon = <AssetIcon />;
        name = 'Assets';
        break;
      }
    }

    return {
      component: (
        <HoverButton
          icon={icon}
          hovered={isHovered}
        >
          {name} <span className="resources-count strong">{size}</span>
        </HoverButton>
      ),
      id: id,
    };
  }, []);

  const accountsTab = useMemo(() => {
    return getTab(
      'accounts',
      countAccounts,
      activeTab === 'accounts');
  }, [countAccounts, activeTab, getTab]);

  const assetsTab = useMemo(() => {
    return getTab(
      'assets',
      countAssets,
      activeTab === 'assets',
    );
  }, [activeTab, countAssets, getTab]);

  return (
    <TabsPanel
      className="tabs-platform-resources"
      tabs={[ accountsTab, assetsTab ]}
      onActiveTabChanged={id => {
        resourceStore.activeTab = id as ResourceType;
      }}
      defaultActiveTab={activeTab}
    >
      {children}
    </TabsPanel>
  );
});
