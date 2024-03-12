import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { SettingsFooterViewProps } from './types';
import { useAppMessageStore, useRouter } from '../../../stores';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { AppTooltip } from '../../../components/tooltips/AppTooltip/AppTooltip';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { IntegrationsFooterView } from '../../../integrations/views/IntegrationsFooterView/IntegrationsFooterView';
import { MailsFooterView } from '../../../mail/views/MailsFooterView';
import './styles.scss';
import { SocPrimeApiFooterView } from '../../../socprime/views/api-settings/SocPrimeApiFooterView';

export const SettingsFooterView: FC<SettingsFooterViewProps> = observer(({
  page,
}) => {
  const routerStore = useRouter();
  const message = useAppMessageStore();

  return (
    <>
      <Spacer height={20} />
      <div className="settings-footer-view">
        {page === 'settings:integrations' && <IntegrationsFooterView />}
        {page === 'settings:mail' && <MailsFooterView />}
        {page === 'settings:socprime' && <SocPrimeApiFooterView />}
        <AppTooltip
          className="small"
          content="Close"
        >
          <BigStaticButton
            disabled={message.error.id === 'socprime-api-tab'}
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
