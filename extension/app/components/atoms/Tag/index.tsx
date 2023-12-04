import {
  forwardRef, MutableRefObject, PropsWithChildren, useImperativeHandle, useRef,
} from 'react';
import { TagProps, TagRefs } from './types';
import { createClassName } from '../../../../common/common-helpers';
import { CrossIcon } from '../icons/CrossIcon/CrossIcon';
import './styles.scss';

export const Tag = forwardRef<TagRefs, PropsWithChildren<TagProps>>(({
  children,
  native = {},
  ...restProps
}, refs) => {
  const elementRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useImperativeHandle(refs, () => {
    return {
      elementRef,
    };
  });

  return (
    <div
      {...restProps}
      {...native}
      ref={(ref) => {
        if (ref) {
          elementRef.current = ref;
        }
      }}
      className={createClassName([
        'tag',
        native.className || '',
      ])}
    >
      {children}
      <div className="tag--remove">
        <CrossIcon />
      </div>
    </div>
  );
});
