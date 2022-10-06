import React from 'react';
import { useAppStore } from '../../../stores';
import { StaticButton } from '../StaticButton/StaticButton';
import { RoundedQuestionMarkIcon } from '../../atoms/icons/RoundedQuestionMarkIcon/RoundedQuestionMarkIcon';
import './styles.scss';

export const FaqButton: React.FC = () => {
  const appStore = useAppStore();

  return (
    <StaticButton
      className="faq-button"
      onClick={() => {
        appStore.view = 'faq';
      }}
    >
      <RoundedQuestionMarkIcon />
    </StaticButton>
  );
};
