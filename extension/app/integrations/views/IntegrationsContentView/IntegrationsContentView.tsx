import React from 'react';
import { observer } from 'mobx-react-lite';
import SimpleBar from 'simplebar-react';
import { useRouter, useIntegrationsStore } from '../../../stores';
import { sortStrings } from '../../../../../common/helpers';
import { SettingsArea } from '../../../settings/SettingsArea';
import './styles.scss';

export const IntegrationsContentView: React.FC = observer(() => {
  const integrationsStore = useIntegrationsStore();
  const routerStore = useRouter();

  const openCTIIntegration = integrationsStore.integrations.find((i) => i.id === '$open-cti$');

  const integrations = [
    ...(openCTIIntegration ? [openCTIIntegration] : []),
    ...integrationsStore
      .integrations
      .slice()
      .filter((i) => i.id !== '$open-cti$')
      .sort((a, b) => sortStrings(b.name, a.name, 'descending')),
  ];

  return (
    <SimpleBar className="integrations-content-view">
      {
        integrations
          .map((i) => {
            return (
            <SettingsArea
              key={i.id}
              id={i.id}
              name={i.name}
              onClick={() => {
                routerStore.goToIntegrationPage(i);
              }}
            />
            );
          })
      }
      {integrations.length < 1 && (
        <div>
          There are no integrations configured yet
        </div>
      )}
    </SimpleBar>
  );
});
