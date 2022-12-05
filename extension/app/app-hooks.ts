import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const usePrevious = (
  value: any,
  updateCondition?: (value: any) => boolean,
) => {
  const ref = useRef();
  useEffect(() => {
    if (typeof updateCondition !== 'function') {
      ref.current = value;
      return;
    }
    ref.current = updateCondition(value)
      ? value
      : ref.current;
  }, [updateCondition, value]);
  return ref.current;
};

export const useOnClickOutside = (
  cb: (e: MouseEvent) => void,
  ...refs: (HTMLElement | null | undefined | MutableRefObject<HTMLElement | null>)[]
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const isInside = refs.some(ref => {
        const element = ref instanceof HTMLElement ? ref : ref?.current;
        if (!element?.getBoundingClientRect) {
          return false;
        }
        const rect = element.getBoundingClientRect();
        return (
          event.x >= rect.left &&
          event.x <= rect.right &&
          event.y >= rect.top &&
          event.y <= rect.bottom
        );
      });

      if (!isInside) {
        cb(event);
      }
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [cb, refs]);
};

export const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue(prev => prev > 9999 ? 0 : value + 1);
};

