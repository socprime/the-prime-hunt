import { LogLevel, Mode } from '../../../common/types';
import { logLevel, mode } from '../envs';

let logging = true;

export const startLogging = () => logging = true;
export const stopLogging = () => logging = false;

export class Loggers {
  private readonly prefix: string = '';

  private readonly level: LogLevel = LogLevel.info;

  private createInstance(
    prefix: string = '',
    level = LogLevel.info,
  ) {
    return new Loggers(prefix, level);
  }

  constructor(prefix: string = '', level = LogLevel.info) {
    this.prefix = prefix;
    this.level = level;
  }

  log(...params: any[]) {
    if (!logging) {
      return;
    }
    if (
      mode === Mode.production
      && this.level === LogLevel.debug
      && logLevel !== LogLevel.debug
    ) {
      return;
    }
    if (mode !== Mode.production) {
      console[
        this.level === LogLevel.error
          ? 'error'
          : this.level === LogLevel.warn
            ? 'warn'
            : 'log'
      ](this.prefix || '==>', ...params);
    }
  }

  error() {
    return this.createInstance(`ERROR: ${this.prefix}`, LogLevel.error);
  }

  warn() {
    return this.createInstance(`WARN: ${this.prefix}`, LogLevel.warn);
  }

  info() {
    return this.createInstance(`INFO: ${this.prefix}`, LogLevel.info);
  }

  debug() {
    return this.createInstance(`DEBUG: ${this.prefix}`, LogLevel.debug);
  }

  addPrefix(prefix: string) {
    return this.createInstance(
      [this.prefix, prefix].join(' '),
      this.level,
    );
  }

  setLevel(level: LogLevel) {
    return this.createInstance(this.prefix, level);
  }
}

export const loggers = new Loggers();
