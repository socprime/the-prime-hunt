import React, { memo, useCallback } from 'react';
import { List } from '../../components/atoms/List/List';
import { ResourceListItem } from '../ResourceListItem/ResourceListItem';
import { SuccessCheckbox } from '../../components/checkboxes/SucessCheckbox/SuccessCheckbox';
import { Spacer } from '../../components/atoms/Spacer/Spacer';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import { useResourcesSelectionStore } from '../../stores';
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
  const selectionStore = useResourcesSelectionStore();

  const getTooltipPosition = useCallback((
    tooltip: HTMLElement,
  ) => {
    const coords = tooltip.getBoundingClientRect();
    return {
      left: coords.left,
    };
  }, []);

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
                  content={item.length > 20
                    ? <AppTooltip
                        className="resource-value-tooltip small"
                        content={item}
                        getPosition={getTooltipPosition}
                        delayShowMs={1200}
                      >
                        {item}
                      </AppTooltip>
                    : item
                  }
                  checked={selectedItems.includes(item)}
                  onStateChanged={isChecked => {
                    if (isChecked) {
                      selectionStore.select(fieldName, item);
                    } else {
                      selectionStore.unselect(fieldName, item);
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