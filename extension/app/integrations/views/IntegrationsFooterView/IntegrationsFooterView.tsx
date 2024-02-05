import React from 'react';
import { observer } from 'mobx-react-lite';
import { PlusIcon } from '../../../components/atoms/icons/PlusIcon/PlusIcon';
import { suuid } from '../../../../../common/helpers';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { useIntegrationsStore, useRouter } from '../../../stores';
import { Integration } from '../../../integration/integration-types';

export const IntegrationsFooterView: React.FC = observer(() => {
  const routerStore = useRouter();
  const integrationsStore = useIntegrationsStore();

  return (
    <>
      <BigStaticButton
        icon={<PlusIcon />}
        onClick={() => {
          const customIntegration = {
            id: suuid() as Integration['id'],
            url: '',
            name: 'Custom',
          };
          integrationsStore.integrations.push(customIntegration);
          routerStore.goToIntegrationPage(customIntegration);
        }}
      >
        Add New Integration
      </BigStaticButton>
    </>
  );
});
