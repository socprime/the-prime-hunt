import {
  FC,
  PropsWithChildren,
  useMemo,
  useRef,
  cloneElement,
  ReactElement,
  MouseEvent,
} from 'react';
import { Button } from '../../atoms/Button/Button';
import { createClassName } from '../../../../common/common-helpers';
import { AppButtonProps } from './types';
import { WithHotKeys } from '../../extends/WithHotKeys';
import './styles.scss';

export const AppButton: FC<PropsWithChildren<AppButtonProps>> = ({
  children,
  className = '',
  disabled,
  animatedIcon,
  onClick,
  icon,
  keyMappings = [],
  ...restProps
}) => {
  const iconRef = useRef<HTMLSpanElement>(null);

  const clonedIcon = useMemo(() => {
    if (!animatedIcon) {
      return icon;
    }
    return icon && typeof icon === 'object'
      ? cloneElement(
        icon as ReactElement,
        {
          onClick: (e: MouseEvent<Element, MouseEvent>) => {
            if (disabled) {
              e.stopPropagation();
              e.preventDefault();
              return;
            }
            onClick?.(e as any);
          },
        },
      )
      : icon;
  }, [animatedIcon, disabled, icon, onClick]);

  const buttonRef = useRef(null);

  const getParentButton = () => {
    return (
      <Button
        ref={buttonRef}
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
          (iconRef?.current?.firstChild as HTMLElement)?.click?.();
          (iconRef?.current?.firstChild as HTMLElement)?.focus?.();
        }}
        icon={icon && <span ref={iconRef}>{clonedIcon}</span>}
        {...restProps}
      >
        {children}
      </Button>
    );
  };

  const ref = useRef(null);

  return keyMappings.length > 0
    ? (
        <WithHotKeys
          ref={ref}
          keyMappings={keyMappings}
        >
          {() => getParentButton()}
        </WithHotKeys>)
    : getParentButton();
};
