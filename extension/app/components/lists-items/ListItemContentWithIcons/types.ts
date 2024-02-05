import { ReactNode, MutableRefObject, HTMLAttributes } from 'react';

export type ListItemContentWithIconsProps = {
  content: ReactNode;
  iconsLeft?: ReactNode[];
  iconsRight?: ReactNode[];
  native?: HTMLAttributes<HTMLDivElement>;
}

export type ListItemContentWithIconsRefs = {
  elementRef: MutableRefObject<HTMLDivElement | null>;
};
