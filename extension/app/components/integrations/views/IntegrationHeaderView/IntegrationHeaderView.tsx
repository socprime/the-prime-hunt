import React from 'react';
import { Spacer } from '../../../atoms/Spacer/Spacer';
import { BigStaticButton } from '../../../buttons/BigStaticButton/BigStaticButton';
import { RefreshIcon } from '../../../atoms/icons/RefreshIcon/RefreshIcon';
import { useIntegrationsStore } from '../../../../stores';
import { Header } from '../../../Header/Header';
import './styles.scss';

export const IntegrationHeaderView: React.FC = () => {
  const integrationsStore = useIntegrationsStore();

  return (
    <div className="integration-header-view">
      <Spacer height={24} />
      <div className="group">
        <Header>Integration Settings</Header>
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
