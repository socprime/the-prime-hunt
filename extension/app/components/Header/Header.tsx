import React from 'react';
import { createClassName } from '../../../common/common-helpers';
import './styles.scss';

export type HeaderProps = {
  className?: string
};

export const Header: React.FC<React.PropsWithChildren<HeaderProps>> = ({
  children,
  className = '',
}) => {
  return (
    <header
      className={createClassName(['header', className])}
    >
      {children}
    </header>
  );
};