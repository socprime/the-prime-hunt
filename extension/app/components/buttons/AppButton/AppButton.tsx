import React, { useMemo, useRef } from 'react';
import { Button, ButtonProps } from '../../atoms/Button/Button';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type AppButtonProps = ButtonProps & {
  animatedIcon?: boolean;
};

export const AppButton: React.FC<React.PropsWithChildren<AppButtonProps>> = ({
  children,
  className = '',
  disabled,
  animatedIcon,
  onClick,
  icon,
  ...restProps
}) => {
  const iconRef = useRef<HTMLSpanElement>();

  const clonedIcon = useMemo(() => {
    if (!animatedIcon) {
      return icon;
    }
    return icon && typeof icon === 'object'
      ? React.cloneElement(icon as React.ReactElement, { onClick: (e: React.MouseEvent<Element, MouseEvent>) => {
        if (disabled) {
          e.stopPropagation();
          e.preventDefault();
          return;
        }
        onClick?.(e as any);
      }, ref: iconRef })
      : icon;
  }, [animatedIcon, disabled, icon, onClick]);
  
  return (
    <Button
      className={createClassName(['app-button', className])}
      disabled={disabled}
      onClick={(e) => {
        if (disabled) {
          return;
        }
        onClick?.(e);
        if (!icon || !animatedIcon) {
          return;
        }
        iconRef?.current?.click?.();
        iconRef?.current?.focus?.();
      }}
      icon={clonedIcon}
      {...restProps}
    >
      {children}
    </Button>
  );
};
