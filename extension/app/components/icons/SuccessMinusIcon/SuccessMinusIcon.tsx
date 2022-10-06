import React from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { MinusIcon, MinusIconProps } from '../../atoms/icons/MinusIcon/MinusIcon';
import './styles.scss';

export type SuccessMinusIconProps = MinusIconProps;

export const SuccessMinusIcon: React.FC<SuccessMinusIconProps> = ({
  className = '',
  ...otherProps
}) => {
  return (
    <span className={createClassName(['success-minus-icon', 'icon', className])}>
      <MinusIcon
        {...otherProps}
      />
    </span>
  );
};