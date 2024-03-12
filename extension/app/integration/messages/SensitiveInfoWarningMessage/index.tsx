import React from 'react';
import { WarningMessage } from '../../../root/messages/WarningMessage';
import './styles.scss';

export const SensitiveInfoWarningMessage: React.FC = () => {
  return (
    <WarningMessage
      className="sensitive-info-warning-message"
    >
      <p>
        When using integrations with third-party services,
        do not send to them any sensitive information
      </p>
    </WarningMessage>
  );
};
