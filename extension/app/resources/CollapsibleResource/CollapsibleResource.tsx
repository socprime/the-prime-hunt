import React, { useCallback } from 'react';
import { ResourceList } from '../ResourceList/ResourceList';
import { AppCollapsible } from '../../components/collapsibles/AppCollapsible/AppCollapsible';
import { ResourceFieldName } from '../ResourceFieldName/ResourceFieldName';
import { NestedItemsCheckbox } from '../../components/checkboxes/NestedItemsCheckbox/NestedItemsCheckbox';
import { useAppStore, useResourcesSelectionStore, useResourceStore } from '../../stores';
import { WasteBasketIcon } from '../../components/atoms/icons/WasteBasketIcon/WasteBasketIcon';
import { LoadingKey } from '../../types/types-app-common';
import { FieldName } from '../resources-types';
import './styles.scss';

type CollapsibleResourceProps = {
  fieldName: string;
  icon: React.ReactNode;
  values: string[];
  selectedValues: string[];
};

export const CollapsibleResource: React.FC<CollapsibleResourceProps> = ({
  icon,
  fieldName,
  values,
  selectedValues,
}) => {
  const appStore = useAppStore();
  const resourceStore = useResourceStore();
  const selectionStore = useResourcesSelectionStore();

  const getGroup = useCallback((
    fieldNameToRemove: FieldName,
  ) => {
    return (
      <WasteBasketIcon
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          appStore.startLoading(LoadingKey.watchersChanging);
          setTimeout(() => {
            resourceStore.removeField(fieldNameToRemove, true);
            appStore.stopLoading(LoadingKey.watchersChanging);
          }, 0);
        }}
      />
    );
  }, [appStore, resourceStore]);

  const isDisabled = values.length < 1;
  const checkboxState = selectedValues.length < 1
    ? 'nothing'
    : selectedValues.length === values.length
      ? 'all'
      : selectedValues.length > 0
        ? 'some'
        : 'nothing';

  return (
    <AppCollapsible
      disabled={isDisabled}
      className="collapsible-resource"
      header={
        <NestedItemsCheckbox
          disabled={isDisabled}
          content={
            <ResourceFieldName
              icon={icon}
              fieldName={fieldName}
              count={values.length}
              disabled={isDisabled}
            />
          }
          state={checkboxState}
          onClick={isChecked => {
            if (isDisabled) {
              return;
            }
            if (!isChecked) {
              selectionStore.unselect(fieldName);
            } else {
              selectionStore.select(fieldName);
            }
          }}
        />
      }
      group={getGroup(fieldName)}
    >
      {!isDisabled &&
        <ResourceList
          items={values.slice(0, 100)}
          selectedItems={selectedValues}
          fieldName={fieldName}
        />
      }
    </AppCollapsible>
  );
};