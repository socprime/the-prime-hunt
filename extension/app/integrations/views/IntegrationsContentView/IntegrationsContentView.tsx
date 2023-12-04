import React from 'react';
import { observer } from 'mobx-react-lite';
import SimpleBar from 'simplebar-react';
import { useAppRouterStore, useIntegrationsStore } from '../../../stores';
import { sortStrings } from '../../../../../common/helpers';
import { AppArea } from '../../../components/areas/AppArea';
import { SmallArrowIcon } from '../../../components/atoms/icons/SmallArrowIcon/SmallArrowIcon';
import './styles.scss';

export const IntegrationsContentView: React.FC = observer(() => {
  const integrationsStore = useIntegrationsStore();
  const routerStore = useAppRouterStore();

  const openCTIIntegration = integrationsStore.integrations.find((i) => i.id === '$open-cti$');

  return (
    <SimpleBar className="integrations-content-view">
      {openCTIIntegration && (
        <AppArea>
          <>
            <span>{openCTIIntegration.name}</span>
            <span
              className="icon-wrapper"
              onClick={() => {
                routerStore.goToIntegrationPage(openCTIIntegration);
              }}
            >
              <SmallArrowIcon/>
            </span>
          </>
        </AppArea>
      )}
      {
        integrationsStore
          .integrations
          .slice()
          .filter((i) => i.id !== '$open-cti$')
          .sort((a, b) => sortStrings(b.name, a.name, 'descending'))
          .map((i) => {
            return (
              <AppArea key={i.id}>
                <>
                  <span>{i.name}</span>
                  <span
                    className="icon-wrapper"
                    onClick={() => {
                      routerStore.goToIntegrationPage(i);
                    }}
                  >
                    <SmallArrowIcon/>
                  </span>
                </>
              </AppArea>
            );
          })
      }
    </SimpleBar>
  );
});
