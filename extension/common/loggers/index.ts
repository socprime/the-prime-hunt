import { ILoggers, LogLevel, Mode } from '../../../common/types';
import { logLevel, mode } from '../envs';

export let loggers: ILoggers;

let isDebugMode = mode === Mode.development || logLevel === LogLevel.debug;

export const setDebugMode = (debugMode: boolean) => {
  isDebugMode = debugMode;
};

export class Loggers implements ILoggers {
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
    if (this.level === LogLevel.debug && !isDebugMode) {
      return;
    }
    console[
      this.level === LogLevel.error
        ? 'error'
        : this.level === LogLevel.warn
          ? 'warn'
          : 'log'
    ](this.prefix || '==>', ...params);
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

  setPrefix(prefix: string) {
    loggers = this.addPrefix(prefix);
    return loggers;
  }
}

loggers = new Loggers();

export const setLoggers = (newLoggers: ILoggers) => {
  loggers = newLoggers;
};
