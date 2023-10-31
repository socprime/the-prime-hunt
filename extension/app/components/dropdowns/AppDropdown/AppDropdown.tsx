import {
  useCallback,
  useEffect,
  useMemo,
  PropsWithChildren,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  MutableRefObject,
} from 'react';
import { Dropdown, DropdownProps, DropdownForwardRef } from '../../atoms/Dropdown/Dropdown';
import { useOnClickOutside } from '../../../app-hooks';
import { useAppStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type AppDropdownProps = DropdownProps;

export type AppDropdownRefs = DropdownForwardRef;

export const AppDropdown = observer(forwardRef<
  DropdownForwardRef, PropsWithChildren<AppDropdownProps>
>(({
  className = '',
  classNameMenu = '',
  children,
  mountElement,
  direction,
  onStateChange,
  getMenuStyles,
  ...restProps
}, ref) => {
  const { isResizing, rootElement } = useAppStore();

  const [calculatedDirection, setCalculatedDirection] = useState<DropdownProps['direction']>(
    direction || 'down',
  );

  const [forceClose, setForceClose] = useState<boolean>(false);

  const dropdownRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const dropdownMenuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useImperativeHandle(ref, () => ({
    get dropdown() {
      return dropdownRef;
    },
    get dropdownMenu() {
      return dropdownMenuRef;
    },
  }));

  useEffect(() => {
    const dropdownMenu = dropdownMenuRef?.current;
    if (dropdownMenu) {
      dropdownMenu.classList.remove('hide');
    }
  }, [calculatedDirection]);

  useEffect(() => {
    setForceClose(false);
  }, [forceClose]);

  useEffect(() => {
    if (isResizing) {
      setForceClose(true);
    }
  }, [isResizing]);

  useOnClickOutside(() => {
    setForceClose(true);
  }, dropdownRef, dropdownMenuRef);

  const calculatedMountElement = typeof mountElement === 'undefined' ? rootElement : mountElement;

  const normalizedStyles = useMemo(() => {
    const styles = getMenuStyles?.() || {};
    if (styles.width && styles.width === 'unset') {
      delete styles.width;
    }
    return styles;
  }, [getMenuStyles]);

  const getMenuStylesCallback = useCallback(() => {
    const width = undefined;
    if (!calculatedMountElement) {
      return {
        width,
        ...normalizedStyles,
      };
    }
    const dropdownElem = dropdownRef?.current;
    const dropdownMenuElem = dropdownMenuRef?.current;
    const dropdownRect = dropdownElem?.getBoundingClientRect?.();
    const dropdownMenuRect = dropdownMenuElem?.getBoundingClientRect?.();
    const rootElementRect = rootElement?.getBoundingClientRect?.();

    let top: number | string = 'unset';
    if ((calculatedDirection === 'down' || !calculatedDirection) && dropdownRect && rootElementRect) {
      top = dropdownRect!.top + dropdownRect!.height - rootElementRect!.top + 12;
    }
    if (calculatedDirection === 'up' && dropdownRect && rootElementRect && dropdownMenuRect) {
      top = dropdownRect!.top - rootElementRect!.top - 12 - dropdownMenuRect.height;
    }

    return {
      top,
      width,
      left: (dropdownRect && rootElementRect) ? dropdownRect.left - rootElementRect.left : 'unset',
      ...normalizedStyles,
    };
  }, [calculatedDirection, calculatedMountElement, normalizedStyles, rootElement]);

  return (
    <Dropdown
      ref={(refs) => {
        if (refs?.dropdown?.current) {
          dropdownRef.current = refs.dropdown.current;
        }
        if (refs?.dropdownMenu?.current) {
          dropdownMenuRef.current = refs.dropdownMenu.current;
        }
      }}
      className={createClassName([
        'app-dropdown',
        className,
      ])}
      classNameMenu={createClassName([
        'app-dropdown-menu',
        classNameMenu,
      ])}
      closed={forceClose}
      direction={calculatedDirection}
      mountElement={calculatedMountElement}
      getMenuStyles={getMenuStylesCallback}
      onStateChange={(isOpen) => {
        const dropdownMenu = dropdownMenuRef?.current;
        if (!direction && dropdownMenu && rootElement) {
          if (
            dropdownMenu.getBoundingClientRect().bottom
              > rootElement.getBoundingClientRect().bottom
          ) {
            dropdownMenu.classList.add('hide');
            setCalculatedDirection(calculatedDirection === 'up' ? 'down' : 'up');
          }
          onStateChange?.(isOpen);
        }
      }}
      {...restProps}
    >
      {children}
    </Dropdown>
  );
}));
