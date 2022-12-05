import React from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { Header, HeaderProps } from '../../atoms/Header/Header';
import './styles.scss';

export type AppHeaderProps = HeaderProps;

export const AppHeader: React.FC<React.PropsWithChildren<AppHeaderProps>> = ({
  children,
  className = '',
  ...restProps
}) => {
  return (
    <Header
      className={createClassName(['app-header', className])}
      {...restProps}
    >
      {children}
    </Header>
  );
};
