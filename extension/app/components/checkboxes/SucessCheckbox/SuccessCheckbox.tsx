import { forwardRef } from 'react';
import { AppCheckbox, AppCheckboxProps, AppCheckboxRefs } from '../AppCheckbox/AppCheckbox';
import { createClassName } from '../../../../common/common-helpers';
import { SuccessCheckIcon } from '../../icons/SuccessCheckIcon/SuccessCheckIcon';

export type SuccessCheckboxProps = Omit<AppCheckboxProps, 'checkIcon' | 'uncheckIcon'>;

export type SuccessCheckboxRefs = AppCheckboxRefs;

export const SuccessCheckbox = forwardRef<SuccessCheckboxRefs, SuccessCheckboxProps>(({
  className = '',
  ...restProps
}, refs) => {
  return (
    <AppCheckbox
      ref={refs}
      checkIcon={<SuccessCheckIcon />}
      uncheckIcon={null}
      className={createClassName(['success-checkbox', className])}
      {...restProps}
    />
  );
});
