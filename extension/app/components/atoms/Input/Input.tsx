// TODO legacy
import React, {
  forwardRef, useCallback, useEffect, useRef, useState,
} from 'react';
import { createClassName } from '../../../../common/common-helpers';
import './input.scss';

export type InputProps = {
  value?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  label?: React.ReactNode;
  onType?: (value: string) => void;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onFocus?: (e: React.FocusEvent) => void;
  debounceMs?: number;
  disabled?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  name,
  className = '',
  onChange,
  onClick,
  onType,
  onKeyDown,
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
      disabled ? 'disabled' : '',
      className,
    ])}>
      {label && <span>{label}</span>}
      <input
        ref={ref}
        name={name}
        placeholder={placeholder}
        className={createClassName([
          'input',
          disabled ? 'disabled' : '',
          !inputValue ? 'empty' : '',
          className,
        ])}
        onKeyDown={(e) => {
          onKeyDown?.(e);
        }}
        onClick={onClick}
        onBlur={() => {
          onBlur?.(inputValue);
        }}
        onFocus={onFocus}
        disabled={disabled}
        type="text"
        value={inputValue}
        onChange={onChangeCallback}
        onDoubleClick={onDoubleClick}
      />
    </label>
  );
});
