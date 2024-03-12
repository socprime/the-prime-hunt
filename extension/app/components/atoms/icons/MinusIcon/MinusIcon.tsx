import React from 'react';
import { createClassName } from '../../../../../common/common-helpers';

export type MinusIconProps = {
  className?: string;
  onClick?: (e: React.SyntheticEvent<SVGElement, MouseEvent>) => void;
};

export const MinusIcon: React.FC<MinusIconProps> = ({ onClick, className = '' }) => {
  return (
    <svg
      className={createClassName(['minus-icon', 'icon', className])}
      onClick={onClick}
      viewBox="0 0 16 3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.3333 0.83313H0.666667C0.298477 0.83313 0 1.13161 0 1.4998C0 1.86799 0.298477 2.16647 0.666667 2.16647H15.3333C15.7015 2.16647 16 1.86799 16 1.4998C16 1.13161 15.7015 0.83313 15.3333 0.83313Z" />
    </svg>
  );
};
