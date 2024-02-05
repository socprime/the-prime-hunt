import React from 'react';
import { useRouter } from '../../stores';
import { StaticButton } from '../../components/buttons/StaticButton/StaticButton';
import { RoundedQuestionMarkIcon } from '../../components/atoms/icons/RoundedQuestionMarkIcon/RoundedQuestionMarkIcon';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import './styles.scss';

export const FaqButton: React.FC = () => {
  const router = useRouter();

  return (
    <StaticButton
      className="faq-button"
      onClick={() => {
        router.page = 'faq';
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
