import React from 'react';
import { StaticButton } from '../../../components/buttons/StaticButton/StaticButton';
import { observer } from 'mobx-react-lite';
import { usePlatformStore } from '../../../stores';
import { SuccessMessage } from '../SuccessMessage';
import './styles.scss';

export const SuccessOpenCTIExportMessage: React.FC = observer(() => {
  const platformStore = usePlatformStore();

  return (
    <SuccessMessage
      className="success-opencti-export-message"
    >
      <p>
        Data sent to OpenCTI successfully
      </p>
      <StaticButton
        onClick={() => {
          platformStore.setMessage(null);
        }}
      >
        Close
      </StaticButton>
    </SuccessMessage>
  );
});
