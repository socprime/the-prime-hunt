import React from 'react';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { AppHeader } from '../../../components/headers/AppHeader/AppHeader';
import { PlusIcon } from '../../../components/atoms/icons/PlusIcon/PlusIcon';
import { uuid } from '../../../../../common/helpers';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { useAppRouterStore, useIntegrationsStore } from '../../../stores';
import './styles.scss';

export const IntegrationsHeaderView: React.FC = () => {
  const routerStore = useAppRouterStore();
  const integrationsStore = useIntegrationsStore();

  return (
    <div className="integrations-header-view">
      <Spacer height={24} />
      <div className="group">
        <AppHeader>Integration Settings</AppHeader>
        <BigStaticButton
          icon={<PlusIcon />}
          onClick={() => {
            const customIntegration = {
              id: `@@--${uuid()}` as any,
              url: '',
              name: 'Custom',
            };
            integrationsStore.integrations.push(customIntegration);
            routerStore.goToIntegrationPage(customIntegration);
          }}
        >
          Add New Integration
        </BigStaticButton>
      </div>
      <Spacer height={24} />
    </div>
  );
};
