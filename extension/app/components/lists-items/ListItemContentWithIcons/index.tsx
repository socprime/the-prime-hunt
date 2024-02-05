import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import {
  ListItemContentWithIconsProps,
  ListItemContentWithIconsRefs,
} from './types';
import './styles.scss';

export const ListItemContentWithIcons = forwardRef<
  ListItemContentWithIconsRefs,
  ListItemContentWithIconsProps
>(({
  iconsLeft = [],
  content = '',
  iconsRight = [],
  native = {},
}, refs) => {
  const elementRef = useRef(null);

  useImperativeHandle(refs, () => {
    return { elementRef };
  });

  return (
    <div
      className={createClassName([
        'list-item-content-with-icons',
        native.className || '',
      ])}
      ref={elementRef}
    >
      {iconsLeft?.length > 0
        && iconsLeft.map((icon, i) => <span key={i}>{icon}</span>)}
      {content}
      {iconsRight?.length > 0
        && iconsRight.map((icon, i) => <span key={i}>{icon}</span>)}
    </div>
  );
});
