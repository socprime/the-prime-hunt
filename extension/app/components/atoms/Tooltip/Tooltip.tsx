import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createClassName } from '../../../../common/common-helpers';
import { createPortal } from 'react-dom';
import './tooltip.scss';

export type TooltipProps = {
  content: React.ReactNode;
  delayShowMs?: number;
  getPosition?: (
    tooltip: HTMLElement,
    hint?: HTMLElement | null,
  ) => { left: number; top: number; };
  mountElem?: HTMLElement;
  className?: string;
};

export const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children,
  mountElem,
  content,
  getPosition,
  className = '',
  delayShowMs = 0,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const unmountTimeoutRef = useRef<number | NodeJS.Timeout>();
  const hideTimeoutRef = useRef<number | NodeJS.Timeout>();
  const delayShowTimeoutRef = useRef<number | NodeJS.Timeout>();

  const onMouseOut = useCallback(() => {
    clearTimeout(unmountTimeoutRef.current);
    clearTimeout(hideTimeoutRef.current);
    clearTimeout(delayShowTimeoutRef.current);

    hideTimeoutRef.current = setTimeout(() => {
      setIsShow(false);
    }, 30);

    unmountTimeoutRef.current = setTimeout(() => {
      setIsMounted(false);
    }, 400);
  }, []);

  const onMouseOver = useCallback(() => {
    clearTimeout(hideTimeoutRef.current);
    clearTimeout(unmountTimeoutRef.current);
    clearTimeout(delayShowTimeoutRef.current);

    setIsMounted(true);

    delayShowTimeoutRef.current = setTimeout(() => {
      setIsShow(true);
    }, delayShowMs);
  }, [delayShowMs]);

  const calculateCoords = useCallback((
    tooltip: HTMLElement,
    hint?: HTMLElement | null,
  ) => {
    if (typeof getPosition === 'function') {
      return getPosition(tooltip, hint);
    }

    const coords = tooltip.getBoundingClientRect();
    const hintWidth = hint?.offsetWidth || 0;
    const hintHeight = hint?.offsetHeight || 0;

    const left = (coords.left + tooltip.offsetWidth / 2) - (hintWidth / 2);
    let top = coords.top - hintHeight + 3;
    if (top < 0) {
      top = coords.top + tooltip.offsetHeight - 5;
    }

    return {
      top,
      left: left < 0 ? 0 : left,
    };
  }, [getPosition]);


  useEffect(() => {
    if (!isMounted || !hintRef.current) {
      if (isShow) {
        clearTimeout(delayShowTimeoutRef.current);
        setIsShow(false);
      }
      return;
    }
    const tooltip = tooltipRef.current!;
    const hint = hintRef.current;
    const { top, left } = calculateCoords(tooltip, hint);
    hint.style.top = `${top}px`;
    hint.style.left = `${left}px`;

    clearTimeout(delayShowTimeoutRef.current);
    delayShowTimeoutRef.current = setTimeout(() => {
      setIsShow(true);
    }, delayShowMs);
  }, [calculateCoords, isMounted]);

  const getHint = useCallback((show: boolean) => {
    const { top, left } = calculateCoords(tooltipRef.current!, hintRef.current);
    return (
      <div
        className={createClassName([
          'tooltip-content',
          className,
          show ? '' : 'transparent',
        ])}
        style={{ top, left }}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        ref={hintRef}
      >
        <div className="tooltip-content-wrapper">
          {content}
        </div>
      </div>
    );
  }, [calculateCoords, className, content, onMouseOut, onMouseOver]);

  return (
    <div
      className={createClassName(['tooltip', className])}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      ref={tooltipRef}
    >
      {children}
      {isMounted && mountElem && createPortal(getHint(isShow), mountElem)}
    </div>
  );
};