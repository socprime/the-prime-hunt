import React, { AnchorHTMLAttributes } from 'react';
import { createClassName } from '../../../../common/common-helpers';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({
  children,
  className = '',
  ...restProps
}) => {
  return (
    <a
      className={createClassName(['link', className])}
      {...restProps}
    >
      {children}
    </a>
  );
};
