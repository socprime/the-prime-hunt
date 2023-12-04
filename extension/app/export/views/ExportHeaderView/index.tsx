import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppHeader } from '../../../components/headers/AppHeader/AppHeader';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { useAppMessageStore } from '../../../stores';
import { StaticButton } from '../../../components/buttons/StaticButton/StaticButton';
import { ErrorMessage } from '../../../resources/messages/ErrorMessage';
import './styles.scss';

export const ExportHeaderView: React.FC = observer(() => {
  const messageStore = useAppMessageStore();

  return (
    <div
      className="export-header-view"
    >
      <Spacer height={24} />
      <AppHeader>Send To OpenCTI</AppHeader>
      {messageStore.error.error && (<>
        <Spacer height={12} />
          <ErrorMessage>
            <p>{messageStore.error.error.message}</p>
            <StaticButton
              onClick={() => {
                messageStore.error.error = null;
              }}
            >
              Close
            </StaticButton>
          </ErrorMessage>
        <Spacer height={3} />
      </>)}
      <Spacer height={12} />
    </div>
  );
});
