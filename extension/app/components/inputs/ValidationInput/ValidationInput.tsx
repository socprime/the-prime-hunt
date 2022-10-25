import React, { useCallback, useRef } from 'react';
import { AppInput, AppInputProps } from '../AppInput/AppInput';
import { createClassName } from '../../../../common/common-helpers';
import { ValidationResult } from '../../../../../common/types';
import { getValidResult } from '../../../../../common/validators';
import { useForceUpdate } from '../../../app-hooks';
import { isNotEmpty } from '../../../../../common/checkers';
import './styles.scss';

export type ValidationInputProps = AppInputProps & {
  onValidationEnd?: (result: ValidationResult) => void;
  validators?: ((value: string) => ValidationResult)[];
};

export const ValidationInput: React.FC<ValidationInputProps> = ({
  className = '',
  onValidationEnd,
  onChange,
  validators,
  ...otherProps
}) => {
  const message = useRef<string>('');

  const forceUpdate = useForceUpdate();

  const finishValidation = useCallback((
    validationResult: ValidationResult,
  ) => {
    const value = Array.from(validationResult.reasons).pop() || '';
    if (message.current === value) {
      return;
    }
    message.current = value;
    onValidationEnd?.(validationResult);
    return forceUpdate();
  }, [forceUpdate, onValidationEnd]);

  const validate = useCallback((value: string) => {
    if (!validators || validators.length < 1) {
      return finishValidation(getValidResult());
    }
    validators.some(v => {
      const result = v(value);
      if (result.isValid) {
        finishValidation(getValidResult());
        return false;
      }
      finishValidation(result);
      return true;
    });
  }, [finishValidation, validators]);

  return (
    <span className={createClassName([
      'validation-input-wrapper',
      isNotEmpty(message.current) ? 'validation-error' : '',
      className,
    ])}>
      <AppInput
        className="validation-input"
        {...otherProps}
        onChange={value => {
          validate(value);
          onChange?.(value);
        }}
        onBlur={value => validate(value)}
      />
      <span className="validation-message">{message.current}</span>
    </span>
  );
};