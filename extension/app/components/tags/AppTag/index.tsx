import { forwardRef, PropsWithChildren } from 'react';
import { Tag } from '../../atoms/Tag';
import { AppTagRefs, AppTagProps } from './types';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export const AppTag = forwardRef<AppTagRefs, PropsWithChildren<AppTagProps>>(({
  children,
  native = {},
  ...restProps
}, refs) => {
  return (
    <Tag
      {...restProps}
      ref={refs}
      native={{
        ...native,
        className: createClassName([
          'app-tag',
          native.className || '',
        ]),
      }}
    >
      {children}
    </Tag>
  );
});
