import { PropsWithChildren, forwardRef } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { ButtonProps } from './types';
import './button.scss';

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(({
  onClick,
  icon,
  children,
  disabled,
  className = '',
}, ref) => {
  return (
    <button
      ref={ref}
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
      {icon && <span className="button-icon" onClick={(e) => {
        if (disabled) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}>
        {icon}
      </span>}
      {children && <div className="button-content">{children}</div>}
    </button>
  );
});
