import React, { useCallback } from 'react';
import { CollapsibleResources } from '../CollapsibleResources/CollapsibleResources';
import { useResourceStore } from '../../stores';
import { UserIcon } from '../../components/atoms/icons/UserIcon/UserIcon';
import { AssetIcon } from '../../components/atoms/icons/AssetIcon/AssetIcon';
import { observer } from 'mobx-react-lite';
import { BoundedResourceTypeID, ResourceTypeID } from '../resources-types';
import { SearchDocumentIcon } from '../../components/atoms/icons/SearchDocumentIcon/SearchDocumentIcon';
import './styles.scss';

export const PlatformResources: React.FC = observer(() => {
  const { resources, activeTabID } = useResourceStore();

  const getIcon = useCallback((typeID: ResourceTypeID) => {
    if (typeID === BoundedResourceTypeID.Accounts) {
      return <UserIcon />;
    }
    if (typeID === BoundedResourceTypeID.Assets) {
      return  <AssetIcon />;
    }
    return <SearchDocumentIcon />;
  }, []);

  return (
    <div className="platform-resources">
      {Object.keys(resources)
        .filter(typeID => activeTabID === typeID)
        .map(typeID => {
          return (
            <CollapsibleResources
              key={typeID}
              resources={resources[typeID]}
              icon={getIcon(typeID)}
            />
          );
        })}
    </div>
  );
});
