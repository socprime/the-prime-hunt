import React from 'react';
import { Header } from '../../../Header/Header';
import { Spacer } from '../../../atoms/Spacer/Spacer';

export const FaqHeaderView: React.FC = () => {
  return (
    <div>
      <Spacer height={24} />
      <Header>FAQ</Header>
      <Spacer height={8} />
    </div>
  );
};
