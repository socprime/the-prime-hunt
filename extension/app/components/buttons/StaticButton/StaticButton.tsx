import React from 'react';
import { AppButton, AppButtonProps } from '../AppButton/AppButton';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type StaticButtonProps = AppButtonProps;

export const StaticButton: React.FC<React.PropsWithChildren<StaticButtonProps>> = ({
  className = '',
  children,
  ...restProps
}) => {
  return (
    <AppButton
      className={createClassName([
        'static-button',
        className,
      ])} 
      {...restProps}
    >
      {children}
    </AppButton>
  );
};