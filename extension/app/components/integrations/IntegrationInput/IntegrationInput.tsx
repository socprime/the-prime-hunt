import React from 'react';
import { isNotEmptyString } from '../../../../../common/validators';
import {
  ValidationInput,
  ValidationInputProps,
} from '../../inputs/ValidationInput/ValidationInput';
import './styles.scss';

const validateMessage = 'This field is required';

export type IntegrationInputProps = ValidationInputProps;

export const IntegrationInput: React.FC<IntegrationInputProps> = ({
  label,
  value,
  onChange,
  ...restProps
}) => {
  return (
    <ValidationInput
      label={label}
      className="integration-input"
      validators={[
        (v) => isNotEmptyString(v, validateMessage),
      ]}
      value={value}
      onChange={onChange}
      {...restProps}
    />
  );
};