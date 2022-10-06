export const isFlatObjectsEqual = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): boolean => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  if (keysObj1.length !== keysObj2.length) {
    return false;
  }
  return !keysObj1.some(key => obj1[key] !== obj2[key]);
};

export const uuid = (): string => {
  return Math.random().toString(36).substring(5)
    + Date.now().toString(36)
    + Math.random().toString(36).substring(5);
};

export const clearExtraSpaces = (str: string): string => str.replace(/ +/g, ' ');

export const parseJSONSafe = <T = unknown>(obj: unknown, fallback: T): T => {
  try {
    return JSON.parse(obj as string) as T;
  } catch (e) {
    return fallback;
  }
};

export const deduplicateArray = <T = unknown>(arr: T[]) => {
  return [
    ...Array.from(
      new Set([
        ...arr,
      ]),
    ),
  ];
};

export const formatString = (
  pattern: string,
  parts?: {
    [markerName: string]: string;
  },
  keyFormat?: (v: string) => string,
) :string => {
  return Object.keys(parts || {})
    .map(name => ({
      value: parts![name],
      key: keyFormat ? keyFormat(name) : `%${name}`,
    }))
    .reduce((result, d) => {
      return result.replace(
        new RegExp(d.key, 'g'), d.value,
      );
    }, pattern) || pattern;
};

export const capitalizeFirstLetter = (
  str: string,
) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
