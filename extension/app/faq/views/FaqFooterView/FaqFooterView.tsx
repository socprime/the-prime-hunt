import React, { useEffect } from 'react';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { useRouter } from '../../../stores';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { AppTooltip } from '../../../components/tooltips/AppTooltip/AppTooltip';

export const FaqFooterView: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const code = e.code?.toLowerCase?.() || '';
      if (code === 'escape') {
        router.page = 'resources';
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [router]);

  return (
    <div>
      <Spacer height={32} />
      <AppTooltip content="Close (Esc)" className="small">
        <BigStaticButton
          onClick={() => {
            router.page = 'resources';
          }}
        >
          Close
        </BigStaticButton>
      </AppTooltip>
    </div>
  );
};
