import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../stores';
import { NotFoundContentView } from '../../not-found/views/NotFoundContentView/NotFoundContentView';
import { IntegrationContentView } from '../../integrations/views/IntegrationContentView/IntegrationContentView';
import { ResourcesContentView } from '../../resources/views/ResourcesContentView/ResourcesContentView';
import { FaqContentView } from '../../faq/views/FaqContentView/FaqContentView';

export const AppContent = observer(forwardRef<HTMLDivElement>((_, ref) => {
  const { view } = useAppStore();

  return (
    <div className="app-content" ref={ref}>
      <ResourcesContentView className={view === 'resources' ? '' : 'invisible'} />
      {view === 'not-found' && <NotFoundContentView />}
      {view === 'integrations' && <IntegrationContentView />}
      {view === 'faq' && <FaqContentView />}
    </div>
  );
}));
