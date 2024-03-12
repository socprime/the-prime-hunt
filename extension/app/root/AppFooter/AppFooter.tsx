import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from '../../stores';
import { ResourcesFooterView } from '../../resources/views/ResourcesFooterView/ResourcesFooterView';
import { FaqFooterView } from '../../faq/views/FaqFooterView/FaqFooterView';
import { ExportFooterView } from '../../export/views/ExportFooterView';
import { SettingsFooterView } from '../../settings/views/SettingsFooterView';
import { IntegrationFooterView } from '../../integration/views/IntegrationFooterView';
import { MailFooterView } from '../../mail/views/MailFooterView';
import { SocPrimeSaveQueryFooter } from '../../socprime/views/save-query/SocPrimeSaveQueryFooter';

export const AppFooter = observer(forwardRef<HTMLDivElement>((
  _,
  ref,
) => {
  const router = useRouter();
  router.pageProps.footer = {};

  return (
    <div className="app-footer" ref={ref}>
      {router.page === 'resources' && <ResourcesFooterView />}
      {(
        router.page === 'settings:integrations'
        || router.page === 'settings:mail'
        || router.page === 'settings:socprime'
      ) && <SettingsFooterView page={router.page} />}
      {router.page === 'integration' && <IntegrationFooterView />}
      {router.page === 'faq' && <FaqFooterView />}
      {router.page === 'export' && <ExportFooterView />}
      {router.page === 'mail' && <MailFooterView />}
      {router.page === 'socprime:save-query' && <SocPrimeSaveQueryFooter />}
    </div>
  );
}));
