import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { ListProps } from '../List/types';
import { AppList } from '../../lists/AppList';
import './virtual-list.scss';

export type VirtualListProps = ListProps & {
  height: number;
};

export const VirtualList: React.FC<VirtualListProps> = ({
  className = '',
  height,
  items,
  ...restProps
}) => {
  const [listItems, setListItems] = useState<ListProps['items']>((items || []).slice(0, 1));
  const [shift, setShift] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const params = useRef<{
    rowHeight: number;
    visibleRowsCount: number;
  }>({} as any);

  useEffect(() => {
    const wrapper = wrapperRef.current as HTMLElement;
    const item = wrapperRef.current!.querySelector('.list-item') as HTMLElement;
    const rowHeight = item.getBoundingClientRect().height;
    params.current.visibleRowsCount = Math.round(
      wrapper.getBoundingClientRect().height / rowHeight,
    ) + 1;
    params.current.rowHeight = rowHeight;
  }, []);

  useEffect(() => {
    if (!params.current?.visibleRowsCount) {
      return;
    }
    const { visibleRowsCount } = params.current;

    setListItems(items.slice(shift, shift + visibleRowsCount + 2));
  }, [items, shift]);

  const calculateTop = useCallback((start: number) => {
    const rowHeight = (params.current?.rowHeight || 0);
    return rowHeight * start;
  }, []);

  const calculateBottom = useCallback((start: number) => {
    const rowHeight = (params.current?.rowHeight || 0);
    const visibleRowsCount = (params.current?.visibleRowsCount || 0);
    return rowHeight * (items.length - (start + visibleRowsCount));
  }, [items.length]);

  const onScroll = useCallback((target: HTMLElement) => {
    const { scrollTop } = target;
    const { rowHeight, visibleRowsCount } = params.current;
    const newShift = Math.floor(scrollTop / rowHeight);
    const maxShift = items.length - visibleRowsCount;
    setShift(newShift > maxShift ? maxShift : newShift);
  }, [items.length]);

  return (
    <div
      className={createClassName(['infinity-list-wrapper', className])}
      ref={wrapperRef}
      onScroll={({ target }) => {
        onScroll(target as HTMLElement);
      }}
      style={{ height }}
    >
      <div style={{ height: calculateTop(shift) }}></div>
      <AppList
        items={listItems}
        className={createClassName(['infinity-list', className])}
        {...restProps}
      />
      <div style={{ height: calculateBottom(shift) }}></div>
    </div>
  );
};
