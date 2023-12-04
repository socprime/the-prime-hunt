import React, {
  useRef,
  useState,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useMemo,
  useCallback,
  CSSProperties,
  ReactNode,
} from 'react';
import { usePrevious } from '../../../app-hooks';
import { createPortal } from 'react-dom';
import { createClassName } from '../../../../common/common-helpers';
import './dropdown.scss';

export type MenuStyles = {
  top?: CSSProperties['top'],
  left?: CSSProperties['left'],
  right?: CSSProperties['right'],
  bottom?: CSSProperties['bottom'],
  height?: CSSProperties['height'],
  width?: CSSProperties['width'],
};

export type DropdownProps = {
  opener: ReactNode;
  disabled?: boolean;
  opened?: boolean;
  closed?: boolean;
  mountElement?: HTMLElement | null;
  header?: ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  direction?: 'up' | 'down';
  className?: string;
  classNameMenu?: string;
  onStateChange?: (isOpen: boolean) => void;
  onMenuClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  getMenuStyles?: () => MenuStyles;
};

export type DropdownForwardRef = {
  dropdown: React.MutableRefObject<HTMLDivElement | null>;
  dropdownMenu: React.MutableRefObject<HTMLDivElement | null>;
};

export const Dropdown = forwardRef<DropdownForwardRef, PropsWithChildren<DropdownProps>>((
  {
    disabled,
    opened,
    closed,
    opener,
    mountElement,
    children,
    header,
    direction = 'down',
    onStateChange,
    className = '',
    classNameMenu = '',
    onMenuClick,
    getMenuStyles,
    onBlur,
  },
  ref,
) => {
  const [isOpen, setIsOpen] = useState(!!opened);
  const prevValueOpen = usePrevious(isOpen);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof prevValueOpen !== 'undefined' && prevValueOpen !== isOpen) {
      onStateChange?.(isOpen);
    }
  }, [isOpen, onStateChange, prevValueOpen]);

  useEffect(() => {
    if (typeof opened !== 'undefined' && opened !== isOpen) {
      setIsOpen(opened);
    }
  }, [isOpen, opened]);

  useEffect(() => {
    if (typeof closed !== 'undefined' && closed && closed === isOpen) {
      setIsOpen(!closed);
    }
  }, [isOpen, closed]);

  useImperativeHandle(ref, () => ({
    get dropdown() {
      return dropdownRef;
    },

    get dropdownMenu() {
      return dropdownMenuRef;
    },
  }));

  const getMenuElement = useCallback((styles: MenuStyles) => {
    return (
      <div
        className={createClassName([
          'dropdown-menu',
          classNameMenu,
          isOpen ? 'show' : 'hide',
        ])}
        onClick={onMenuClick}
        style={styles}
        ref={dropdownMenuRef}
      >
        {children}
      </div>
    );
  }, [onMenuClick, children, classNameMenu, isOpen]);

  const menu = useMemo(() => {
    if (!mountElement && !isOpen) {
      return null;
    }

    let styles = getMenuStyles?.();

    if (!mountElement && isOpen) {
      return getMenuElement(styles || {});
    }

    if (!styles) {
      const dropdownRect = dropdownRef?.current?.getBoundingClientRect?.();
      const dropdownMenuRect = dropdownMenuRef?.current?.getBoundingClientRect?.();
      styles = {
        left: dropdownRect ? dropdownRect.left : 'unset',
        top: dropdownRect
          ? direction === 'down'
            ? dropdownRef.current!.offsetTop + dropdownRect.height + 4
            : dropdownRef.current!.offsetTop - 4 - dropdownMenuRect!.height
          : 'unset',
      };
    }

    return (direction === 'down' && !isOpen)
      ? null
      : createPortal(getMenuElement(styles || {}), mountElement!);
  }, [direction, getMenuElement, getMenuStyles, isOpen, mountElement]);

  return (
    <div
      onBlur={onBlur}
      className={createClassName([
        'dropdown',
        direction,
        className,
        isOpen ? 'open' : '',
        disabled ? 'disabled' : '',
      ])}
      ref={dropdownRef}
    >
      <div className="dropdown-header">{header}</div>
      <div
        className="dropdown-opener"
         onClick={(e) => {
           if (disabled) {
             e.preventDefault();
             e.stopPropagation();
             return;
           }
           setIsOpen(!isOpen);
         }}
      >
        {opener}
      </div>
      {menu}
    </div>
  );
});
