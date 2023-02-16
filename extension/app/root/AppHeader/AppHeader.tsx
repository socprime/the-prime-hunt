import React, { forwardRef, useEffect, useRef } from 'react';
import { useAppStore, usePlatformStore } from '../../stores';
import { CloseAppButton } from '../CloseAppButton/CloseAppButton';
import { observer } from 'mobx-react-lite';
import { createClassName } from '../../../common/common-helpers';
import { LogoIcon } from '../../components/icons/LogoIcon/LogoIcon';
import { ResourcesHeaderView } from '../../resources/views/ResourcesHeaderView/ResourcesHeaderView';
import { IntegrationHeaderView } from '../../integrations/views/IntegrationHeaderView/IntegrationHeaderView';
import { FaqButton } from '../../faq/FaqButton/FaqButton';
import { FaqHeaderView } from '../../faq/views/FaqHeaderView/FaqHeaderView';
import { AppLink } from '../../components/links/AppLink/AppLink';
import { SettingsButton } from '../../integrations/SettingsButton/SettingsButton';
import { ExportButton } from '../../resources/ExportButton/ExportButton';
import './styles.scss';

export const AppHeader = observer(forwardRef<HTMLDivElement>((
  _,
  ref,
) => {
  const isPlatform = !!usePlatformStore().getID();
  const appStore = useAppStore();

  const dragElementRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    appStore.dragElementRef = dragElementRef;
  }, [appStore]);

  return (
    <div className="app-header" ref={ref}>
      <div className={createClassName([
        'app-header-wrapper',
      ])}>
        <span className="group">
          <AppLink href="https://socprime.com/?utm_source=addon-logo" target="_blank">
            <LogoIcon />
          </AppLink>
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
          <div className="buttons-wrapper">
            {isPlatform
              && appStore.view !== 'integrations'
              && appStore.view !== 'faq' && <ExportButton />}
            {appStore.view === 'resources' && <SettingsButton />}
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