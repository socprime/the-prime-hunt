import React, { memo, useCallback } from 'react';
import { PlusIcon } from '../../atoms/icons/PlusIcon/PlusIcon';
import { MinusIcon } from '../../atoms/icons/MinusIcon/MinusIcon';
import { SeeDocumentIcon } from '../../atoms/icons/SeeDocumentIcon/SeeDocumentIcon';
import { ModifyQueryPayload } from '../../../../common/types/types-common-payloads';
import { AnimatedCopyIcon } from '../../icons/AnimatedCopyIcon/AnimatedCopyIcon';
import { usePlatformStore } from '../../../stores';
import { copyToClipboard } from '../../../../common/common-helpers';
import './styles.scss';

type ResourceListItemProps = {
  resourceName: string;
  fieldName: string;
};

export const ResourceListItem: React.FC<React.PropsWithChildren<ResourceListItemProps>> = memo(({
  children,
  fieldName,
  resourceName,
}) => {
  const platformStore = usePlatformStore();

  const onActionClick = useCallback(async (actionType: 'copy' | ModifyQueryPayload['modifyType']) => {
    if (actionType === 'copy') {
      setTimeout(() => {
        copyToClipboard(`where ${platformStore.buildQueryParts(
          'include',
          { [fieldName]:[resourceName] },
        )}`);
      }, 300);
      return;
    }
    platformStore.modifyQuery(actionType, { [fieldName]: [resourceName] });
    return;
  }, [platformStore, fieldName, resourceName]);

  return (
    <div className="resource-list-item">
      <div className="resource-list-item-wrapper">
        {children}
        <div className="action-menu">
          <AnimatedCopyIcon onClick={() => onActionClick('copy')} />
          <PlusIcon onClick={() => onActionClick('include')} />
          <MinusIcon onClick={() => onActionClick('exclude')} />
          <SeeDocumentIcon onClick={() => onActionClick('show all')} />
        </div>
      </div>
    </div>
  );
});
