import { MutableRefObject } from 'react';
import { ListProps } from '../../atoms/List/types';

export type DropdownMenuListProps = ListProps;

export type DropdownMenuListRefs = {
  elementRef: MutableRefObject<HTMLUListElement | null>;
};
