import { forwardRef } from 'react';
import { AppTextAreaRefs, AppTextAreaProps } from './types';
import { TextArea } from '../../atoms/TextArea';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export const AppTextArea = forwardRef<
  AppTextAreaRefs,
  AppTextAreaProps
>(({
  native = {},
  debounceMs = 0,
  ...restProps
}, refs) => {
  return (
    <TextArea
      {...restProps}
      ref={refs}
      native={{
        ...native,
        className: createClassName([
          native?.className || '',
          'app-textarea',
        ]),
      }}
      debounceMs={debounceMs}
    />
  );
});
