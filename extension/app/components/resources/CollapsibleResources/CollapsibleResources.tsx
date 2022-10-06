import React, { useMemo } from 'react';
import { ParsedResources } from '../../../../common/types/types-common';
import { CollapsibleResource } from '../CollapsibleResource/CollapsibleResource';
import { createClassName } from '../../../../common/common-helpers';
import { observer } from 'mobx-react-lite';
import { useResourceSelection } from '../resources-hooks';

type CollapsibleResourceProps = {
  resource: ParsedResources;
  icon: React.ReactNode;
  className?: string;
};

export const CollapsibleResources: React.FC<CollapsibleResourceProps> = observer(({
  className = '',
  resource,
  icon,
}) => {
  const [fieldNames, fieldValues] = useMemo(() => {
    const fv: Map<string, string[]> = new Map();
    const fn = Object.keys(resource || {});
    fn.forEach(name => {
      fv.set(name, Array.from(resource[name]));
    });

    return [ fn, fv ];
  }, [resource]);

  const selectionStore = useResourceSelection();

  return (
    <div className={createClassName(['collapsible-resources', className])}>
      {fieldNames.map(fieldName => {
        return (
          <CollapsibleResource
            key={fieldName}
            fieldName={fieldName}
            icon={icon}
            values={fieldValues.get(fieldName)!}
            selectedValues={Array.from(selectionStore.selected.get(fieldName) || [])}
          />
        );
      })}
    </div>
  );
});
