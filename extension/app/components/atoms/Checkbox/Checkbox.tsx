import React, {
  useEffect, useState, forwardRef, MutableRefObject, useRef, useImperativeHandle,
} from 'react';
import { usePrevious } from '../../../app-hooks';
import { createClassName } from '../../../../common/common-helpers';
import './checkbox.scss';

export type CheckboxProps = {
  content: React.ReactNode;
  checkIcon: React.ReactNode;
  uncheckIcon: React.ReactNode;
  disabled?: boolean;
  className?: string;
  title?: string;
  checked?: boolean;
  onStateChanged?: (isChecked: boolean) => void;
  onClick?: (isChecked: boolean) => void;
};

export type CheckboxRefs = {
  elementRef: MutableRefObject<HTMLDivElement | null>;
};

export const Checkbox = forwardRef<CheckboxRefs, CheckboxProps>(({
  onStateChanged,
  content,
  disabled,
  checked,
  onClick,
  checkIcon,
  uncheckIcon,
  title = '',
  className = '',
}, refs) => {
  const [isChecked, setIsChecked] = useState(!!checked);
  const prevState = usePrevious(isChecked);

  const elementRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useImperativeHandle(refs, () => {
    return { elementRef };
  });

  useEffect(() => {
    if (
      typeof prevState !== 'undefined'
      && prevState !== isChecked
    ) {
      onStateChanged?.(isChecked);
    }
  }, [isChecked, onStateChanged, prevState]);

  useEffect(() => {
    if (typeof checked !== 'undefined') {
      setIsChecked(checked);
    }
  }, [checked]);

  if (elementRef.current) {
    (elementRef.current as any).checked = isChecked;
  }

  return (
    <div
      ref={elementRef}
      className={
        createClassName([
          'checkbox',
          isChecked ? 'checked' : 'not-checked',
          disabled ? 'disabled' : '',
          className,
        ])
      }
    >
      <span
        className={createClassName([
          'checker-wrapper',
          isChecked ? 'checked' : 'not-checked',
          disabled ? 'disabled' : '',
          className,
        ])}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (disabled) {
            return;
          }
          const newValue = !isChecked;
          setIsChecked(newValue);
          onClick?.(newValue);
        }}
      >
        {isChecked ? checkIcon : uncheckIcon}
      </span>
      <div className="content" title={title}>{content}</div>
    </div>
  );
});
