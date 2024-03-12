import React from 'react';
import { AppButton } from '../AppButton/AppButton';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';
import { ButtonProps } from '../../atoms/Button/types';

type HoverButtonProps = {
  hovered?: boolean;
};

export const HoverButton: React.FC<React.PropsWithChildren<ButtonProps & HoverButtonProps>> = ({
  children,
  hovered,
  className = '',
  ...restProps
}) => {
  return (
    <AppButton
      className={createClassName(['hover-button', className, hovered ? 'hovered' : ''])}
      {...restProps}
    >
      {children}
    </AppButton>
  );
};
