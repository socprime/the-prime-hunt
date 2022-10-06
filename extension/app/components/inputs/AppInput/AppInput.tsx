import React from 'react';
import { Input, InputProps } from '../../atoms/Input/Input';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export type AppInputProps = InputProps;

export const AppInput: React.FC<AppInputProps> = ({
  className = '',
  ...restProps
}) => {
  return (
    <Input
      className={createClassName(['app-input', className])}
      {...restProps}
    />
  );
};
