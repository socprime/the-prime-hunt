import { Mode } from './types';
import { indexOfAll } from './helpers';

export const isString = (value: unknown): boolean => {
  return typeof value === 'string';
};

export const isNotEmpty = (str: unknown): boolean => {
  if (!isString(str)) {
    return false;
  }
  return (str as string).trim() !== '';
};

export const isNumberInString = (str: unknown): boolean => {
  if (typeof str === 'number') {
    return true;
  }
  if (typeof str !== 'string') {
    return false;
  }
  const sValue = str.trim();
  if (
    !/^[.0-9]*$/.test(sValue)
    || indexOfAll(sValue, '.').length > 1
  ) {
    return false;
  }
  return !Number.isNaN(parseFloat(sValue));
};

export const isAllowedProtocol = (protocol: string, mode?: Mode): boolean => {
  if (mode === Mode.development) {
    return true;
  }
  const nProtocol = protocol.trim().toLowerCase();
  return nProtocol === 'https:' || nProtocol === 'https';
};

export const isDate = (value: string | number): boolean => {
  return new Date(
    typeof value === 'string' && isNumberInString(value)
      ? parseInt(value)
      : value,
  ).getTime() > 567982800000;
};
