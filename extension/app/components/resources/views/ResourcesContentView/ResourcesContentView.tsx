import React, { useEffect, useRef } from 'react';
import { createClassName, getPlatformNameByID } from '../../../../../common/common-helpers';
import { PlatformResources } from '../../PlatformResources/PlatformResources';
import { useAppStore, usePlatformStore, useResourceStore } from '../../../../stores';
import { observer } from 'mobx-react-lite';
import SimpleBar from 'simplebar-react';
import { LoadingKey } from '../../../../types/types-app-common';
import './styles.scss';

export type ResourcesContentViewProps = {
  className?: string;
};

export const ResourcesContentView: React.FC<ResourcesContentViewProps> = observer(({
  className = '',
}) => {
  const appStore = useAppStore();
  const { platform } = usePlatformStore();
  const { countAllResources, activeTab } = useResourceStore();
  const ref = useRef<any>();

  useEffect(() => {
    if (!ref.current?.el) {
      return;
    }
    ref.current.el
      .querySelector('.simplebar-content-wrapper')
      ?.scrollTo?.({ top: 0 });
  }, [activeTab]);

  if (!platform) {
    return null;
  }

  return (
    countAllResources < 1
      ? (
        <div className={createClassName([
          'resource-content-view',
          'platform-detected',
          className,
        ])}>
          {appStore.isLoading(LoadingKey.resourcesAdding)
            ? (<>
              Results are processing...<br />Please wait...
            </>)
            : (<>
              {getPlatformNameByID(platform.getID())} detected. Run a query to see results.
            </>)}
        </div>
      )
      : (
        <SimpleBar ref={ref} className={createClassName(['resource-content-view', className])}>
          <PlatformResources />
        </SimpleBar>
      )
  );
});