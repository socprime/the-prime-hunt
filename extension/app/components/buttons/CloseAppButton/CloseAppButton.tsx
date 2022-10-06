import React from 'react';
import { StaticButton } from '../StaticButton/StaticButton';
import { CrossIcon } from '../../atoms/icons/CrossIcon/CrossIcon';
import { useAppStore } from '../../../stores';
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
      <CrossIcon />
    </StaticButton>
  );
};
