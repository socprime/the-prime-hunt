import React from 'react';
import { CollapsibleResources } from '../CollapsibleResources/CollapsibleResources';
import { useResourceStore } from '../../../stores';
import { UserIcon } from '../../atoms/icons/UserIcon/UserIcon';
import { AssetIcon } from '../../atoms/icons/AssetIcon/AssetIcon';
import { observer } from 'mobx-react-lite';
import './styles.scss';

export const PlatformResources: React.FC = observer(() => {
  const { accounts, assets, activeTab, countAllResources } = useResourceStore();

  return (
      <div className="platform-resources">
        {countAllResources > 0 && (
          <>
            <CollapsibleResources
              resource={accounts}
              icon={<UserIcon />}
              className={activeTab === 'accounts' ? '' : 'invisible'}
            />
            <CollapsibleResources
              resource={assets}
              icon={<AssetIcon />}
              className={activeTab === 'assets' ? '' : 'invisible'}
            />
          </>
        )}
      </div>
  );
});
