import { Mode } from './types';
import { indexOfAll } from './helpers';

export const isString = (value: unknown): boolean => {
  return typeof value === 'string';
};

export const isNotEmptyArray = (arr: unknown[]): boolean => {
  return arr.length > 0;
};

export const isNotEmpty = (str: unknown): boolean => {
  if (!isString(str)) {
    return false;
  }
  return (str as string)?.trim?.() !== '';
};

export const isEmail = (email: string): boolean => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export const isMD5 = (md5: string): boolean => {
  return /^[a-f0-9]{32}$/.test(md5);
};

export const isSHA1 = (sha1: string): boolean => {
  return /^[a-fA-F0-9]{40}$/.test(sha1);
};

export const isSHA256 = (sha256: string): boolean => {
  return /^[a-fA-F0-9]{64}$/.test(sha256);
};

export const isSHA512 = (sha512:string): boolean => {
  return /^[a-fA-F0-9]{128}$/.test(sha512);
};

export const isIpV4 = (ip: string): boolean => {
  return /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/.test(ip);
};

export const isIpV6 = (ip: string): boolean => {
  return /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/.test(ip);
};

export const isMacAddress = (address: string): boolean => {
  return /^[a-fA-F0-9]{2}([:|-][a-fA-F0-9]{2}){5}$/.test(address);
};

export const isDomainName = (domainName: string): boolean => {
  return /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(domainName);
};

export const isUrl = (url: string): boolean => {
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(url);
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
    !/^[-.0-9]*$/.test(sValue)
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
      ? parseInt(value, 10)
      : value,
  ).getTime() > 567982800000;
};

export const isObject = (obj: unknown): boolean => {
  return typeof obj === 'object'
    && !Array.isArray(obj)
    && obj !== null
    && typeof obj !== 'function';
};
