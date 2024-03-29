import React from 'react';

type PlusIconProps = {
  onClick?: (e: React.SyntheticEvent<SVGElement, MouseEvent>) => void;
};

export const SendToIcon: React.FC<PlusIconProps> = ({ onClick }) => {
  return (
    <svg
      className="send-to-icon icon"
      onClick={onClick}
      viewBox="0 0 22 22"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.426 11.095l-17-8A.999.999 0 003.03 4.242L4.969 12 3.03 19.758a.998.998 0 001.396 1.147l17-8a1 1 0 000-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z" />
    </svg>
  );
};
