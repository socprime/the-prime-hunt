import React, { PropsWithChildren } from 'react';
import { AreaProps } from './types';
import { createClassName } from '../../../../common/common-helpers';

export const Area: React.FC<PropsWithChildren<AreaProps>> = ({
  disabled,
  children,
  native = {},
}) => {
  return (
    <div
      {...native}
      className={createClassName([
        'area',
        native.className || '',
        disabled ? 'disabled' : '',
      ])}
    >
      {children}
    </div>
  );
};
