import { forwardRef } from 'react';
import { Checkbox, CheckboxProps, CheckboxRefs } from '../../atoms/Checkbox/Checkbox';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type AppCheckboxProps = CheckboxProps;

export type AppCheckboxRefs = CheckboxRefs;

export const AppCheckbox = forwardRef<AppCheckboxRefs, AppCheckboxProps>(({
  className = '',
  ...restProps
}, refs) => {
  return (
    <Checkbox
      ref={refs}
      className={createClassName([
        'app-checkbox',
        className,
      ])}
      {...restProps}
    />
  );
});
