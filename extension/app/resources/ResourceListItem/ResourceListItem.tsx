import React, { memo, useCallback, useState } from 'react';
import { PlusIcon } from '../../components/atoms/icons/PlusIcon/PlusIcon';
import { MinusIcon } from '../../components/atoms/icons/MinusIcon/MinusIcon';
import { SeeDocumentIcon } from '../../components/atoms/icons/SeeDocumentIcon/SeeDocumentIcon';
import { ModifyQueryPayload } from '../../../common/types/types-common-payloads';
import { useAppRouterStore, usePlatformStore } from '../../stores';
import { SendToIcon } from '../../components/atoms/icons/SendToIcon';
import { getIntegrationModel } from '../../../integrations';
import { NoOpenCTIProfileMessage } from '../messages/NoOpenCTIProfileMessage';
import { AnimatedCopyIcon } from '../../components/icons/AnimatedCopyIcon/AnimatedCopyIcon';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
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
  const router = useAppRouterStore();

  const onActionClick = useCallback(async (actionType: 'copy' | ModifyQueryPayload['modifyType']) => {
    if (actionType === 'copy') {
      platformStore.copyToClipboard({ [fieldName]: [resourceName] });
      return;
    }
    platformStore.modifyQuery(actionType, { [fieldName]: [resourceName] });
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
            <AppTooltip className="small" content="Send to OpenCTI">
              <SendToIcon
                onClick={() => {
                  getIntegrationModel('openCTI')
                    ?.getStorage()
                    .then(({ data }) => {
                      const { isActive, isValid } = data || {};
                      if (!isActive || !isValid) {
                        platformStore.setMessage(NoOpenCTIProfileMessage);
                        return;
                      }
                      router.goToExportPage(resourceName);
                    });
                }}
              />
            </AppTooltip>
          </div>
        )}
      </div>
    </div>
  );
});
