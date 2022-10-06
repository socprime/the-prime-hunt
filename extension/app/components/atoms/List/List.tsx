import React from 'react';
import { createClassName } from '../../../../common/common-helpers';

export type ListProps = {
  items: {
    id: string;
    content: React.ReactNode;
    onClick?: () => void
  }[];
  className?: string;
};

export const List: React.FC<ListProps> = ({ className = '', items }) => {
  return (
    <ul className={createClassName([
      'list',
      className,
    ])}>
      {items.map(({ id, content, onClick }) => {
        return (
          <li className="list-item" key={id} onClick={onClick}>
            {content}
          </li>
        );
      })}
    </ul>
  );
};