import { ValidationResult } from './types';
import { capitalizeFirstLetter, formatString } from './helpers';
import {
  isNotEmpty, isUrl as checkIsUrl,
  isNotEmptyArray as isNotEmptyArrayChecker,
} from './checkers';

export const isNotEmptyArray = (
  value: unknown[],
  pattern?: string,
): ValidationResult => {
  const isValid = isNotEmptyArrayChecker(value);
  return {
    isValid,
    reasons: new Set(
      isValid
        ? []
        : [formatString(
          pattern || '%prefix %message',
          {
            prefix: `${capitalizeFirstLetter(isNotEmptyArray.name)}:`,
            message: 'Passed array is empty',
          },
        )],
    ),
  };
};

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

export const isUrl = (
  url: string,
  pattern?: string,
): ValidationResult => {
  const isValid = checkIsUrl(url);
  return {
    isValid,
    reasons: new Set(
      isValid
        ? []
        : [formatString(
          pattern || '%prefix %message',
          {
            prefix: `${capitalizeFirstLetter(isUrl.name)}:`,
            message: 'Passed string is not an url',
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
