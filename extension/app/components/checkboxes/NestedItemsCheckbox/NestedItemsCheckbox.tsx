import React from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { AppCheckbox, AppCheckboxProps } from '../AppCheckbox/AppCheckbox';
import { SuccessCheckIcon } from '../../icons/SuccessCheckIcon/SuccessCheckIcon';
import { SuccessMinusIcon } from '../../icons/SuccessMinusIcon/SuccessMinusIcon';

export type NestedItemsCheckboxProps = Omit<AppCheckboxProps, 'checkIcon' | 'uncheckIcon' | 'checked'> & {
  state: 'all' | 'some' | 'nothing'
};

export const NestedItemsCheckbox: React.FC<NestedItemsCheckboxProps> = ({
  state,
  className = '',
  ...restProps
}) => {
  return (
    <AppCheckbox
      checkIcon={state === 'all' ? <SuccessCheckIcon /> : null}
      uncheckIcon={state === 'some' ? <SuccessMinusIcon /> : null}
      checked={state === 'all'}
      className={createClassName(['nested-items-checkbox', className, state])}
      {...restProps}
    />
  );
};
