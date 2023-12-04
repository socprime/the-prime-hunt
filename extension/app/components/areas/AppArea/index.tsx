import React, { PropsWithChildren } from 'react';
import { Area } from '../../atoms/Area';
import { AreaProps } from '../../atoms/Area/types';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export const AppArea: React.FC<PropsWithChildren<AreaProps>> = ({
  children,
  native = {},
}) => {
  return (
    <Area
      native={{
        ...native,
        className: createClassName([
          native.className || '',
          'app-area',
        ]),
      }}
    >
      {children}
    </Area>
  );
};
