import React, { memo, useCallback } from 'react';
import { List } from '../../components/atoms/List/List';
import { ResourceListItem } from '../ResourceListItem/ResourceListItem';
import { SuccessCheckbox } from '../../components/checkboxes/SucessCheckbox/SuccessCheckbox';
import { Spacer } from '../../components/atoms/Spacer/Spacer';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import { useResourcesSelectionStore } from '../../stores';
// import { formatDate } from '../../../../common/helpers';
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
  // const resourceStore = useResourceStore();
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
        items={items.map((item) => {
          // const meta = resourceStore.getMappedData(
          //   resourceStore.activeTabID,
          //   fieldName,
          //   item,
          // );

          // const { lastSeen = '', firstSeen = '' } = meta;

          return {
            id: item,
            content: (
              <ResourceListItem resourceName={item} fieldName={fieldName}>
                <SuccessCheckbox
                  content={<AppTooltip
                    className="resource-value-tooltip small"
                    content={
                      <span>
                        {/* First Seen: */}
                        {/* {!firstSeen && ' -'} */}
                        {/* <b>{firstSeen && ` ${formatDate('%d %fM %Y', new Date(firstSeen))} `}</b> */}
                        {/* {firstSeen && formatDate('%h:%m:%s', new Date(firstSeen))} */}
                        {/* <br/> */}
                        {/* Last Seen: */}
                        {/* {!lastSeen && ' -'} */}
                        {/* <b>{lastSeen && ` ${formatDate('%d %fM %Y', new Date(lastSeen))} `}</b> */}
                        {/* {lastSeen && formatDate('%h:%m:%s', new Date(lastSeen))} */}
                        {/* <br/> */}
                        {/* <br/> */}
                        {item}
                      </span>
                    }
                    getPosition={getTooltipPosition}
                    delayShowMs={1200}
                  >
                    {item}
                  </AppTooltip>}
                  checked={selectedItems.includes(item)}
                  onStateChanged={(isChecked) => {
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
