import React, { useEffect } from 'react';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { useAppStore } from '../../../stores';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { AppTooltip } from '../../../components/tooltips/AppTooltip/AppTooltip';

export const FaqFooterView: React.FC = () => {
  const appStore = useAppStore();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const code = e.code?.toLowerCase?.() || '';
      if (code === 'escape') {
        appStore.view = 'resources';
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [appStore]);

  return (
    <div>
      <Spacer height={32} />
      <AppTooltip content="Close (Esc)" className="small">
        <BigStaticButton
          onClick={() => {
            appStore.view = 'resources';
          }}
        >
          Close
        </BigStaticButton>
      </AppTooltip>
    </div>
  );
};
