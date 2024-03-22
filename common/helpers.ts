import { isObject } from './checkers';
import { AsyncResult, SortOrder } from './types';

export const isFlatObjectsEqual = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): boolean => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  if (keysObj1.length !== keysObj2.length) {
    return false;
  }
  return !keysObj1.some((key) => obj1[key] !== obj2[key]);
};

export const uuid = (): string => {
  return Math.random().toString(36).substring(5)
    + Date.now().toString(36)
    + Math.random().toString(36).substring(5);
};

export const suuid = (): string => {
  return `@@--${uuid()}`;
};

export const clearExtraSpaces = (str: string): string => str.replace(/ +/g, ' ');

export const clearLineBreaks = (str: string): string => str
  .trim()
  .replace(/(\r\n|\n|\r)/gm, ' ');

export const splitByLines = (str: string, removeEmpty = false): string[] => {
  const regexp = /(\r\n|\n|\r)/gm;

  let res = str.split(regexp);

  if (removeEmpty) {
    res = res.filter((r) => r && r !== '\r\n' && r !== '\n' && r !== '\r');
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
    [markerName: string]: string | undefined;
  },
  keyFormat?: (v: string) => string,
) :string => {
  return Object.keys(parts || {})
    .filter((name) => {
      return typeof parts![name] === 'string';
    })
    .map((name) => ({
      value: parts![name],
      key: keyFormat ? keyFormat(name) : `%${name}`,
    }))
    .reduce((result, d) => {
      return result.replace(new RegExp(d.key, 'g'), d.value as string);
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
    Y: String(data.getFullYear()),
    M: formatBinaryDate(data.getMonth() + 1),
    m: formatBinaryDate(data.getMinutes()),
    s: formatBinaryDate(data.getSeconds()),
    ms: formatBinaryDate(data.getMilliseconds()),
    d: formatBinaryDate(data.getDate()),
    h: formatBinaryDate(data.getHours()),
    fM: String(data.toLocaleString('default', { month: 'long' })),
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

export const sortStrings = (a: string, b: string, order: SortOrder = 'ascending'): number => {
  const result = a.localeCompare(b);
  if (result === 0 || order === 'ascending') {
    return result;
  }
  return result === 1 ? -1 : 1;
};

export const indexOfAll = (str: string, search: string): number[] => {
  const indexes: number[] = [];
  let i = -1;
  while ((i = str.indexOf(search, i + 1)) >= 0) {
    indexes.push(i);
  }
  return indexes;
};

export const sleep = async (sec: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, sec * 1000);
  });
};

export const iterateObjectsRecursively = (
  obj: Record<string, unknown>,
  keyPath: string,
  settings?: {
    separator?: string;
    onIteration?: (
      keyPath: string,
      key: string,
      value: unknown,
      prevKeyPath: string,
    ) => boolean;
  },
): string[] => {
  const { separator = '.', onIteration } = settings || {};
  return Object.keys(obj || {}).reduce((result, key) => {
    const path = keyPath.length ? `${keyPath}${separator}${key}` : key;
    const value = obj[key];
    if (typeof onIteration === 'function' && !onIteration?.(path, key, value, keyPath)) {
      return keyPath.length ? [...result, keyPath] : result;
    }
    return [
      ...result,
      ...(
        isObject(value)
          ? iterateObjectsRecursively(value as Record<string, unknown>, path, settings)
          : [path]
      ),
    ];
  }, [] as string[]);
};

export const getUrlParamsSafe = (url: unknown, paramName: string): string => {
  try {
    return (new URL(url as string) as any)[paramName] as string || '';
  } catch (e) {
    return '';
  }
};

export const deserializeDataInResult = (
  result: AsyncResult,
  errors: Error[] = [],
): {
  result: AsyncResult,
  errors: Error[],
} => {
  if (result.error && typeof result.error !== 'string') {
    errors.push(result.error);
  }

  if (result.error && typeof result.error === 'string') {
    result.error = new Error(result.error);
    errors.push(result.error);
  }

  (result.batch || []).map((r: AsyncResult) => {
    return deserializeDataInResult(r, errors);
  });

  return { result, errors };
};

export const serializeDataInResult = (
  result: AsyncResult,
  errors: string[] = [],
): {
  result: AsyncResult,
  errors: string[],
} => {
  if (result.error && typeof result.error === 'string') {
    errors.push(result.error);
  }

  if (result.error && typeof result.error !== 'string') {
    result.error = result.error.message;
    errors.push(result.error);
  }

  (result.batch || []).map((r: AsyncResult) => {
    return serializeDataInResult(r, errors);
  });

  return { result, errors };
};

export const buildEmailUrl = (
  params: {
    to: string[];
    subject?: string;
    cc?: string[];
    body?: string;
  },
) => {
  const {
    to, subject, cc, body,
  } = params;

  const sendTo = to.length ? `${to.join(',')}` : '';
  const copyTo = `cc=${cc?.length ? cc.join(',') : ''}`;
  const subj = `subject=${subject || ''}`;
  const text = `body=${body || ''}`;

  return `${encodeURI(`mailto:${sendTo}?${copyTo}&${subj}`)}&${text}`;
};

export const initValues = <T = Record<string, unknown>>(
  obj: T,
  values: T,
) => {
  Object.keys(values).forEach((key) => {
    const o = obj as Record<string, unknown>;
    if (typeof o[key] === 'undefined') {
      o[key] = (values as typeof o)[key];
    }
  });
  return obj as T;
};

export const isValidDate = (d: Date) => {
  // eslint-disable-next-line no-restricted-globals
  return d instanceof Date && !isNaN(d as any);
};
