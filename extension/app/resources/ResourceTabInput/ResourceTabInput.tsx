import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { AppInputProps } from '../../components/inputs/AppInput/types';
import { createClassName } from '../../../common/common-helpers';
import { CheckIcon } from '../../components/atoms/icons/CheckIcon/CheckIcon';
import { useOnClickOutside, usePrevious } from '../../app-hooks';
import { AppControlInput } from '../../components/inputs/AppControlInput/AppControlInput';
import { boundedResourcesTypeIDs, ResourceTypeID } from '../resources-types';
import { createNonDuplicateValue } from '../../../../common/helpers';
import { useResourceStore } from '../../stores';
import { WasteBasketIcon } from '../../components/atoms/icons/WasteBasketIcon/WasteBasketIcon';
import { AppTooltip } from '../../components/tooltips/AppTooltip/AppTooltip';
import './styles.scss';

export type ResourceTabInputProps = AppInputProps & {
  typeID: string;
  onApply: (name: string) => void;
  onRemove: () => void;
  edit?: boolean;
};

export const newTabName = '$$new-tab$$';

export const ResourceTabInput: React.FC<ResourceTabInputProps> = ({
  typeID,
  onApply,
  onRemove,
  className = '',
  edit,
  value = '',
  ...restProps
}) => {
  const isNewTab = value === newTabName;
  const [editMode, setEditMode] = useState(edit || isNewTab);
  const prevEditMode = usePrevious(editMode);
  const resourceStore = useResourceStore();

  const [inputValue, setInputValue] = useState(isNewTab ? '' : value);
  const prevInputValue = usePrevious(inputValue, (v) => v.trim() !== '');

  const inputRef = useRef<HTMLInputElement>(null);
  const virtualInputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const normalizeTabName = useCallback((
    id: ResourceTypeID,
    name: string,
  ) => {
    const values = resourceStore.tabsNames.filter((tn) => tn !== id);
    if (!values.includes(name)) {
      return name;
    }

    return createNonDuplicateValue(name, values);
  }, [resourceStore]);

  const finishEdit = useCallback((currentValue: string, prevValue: string | undefined) => {
    const normalizedValue = currentValue.trim();
    const newValue = normalizedValue || prevValue?.trim() || 'New Tab';
    const newName = normalizeTabName(typeID, newValue);
    inputRef.current!.setSelectionRange(0, 0);
    inputRef.current!.focus();
    setInputValue(newName);
    setEditMode(false);
    onApply(newName);
  }, [normalizeTabName, onApply, typeID]);

  useOnClickOutside(() => {
    if (editMode) {
      finishEdit(inputValue, prevInputValue);
    }
  }, inputWrapperRef);

  const focusInput = useCallback((currentValue: string) => {
    if (!inputRef?.current) {
      return;
    }
    inputRef.current.setSelectionRange(currentValue.length, currentValue.length);
    inputRef.current.focus();
  }, []);

  const setInputWidth = useCallback(() => {
    if (
      !inputRef?.current
      || !virtualInputRef?.current
    ) {
      return;
    }
    virtualInputRef.current.style.fontStyle = inputRef.current.style.fontStyle;
    virtualInputRef.current.style.fontFamily = inputRef.current.style.fontFamily;
    virtualInputRef.current.style.fontSize = inputRef.current.style.fontSize;
    inputRef.current.style.width = `${virtualInputRef.current.getBoundingClientRect().width}px`;
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(setInputWidth);
    observer.observe(virtualInputRef.current!);
    return () => observer.disconnect();
  }, [setInputWidth]);

  useEffect(() => {
    setInputWidth();
  }, [inputValue, setInputWidth]);

  useEffect(() => {
    if (editMode && !prevEditMode && inputRef?.current) {
      focusInput(inputValue);
    }
  }, [inputValue, editMode, focusInput, prevEditMode]);

  const getControls = useCallback((
    inputVal: string,
    prevInputVal?: string,
  ) => {
    return (
      <>
        <AppTooltip
          className="small"
          content="Apply changes (Enter/Esc)"
        >
          <span className="control">
            <CheckIcon
              onClick={() => {
                finishEdit(inputVal, prevInputVal);
              }}
            />
          </span>
        </AppTooltip>
        <AppTooltip
          className="small"
          content="Delete tab"
        >
          <span className="control">
             <WasteBasketIcon
               onClick={() => {
                 setEditMode(false);
                 onRemove();
               }}
             />
          </span>
        </AppTooltip>
      </>
    );
  }, [finishEdit, onRemove]);

  return (
    <div
      ref={inputWrapperRef}
      className={createClassName([
        'resource-tab-input-wrapper',
        editMode ? 'edit' : '',
        className,
      ])}
      onDoubleClick={() => {
        if (!editMode && !boundedResourcesTypeIDs.includes(typeID)) {
          setEditMode(true);
        }
      }}
      onKeyDown={(e) => {
        const code = e.code?.toLowerCase?.() || '';
        if (code === 'enter' || code === 'escape') {
          finishEdit(inputValue, prevInputValue);
        }
      }}
    >
      <AppControlInput
        ref={inputRef}
        className={createClassName([
          'resource-tab-input',
          className,
        ])}
        onType={(v) => {
          setInputValue(v);
        }}
        edit={editMode}
        disabled={!editMode}
        controls={getControls(inputValue, prevInputValue)}
        value={inputValue}
        {...restProps}
      />
      <span
        className="virtual-input"
        style={{
          position: 'absolute',
          opacity: 0,
          boxSizing: 'border-box',
          pointerEvents: 'none',
          top: -99999,
          left: -99999,
          whiteSpace: 'pre',
        }}
        ref={virtualInputRef}
      >
        {inputValue || '1'}
      </span>
    </div>
  );
};
