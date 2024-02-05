import {
  forwardRef, MutableRefObject, useImperativeHandle, useRef,
} from 'react';
import { AppList } from '../../lists/AppList';
import {
  DropdownMenuListRefs,
  DropdownMenuListProps,
} from './types';
import './styles.scss';

export const DropdownMenuList = forwardRef<
  DropdownMenuListRefs,
  DropdownMenuListProps
>(({
  items,
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
      ref={(ref) => {
        if (ref?.elementRef.current) {
          elementRef.current = ref.elementRef.current;
        }
      }}
      items={items}
      className="dropdown-menu--list"
    />
  );
});
