import {
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore, usePlatformStore, useRouter } from '../../stores';
import { CloseAppButton } from '../CloseAppButton/CloseAppButton';
import { createClassName } from '../../../common/common-helpers';
import { LogoIcon } from '../../components/icons/LogoIcon/LogoIcon';
import { ResourcesHeaderView } from '../../resources/views/ResourcesHeaderView/ResourcesHeaderView';
import { FaqButton } from '../../faq/FaqButton/FaqButton';
import { FaqHeaderView } from '../../faq/views/FaqHeaderView/FaqHeaderView';
import { AppLink } from '../../components/links/AppLink/AppLink';
import { SettingsButton } from '../../integrations/SettingsButton/SettingsButton';
import { ExportButton } from '../../resources/ExportButton/ExportButton';
import { ExportHeaderView } from '../../export/views/ExportHeaderView';
import { SettingsHeaderView } from '../../settings/views/SettingsHeaderView';
import { IntegrationHeaderView } from '../../integration/views/IntegrationHeaderView';
import { MailHeaderView } from '../../mail/views/MailHeaderView';
import { SocPrimeSaveQueryHeader } from '../../socprime/views/save-query/SocPrimeSaveQueryHeader';
import './styles.scss';

export const AppHeader = observer(forwardRef<HTMLDivElement, {}>((
  _,
  ref,
) => {
  const router = useRouter();
  const isPlatform = !!usePlatformStore().getID();
  const appStore = useAppStore();

  router.pageProps.header = {};

  const dragElementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    appStore.dragElementRef = dragElementRef;
  }, [appStore]);

  const isMainPage = router.page === 'resources' || router.page === 'resources:query';

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
              && router.page === 'resources'
              && <ExportButton />
            }
            {isMainPage && <SettingsButton />}
            {isMainPage && <FaqButton />}
            {(isMainPage || router.page === 'not-found')
              && <CloseAppButton />}
          </div>
        </span>
      </div>
      {(router.page === 'settings:integrations'
          || router.page === 'settings:mail'
          || router.page === 'settings:socprime'
      ) && <SettingsHeaderView page={router.page} />}
      {router.page === 'integration' && <IntegrationHeaderView />}
      {(router.page === 'resources'
        || router.page === 'resources:query'
      ) && <ResourcesHeaderView />}
      {router.page === 'export' && <ExportHeaderView />}
      {router.page === 'faq' && <FaqHeaderView />}
      {router.page === 'mail' && <MailHeaderView />}
      {router.page === 'socprime:save-query' && <SocPrimeSaveQueryHeader />}
    </div>
  );
}));
