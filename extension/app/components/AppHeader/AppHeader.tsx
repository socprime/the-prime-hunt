import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { StaticButton } from '../buttons/StaticButton/StaticButton';
import { useAppStore, usePlatformStore, useResourceStore } from '../../stores';
import { CloseAppButton } from '../buttons/CloseAppButton/CloseAppButton';
import { observer } from 'mobx-react-lite';
import { createClassName, downloadFile } from '../../../common/common-helpers';
import { useResourceSelection } from '../resources/resources-hooks';
import { LogoIcon } from '../icons/LogoIcon/LogoIcon';
import { ExportIcon } from '../atoms/icons/ExportIcon/ExportIcon';
import { ResourcesHeaderView } from '../resources/views/ResourcesHeaderView/ResourcesHeaderView';
import { IntegrationHeaderView } from '../integrations/views/IntegrationHeaderView/IntegrationHeaderView';
import { FaqButton } from '../buttons/FaqButton/FaqButton';
import { FaqHeaderView } from '../faq/views/FaqHeaderView/FaqHeaderView';
import { Link } from '../Link/Link';
import './styles.scss';

export const AppHeader = observer(forwardRef<HTMLDivElement>((
  _,
  ref,
) => {
  const { platform } = usePlatformStore();
  const { activeTab } = useResourceStore();
  const appStore = useAppStore();

  const { selectedFields, selected, countSelected } = useResourceSelection();

  const dragElementRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    appStore.dragElementRef = dragElementRef;
  }, [appStore]);

  const onExportClick = useCallback(() => {
    if (selectedFields.size < 1) {
      return;
    }
    const rows: string[] = [
      'Type,Field,Value',
    ];
    Array.from(selectedFields).forEach(fieldName => {
      Array.from(selected.get(fieldName)!).forEach(value => {
        rows.push([activeTab, fieldName, value].join(','));
      });
    });
    downloadFile('csv', rows.join('\n'));
  }, [activeTab, selected, selectedFields]);

  const withButton = platform
    && appStore.view !== 'integrations'
    && appStore.view !== 'faq';

  return (
    <div className="app-header" ref={ref}>
      <div className={createClassName([
        'app-header-wrapper',
        withButton ? '' : 'no-button',
      ])}>
        <span className="group">
          <Link href="https://socprime.com/?utm_source=addon-logo" target="_blank">
            <LogoIcon />
          </Link>
          <span
            className="name strong drag-activator"
            ref={dragElementRef}
          >
            The Prime Hunt
          </span>
          <div className={createClassName([
            'spinner',
            appStore.loadingKeys.length > 0 ? '' : 'invisible',
          ])}></div>
        </span>
          <span className="group">
          {withButton && (
            <StaticButton
              icon={<ExportIcon />}
              onClick={onExportClick}
            >
              Export to CSV ({countSelected})
            </StaticButton>
          )}
          <div className="buttons-wrapper">
            {appStore.view === 'resources' && <FaqButton />}
            {(
              appStore.view === 'resources'
              || appStore.view === 'not-found'
            ) && <CloseAppButton />}
          </div>
        </span>
      </div>
      {appStore.view === 'resources' && (
        <ResourcesHeaderView />
      )}
      {appStore.view === 'integrations' && (
        <IntegrationHeaderView />
      )}
      {appStore.view === 'faq' && (
        <FaqHeaderView />
      )}
    </div>
  );
}));