import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from '../../stores';
import { NotFoundContentView } from '../../not-found/views/NotFoundContentView/NotFoundContentView';
import { ResourcesContentView } from '../../resources/views/ResourcesContentView/ResourcesContentView';
import { FaqContentView } from '../../faq/views/FaqContentView/FaqContentView';
import { ExportContentView } from '../../export/views/ExportContentView';
import { SettingsContentView } from '../../settings/views/SettingsContentView';
import { IntegrationContentView } from '../../integration/views/IntegrationContentView';
import { MailContentView } from '../../mail/views/MailContentView';

export const AppContent = observer(forwardRef<HTMLDivElement>((_, ref) => {
  const router = useRouter();
  const pageProps = router.pageProps.content;
  router.pageProps.content = {};

  return (
    <div className="app-content" ref={ref}>
      <ResourcesContentView className={router.page === 'resources' ? '' : 'invisible'} />
      {router.page === 'not-found' && <NotFoundContentView />}
      {router.page === 'faq' && <FaqContentView />}
      {router.page === 'export' && <ExportContentView {...pageProps} /> }
      {(router.page === 'settings:integrations' || router.page === 'settings:mail')
        && <SettingsContentView page={router.page} />}
      {router.page === 'integration' && <IntegrationContentView />}
      {router.page === 'mail' && <MailContentView />}
    </div>
  );
}));
