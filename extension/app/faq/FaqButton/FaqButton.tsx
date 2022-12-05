import React from 'react';
import { useAppStore } from '../../stores';
import { StaticButton } from '../../components/buttons/StaticButton/StaticButton';
import { RoundedQuestionMarkIcon } from '../../components/atoms/icons/RoundedQuestionMarkIcon/RoundedQuestionMarkIcon';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
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
      <AppTooltip
        content="FAQ"
        className="small"
      >
        <RoundedQuestionMarkIcon />
      </AppTooltip>
    </StaticButton>
  );
};
