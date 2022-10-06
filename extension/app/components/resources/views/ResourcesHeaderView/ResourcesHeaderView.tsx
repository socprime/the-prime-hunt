import React from 'react';
import { Spacer } from '../../../atoms/Spacer/Spacer';
import { TabsPlatformResources } from '../../../resources/TabsPlatformResources/TabsPlatformResources';
import { usePlatformStore } from '../../../../stores';
import { observer } from 'mobx-react-lite';

export const ResourcesHeaderView: React.FC = observer(() => {
  const { platform } = usePlatformStore();

  return (
   <>
     {platform && (
       <>
         <Spacer height={32} />
         <TabsPlatformResources />
         <Spacer height={16} />
       </>
     )}
   </>
  );
});
