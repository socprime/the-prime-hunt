import { forwardRef } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { ListProps } from './types';

export const List = forwardRef<HTMLUListElement, ListProps>((
  {
    noItemsMessage,
    className = '',
    items,
    customRender,
  },
  ref,
) => {
  const cn = createClassName([
    'list',
    className,
  ]);

  if (items.length < 1 && noItemsMessage) {
    return (
      <div className={cn}>
        <div className="list--no-item-message">{noItemsMessage}</div>
      </div>
    );
  }

  return (
    <ul
      className={cn}
      ref={ref}
    >
      {items.map((item) => {
        const {
          id, content, onClick, isSelected,
        } = item;
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
            {customRender ? customRender(item) : content}
          </li>
        );
      })}
    </ul>
  );
});
