import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { WithHotKeysProps, WithHotKeysRefs } from './types';
import { WithDependedChildren } from '../../../../../common/types';

export const WithHotKeys = forwardRef<
  WithHotKeysRefs,
  WithDependedChildren<WithHotKeysProps>
>(({
  keyMappings = [],
  children,
}, refs) => {
  useEffect(() => {
    const onKeyDown: Required<WithHotKeysProps>['keyMappings'][0]['action'] = (e) => {
      (keyMappings || []).some(({ isMatched, action }) => {
        if (isMatched(e)) {
          action(e);
          return true;
        }
        return false;
      });
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [keyMappings]);

  useImperativeHandle(refs, () => ({}));

  return (
    <>
      {children({})}
    </>
  );
});
