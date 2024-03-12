import { RefObject } from 'react';
import { observable, makeObservable } from 'mobx';
import { Position } from '../../../content/types/types-content-common';
import { getPosition, setPosition } from '../../../common/local-storage';

export class AppStore {
  private static MIN_HEIGHT = 400;

  private static MIN_WIDTH = 320;

  @observable
  public mounted = false;

  @observable
  public loadingKeys: string[] = [];

  @observable
  public dragElementRef = {} as RefObject<HTMLElement>;

  getMinHeight() {
    return AppStore.MIN_HEIGHT;
  }

  getMinWidth() {
    return AppStore.MIN_WIDTH;
  }

  @observable
  public isResizing = false;

  @observable
  private width: number;

  set widthApp(value: number) {
    if (
      value > 0
      && value !== this.width
    ) {
      this.width = value >= AppStore.MIN_WIDTH
        ? value
        : AppStore.MIN_WIDTH;
    }
  }

  get widthApp() {
    return this.width;
  }

  @observable
  private height: number;

  set heightApp(value: number) {
    if (
      value > 0
      && value !== this.height
    ) {
      this.height = value >= AppStore.MIN_HEIGHT
        ? value
        : AppStore.MIN_HEIGHT;
    }
  }

  get heightApp() {
    return this.height;
  }

  @observable
  private top: number;

  set topPosition(value: number) {
    if (value !== this.top) {
      this.top = value;
    }
  }

  get topPosition() {
    return this.top;
  }

  @observable
  private left: number;

  public set leftPosition(value: number) {
    if (value !== this.left) {
      this.left = value;
    }
  }

  public get leftPosition() {
    return this.left;
  }

  @observable
  public isExtensionOpen = false;

  @observable
  public overlay: HTMLElement;

  @observable
  public rootElement: HTMLElement | null = null;

  private updatePositionValues(position: Position) {
    const {
      height,
      left,
      width,
      top,
    } = position;
    this.widthApp = width;
    this.heightApp = height;
    this.topPosition = top;
    this.leftPosition = left;
  }

  constructor() {
    this.setPosition();
    makeObservable(this);
  }

  startLoading(key: string) {
    if (this.isLoading(key)) {
      return;
    }
    this.loadingKeys.push(key);
  }

  stopLoading(key: string) {
    this.loadingKeys = this.loadingKeys.filter((k) => k !== key);
  }

  isLoading(key: string) {
    return this.loadingKeys.includes(key);
  }

  setPosition(position?: Position) {
    const cachedPosition = getPosition();

    if (cachedPosition) {
      return this.updatePositionValues(cachedPosition);
    }

    if (!cachedPosition && position) {
      return this.updatePositionValues(position);
    }

    return this.updatePositionValues({
      top: 100,
      left: 100,
      width: 100,
      height: 100,
    });
  }

  savePosition() {
    setPosition({
      top: this.top,
      left: this.left,
      height: this.height,
      width: this.width,
    });
  }
}
