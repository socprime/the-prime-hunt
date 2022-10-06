import React from 'react';
import { BigStaticButton } from '../../../buttons/BigStaticButton/BigStaticButton';
import { useAppStore } from '../../../../stores';
import { Spacer } from '../../../atoms/Spacer/Spacer';

export const FaqFooterView: React.FC = () => {
  const appStore = useAppStore();

  return (
    <div>
      <Spacer height={32} />
      <BigStaticButton
        onClick={() => {
          appStore.view = 'resources';
        }}
      >
        Close
      </BigStaticButton>
    </div>
  );
};
