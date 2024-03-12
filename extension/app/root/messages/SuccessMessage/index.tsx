import React, { PropsWithChildren } from 'react';
import { WarningIcon } from '../../../components/atoms/icons/WarningIcon/WarningIcon';
import { createClassName } from '../../../../common/common-helpers';
import './styles.scss';

export const SuccessMessage: React.FC<PropsWithChildren<{
  className?: string;
}>> = ({
  className = '',
  children,
}) => {
  return (
    <div className={createClassName([
      'message',
      'success-message',
      className,
    ])}>
      <WarningIcon />
      {children}
    </div>
  );
};
