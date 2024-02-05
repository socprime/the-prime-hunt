import { MutableRefObject, ReactNode } from 'react';

export enum Mode {
  production = 'production',
  development = 'development',
}

export type Value = string | boolean | unknown[] | Record<string, unknown>;
export type ExpectedValue = Value | null;

export type WithDependedChildren<I, Props = any> = I & {
  children: (props: Props) => ReactNode;
};
export type ElementRef = MutableRefObject<HTMLElement | HTMLTextAreaElement | null>;
export type GetValueFromElement = (elementRef?: ElementRef) => ExpectedValue;
export type Validator = ((
  value: ExpectedValue,
  meta?: Meta,
) => Promise<ValidationResult>);
export type Validate = (types: ('change' | 'blur' | 'finish')[]) => Promise<ValidationResult>;
export type Meta<T = unknown> = Record<string, T>;

export type SortOrder = 'ascending' | 'descending';

export type Url = string;
export type SHA256 = string;
export type UniqueHash = string;
export type HTMLTextContent = string;
export type AbsFilePath = string;
export type AsyncResult<T = any> = {
  error?: Error | string;
  data?: T;
  meta?: Record<string, any>;
}

export interface IdentifiedFunction extends Function {
  id: UniqueHash;
}

export enum LogLevel {
  info = 'info',
  debug = 'debug',
  error = 'error',
  warn = 'warn',
}

export const mapType = <T = unknown>(struct: any): T => struct as T;

export type ValidationResult = {
  isValid: boolean;
  reasons: Set<string>;
};

export type ILoggers = {
  log(...params: any[]): void;
  warn(): ILoggers;
  info(): ILoggers;
  debug(): ILoggers;
  error(): ILoggers;
  addPrefix(prefix: string): ILoggers;
  setPrefix(prefix: string): ILoggers;
  setLevel(level: LogLevel): ILoggers;
};
