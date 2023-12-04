import { forwardRef, ReactNode } from 'react';
import { createClassName } from '../../../../common/common-helpers';

export type ListProps = {
  items: {
    id: string;
    content: ReactNode;
    isSelected?: boolean;
    onClick?: () => void
  }[];
  noItemsMessage?: ReactNode;
  className?: string;
};

export const List = forwardRef<HTMLUListElement, ListProps>((
  {
    noItemsMessage,
    className = '',
    items,
  },
  ref,
) => {
  if (items.length < 1 && noItemsMessage) {
    return <>{noItemsMessage}</>;
  }

  return (
    <ul
      className={createClassName([
        'list',
        className,
      ])}
      ref={ref}
    >
      {items.map(({
        id, content, onClick, isSelected,
      }) => {
        return (
          <li
            className={createClassName([
              'list-item',
              className,
              isSelected ? 'selected' : '',
            ])}
            key={id}
            onClick={onClick}
          >
            {content}
          </li>
        );
      })}
    </ul>
  );
});
