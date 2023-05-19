import { forwardRef } from 'react';
import { Input, InputProps } from '../../atoms/Input/Input';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type AppInputProps = InputProps;

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
