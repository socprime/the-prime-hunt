import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { SettingsHeaderViewProps } from './types';
import { AppHeader } from '../../../components/headers/AppHeader/AppHeader';
import { TabsPanel } from '../../../components/atoms/TabsPanel/TabsPanel';
import { TabsPanelProps } from '../../../components/atoms/TabsPanel/types';
import { StaticButton } from '../../../components/buttons/StaticButton/StaticButton';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { useRouter } from '../../../stores';
import { SettingsPage } from '../../../router/pages';
import './styles.scss';

export const SettingsHeaderView: FC<SettingsHeaderViewProps> = observer(({
  page,
}) => {
  const router = useRouter();

  return (
    <div className="settings-header-view">
      <Spacer height={24} />
      <AppHeader>
        Settings
      </AppHeader>
      <Spacer height={16} />
      <TabsPanel
        className="settings-tabs"
        tabs={[
          {
            id: 'settings:integrations',
            component: <div>
              <StaticButton>Integrations</StaticButton>
            </div>,
          },
          {
            id: 'settings:mail',
            component: <div>
              <StaticButton>Mail Templates</StaticButton>
            </div>,
          },
          {
            id: 'settings:socprime',
            component: <div>
              <StaticButton>SOC Prime API</StaticButton>
            </div>,
          },
        ] as TabsPanelProps['tabs'] & {
          id: SettingsPage;
        }[]}
        onActiveTabChanged={(activeTabID: SettingsHeaderViewProps['page']) => {
          router.goToSettingsPage(activeTabID);
        }}
        activeTab={page}
      />
      <Spacer height={16} />
    </div>
  );
});
