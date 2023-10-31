export enum Mode {
  production = 'production',
  development = 'development',
}

export type SortOrder = 'ascending' | 'descending';

export type Url = string;
export type SHA256 = string;
export type UniqueHash = string;
export type HTMLTextContent = string;
export type AbsFilePath = string;

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
