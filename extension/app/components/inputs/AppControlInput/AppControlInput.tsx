import { forwardRef } from 'react';
import { ControlInput, ControlInputProps } from '../../atoms/ControlInput/ControlInput';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type AppControlInputProps = ControlInputProps;

export const AppControlInput = forwardRef<HTMLInputElement, AppControlInputProps>((
  {
    className = '',
    ...restProps
  },
  ref,
) => {
  return (
    <ControlInput
      ref={ref}
      className={createClassName([
        'app-control-input',
        className,
      ])}
      {...restProps}
    />
  );
});
