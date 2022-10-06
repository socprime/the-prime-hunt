import React from 'react';
import { BulkResourcesPanel } from '../../../resources/BulkResourcesPanel/BulkResourcesPanel';
import { useResourceSelection } from '../../resources-hooks';
import { observer } from 'mobx-react-lite';

export const ResourcesFooterView: React.FC = observer(() => {
  const selectionStore = useResourceSelection();
  const { countSelected } = selectionStore;

  return (
    countSelected > 0 ? (
      <BulkResourcesPanel selectionStore={selectionStore} />
    ) : null
  );
});