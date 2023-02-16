type EventType = 'click' | 'mousemove' | 'mouseover' | 'dblclick';

const mouseEventOf = (eventType: EventType) => (
  element :HTMLElement,
  x: number,
  y: number,
) => {
  const rect = element.getBoundingClientRect();

  const event = new MouseEvent(eventType, {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: rect.left + x,
    clientY: rect.top + y,
  });
  element.dispatchEvent(event);
};

const getElementCoords = (element: HTMLElement): { x: number, y: number } => {
  const { x, y } = element.getBoundingClientRect();
  return { x, y };
};

export const clickOnElement = (element: HTMLElement) => {
  const { x, y } = getElementCoords(element);
  mouseEventOf('click')(element, x, y);
};

export const dblClickOnElement = (element: HTMLElement) => {
  const { x, y } = getElementCoords(element);
  mouseEventOf('dblclick')(element, x, y);
};

export const hoverOnElement = (element: HTMLElement) => {
  const { x, y } = getElementCoords(element);
  mouseEventOf('mousemove')(element, x, y);
  mouseEventOf('mouseover')(element, x, y);
};