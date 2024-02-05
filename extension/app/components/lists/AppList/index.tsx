import { forwardRef, useImperativeHandle, useRef } from 'react';
import { AppListProps, AppListRefs } from './types';
import { List } from '../../atoms/List/List';
import { createClassName } from '../../../../common/common-helpers';

export const AppList = forwardRef<
  AppListRefs,
  AppListProps
>(({
  className = '',
  ...restProps
}, refs) => {
  const elementRef = useRef(null);

  useImperativeHandle(refs, () => {
    return { elementRef };
  });

  return (
    <List
      {...restProps}
      ref={elementRef}
      className={createClassName([
        'app-list',
        className,
      ])}
    />
  );
});
