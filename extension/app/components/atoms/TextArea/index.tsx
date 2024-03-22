import {
  forwardRef, useState, useRef, useImperativeHandle, useEffect,
} from 'react';
import { TextAreaRefs, TextAreaProps } from './types';
import { usePrevious } from '../../../app-hooks';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export const TextArea = forwardRef<TextAreaRefs, TextAreaProps>(({
  label = '',
  debounceMs = 0,
  onResize,
  native = {},
}, refs) => {
  const {
    onChange, value, disabled,
  } = native;
  const [textAreaValue, setTextAreaValue] = useState<string>(value ? String(value) : '');
  const previousValue = usePrevious(textAreaValue);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(refs, () => ({
    textAreaRef,
    setValue: setTextAreaValue,
  }));

  useEffect(() => {
    if (
      typeof previousValue !== 'undefined'
      && previousValue !== value
      && String(textAreaValue).trim() !== String(value).trim()
    ) {
      setTextAreaValue(String(value));
    }
  }, [value, disabled, previousValue, textAreaValue]);

  const isEmpty = textAreaValue.trim().length < 1;

  // useEffect(() => {
  //   if (!textAreaRef?.current) {
  //     return () => {};
  //   }
  //
  //   const resizeObserver = new ResizeObserver(() => {
  //     console.log('# resize');
  //   });
  //   resizeObserver.observe(textAreaRef.current);
  //
  //   return () => resizeObserver.disconnect();
  // }, []);

  return (
    <>
      {label && <label
        className={createClassName([
          'textarea-label',
          native?.className || '',
          disabled ? 'disabled' : '',
          disabled ? 'textarea-label--disabled' : '',
        ])}
      >{label}</label>}
      <textarea
        ref={textAreaRef}
        {...native}
        className={createClassName([
          'textarea',
          native.className || '',
          disabled ? 'textarea--disabled' : '',
          disabled ? 'disabled' : '',
          isEmpty ? 'textarea--empty' : '',
        ])}
        onChange={(e) => {
          setTextAreaValue(e.target.value);
          onChange?.(e);
        }}
        value={textAreaValue}
        disabled={disabled}
      />
    </>
  );
});
