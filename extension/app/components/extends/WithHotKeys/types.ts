import { KeyboardEventKey } from 'keyboard-event-key-type';

export type WithHotKeysProps = {
  keyMappings?: {
    isMatched: (event: KeyboardEvent & {
      key: KeyboardEventKey;
    }) => boolean;
    action: (event: KeyboardEvent) => void;
  }[];
};

export type WithHotKeysRefs = {};
