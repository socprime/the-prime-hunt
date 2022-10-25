import React, { useEffect, useState } from 'react';
import { usePrevious } from '../../../app-hooks';
import { createClassName } from '../../../../common/common-helpers';
import './checkbox.scss';

export type CheckboxProps = {
  content: React.ReactNode;
  checkIcon: React.ReactNode;
  uncheckIcon: React.ReactNode;
  className?: string;
  title?: string;
  checked?: boolean;
  onStateChanged?: (isChecked: boolean) => void;
  onClick?: (isChecked: boolean) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  onStateChanged,
  content,
  checked,
  onClick,
  checkIcon,
  uncheckIcon,
  title = '',
  className = '',
}) => {
  const [isChecked, setIsChecked] = useState(!!checked);
  const prevState = usePrevious(isChecked);

  useEffect(() => {
    if (
      typeof prevState !== 'undefined' &&
      prevState !== isChecked
    ) {
      onStateChanged?.(isChecked);
    }
  }, [isChecked, onStateChanged, prevState]);

  useEffect(() => {
    if (typeof checked !== 'undefined') {
      setIsChecked(checked);
    }
  }, [checked]);

  return (
    <div className={createClassName(['checkbox', className])}>
      <span
        className={createClassName([
          'checker-wrapper',
          isChecked ? 'checked' : 'not-checked',
        ])}
        onClick={(e) => {
          e.stopPropagation?.();
          e.preventDefault?.();
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
};