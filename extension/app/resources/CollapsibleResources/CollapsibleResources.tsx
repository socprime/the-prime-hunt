import React, { useCallback, useEffect, useState } from 'react';
import { CollapsibleResource } from '../CollapsibleResource/CollapsibleResource';
import { createClassName } from '../../../common/common-helpers';
import { FieldName, ParsedResources, ResourceName } from '../resources-types';
import { Spacer } from '../../components/atoms/Spacer/Spacer';
import { EyeIcon } from '../../components/atoms/icons/EyeIcon/EyeIcon';
import { CrossedEye } from '../../components/atoms/icons/CrossedEye/CrossedEye';
import { useAppStore, useResourcesSelectionStore } from '../../stores';
import { usePrevious } from '../../app-hooks';
import { observer } from 'mobx-react-lite';
import './styles.scss';

type CollapsibleResourceProps = {
  resources: ParsedResources;
  icon: React.ReactNode;
  className?: string;
};

type NormalizedResource = {
  fieldName: FieldName,
  values: ResourceName[],
};

export const CollapsibleResources: React.FC<CollapsibleResourceProps> = observer(({
  className = '',
  resources,
  icon,
}) => {
  const [showEmpty, setShowEmpty] = useState(false);
  const previousShowEmpty = usePrevious(showEmpty);
  const selectionStore = useResourcesSelectionStore();
  const appStore = useAppStore();

  useEffect(() => {
    if (previousShowEmpty && !showEmpty) {
      appStore.rootElement
        ?.querySelector('.resource-content-view')
        ?.querySelector('.simplebar-content-wrapper')
        ?.scrollTo?.({ top: 0 });
    }
  }, [
    appStore.rootElement,
    previousShowEmpty,
    showEmpty,
  ]);

  const getResources = useCallback((
    passedResources: ParsedResources,
  ) => {
    const emptyResources: NormalizedResource[] = [];
    const notEmptyResources: NormalizedResource[] = [];
    Object.keys(passedResources).forEach(fieldName => {
      if (passedResources[fieldName].size > 0) {
        notEmptyResources.push({
          fieldName,
          values: Array.from(passedResources[fieldName]),
        });
      } else {
        emptyResources.push({
          fieldName,
          values: Array.from(passedResources[fieldName]),
        });
      }
    });
    return { emptyResources, notEmptyResources };
  }, []);

  const getCollapsible = useCallback((
    fieldName: FieldName,
    collapsibleIcon: React.ReactNode,
    values: ResourceName[],
    selectedValues: ResourceName[],
  ) => {
    return (
      <CollapsibleResource
        key={fieldName}
        fieldName={fieldName}
        icon={collapsibleIcon}
        values={values}
        selectedValues={selectedValues}
      />
    );
  }, []);

  const { emptyResources, notEmptyResources } = getResources(resources);

  return (
    <div className={createClassName(['collapsible-resources', className])}>
      {notEmptyResources.map(({ fieldName, values }) =>
        getCollapsible(fieldName, icon, values, Array.from(selectionStore.selected.get(fieldName) || [])),
      )}
      {
        emptyResources.length > 0 && (
          <>
            <Spacer height={4} />
            <div
              className="fields-separator"
              onClick={() => {
                setShowEmpty(!showEmpty);
              }}
            >
              <Spacer height={3} />
              <span>
                <span>
                  {showEmpty ? <CrossedEye /> : <EyeIcon />}
                  {showEmpty ? 'Hide empty' : 'Show empty'}&nbsp;
                </span>
                ({emptyResources.length})
              </span>
              <Spacer height={3} />
              <hr />
            </div>
            <Spacer height={2} />
            {showEmpty && emptyResources.map(({ fieldName, values }) =>
              getCollapsible(fieldName, icon, values, Array.from(selectionStore.selected.get(fieldName) || [])),
            )}
          </>
        )
      }
    </div>
  );
});
