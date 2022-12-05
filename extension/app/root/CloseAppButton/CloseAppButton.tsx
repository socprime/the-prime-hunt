import React from 'react';
import { StaticButton } from '../../components/buttons/StaticButton/StaticButton';
import { CrossIcon } from '../../components/atoms/icons/CrossIcon/CrossIcon';
import { useAppStore } from '../../stores';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import './styles.scss';

export const CloseAppButton: React.FC = () => {
  const appStore = useAppStore();

  return (
    <StaticButton
      className="close-app-button"
      onClick={() => {
        appStore.isExtensionOpen = false;
      }}
    >
      <AppTooltip
        content="Hide/Show extension (Ctrl+Q)"
        className="small"
      >
        <CrossIcon />
      </AppTooltip>
    </StaticButton>
  );
};
