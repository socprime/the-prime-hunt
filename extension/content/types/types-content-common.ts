import { ExtensionMessage, IPlatform, ModifyQueryType } from '../../common/types/types-common';
import { NormalizedParsedResources } from '../../app/resources/resources-types';
import { WatchingResources } from '../../background/types/types-background-common';

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
  defaultWatchers: WatchingResources;
  extensionDefaultPosition: Position;
  buildQueryParts(
    type: ModifyQueryType,
    resources: NormalizedParsedResources,
  ): string;
  connect(): void;
};

export type MessageListener<T = unknown> = (
  type: ListenerType.OnMessage,
  callback: (message: ExtensionMessage<T>) => void,
) => void;
