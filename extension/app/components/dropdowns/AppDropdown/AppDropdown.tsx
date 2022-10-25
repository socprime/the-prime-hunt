import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dropdown, DropdownProps, DropdownForwardRef } from '../../atoms/Dropdown/Dropdown';
import { useOnClickOutside } from '../../../app-hooks';
import { useAppStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type AppDropdownProps = DropdownProps;

export const AppDropdown: React.FC<React.PropsWithChildren<AppDropdownProps>> = observer(({
  className = '',
  classNameMenu = '',
  children,
  mountElement,
  direction,
  onStateChange,
  getMenuStyles,
  ...restProps
}) => {
  const { isResizing, rootElement } = useAppStore();

  const [calculatedDirection, setCalculatedDirection] = useState<DropdownProps['direction']>(
    direction || 'down',
  );

  const [forceClose, setForceClose] = useState<boolean>(false);

  const ref = useRef<DropdownForwardRef>(null);

  useEffect(() => {
    const dropdownMenu = ref?.current?.dropdownMenu?.current;
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
  }, ref?.current?.dropdown, ref?.current?.dropdownMenu);

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
    const dropdownElem = ref?.current?.dropdown?.current;
    const dropdownMenuElem = ref?.current?.dropdownMenu?.current;
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
      ref={ref}
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
        const dropdownMenu = ref?.current?.dropdownMenu?.current;
        if (!direction && dropdownMenu && rootElement) {
          if (
            dropdownMenu.getBoundingClientRect().bottom >
              rootElement.getBoundingClientRect().bottom
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
});
