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
  if (typeof str !== 'string') {
    return false;
  }
  const sValue = str.trim();
  if (!/^[.0-9]*$/.test(sValue)) {
    return false;
  }
  return !Number.isNaN(parseFloat(sValue));
};
