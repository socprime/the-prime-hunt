import React, { useRef, useState } from 'react';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { TabsPlatformResources } from '../../TabsPlatformResources/TabsPlatformResources';
import { usePlatformStore, useResourceStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { AddNewButton } from '../../AddNewButton/AddNewButton';
import { AddFieldInput } from '../../AddFieldInput/AddFieldInput';
import { createNonDuplicateValue } from '../../../../../common/helpers';
import { useOnClickOutside } from '../../../app-hooks';
import { AppTooltip } from '../../../components/tooltips/AppTooltip/AppTooltip';
import './styles.scss';

export const ResourcesHeaderView: React.FC = observer(() => {
  const [addNewFieldMode, setAddNewFieldMode] = useState(false);

  const platformStore = usePlatformStore();
  const resourceStore = useResourceStore();

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(() => {
    if (addNewFieldMode) {
      setAddNewFieldMode(false);
    }
  }, inputWrapperRef);



  if (!platformStore.platform) {
    return null;
  }

  return (
   <div className="resources-header-view">
     <Spacer height={18} />
     <TabsPlatformResources />
     <Spacer height={16} />
     <div className="fields">
       <span>Fields</span>
       <AppTooltip
        content="Add custom field"
        className="small"
       >
         <AddNewButton onClick={() => {
           setAddNewFieldMode(true);
         }} />
       </AppTooltip>
       <Spacer height={8} />
     </div>
     <Spacer height={4} />
     {addNewFieldMode && (<div>
       <Spacer height={4} />
       <AddFieldInput
         ref={inputWrapperRef}
         onApply={value => {
           setAddNewFieldMode(false);
           const nValue = value.trim();

           if (!nValue) {
             return;
           }

           resourceStore.addField(
             createNonDuplicateValue(
               nValue,
               resourceStore.getFieldsNames(),
             ),
             true,
           );
         }}
         onRemove={() => {
           setAddNewFieldMode(false);
         }}
       />
     </div>)}
     <Spacer height={4} />
   </div>
  );
});
