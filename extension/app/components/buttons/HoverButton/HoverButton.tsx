import React from 'react';
import { ButtonProps } from '../../atoms/Button/Button';
import { AppButton } from '../AppButton/AppButton';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

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