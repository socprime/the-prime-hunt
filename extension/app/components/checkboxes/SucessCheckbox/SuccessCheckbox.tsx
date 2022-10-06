import React from 'react';
import { AppCheckbox, AppCheckboxProps } from '../AppCheckbox/AppCheckbox';
import { createClassName } from '../../../../common/common-helpers';
import { SuccessCheckIcon } from '../../icons/SuccessCheckIcon/SuccessCheckIcon';

export type SuccessCheckboxProps = Omit<AppCheckboxProps, 'checkIcon' | 'uncheckIcon'>;

export const SuccessCheckbox: React.FC<SuccessCheckboxProps> = ({
  className = '',
  ...restProps
}) => {
  return (
    <AppCheckbox
      checkIcon={<SuccessCheckIcon />}
      uncheckIcon={null}
      className={createClassName(['success-checkbox', className])}
      {...restProps}
    />
  );
};
