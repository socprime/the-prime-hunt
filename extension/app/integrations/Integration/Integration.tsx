import React from 'react';
import { IntegrationInput } from '../IntegrationInput/IntegrationInput';
import { Spacer } from '../../components/atoms/Spacer/Spacer';
import { useIntegrationsStore } from '../../stores';
import { WasteBasketIcon } from '../../components/atoms/icons/WasteBasketIcon/WasteBasketIcon';
import './styles.scss';

export type IntegrationProps = {
  id: string;
  name: string;
  url: string;
};

export const Integration: React.FC<IntegrationProps> = ({
  id,
  name,
  url,
}) => {
  const integrationsStore = useIntegrationsStore();

  return (
    <div className="integration">
      <IntegrationInput
        label={[
          'Display Name',
          <WasteBasketIcon key={id} onClick={() => {
            integrationsStore.integrations =
              integrationsStore.integrations.filter(i => i.id !== id);
          }} />,
        ]}
        value={name}
        placeholder="ex Open CTI"
        onChange={value => {
          integrationsStore.integrations.find(i => i.id === id)!.name = value;
        }}
      />
      <Spacer height={12} />
      <IntegrationInput
        label="Integration URL"
        value={url}
        placeholder="ex https://my-host/search=$VALUE$"
        onChange={value => {
          integrationsStore.integrations.find(i => i.id === id)!.url = value;
        }}
      />
      <Spacer height={16} />
    </div>
  );
};
