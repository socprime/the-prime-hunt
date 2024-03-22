import { TextareaHTMLAttributes, MutableRefObject } from 'react';

export type TextAreaProps = {
  label?: string;
  debounceMs?: number;
  onResize?: (newSize: { width: number; height: number }) => void;
  native?: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export type TextAreaRefs = {
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>;
  setValue: (value: string) => void;
};
