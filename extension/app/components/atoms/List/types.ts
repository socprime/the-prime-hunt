import { ReactNode } from 'react';

export type ListProps = {
  items: {
    id: string;
    content: ReactNode;
    isSelected?: boolean;
    onClick?: () => void
  }[];
  noItemsMessage?: ReactNode;
  className?: string;
};
