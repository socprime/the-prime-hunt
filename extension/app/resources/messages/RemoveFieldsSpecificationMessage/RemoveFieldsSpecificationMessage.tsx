import React from 'react';
import { WarningIcon } from '../../../components/atoms/icons/WarningIcon/WarningIcon';
import { StaticButton } from '../../../components/buttons/StaticButton/StaticButton';
import { sendMessageFromApp } from '../../../../content/services/content-services';
import { observer } from 'mobx-react-lite';
import { MessageToBackground } from '../../../../background/types/types-background-messages';
import { usePlatformStore } from '../../../stores';
import { DirectMessagePayload } from '../../../../common/types/types-common-payloads';
import { MessageToInline } from '../../../../inline/types/types-inline-messages';
import './styles.scss';

export const RemoveFieldsSpecificationMessage: React.FC = observer(() => {
  const platformStore = usePlatformStore();

  return (
    <div className="remove-fields-specification-message">
      <WarningIcon />
      <p>
        The query contains a select statement that limits the fields in the results. Do you want to select all the fields available in the table?
      </p>
      <StaticButton
        onClick={() => {
          sendMessageFromApp({
            type: MessageToBackground.BGDirectMessageToInline,
            payload: {
              type: MessageToInline.ISRemoveFieldSpecification,
            } as DirectMessagePayload,
          });
          platformStore.setMessage(null);
        }}
      >
        Yes
      </StaticButton>
      <StaticButton
        onClick={() => {
          platformStore.setMessage(null);
        }}
      >
        No
      </StaticButton>
    </div>
  );
});
