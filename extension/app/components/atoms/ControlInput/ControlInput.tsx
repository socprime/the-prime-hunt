import React, { forwardRef } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { Input, InputProps } from '../Input/Input';

export type ControlInputProps = InputProps & {
  controls: React.ReactNode;
  edit?: boolean;
};

export const ControlInput = forwardRef<HTMLInputElement, ControlInputProps>(({
  className = '',
  controls,
  edit,
  disabled,
  ...restProps
}, ref) => {
  return (
    <div
      className={createClassName([
        'control-input-wrapper',
        edit ? 'edit' : '',
        disabled ? 'disabled' : '',
        className,
      ])}
    >
      <Input
        ref={ref}
        className={createClassName([
          'control-input',
          edit ? 'edit' : '',
          className,
        ])}
        disabled={
          typeof disabled !== 'undefined'
            ? disabled
            : !edit
          }
        {...restProps}
      />
      {edit && controls}
    </div>
  );
});
