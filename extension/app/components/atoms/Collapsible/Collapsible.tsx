import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { createClassName } from '../../../../common/common-helpers';
import './collapsible.scss';

export type CollapsibleProps = {
  header: React.ReactNode;
  disabled?: boolean;
  open?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Collapsible: React.FC<React.PropsWithChildren<CollapsibleProps>> = ({
  className = '',
  disabled,
  children,
  header,
  onClick,
  open,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(!children ? false : !!open);
  const [height, setHeight] = useState<number>(0);

  const getNewHeight = useCallback(() => {
    return Array.from(contentRef.current?.children || [])
      .reduce((res, e) => {
        return res + (e as HTMLElement).offsetHeight;
      }, 0);
  }, []);

  useEffect(() => {
    setHeight(getNewHeight());
  }, [getNewHeight, isOpen]);

  useEffect(() => {
    if (!contentRef.current) {
      return () => {};
    }
    const oldWidth = contentRef.current!.offsetWidth;
    const contentObserver = new MutationObserver(() => {
      setHeight(getNewHeight());
    });
    const widthObserver = new ResizeObserver(() => {
      if (contentRef.current && contentRef.current.offsetWidth !== oldWidth) {
        setHeight(getNewHeight());
      }
    });
    contentObserver.observe(contentRef.current!, {
      childList: true,
      subtree: true,
    });
    widthObserver.observe(contentRef.current!);
    return () => {
      contentObserver.disconnect();
      widthObserver.disconnect();
    };
  }, [getNewHeight]);

  return (
    <div className={createClassName([
      'collapsible',
      isOpen ? 'open' : 'closed',
      disabled ? 'disabled' : '',
      className,
    ])}>
      <div
        className={createClassName([
          'collapsible-header',
          isOpen ? 'open' : 'closed',
          disabled ? 'disabled' : '',
          className,
        ])}
        onClick={(e) => {
          if (!children || disabled) {
            return;
          }
          setIsOpen(!isOpen);
          onClick?.(e);
        }}
      >
        {header}
      </div>
      {children && (
        <div
          className="collapsible-content"
          ref={contentRef}
          style={{ height: isOpen ? height : 0 }}
        >
          {isOpen && children}
        </div>
      )}
    </div>
  );
};
