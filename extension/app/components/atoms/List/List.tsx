import React, { forwardRef } from 'react';
import { createClassName } from '../../../../common/common-helpers';

export type ListProps = {
  items: {
    id: string;
    content: React.ReactNode;
    onClick?: () => void
  }[];
  className?: string;
};

export const List = forwardRef<HTMLUListElement, ListProps>((
  {
    className = '',
    items,
  },
  ref,
) => {
  return (
    <ul
      className={createClassName([
        'list',
        className,
      ])}
      ref={ref}
    >
      {items.map(({ id, content, onClick }) => {
        return (
          <li className="list-item" key={id} onClick={onClick}>
            {content}
          </li>
        );
      })}
    </ul>
  );
});