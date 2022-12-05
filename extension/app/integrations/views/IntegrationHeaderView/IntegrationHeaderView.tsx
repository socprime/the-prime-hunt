import React from 'react';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { RefreshIcon } from '../../../components/atoms/icons/RefreshIcon/RefreshIcon';
import { useIntegrationsStore } from '../../../stores';
import { AppHeader } from '../../../components/headers/AppHeader/AppHeader';
import './styles.scss';

export const IntegrationHeaderView: React.FC = () => {
  const integrationsStore = useIntegrationsStore();

  return (
    <div className="integration-header-view">
      <Spacer height={24} />
      <div className="group">
        <AppHeader>Integration Settings</AppHeader>
        <BigStaticButton
          icon={<RefreshIcon />}
          onClick={() => {
            integrationsStore.restoreIntegrations();
          }}
        >
          Restore Defaults
        </BigStaticButton>
      </div>
      <Spacer height={24} />
    </div>
  );
};
