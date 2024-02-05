import React from 'react';
import { useRouter } from '../../stores';
import { StaticButton } from '../../components/buttons/StaticButton/StaticButton';
import { SettingsIcon } from '../../components/atoms/icons/SettingsIcon/SettingsIcon';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import './styles.scss';

export const SettingsButton: React.FC = () => {
  const router = useRouter();

  return (
    <StaticButton
      className="settings-button"
      onClick={() => {
        router.page = 'settings:integrations';
      }}
    >
      <AppTooltip
        content="Integrations settings"
        className="small"
      >
        <SettingsIcon />
      </AppTooltip>
    </StaticButton>
  );
};
