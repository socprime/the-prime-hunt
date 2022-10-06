import { ExtensionMessage, IPlatform } from '../../common/types/types-common';

export enum ListenerType {
  OnMessage = 'OnMessage',
}

export type Position = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type ContentPlatform = IPlatform & {
  extensionDefaultPosition: Position;
  connect(): void;
};

export type MessageListener<T = unknown> = (
  type: ListenerType.OnMessage,
  callback: (message: ExtensionMessage<T>) => void,
) => void;
