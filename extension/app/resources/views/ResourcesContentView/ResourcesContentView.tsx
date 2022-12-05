import React, { useEffect, useRef } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { PlatformResources } from '../../PlatformResources/PlatformResources';
import { usePlatformStore, useResourceStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import SimpleBar from 'simplebar-react';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import './styles.scss';

export type ResourcesContentViewProps = {
  className?: string;
};

export const ResourcesContentView: React.FC<ResourcesContentViewProps> = observer(({
  className = '',
}) => {
  const platformStore = usePlatformStore();
  const { activeTabID, countAllResources } = useResourceStore();
  const ref = useRef<any>();

  useEffect(() => {
    if (!ref.current?.el) {
      return;
    }
    ref.current.el
      .querySelector('.simplebar-content-wrapper')
      ?.scrollTo?.({ top: 0 });
  }, [activeTabID]);

  if (!platformStore.platform) {
    return null;
  }

  return (
    <SimpleBar ref={ref} className={createClassName(['resource-content-view', className])}>
      {countAllResources < 1 && (
        <div className="resource-content-view platform-detected">
          <Spacer height={8} />
          {platformStore.getName()} detected. Run a query to see results.
        </div>
      )}
      <PlatformResources />
    </SimpleBar>
  );
});