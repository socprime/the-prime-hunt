import { PlatformID } from './types/types-common';
import { LogLevel, Mode } from '../../common/types';

export const contentPlatformIDFromENV: PlatformID | null =
  Object.values(PlatformID).includes(process.env.CONTENT_PLATFORM as PlatformID)
    ? process.env.CONTENT_PLATFORM as PlatformID
    : null;

export const backgroundPlatformIDFromENV: PlatformID | null =
  Object.values(PlatformID).includes(process.env.BACKGROUND_PLATFORM as PlatformID)
    ? process.env.BACKGROUND_PLATFORM as PlatformID
    : null;

export const mode: Mode = process.env.MODE === Mode.production
  ? Mode.production
  : Mode.development;

export const logLevel: LogLevel =
  Object.keys(LogLevel).includes(process.env.LOG_LEVEL as LogLevel)
    ? process.env.LOG_LEVEL as LogLevel
    : LogLevel.info;
