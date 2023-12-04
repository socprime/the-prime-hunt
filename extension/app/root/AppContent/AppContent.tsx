import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../stores';
import { NotFoundContentView } from '../../not-found/views/NotFoundContentView/NotFoundContentView';
import { IntegrationsContentView } from '../../integrations/views/IntegrationsContentView/IntegrationsContentView';
import { ResourcesContentView } from '../../resources/views/ResourcesContentView/ResourcesContentView';
import { FaqContentView } from '../../faq/views/FaqContentView/FaqContentView';
import { IntegrationContentView } from '../../integration/views/IntegrationContentView';
import { ExportContentView } from '../../export/views/ExportContentView';

export const AppContent = observer(forwardRef<HTMLDivElement>((_, ref) => {
  const appStore = useAppStore();
  const pageProps = appStore.pageProps.content;
  appStore.pageProps.content = {};

  return (
    <div className="app-content" ref={ref}>
      <ResourcesContentView className={appStore.view === 'resources' ? '' : 'invisible'} />
      {appStore.view === 'not-found' && <NotFoundContentView />}
      {appStore.view === 'integrations' && <IntegrationsContentView />}
      {appStore.view === 'faq' && <FaqContentView />}
      {appStore.view === 'integration' && <IntegrationContentView {...pageProps}/> }
      {appStore.view === 'export-page' && <ExportContentView {...pageProps} /> }
    </div>
  );
}));
