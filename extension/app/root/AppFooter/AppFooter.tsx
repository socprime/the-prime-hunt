import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../stores';
import { IntegrationFooterView } from '../../integrations/views/IntegrationFooterView/IntegrationFooterView';
import { ResourcesFooterView } from '../../resources/views/ResourcesFooterView/ResourcesFooterView';
import { FaqFooterView } from '../../faq/views/FaqFooterView/FaqFooterView';

export const AppFooter = observer(forwardRef<HTMLDivElement>((
  _,
  ref,
) => {
  const { view } = useAppStore();

  return (
    <div className="app-footer" ref={ref}>
      {view === 'resources' && <ResourcesFooterView />}
      {view === 'integrations' && <IntegrationFooterView />}
      {view === 'faq' && <FaqFooterView />}
    </div>
  );
}));
