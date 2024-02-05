import { forwardRef } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { ListProps } from './types';

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
