import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useResourceStore } from '../../stores';
import { TabsPanel, TabsPanelProps } from '../../components/atoms/TabsPanel/TabsPanel';
import { HoverButton } from '../../components/buttons/HoverButton/HoverButton';
import { UserIcon } from '../../components/atoms/icons/UserIcon/UserIcon';
import { AssetIcon } from '../../components/atoms/icons/AssetIcon/AssetIcon';
import { newTabName, ResourceTabInput } from '../ResourceTabInput/ResourceTabInput';
import {
  boundedResourcesTypeIDs,
  BoundedResourceTypeID,
  Resources,
  ResourceTypeID,
  TabID,
  TabName,
} from '../resources-types';
import { SearchDocumentIcon } from '../../components/atoms/icons/SearchDocumentIcon/SearchDocumentIcon';
import { AddNewButton } from '../AddNewButton/AddNewButton';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import './styles.scss';

export const TabsPlatformResources: React.FC<React.PropsWithChildren> = observer(({ children }) => {
  const resourceStore = useResourceStore();
  const { resources, activeTabID } = resourceStore;

  const countResources = useCallback((
    typeID: ResourceTypeID,
    allResources: Resources,
  ) => {
    return Object.keys(allResources?.[typeID] || {})
      .reduce((count, fieldName) => {
        return count + allResources[typeID][fieldName].size;
      }, 0);
  }, []);

  const getTab = useCallback((
    id: TabID,
    icon: React.ReactNode,
    name: TabName,
    size: number,
    isHovered: boolean,
  ) => {
    return (
      <HoverButton
        icon={icon}
        hovered={isHovered}
        key={id}
      >
        <ResourceTabInput
          typeID={id}
          value={name}
          onApply={value => {
            resourceStore.renameTab(id, value, true);
            resourceStore.activeTabID = value;
          }}
          onRemove={() => {
            resourceStore.removeTab(id, true);
          }}
        />
        <span className="resources-count strong">{size}</span>
      </HoverButton>
    );
  }, [resourceStore]);

  const addNewTab = useMemo(() => {
    return {
      id: '$$add-new-tab$$',
      component: <AppTooltip
        className="small"
        content="Add custom tab"
      >
        <AddNewButton
          className="add-new-tab-button"
          onClick={() => {
            resourceStore.addTab(newTabName, true);
            resourceStore.activeTabID = newTabName;
          }}
        />
      </AppTooltip>,
      isDisabled: true,
    };
  }, [resourceStore]);

  const tabs = useMemo(() => {
    const result = [] as TabsPanelProps['tabs'];

    boundedResourcesTypeIDs.forEach(typeID => {
      result.push({
        id: typeID,
        component: getTab(
          typeID,
          typeID === BoundedResourceTypeID.Accounts
            ? <UserIcon />
            : <AssetIcon />,
          typeID,
          countResources(typeID, resources),
          typeID === activeTabID,
        ),
      });
    });

    Object.keys(resources).forEach(typeID => {
      if (boundedResourcesTypeIDs.includes(typeID)) {
        return;
      }

      result.push({
        id: typeID,
        component: getTab(
          typeID,
          <SearchDocumentIcon />,
          typeID,
          countResources(typeID, resources),
          typeID === activeTabID,
        ),
      });
    });

    return result;
  }, [activeTabID, countResources, getTab, resources]);

  return (
    <div className="tabs-platform-resources-wrapper">
      <TabsPanel
        className="tabs-platform-resources"
        tabs={[ ...tabs, addNewTab ]}
        onActiveTabChanged={id => {
          if (resourceStore.isTabExist(id)) {
            resourceStore.activeTabID = id;
          }
        }}
        activeTab={activeTabID}
      >
        {children}
      </TabsPanel>
    </div>
  );
});
