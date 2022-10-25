import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { useForceUpdate } from '../../../app-hooks';
import './collapsible.scss';

export type CollapsibleProps = {
  header: React.ReactNode;
  open?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Collapsible: React.FC<React.PropsWithChildren<CollapsibleProps>> = ({
  className = '',
  children,
  header,
  onClick,
  open,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!open);
  const ref = useRef<HTMLDivElement>(null);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const oldWidth = 0;
    const contentObserver = new MutationObserver(() => {
      forceUpdate();
    });
    const widthObserver = new ResizeObserver((entries) => {
      const newWidth = entries[0].contentRect.width;
      if (newWidth !== oldWidth) {
        forceUpdate();
      }
      return newWidth;
    });
    contentObserver.observe(ref.current!, {
      childList: true,
      subtree: true,
    });
    widthObserver.observe(ref.current!);
    return () => {
      contentObserver.disconnect();
      widthObserver.disconnect();
    };
  }, [forceUpdate]);

  const getNewHeight = useCallback(() => {
    return Array.from(ref.current!.children)
      .reduce((res, e) => res += (e as HTMLElement).offsetHeight, 0);
  }, []);

  return (
    <div className={createClassName(['collapsible', className])}>
      <div
        className={createClassName(['collapsible-header', isOpen ? 'open' : 'closed'])}
        onClick={e => {
          setIsOpen(!isOpen);
          onClick?.(e);
        }}
      >
        {header}
      </div>
      <div
        className="collapsible-content"
        ref={ref}
        style={{
          height: isOpen ? getNewHeight() : 0,
        }}
      >
        {isOpen && children}
      </div>
    </div>
  );
};