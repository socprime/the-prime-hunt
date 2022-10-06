import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import './input.scss';

export type InputProps = {
  value?: string;
  className?: string;
  placeholder?: string;
  label?: React.ReactNode;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  debounce?: number;
  disabled?: boolean;
};

export const Input: React.FC<InputProps> = ({
  className = '',
  onChange,
  onBlur,
  label,
  placeholder = '',
  debounce,
  disabled,
  value = '',
}) => {
  const [inputValue, setInputValue] = useState(value);

  const timeoutID = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onChangeCallback = useCallback((
    { target } : React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(target.value);
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
    }
    timeoutID.current = setTimeout(() => {
      onChange?.(target.value);
    }, debounce || 350);
  }, [debounce, onChange]);

  return (
    <label className="input-label">
      {label && <span>{label}</span>}
      <input
        placeholder={placeholder}
        className={createClassName([
          'input',
          disabled ? 'disabled' : '',
          !inputValue ? 'empty' : '',
          className,
        ])}
        onBlur={() => {
          onBlur?.(inputValue);
        }}
        disabled={disabled}
        type="text"
        value={inputValue}
        onChange={onChangeCallback}
      />
    </label>
  );
};
