import React from 'react';
import { useAppStore } from '../../stores';
import { StaticButton } from '../../components/buttons/StaticButton/StaticButton';
import { SettingsIcon } from '../../components/atoms/icons/SettingsIcon/SettingsIcon';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import './styles.scss';

export const SettingsButton: React.FC = () => {
  const appStore = useAppStore();

  return (
    <StaticButton
      className="settings-button"
      onClick={() => {
        appStore.view = 'integrations';
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
