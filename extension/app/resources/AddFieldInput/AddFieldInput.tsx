import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { AppControlInput, AppControlInputProps } from '../../components/inputs/AppControlInput/AppControlInput';
import { createClassName } from '../../../common/common-helpers';
import { CheckIcon } from '../../components/atoms/icons/CheckIcon/CheckIcon';
import { WasteBasketIcon } from '../../components/atoms/icons/WasteBasketIcon/WasteBasketIcon';
import { SearchDocumentIcon } from '../../components/atoms/icons/SearchDocumentIcon/SearchDocumentIcon';
import './styles.scss';

export type AddFieldInputProps = Omit<AppControlInputProps, 'controls' | 'edit'> & {
  onApply: (value: string) => void;
  onRemove: () => void;
};

export const AddFieldInput = forwardRef<HTMLDivElement, AddFieldInputProps>(({
  className = '',
  onApply,
  onRemove,
  ...restProps
}, ref) => {
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  return (
    <div
      className={createClassName([
        'add-field-input-wrapper',
        className,
      ])}
      ref={ref}
      onKeyDown={e => {
        const code = e.code?.toLowerCase?.() || '';
        if (code === 'enter') {
          onApply(inputValue);
        }
        if (code === 'escape') {
          onRemove();
        }
      }}
    >
      <span>
        <SearchDocumentIcon />
      </span>
      <AppControlInput
        edit
        ref={inputRef}
        className={createClassName([
          'add-field-input',
          className,
        ])}
        onType={v => setInputValue(v.trim())}
        {...restProps}
        placeholder="Enter Field Name"
        controls={<>
          <span className="control">
            <CheckIcon
              onClick={() => {
                onApply(inputValue);
              }}
            />
          </span>
            <span className="control">
             <WasteBasketIcon
               onClick={() => {
                 onRemove();
               }}
             />
          </span>
        </>}
        value={inputValue}
      />
    </div>
  );
});
