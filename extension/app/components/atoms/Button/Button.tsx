import React from 'react';
import { createClassName } from '../../../../common/common-helpers';
import './button.scss';

export type ButtonProps = {
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  onClick,
  icon,
  children,
  disabled,
  className = '',
}) => {
  return (
    <button
      className={createClassName([
        'button',
        disabled ? 'disabled' : '',
        className,
      ])}
      disabled={disabled}
      onClick={(e) => {
        if (disabled) {
          return;
        }
        onClick?.(e);
      }}
    >
      {icon && icon}
      <div className="button-content">{children}</div>
    </button>
  );
};