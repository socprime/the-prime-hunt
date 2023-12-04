import { forwardRef } from 'react';
import { Input } from '../../atoms/Input/Input';
import { createClassName } from '../../../../common/common-helpers';
import { AppInputProps } from './types';
import './styles.scss';

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(({
  className = '',
  ...restProps
}, ref) => {
  return (
    <Input
      ref={ref}
      className={createClassName(['app-input', className])}
      {...restProps}
    />
  );
});
