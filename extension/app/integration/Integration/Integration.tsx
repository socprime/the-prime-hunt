import React from 'react';
import { observer } from 'mobx-react-lite';
import { Spacer } from '../../components/atoms/Spacer/Spacer';
import { useIntegrationsStore, useIntegrationStore } from '../../stores';
import { IntegrationInput } from '../../integrations/IntegrationInput/IntegrationInput';
import { OpenCTIIntegration } from '../OpenCTIIntegration';
import { isNotEmptyString } from '../../../../common/validators';
import { AppGroupHeader } from '../../components/headers/AppGroupHeader';
import { Integration as IntegrationType } from '../integration-types';
import './styles.scss';

const validateMessage = 'This field is required';

export const Integration: React.FC = observer(() => {
  const integrationsStore = useIntegrationsStore();
  const integrationStore = useIntegrationStore();
  const integration = integrationStore.getIntegration();

  const { id = '', url = '', name = '' } = integration || {};

  return (
    <div className="integration">
      {id === '$open-cti$' && <>
        <AppGroupHeader>
          SEARCH AT OPENCTI
        </AppGroupHeader>
        <Spacer height={16} />
      </>}
      <IntegrationInput
        label="Display Name"
        value={name}
        placeholder="ex OpenCTI"
        onChange={(value) => {
          integrationStore.setIntegration({
            ...(integrationStore.getIntegration() || {}),
            name: value,
          } as IntegrationType);
          integrationsStore.integrations.find((i) => i.id === id)!.name = value;
        }}
        validators={[
          {
            validator: (v: string) => Promise.resolve(isNotEmptyString(v, validateMessage)),
            validateOnChange: true,
            validateOnBlur: true,
            validateOnFinish: true,
          },
        ]}
      />
      <Spacer height={12} />
      <IntegrationInput
        label="Integration URL"
        value={url}
        placeholder="ex https://my-host/search=$VALUE$"
        onChange={(value) => {
          integrationStore.setIntegration({
            ...(integrationStore.getIntegration() || {}),
            url: value,
          } as IntegrationType);
          integrationsStore.integrations.find((i) => i.id === id)!.url = value;
        }}
        validators={[
          {
            validator: (v: string) => Promise.resolve(isNotEmptyString(v, validateMessage)),
            validateOnChange: true,
            validateOnBlur: true,
            validateOnFinish: true,
          },
        ]}
      />
      {id === '$open-cti$' && <OpenCTIIntegration />}
      <Spacer height={16} />
    </div>
  );
});
