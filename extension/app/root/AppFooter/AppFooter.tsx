import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../stores';
import { IntegrationsFooterView } from '../../integrations/views/IntegrationsFooterView/IntegrationsFooterView';
import { ResourcesFooterView } from '../../resources/views/ResourcesFooterView/ResourcesFooterView';
import { FaqFooterView } from '../../faq/views/FaqFooterView/FaqFooterView';
import { IntegrationFooterView } from '../../integration/views/IntegrationFooterView';
import { ExportFooterView } from '../../export/views/ExportFooterView';

export const AppFooter = observer(forwardRef<HTMLDivElement>((
  _,
  ref,
) => {
  const appStore = useAppStore();
  const pageProps = appStore.pageProps.footer;
  appStore.pageProps.footer = {};

  return (
    <div className="app-footer" ref={ref}>
      {appStore.view === 'resources' && <ResourcesFooterView />}
      {appStore.view === 'integrations' && <IntegrationsFooterView />}
      {appStore.view === 'faq' && <FaqFooterView />}
      {appStore.view === 'export-page' && <ExportFooterView />}
      {appStore.view === 'integration' && <IntegrationFooterView {...pageProps} />}
    </div>
  );
}));
