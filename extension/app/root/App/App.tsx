import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { useAppStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { DraggableResizable } from '../../components/atoms/DragableResizable/DraggableResizable';
import { AppHeader } from '../AppHeader/AppHeader';
import { isFlatObjectsEqual } from '../../../../common/helpers';
import { AppContent } from '../AppContent/AppContent';
import { AppFooter } from '../AppFooter/AppFooter';
import { calculateScreen, ScreenType } from './app-media';
import { createClassName } from '../../../common/common-helpers';
import './app.scss';

const APP_PADDING = 20;
type ContentHeight = string | number;

export const App: React.FC = observer(() => {
  const appStore = useAppStore();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const dragTopRef = useRef<HTMLDivElement>(null);
  const dragBottomRef = useRef<HTMLDivElement>(null);
  const dragLeftRef = useRef<HTMLDivElement>(null);
  const dragRightRef = useRef<HTMLDivElement>(null);

  const calculateContentHeight = useCallback(() => {
    if (!footerRef?.current || !headerRef?.current || !wrapperRef?.current) {
      return 'unset';
    }
    return (
      wrapperRef.current.offsetHeight -
      APP_PADDING * 2 -
      headerRef.current.offsetHeight -
      footerRef.current.offsetHeight
    );
  }, []);

  const setContentHeightToElement = useCallback((value: ContentHeight) => {
    if (!contentRef?.current) {
      return;
    }
    contentRef.current.style.height = typeof value === 'number'
      ? `${value}px`
      : value;
  }, []);

  useLayoutEffect(() => {
    appStore.rootElement = wrapperRef.current!;

    const prevValuesHeight: { [elemName: string]: number } = { header: 0, footer: 0, wrapper: 0 };

    const onHeightChangeCallback = (entries: ResizeObserverEntry[], oldHeight: number): number => {
      const newHeight = entries[0].contentRect.height;
      if (newHeight !== oldHeight) {
        setContentHeightToElement(calculateContentHeight());
      }
      return newHeight;
    };

    let currentScreenType: ScreenType = calculateScreen(wrapperRef.current!.offsetWidth);

    const onWidthChangeCallback = (entries: ResizeObserverEntry[]) => {
      const screenType = calculateScreen(entries[0].contentRect.width);
      if (currentScreenType !== screenType) {
        wrapperRef.current!.classList.add(screenType);
        wrapperRef.current!.classList.remove(currentScreenType);
        currentScreenType = screenType;
      }
    };

    const [observerHeader, observerFooter, observerWrapper] = ['header', 'footer', 'wrapper']
      .map(elemName => new ResizeObserver(
        (entries) => {
          prevValuesHeight[elemName] = onHeightChangeCallback(entries, prevValuesHeight[elemName]);
          if (elemName === 'wrapper') {
            onWidthChangeCallback(entries);
          }
        }));

    observerHeader.observe(headerRef.current!);
    observerFooter.observe(footerRef.current!);
    observerWrapper.observe(wrapperRef.current!);

    wrapperRef.current!.classList.add(currentScreenType);

    return () => {
      observerHeader.disconnect();
      observerFooter.disconnect();
      observerWrapper.disconnect();
    };
  }, [appStore, calculateContentHeight, setContentHeightToElement]);

  const content = useMemo(() => {
    return (
      <div
        className="app-wrapper"
        ref={wrapperRef}
        style={{
          padding: APP_PADDING,
        }}
      >
        <AppHeader ref={headerRef} />
        <AppContent ref={contentRef} />
        <AppFooter ref={footerRef} />
      </div>
    );
  }, []);

  const position = {
    top: appStore.topPosition,
    left: appStore.leftPosition,
    width: appStore.widthApp,
    height: appStore.heightApp,
  };

  return (
    <DraggableResizable
      className={createClassName([
        'the-prime-hunt--extension--root',
        appStore.isExtensionOpen ? '' : 'invisible',
      ])}
      position={position}
      dragElementsRefs={[
        appStore.dragElementRef,
        dragTopRef,
        dragBottomRef,
        dragLeftRef,
        dragRightRef,
      ]}
      minHeight={appStore.getMinHeight()}
      minWidth={appStore.getMinWidth()}
      onStart={() => {
        if (appStore.overlay) {
          appStore.overlay.style.position = 'fixed';
        }
      }}
      onChange={(type) => {
        if (type !== 'move' && !appStore.isResizing) {
          appStore.isResizing = true;
        }
      }}
      onEnd={(newPosition) => {
        if (appStore.overlay) {
          appStore.overlay.style.position = 'unset';
        }
        if (appStore.isResizing) {
          appStore.isResizing = false;
        }
        if (isFlatObjectsEqual(newPosition, position)) {
          return;
        }
        appStore.topPosition = newPosition.top;
        appStore.leftPosition = newPosition.left;
        appStore.widthApp = newPosition.width;
        appStore.heightApp = newPosition.height;
        appStore.savePosition();
      }}
    >
      <div ref={dragTopRef} className="draggable draggable-top drag-activator"></div>
      <div ref={dragBottomRef} className="draggable draggable-bottom drag-activator"></div>
      <div ref={dragLeftRef} className="draggable draggable-left drag-activator"></div>
      <div ref={dragRightRef} className="draggable draggable-right drag-activator"></div>
      {content}
    </DraggableResizable>
  );
});
