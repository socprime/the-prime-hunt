import React from 'react';
import { StaticButton, StaticButtonProps } from '../StaticButton/StaticButton';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type BigStaticButtonProps = StaticButtonProps;

export const BigStaticButton: React.FC<React.PropsWithChildren<BigStaticButtonProps>> = ({
  className = '',
  children,
  ...restProps
}) => {
  return (
    <StaticButton
      className={createClassName(['big-static-button', className])}
      {...restProps}
    >
      {children}
    </StaticButton>
  );
};
