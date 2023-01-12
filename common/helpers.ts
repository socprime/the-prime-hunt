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

export const clearLineBreaks = (str: string): string => str
  .trim()
  .replace(/(\r\n|\n|\r)/gm, ' ');

export const splitByLines = (str: string, removeEmpty = false): string[] => {
  const regexp = new RegExp(/(\r\n|\n|\r)/, 'gm');

  let res = str.split(regexp);

  if (removeEmpty) {
    res = res.filter(r => r && r !== '\r\n' && r !== '\n' && r !== '\r');
  }

  return res;
};

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

export const createNonDuplicateValue = (
  value: string,
  values: string[],
): string => {
  if (!values.includes(value)) {
    return value;
  }

  let increment = 1;
  let wordRoot = value;
  let searchedWordRoot = wordRoot.slice(0, wordRoot.length - 1);
  while (values.includes(searchedWordRoot)) {
    wordRoot = searchedWordRoot;
    searchedWordRoot = searchedWordRoot.slice(0, searchedWordRoot.length - 1);
  }
  while (values.includes(`${wordRoot}${increment}`)) {
    increment++;
  }
  return `${wordRoot}${increment}`;
};

export const formatBinaryDate = (
  value: string | number,
): string => {
  const sValue = typeof value === 'string'
    ? value
    : String(value);
  return sValue.length > 1
    ? sValue
    : `0${sValue}`;
};

export const formatDate = (
  pattern: string,
  data: Date,
): string => {
  return formatString(pattern, {
    'Y': String(data.getFullYear()),
    'M': formatBinaryDate(data.getMonth() + 1),
    'm': formatBinaryDate(data.getMinutes()),
    's': formatBinaryDate(data.getSeconds()),
    'ms': formatBinaryDate(data.getMilliseconds()),
    'd': formatBinaryDate(data.getDate()),
    'h': formatBinaryDate(data.getHours()),
  });
};

export const debounce = (func: Function, timeoutMs: number) => {
  let timeoutID: number | NodeJS.Timeout;

  return function (...args: any[]) {
    const context = this;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => func.apply(context, args), timeoutMs);
  };
};

export const sortNumbers = (a: number, b: number) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

export const indexOfAll = (str: string, search: string): number[] => {
  const indexes: number[] = [];
  let i = -1;
  while ((i = str.indexOf(search, i + 1 )) >= 0) {
    indexes.push(i);
  }
  return indexes;
};

