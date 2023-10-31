import { RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { isFlatObjectsEqual } from '../../../../../common/helpers';
import { createClassName } from '../../../../common/common-helpers';
import { Position } from '../../../../content/types/types-content-common';
import './draggable-resizable.scss';

export type ChangesType =
  | 'move'
  | 'resize-top'
  | 'resize-top-left'
  | 'resize-top-right'
  | 'resize-bottom'
  | 'resize-bottom-left'
  | 'resize-bottom-right'
  | 'resize-left'
  | 'resize-right';

export type DraggableResizableProps = {
  position: Position;
  dragElementsRefs?: RefObject<HTMLElement>[];
  minHeight?: number;
  minWidth?: number;
  onChange?: (type: ChangesType, newPosition: Position, oldPosition: Position) => void;
  onStart?: () => void;
  onEnd?: (newPosition: Position) => void;
  className?: string;
  disallowResize?: boolean;
  disallowDrag?: boolean;
};

type Shift = { shiftX: number, shiftY: number };
type OnMouseUp = (e: MouseEvent, shift: Shift) => void;
type OnMouseMove = (e: MouseEvent, shift: Shift) => void;

export const DraggableResizable: React.FC<React.PropsWithChildren<DraggableResizableProps>> = ({
  className = '',
  children,
  onEnd,
  position,
  onChange,
  dragElementsRefs = [],
  onStart,
  minHeight,
  minWidth,
  disallowResize,
  disallowDrag,
}) => {
  const [elementPosition, setElementPosition] = useState(position);

  useLayoutEffect(() => {
    if (!isFlatObjectsEqual(elementPosition, position)) {
      setElementPosition(position);
    }
  }, [position]);

  const ref = useRef<HTMLDivElement>(null);

  const onMouseDownHandler = useCallback((
    e: React.MouseEvent | MouseEvent,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
  ) => {
    const elem = ref.current!;
    const shiftX = e.pageX - elem.offsetLeft;
    const shiftY = e.pageY - elem.offsetTop;

    let started = false;

    const boundedMouseMove = (event: MouseEvent) => {
      if (!started) {
        started = true;
        onStart?.();
      }
      onMouseMove(event, { shiftX, shiftY });
    };

    const boundedMouseUp = (event: MouseEvent) => {
      document.removeEventListener('mouseup', boundedMouseUp);
      document.removeEventListener('mousemove', boundedMouseMove);

      onMouseUp(event, { shiftX, shiftY });
    };

    document.addEventListener('mousemove', boundedMouseMove);
    document.addEventListener('mouseup', boundedMouseUp);
  }, [onStart]);

  const onChangedPositionCallback = useCallback((
    type: ChangesType,
    newPosition: Position,
    oldPosition: Position,
  ) => {
    onChange?.(type, newPosition, oldPosition);
  }, [onChange]);

  const onMouseUpCallback = useCallback((
    newPosition: Position,
  ) => {
    if (!onEnd) {
      return;
    }
    setTimeout(() => {
      onEnd(newPosition);
    }, 0);
  }, [onEnd]);

  const onResizeHandler = useCallback((
    e: React.MouseEvent | MouseEvent,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
  ) => {
    if (disallowResize) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    return onMouseDownHandler(e, onMouseMove, onMouseUp);
  }, [disallowResize, onMouseDownHandler]);

  const onMoveHandler = useCallback((
    e: React.MouseEvent | MouseEvent,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
  ) => {
    if (disallowDrag) {
      return;
    }
    return onMouseDownHandler(e, onMouseMove, onMouseUp);
  }, [disallowDrag, onMouseDownHandler]);

  const getCheckedWidth = useCallback((width: number) => (minWidth && width < minWidth) ? minWidth : width, [minWidth]);
  const getCheckedHeight = useCallback((height: number) => (minHeight && height < minHeight) ? minHeight : height, [minHeight]);

  const calculateOnMove = useCallback((
    e: React.MouseEvent | MouseEvent,
    oldPosition: Position,
    shift: Shift,
  ) => {
    const { pageX, pageY } = e;
    const { shiftX, shiftY } = shift;
    return {
      ...oldPosition,
      left: pageX - shiftX,
      top: pageY - shiftY,
    };
  }, []);

  const calculateOnResizeTop = useCallback((
    e: React.MouseEvent | MouseEvent,
    oldPosition: Position,
  ): Position => {
    const elem = ref.current!;
    const { clientY } = e;
    const delta = elem.offsetTop - clientY + 1;
    return {
      ...oldPosition,
      height: getCheckedHeight(elem.offsetHeight + delta),
      top: oldPosition.top - delta,
    };
  }, [getCheckedHeight]);

  const calculateOnResizeBottom = useCallback((
    e: React.MouseEvent | MouseEvent,
    oldPosition: Position,
  ): Position => {
    const elem = ref.current!;
    const { clientY } = e;
    const delta = clientY - (elem.offsetTop + elem.offsetHeight) + 3;
    return {
      ...oldPosition,
      height: getCheckedHeight(elem.offsetHeight + delta),
    };
  }, [getCheckedHeight]);

  const calculateOnResizeLeft = useCallback((
    e: React.MouseEvent | MouseEvent,
    oldPosition: Position,
  ): Position => {
    const elem = ref.current!;
    const { clientX } = e;
    const delta = elem.offsetLeft - clientX + 1;
    return {
      ...oldPosition,
      width: getCheckedWidth(elem.offsetWidth + delta),
      left: oldPosition.left - delta,
    };
  }, [getCheckedWidth]);

  const calculateOnResizeRight = useCallback((
    e: React.MouseEvent | MouseEvent,
    oldPosition: Position,
  ): Position => {
    const elem = ref.current!;
    const { clientX } = e;
    const delta = clientX - (elem.offsetLeft + elem.offsetWidth) + 3;
    return {
      ...oldPosition,
      width: getCheckedWidth(elem.offsetWidth + delta),
    };
  }, [getCheckedWidth]);

  const onMoveCallback = useCallback((e: React.MouseEvent | MouseEvent) => {
    ref.current!.classList.add('move');
    onMoveHandler(
      e,
      (event, shift) => {
        setElementPosition(prev => {
          const newPosition = calculateOnMove(event, prev, shift);
          onChangedPositionCallback('move', newPosition, prev);
          return newPosition;
        });
      },
      (event, shift) => {
        ref.current!.classList.remove('move');
        setElementPosition(prev => {
          const newPosition = calculateOnMove(event, prev, shift);
          onMouseUpCallback(newPosition);
          return newPosition;
        });
      },
    );
  }, [calculateOnMove, onChangedPositionCallback, onMouseUpCallback, onMoveHandler]);

  useLayoutEffect(() => {
    if (!dragElementsRefs) {
      ref.current!.onmousedown = onMoveCallback;
      return;
    }
    if (dragElementsRefs?.length > 0) {
      dragElementsRefs.forEach(element => {
        if (element?.current) {
          element.current.onmousedown = onMoveCallback;
        }
      });
    }
  }, [dragElementsRefs, onMoveCallback, dragElementsRefs?.length]);

  return (
    <div
      className={createClassName([
        'draggable-resizable',
        className,
        disallowResize ? 'disallowResize' : '',
        disallowDrag ? 'disallowDrag' : '',
      ])}
      ref={ref}
      style={elementPosition}
    >
      <div
        className="resizer resizer-top-left"
        onMouseDown={e => {
          const calcNewPosition = (event: MouseEvent, pos: Position): Position => {
            const x = calculateOnResizeLeft(event, pos);
            const y = calculateOnResizeTop(event, pos);
            return {
              top: y.top,
              left: x.left,
              width: x.width,
              height: y.height,
            };
          };

          onResizeHandler(
            e,
            (event) => {
              setElementPosition(prev => {
                const newPosition = calcNewPosition(event, prev);
                onChangedPositionCallback('resize-top-left', newPosition, prev);
                return newPosition;
              });
            },
            (event) => {
              setElementPosition(prev => {
                const newPosition = calcNewPosition(event, prev);
                onMouseUpCallback(newPosition);
                return newPosition;
              });
            },
          );
        }}
      ></div>
      <div
        className="resizer resizer-top-right"
        onMouseDown={e => {
          const calcNewPosition = (event: MouseEvent, pos: Position): Position => {
            const x = calculateOnResizeRight(event, pos);
            const y = calculateOnResizeTop(event, pos);
            return {
              top: y.top,
              left: x.left,
              width: x.width,
              height: y.height,
            };
          };

          onResizeHandler(
            e,
            (event) => {
              setElementPosition(prev => {
                const newPosition = calcNewPosition(event, prev);
                onChangedPositionCallback('resize-top-right', newPosition, prev);
                return newPosition;
              });
            },
            (event) => {
              setElementPosition(prev => {
                const newPosition = calcNewPosition(event, prev);
                onMouseUpCallback(newPosition);
                return newPosition;
              });
            },
          );
        }}
      ></div>
      <div
        className="resizer resizer-bottom-right"
        onMouseDown={e => {
          const calcNewPosition = (event: MouseEvent, pos: Position): Position => {
            const x = calculateOnResizeRight(event, pos);
            const y = calculateOnResizeBottom(event, pos);
            return {
              top: y.top,
              left: x.left,
              width: x.width,
              height: y.height,
            };
          };

          onResizeHandler(
            e,
            (event) => {
              setElementPosition(prev => {
                const newPosition = calcNewPosition(event, prev);
                onChangedPositionCallback('resize-bottom-right', newPosition, prev);
                return newPosition;
              });
            },
            (event) => {
              setElementPosition(prev => {
                const newPosition = calcNewPosition(event, prev);
                onMouseUpCallback(newPosition);
                return newPosition;
              });
            },
          );
        }}
      ></div>
      <div
        className="resizer resizer-bottom-left"
        onMouseDown={e => {
          const calcNewPosition = (event: MouseEvent, pos: Position): Position => {
            const x = calculateOnResizeLeft(event, pos);
            const y = calculateOnResizeBottom(event, pos);
            return {
              top: y.top,
              left: x.left,
              width: x.width,
              height: y.height,
            };
          };

          onResizeHandler(
            e,
            (event) => {
              setElementPosition(prev => {
                const newPosition = calcNewPosition(event, prev);
                onChangedPositionCallback('resize-bottom-left', newPosition, prev);
                return newPosition;
              });
            },
            (event) => {
              setElementPosition(prev => {
                const newPosition = calcNewPosition(event, prev);
                onMouseUpCallback(newPosition);
                return newPosition;
              });
            },
          );
        }}
      ></div>
      <div
        className="resizer resizer-top"
        onMouseDown={e => {
          onResizeHandler(
            e,
            (event) => {
              setElementPosition(prev => {
                const newPosition = calculateOnResizeTop(event, prev);
                onChangedPositionCallback('resize-top', newPosition, prev);
                return newPosition;
              });
            },
            (event) => {
              setElementPosition(prev => {
                const newPosition = calculateOnResizeTop(event, prev);
                onMouseUpCallback(newPosition);
                return newPosition;
              });
            },
          );
        }}
      ></div>
      <div
        className="resizer resizer-bottom"
        onMouseDown={e => {
          onResizeHandler(e, (event) => {
            setElementPosition(prev => {
              const newPosition = calculateOnResizeBottom(event, prev);
              onChangedPositionCallback('resize-bottom', newPosition, prev);
              return newPosition;
            });
          }, (event) => {
            setElementPosition(prev => {
              const newPosition = calculateOnResizeBottom(event, prev);
              onMouseUpCallback(newPosition);
              return newPosition;
            });
          });
        }}
      ></div>
      <div
        className="resizer resizer-left"
        onMouseDown={e => {
          onResizeHandler(e, (event) => {
            setElementPosition(prev => {
              const newPosition = calculateOnResizeLeft(event, prev);
              onChangedPositionCallback('resize-left', newPosition, prev);
              return newPosition;
            });
          }, (event) => {
            setElementPosition(prev => {
              const newPosition = calculateOnResizeLeft(event, prev);
              onMouseUpCallback(newPosition);
              return newPosition;
            });
          });
        }}
      ></div>
      <div
        className="resizer resizer-right"
        onMouseDown={e => {
          onResizeHandler(e, (event) => {
            setElementPosition(prev => {
              const newPosition = calculateOnResizeRight(event, prev);
              onChangedPositionCallback('resize-right', newPosition, prev);
              return newPosition;
            });
          }, (event) => {
            setElementPosition(prev => {
              const newPosition = calculateOnResizeRight(event, prev);
              onMouseUpCallback(newPosition);
              return newPosition;
            });
          });
        }}
      ></div>
        {children}
    </div>
  );
};

