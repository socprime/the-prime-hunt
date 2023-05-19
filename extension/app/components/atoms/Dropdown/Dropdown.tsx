import {
  useRef,
  useState,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle, useMemo, useCallback,
} from 'react';
import { usePrevious } from '../../../app-hooks';
import { createPortal } from 'react-dom';
import { createClassName } from '../../../../common/common-helpers';
import './dropdown.scss';

export type MenuStyles = {
  top?: React.CSSProperties['top'],
  left?: React.CSSProperties['left'],
  right?: React.CSSProperties['right'],
  bottom?: React.CSSProperties['bottom'],
  height?: React.CSSProperties['height'],
  width?: React.CSSProperties['width'],
};

export type DropdownProps = {
  opener: React.ReactNode;
  disabled?: boolean;
  opened?: boolean;
  closed?: boolean;
  mountElement?: HTMLElement | null;
  header?: React.ReactNode;
  direction?: 'up' | 'down';
  className?: string;
  classNameMenu?: string;
  onStateChange?: (isOpen: boolean) => void;
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
    getMenuStyles,
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
        style={styles}
        ref={dropdownMenuRef}
      >
        {children}
      </div>
    );
  }, [children, classNameMenu, isOpen]);

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
         onClick={e => {
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
