import React from 'react';
import { CopyIcon } from '../../atoms/icons/CopyIcon/CopyIcon';
import './styles.scss';

type AnimatedCopyIconProps = {
  onClick?: (e: React.SyntheticEvent<HTMLSpanElement, MouseEvent>) => void;
};

export const AnimatedCopyIcon = React.forwardRef<HTMLSpanElement, AnimatedCopyIconProps>((
  {
    onClick,
  },
  ref,
) => {

  return (
    <span
      ref={ref}
      tabIndex={0}
      className="animated-copy-icon icon"
      onClick={(e) => {
        onClick?.(e);
      }}
    >
      <CopyIcon />
      <CopyIcon className="animated"/>
    </span>
  );
});