import React from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { Link, LinkProps } from '../../atoms/Link/Link';
import './styles.scss';

export type AppLinkProps = LinkProps;

export const AppLink: React.FC<React.PropsWithChildren<AppLinkProps>> = ({
  children,
  className = '',
  ...restProps
}) => {
  return (
    <Link
      className={createClassName(['app-link', className])}
      {...restProps}
    >
      {children}
    </Link>
  );
};
