import { TextareaHTMLAttributes, MutableRefObject } from 'react';

export type TextAreaProps = {
  label?: string;
  debounceMs?: number;
  native?: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export type TextAreaRefs = {
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>;
  setValue: (value: string) => void;
};
