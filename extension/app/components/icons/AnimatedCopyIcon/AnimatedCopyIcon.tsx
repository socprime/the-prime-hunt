import React from 'react';
import { CopyIcon } from '../../atoms/icons/CopyIcon/CopyIcon';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

type AnimatedCopyIconProps = {
  disabled?: boolean;
  onClick?: (e: React.SyntheticEvent<HTMLSpanElement, MouseEvent>) => void;
};

export const AnimatedCopyIcon = React.forwardRef<HTMLSpanElement, AnimatedCopyIconProps>((
  {
    disabled,
    onClick,
  },
  ref,
) => {

  return (
    <span
      ref={ref}
      tabIndex={0}
      className={createClassName(['animated-copy-icon', 'icon', disabled ? 'disabled' : ''])}
      onClick={(e) => {
        onClick?.(e);
      }}
    >
      <CopyIcon />
      <CopyIcon className="animated"/>
    </span>
  );
});