import { ValidationResult } from './types';
import { isNotEmpty } from './checkers';
import { capitalizeFirstLetter, formatString } from './helpers';

export const isNotEmptyString = (
  value: string,
  pattern?: string,
): ValidationResult => {
  const isValid = isNotEmpty(value);
  return {
    isValid,
    reasons: new Set(
      isValid
        ? []
        : [formatString(
          pattern || '%prefix %message',
          {
            prefix: `${capitalizeFirstLetter(isNotEmptyString.name)}:`,
            message: 'Passed string is empty',
          },
        )],
    ),
  };
};

export const getValidResult = (): ValidationResult => {
  return {
    isValid: true,
    reasons: new Set(),
  };
};