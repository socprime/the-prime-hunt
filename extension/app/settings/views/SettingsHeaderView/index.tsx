import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { SettingsHeaderViewProps } from './types';
import { AppHeader } from '../../../components/headers/AppHeader/AppHeader';
import { TabsPanel } from '../../../components/atoms/TabsPanel/TabsPanel';
import { StaticButton } from '../../../components/buttons/StaticButton/StaticButton';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { useRouter } from '../../../stores';
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
            id: 'settings:integrations' as SettingsHeaderViewProps['page'],
            component: <div>
              <StaticButton>Integrations</StaticButton>
            </div>,
          },
          {
            id: 'settings:mail' as SettingsHeaderViewProps['page'],
            component: <div>
              <StaticButton>Mail Templates</StaticButton>
            </div>,
          },
        ]}
        onActiveTabChanged={(activeTabID: SettingsHeaderViewProps['page']) => {
          router.goToSettingsPage(activeTabID);
        }}
        activeTab={page}
      />
      <Spacer height={16} />
    </div>
  );
});
