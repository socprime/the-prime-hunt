import React from 'react';
import { Checkbox, CheckboxProps } from '../../atoms/Checkbox/Checkbox';
import './styles.scss';

export type AppCheckboxProps = CheckboxProps;

export const AppCheckbox: React.FC<AppCheckboxProps> = ({
  className = '',
  ...restProps
}) => {
  return (
    <Checkbox
      className={className}
      {...restProps}
    />
  );
};