import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import './input.scss';

export type InputProps = {
  value?: string;
  className?: string;
  placeholder?: string;
  label?: React.ReactNode;
  onType?: (value: string) => void;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onFocus?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  debounceMs?: number;
  disabled?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  onChange,
  onClick,
  onType,
  onDoubleClick,
  onFocus,
  onBlur,
  label,
  placeholder = '',
  debounceMs,
  disabled,
  value = '',
}, ref) => {
  const [inputValue, setInputValue] = useState(value);

  const timeoutID = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onChangeCallback = useCallback((
    { target } : React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(target.value);
    onType?.(target.value);
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
    }
    timeoutID.current = setTimeout(() => {
      onChange?.(target.value);
    }, debounceMs || 350);
  }, [debounceMs, onChange, onType]);

  return (
    <label className={createClassName([
      'input-label',
      className,
    ])}>
      {label && <span>{label}</span>}
      <input
        ref={ref}
        placeholder={placeholder}
        className={createClassName([
          'input',
          disabled ? 'disabled' : '',
          !inputValue ? 'empty' : '',
          className,
        ])}
        onClick={onClick}
        onMouseOut={onFocus}
        onBlur={() => {
          onBlur?.(inputValue);
        }}
        disabled={disabled}
        type="text"
        value={inputValue}
        onChange={onChangeCallback}
        onDoubleClick={onDoubleClick}
      />
    </label>
  );
});
