import React, { memo, useCallback, useState } from 'react';
import { PlusIcon } from '../../components/atoms/icons/PlusIcon/PlusIcon';
import { MinusIcon } from '../../components/atoms/icons/MinusIcon/MinusIcon';
import { SeeDocumentIcon } from '../../components/atoms/icons/SeeDocumentIcon/SeeDocumentIcon';
import { ModifyQueryPayload } from '../../../common/types/types-common-payloads';
import { AnimatedCopyIcon } from '../../components/icons/AnimatedCopyIcon/AnimatedCopyIcon';
import { usePlatformStore } from '../../stores';
import { copyToClipboard } from '../../../common/common-helpers';
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
  const [isActionMenu, setIsActionMenu] = useState(false);
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
    <div
      className="resource-list-item"
      onMouseEnter={() => {
        setIsActionMenu(true);
      }}
      onMouseLeave={() => {
        setIsActionMenu(false);
      }}
    >
      <div className="resource-list-item-wrapper">
        {children}
        {isActionMenu && (
          <div className="action-menu">
            <AnimatedCopyIcon onClick={() => onActionClick('copy')} />
            <PlusIcon onClick={() => onActionClick('include')} />
            <MinusIcon onClick={() => onActionClick('exclude')} />
            <SeeDocumentIcon onClick={() => onActionClick('show all')} />
          </div>
        )}
      </div>
    </div>
  );
});
