import { ReactNode } from 'react';
import { DropdownContentItem } from '../../../../../common/types';

export type ListProps = {
  items: (DropdownContentItem & {
    isSelected?: boolean;
    onClick?: () => void
  })[];
  noItemsMessage?: ReactNode;
  className?: string;
  customRender?: (item: DropdownContentItem) => string;
};
