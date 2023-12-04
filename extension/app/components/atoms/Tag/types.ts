import { MutableRefObject, HTMLAttributes } from 'react';

export type TagProps = {
  native?: HTMLAttributes<HTMLDivElement>;
};

export type TagRefs = {
  elementRef: MutableRefObject<HTMLElement | null>;
};
