import {
  useCallback,
  useMemo,
  PropsWithChildren,
  FC,
  ReactNode,
} from 'react';
import { observer } from 'mobx-react-lite';
import { useResourceStore, useRouter } from '../../stores';
import { TabsPanel } from '../../components/atoms/TabsPanel/TabsPanel';
import { HoverButton } from '../../components/buttons/HoverButton/HoverButton';
import { UserIcon } from '../../components/atoms/icons/UserIcon/UserIcon';
import { AssetIcon } from '../../components/atoms/icons/AssetIcon/AssetIcon';
import { newTabName, ResourceTabInput } from '../ResourceTabInput/ResourceTabInput';
import {
  boundedResourcesTypeIDs,
  BoundedResourceTypeID,
  QueryTabID,
  Resources,
  ResourceTypeID,
  TabID,
  TabName,
} from '../resources-types';
import { SearchDocumentIcon } from '../../components/atoms/icons/SearchDocumentIcon/SearchDocumentIcon';
import { AddNewButton } from '../AddNewButton/AddNewButton';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import { TabsPanelProps } from '../../components/atoms/TabsPanel/types';
import { TerminalIcon } from '../../components/atoms/icons/TerminalIcon';
import { useQuery } from '../../query/stores/QueryStore';
import './styles.scss';

export const TabsPlatformResources: FC<PropsWithChildren> = observer(({ children }) => {
  const resourceStore = useResourceStore();
  const router = useRouter();
  const queryStore = useQuery();
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
    icon: ReactNode,
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
          onApply={(value) => {
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

  const tabs = useCallback((
    querySize: number,
  ) => {
    const queryTabID = QueryTabID;
    const result = [{
      id: queryTabID,
      component: (
        <HoverButton
          icon={<TerminalIcon />}
          hovered={router.page === 'resources:query'}
        >
          <ResourceTabInput
            typeID={queryTabID}
            value="Query"
            onApply={() => {}}
            onRemove={() => {}}
          />
          <span className="resources-count strong">{querySize}</span>
        </HoverButton>
      ),
    }] as TabsPanelProps['tabs'];

    boundedResourcesTypeIDs.forEach((typeID) => {
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

    Object.keys(resources).forEach((typeID) => {
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
        tabs={[...tabs(queryStore.query.value?.trim?.()?.length > 0 ? 1 : 0), addNewTab]}
        onActiveTabChanged={(id) => {
          if (resourceStore.isTabExist(id)) {
            resourceStore.activeTabID = id;
            router.goToResourcesPage('resources');
          }
          if (id === QueryTabID) {
            resourceStore.activeTabID = '';
            router.goToResourcesPage('resources:query');
          }
        }}
        activeTab={activeTabID}
      >
        {children}
      </TabsPanel>
    </div>
  );
});
