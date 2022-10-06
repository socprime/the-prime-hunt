import React from 'react';
import { createClassName } from '../../../../../common/common-helpers';

type SmallArrowIconProps = {
  className?: string;
};

export const SmallArrowIcon: React.FC<SmallArrowIconProps> = ({ className = '' }) => {
  return (
    <svg
      className={createClassName(['small-arrow-icon', 'icon', className])}
      viewBox="0 0 10 7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.70711 6.20711C10.0976 5.81658 10.0976 5.18342 9.70711 4.79289L5.70711 0.792893C5.31658 0.402369 4.68342 0.402369 4.29289 0.792893L0.292893 4.79289C-0.0976315 5.18342 -0.0976315 5.81658 0.292893 6.20711C0.683417 6.59763 1.31658 6.59763 1.70711 6.20711L5 2.91421L8.29289 6.20711C8.68342 6.59763 9.31658 6.59763 9.70711 6.20711Z" />
    </svg>
  );
};