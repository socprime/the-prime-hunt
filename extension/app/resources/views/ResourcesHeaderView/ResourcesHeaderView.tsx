import {
  MutableRefObject, useRef, useState, FC,
} from 'react';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { TabsPlatformResources } from '../../TabsPlatformResources/TabsPlatformResources';
import { usePlatformStore, useResourceStore, useRouter } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { AddNewButton } from '../../AddNewButton/AddNewButton';
import { AddFieldInput } from '../../AddFieldInput/AddFieldInput';
import { createNonDuplicateValue } from '../../../../../common/helpers';
import { useOnClickOutside } from '../../../app-hooks';
import { AppTooltip } from '../../../components/tooltips/AppTooltip/AppTooltip';
import { AutocompleteInput } from '../../../components/inputs/AutocompleteInput';
import './styles.scss';

export const ResourcesHeaderView: FC = observer(() => {
  const [addNewFieldMode, setAddNewFieldMode] = useState(false);

  const platformStore = usePlatformStore();
  const resourceStore = useResourceStore();
  const router = useRouter();

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const inputWrapperRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const autocompleteDropdownRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useOnClickOutside(() => {
    if (addNewFieldMode) {
      setAddNewFieldMode(false);
    }
  }, inputWrapperRef, autocompleteDropdownRef);

  if (!platformStore.getID()) {
    return null;
  }

  const Message = platformStore.getMessage();

  const getAddFieldHeaderElements = () => {
    return (
      <>
        <div className="fields">
          <span>Fields</span>
          <AppTooltip
            content="Add custom field"
            className="small"
          >
            <AddNewButton
              className="add-new-field"
              onClick={() => {
                setAddNewFieldMode(true);
              }
              }/>
          </AppTooltip>
          <Spacer height={8}/>
        </div>
        <Spacer height={4}/>
        {addNewFieldMode && (<div>
          <Spacer height={4}/>
          <AutocompleteInput
            ref={(refs) => {
              if (refs?.dropdownMenu?.current) {
                autocompleteDropdownRef.current = refs.dropdownMenu.current;
              }
            }}
            onValueSelect={() => {
              inputRef.current?.focus?.();
            }}
            countSymbolsToActivate={2}
            className="add-field"
            list={platformStore.getFieldsNames()}
            Input={(props) => <AddFieldInput
              {...props}
              ref={(refs) => {
                if (refs?.wrapperRef?.current) {
                  inputWrapperRef.current = refs.wrapperRef.current;
                }
                if (refs?.inputRef?.current) {
                  inputRef.current = refs.inputRef.current;
                }
              }}
              onApply={(value) => {
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
            }
          />
        </div>)}
        <Spacer height={4}/>
      </>
    );
  };

  return (
    <div className="resources-header-view">
      <Spacer height={6}/>
      {
        Message && (
          <>
            <Spacer height={6}/>
            {<Message/>}
            <Spacer height={6}/>
          </>
        )
      }
      <Spacer height={6}/>
      <TabsPlatformResources/>
      <Spacer height={16}/>
      {router.page !== 'resources:query' && getAddFieldHeaderElements()}
    </div>
  );
});
