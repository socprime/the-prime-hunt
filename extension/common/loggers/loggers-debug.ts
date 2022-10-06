import { ExtensionMessage, ExecutingContext } from '../types/types-common';
import { mapType } from '../../../common/types';

export const getDebugPrefix = (context: ExecutingContext) => {
  return context === 'background'
    ? 'bg ==>'
    : context === 'content'
      ? 'cs ==>'
      : context === 'inline'
        ? 'is ==>'
        : context === 'app'
          ? 'app ==>'
          : 'unknown ==>';
};

const debugID = mapType<DebugID>(
  process.env.DEBUG_ID || 'debug-external-der3edc3op3e4dde44rt',
);

export enum DebugID {
  debugIDExternal = debugID,
}

export type DebugMessage = ExtensionMessage & {
  externalType: DebugID;
};