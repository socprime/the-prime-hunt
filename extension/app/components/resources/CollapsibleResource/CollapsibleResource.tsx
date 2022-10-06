import React from 'react';
import { ResourceList } from '../ResourceList/ResourceList';
import { AppCollapsible } from '../../collapsibles/AppCollapsible/AppCollapsible';
import { ResourceFieldName } from '../ResourceFieldName/ResourceFieldName';
import { NestedItemsCheckbox } from '../../checkboxes/NestedItemsCheckbox/NestedItemsCheckbox';
import { useAppStore, useResourceStore } from '../../../stores';
import { useResourceSelection } from '../resources-hooks';
import { WasteBasketIcon } from '../../atoms/icons/WasteBasketIcon/WasteBasketIcon';
import { LoadingKey } from '../../../types/types-app-common';
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
  const selectionStore = useResourceSelection();

  return (
    <AppCollapsible
      className="collapsible-resource"
      header={
        <NestedItemsCheckbox
          content={<ResourceFieldName icon={icon} fieldName={fieldName} count={values.length} />}
          state={
            selectedValues.length === values.length
              ? 'all'
              : selectedValues.length > 0
                ? 'some'
                : 'nothing'
          }
          onClick={isChecked => {
            if (!isChecked) {
              selectionStore.unselectAll();
            } else {
              resourceStore.getResources(fieldName).forEach(v => {
                selectionStore.select(v, fieldName);
              });
            }
          }}
        />
      }
      group={
        <WasteBasketIcon
          onClick={(e) => {
            e?.preventDefault?.();
            e?.stopPropagation?.();
            appStore.startLoading(LoadingKey.fieldRemoving);
            setTimeout(() => {
              resourceStore.removeField(fieldName);
              appStore.stopLoading(LoadingKey.fieldRemoving);
            }, 0);
          }}
        />
      }
    >
      <ResourceList
        items={values}
        selectedItems={selectedValues}
        fieldName={fieldName}
      />
    </AppCollapsible>
  );
};