import { forwardRef } from 'react';
import { Input } from '../../atoms/Input/Input';
import { createClassName } from '../../../../common/common-helpers';
import { AppInputProps } from './types';
import './styles.scss';

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(({
  className = '',
  ...restProps
}, refs) => {
  return (
    <Input
      {...restProps}
      ref={refs}
      className={createClassName([
        'app-input',
        className,
      ])}
    />
  );
});
