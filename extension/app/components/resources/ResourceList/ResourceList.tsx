import React, { memo } from 'react';
import { List } from '../../atoms/List/List';
import { ResourceListItem } from '../ResourceListItem/ResourceListItem';
import { SuccessCheckbox } from '../../checkboxes/SucessCheckbox/SuccessCheckbox';
import { useResourceSelection } from '../resources-hooks';
import { Spacer } from '../../atoms/Spacer/Spacer';
import './styles.scss';

type ResourceListProps = {
  items: string[];
  selectedItems: string[];
  fieldName: string;
};

export const ResourceList: React.FC<ResourceListProps> = memo(({
  fieldName,
  items,
  selectedItems,
}) => {
  const selectionStore = useResourceSelection();

  return (
    <>
      <List
        className="resource-list"
        items={items.map(item => {
          return {
            id: item,
            content: (
              <ResourceListItem resourceName={item} fieldName={fieldName}>
                <SuccessCheckbox
                  content={item}
                  title={item}
                  checked={selectedItems.includes(item)}
                  onStateChanged={isChecked => {
                    if (isChecked) {
                      selectionStore.select(item, fieldName);
                    } else {
                      selectionStore.unselect(item, fieldName);
                    }
                  }}
                />
              </ResourceListItem>
            ),
          };
        })}
      />
      <Spacer height={12} />
    </>
  );
});