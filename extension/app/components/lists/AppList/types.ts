import { ListProps } from '../../atoms/List/types';
import { MutableRefObject } from 'react';

export type AppListProps = ListProps;

export type AppListRefs = {
  elementRef: MutableRefObject<HTMLUListElement | null>;
};
