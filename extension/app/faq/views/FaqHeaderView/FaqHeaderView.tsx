import React from 'react';
import { AppHeader } from '../../../components/headers/AppHeader/AppHeader';
import { Spacer } from '../../../components/atoms/Spacer/Spacer';

export const FaqHeaderView: React.FC = () => {
  return (
    <div>
      <Spacer height={24} />
      <AppHeader>FAQ</AppHeader>
      <Spacer height={8} />
    </div>
  );
};
