import {
  forwardRef, MutableRefObject, useImperativeHandle, useRef,
} from 'react';
import { AppList } from '../../lists/AppList';
import { createClassName } from '../../../../common/common-helpers';
import {
  DropdownMenuListRefs,
  DropdownMenuListProps,
} from './types';
import './styles.scss';

export const DropdownMenuList = forwardRef<
  DropdownMenuListRefs,
  DropdownMenuListProps
>(({
  ...otherProps
}, refs) => {
  const elementRef: MutableRefObject<HTMLUListElement | null> = useRef(
    null,
  );

  useImperativeHandle(refs, () => {
    return {
      elementRef,
    };
  });

  return (
    <AppList
      {...otherProps}
      ref={(ref) => {
        if (ref?.elementRef.current) {
          elementRef.current = ref.elementRef.current;
        }
      }}
      className={createClassName([
        'dropdown-menu--list',
        otherProps.className || '',
      ])}
    />
  );
});
