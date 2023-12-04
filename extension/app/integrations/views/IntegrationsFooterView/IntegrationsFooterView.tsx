import React from 'react';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { useAppRouterStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { AppTooltip } from '../../../components/tooltips/AppTooltip/AppTooltip';
import './styles.scss';

export const IntegrationsFooterView: React.FC = observer(() => {
  const routerStore = useAppRouterStore();

  return (
    <>
      <Spacer height={20} />
      <div className="integrations-footer-view">
        <AppTooltip
          className="small"
          content="Close (Esc)"
        >
          <BigStaticButton
            onClick={() => {
              routerStore.goToResourcesPage();
            }}
          >
            Close
          </BigStaticButton>
        </AppTooltip>
      </div>
    </>
  );
});
