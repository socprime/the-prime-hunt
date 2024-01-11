import {
  forwardRef, useEffect, useRef, useState, MutableRefObject, useImperativeHandle,
} from 'react';
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

export type AddFieldInputRefs = {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  wrapperRef: MutableRefObject<HTMLDivElement | null>;
};

export const AddFieldInput = forwardRef<AddFieldInputRefs, AddFieldInputProps>(({
  className = '',
  onApply,
  onRemove,
  onType,
  value = '',
  ...restProps
}, ref) => {
  const [inputValue, setInputValue] = useState(value);

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const wrapperRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useImperativeHandle(ref, () => ({
    get inputRef() {
      return inputRef;
    },
    get wrapperRef() {
      return wrapperRef;
    },
  }));

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value, inputValue]);

  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  return (
    <div
      className={createClassName([
        'add-field-input-wrapper',
        className,
      ])}
      ref={wrapperRef}
      onKeyDown={(e) => {
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
        {...restProps}
        edit
        ref={inputRef}
        className={createClassName([
          'add-field-input',
          className,
        ])}
        onType={(v) => {
          setInputValue(v.trim());
          onType?.(v);
        }}
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
