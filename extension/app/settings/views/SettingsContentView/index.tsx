import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { SettingsContentViewProps } from './types';
import { IntegrationsContentView } from '../../../integrations/views/IntegrationsContentView/IntegrationsContentView';
import { MailsContentView } from '../../../mail/views/MailsContentView';

export const SettingsContentView: FC<SettingsContentViewProps> = observer(({
  page,
}) => {
  if (page === 'settings:integrations') {
    return <IntegrationsContentView />;
  }

  return <MailsContentView />;
});
