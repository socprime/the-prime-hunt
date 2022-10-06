import React from 'react';
import { CheckIcon, CheckIconProps } from '../../atoms/icons/CheckIcon/CheckIcon';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type SuccessCheckIconProps = CheckIconProps;

export const SuccessCheckIcon: React.FC<SuccessCheckIconProps> = ({
  className = '',
  ...otherProps
}) => {
  return (
    <span className={createClassName(['success-check-icon', 'icon', className])}>
      <CheckIcon
        {...otherProps}
      />
    </span>
  );
};
