import React from 'react';
import { BigStaticButton } from '../../../components/buttons/BigStaticButton/BigStaticButton';
import { useRouter } from '../../../stores';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';
import { AppTooltip } from '../../../components/tooltips/AppTooltip/AppTooltip';

export const FaqFooterView: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <Spacer height={32} />
      <AppTooltip content="Close (Esc)" className="small">
        <BigStaticButton
          onClick={() => {
            router.goToResourcesPage('resources');
          }}
          keyMappings={[{
            isMatched: (e) => e.key === 'Escape',
            action: () => router.goToResourcesPage('resources'),
          }]}
        >
          Close
        </BigStaticButton>
      </AppTooltip>
    </div>
  );
};
