import { ExtensionMessage } from '../types/types-common';
import { mapType } from '../../../common/types';
import { debugID } from './loggers-helpers';

export enum DebugID {
  debugIDExternal = mapType<DebugID>(
    process.env.DEBUG_ID || debugID,
  ),
}

export type DebugMessage = ExtensionMessage & {
  externalType: DebugID;
};
