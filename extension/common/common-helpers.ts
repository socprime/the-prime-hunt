import { ExecutingContext, ExtensionMessageType, NormalizedParsedResources, PlatformID } from './types/types-common';
import { StandardPropertiesHyphen } from 'csstype';
import { isRuntimeGetUrlSupported } from './api-support';

export const getBrowserContext = () => typeof browser !== 'undefined' ? browser : chrome;

export const getWebAccessibleUrl = (path: string): string => {
  return isRuntimeGetUrlSupported(path)
    ? getBrowserContext().runtime.getURL(path)
    : '';
};

export const getPlatformNameByID = (
  platformID: PlatformID,
): string => {
  if (platformID === PlatformID.microsoftSentinel) {
    return 'Microsoft Sentinel';
  }

  if (platformID === PlatformID.microsoftDefenderForEndpoint) {
    return 'Microsoft Defender For Endpoint';
  }

  return 'Unknown Platform';
};

export const getExecutingContextByMessageType = (
  message: ExtensionMessageType,
): ExecutingContext => {
  let prefix = (message as string).slice(0, 3).toLowerCase();
  if (prefix === 'app') {
    return 'app';
  }
  prefix = prefix.slice(0, 2);
  return prefix === 'bg'
    ? 'background'
    : prefix === 'cs'
      ? 'content'
      : prefix === 'is'
        ? 'inline'
        : 'unknown' as ExecutingContext;
};

export const cssObjectToString = (styles: StandardPropertiesHyphen): string =>
  Object.keys(styles)
    .reduce((res, key) => res += `${key}:${(styles as Record<string, string>)[key]};`, '');

export const mountHTMLElement = (
  element: 'div' | 'style' | 'script' | 'link',
  mountElement?: HTMLElement | ShadowRoot,
  options?: {
    attributes?: Record<string, string | number | StandardPropertiesHyphen>;
    innerHtml?: string;
    innerText?: string;
  },
): HTMLElement => {
  const elem = document.createElement(element);
  if (options?.attributes) {
    Object.keys(options.attributes).forEach(key => {
      elem.setAttribute(
        key,
        key === 'style'
          ? cssObjectToString(options.attributes![key]! as StandardPropertiesHyphen)
          : options.attributes?.[key] as string || '',
      );
    });
  }
  if (options?.innerHtml) {
    elem.innerHTML = options.innerHtml;
  }
  if (options?.innerText) {
    elem.innerText = options.innerText;
  }
  if (mountElement) {
    mountElement.append(elem);
  }
  return elem;
};

export const isInsideIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

export const waitHTMLElement = async (
  query: string,
  rootElement: Document | HTMLElement = document,
): Promise<HTMLElement> => {
  return new Promise(resolve => {
    new MutationObserver((_, observer) => {
      const element = rootElement.querySelector(query);
      if (element) {
        observer.disconnect();
        resolve(element as HTMLElement);
      }
    }).observe(rootElement, { childList: true, subtree: true });
  });
};

export const createClassName = (list: string[]): string => list.filter(Boolean).join(' ');

export const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-99999px';
  el.style.top = '-99999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const downloadFile = (
  type: 'csv',
  content: string,
) => {
  const prefix = type === 'csv'
    ? 'data:text/csv;charset=utf-8,'
    : 'data:text/csv;charset=utf-8,';

  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(`${prefix}${content}`));
  link.setAttribute('download', 'extension-resources.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getElementsUnderCursor = (
  e: MouseEvent,
  condition?: (elem: HTMLElement) => boolean,
): HTMLElement[] => {
  const x = e.clientX;
  const y = e.clientY;
  const stack: {
    element: HTMLElement;
    savedPointerEvents: string;
  }[] = [];

  let elementMouseIsOver = document.elementFromPoint(x, y) as HTMLElement;

  stack.push({
    element: elementMouseIsOver,
    savedPointerEvents: elementMouseIsOver.style.pointerEvents,
  });

  while (elementMouseIsOver?.tagName !== 'HTML') {
    let savedPointerEvents = elementMouseIsOver.style.pointerEvents;

    if (elementMouseIsOver) {
      if (condition?.(elementMouseIsOver)) {
        return [elementMouseIsOver];
      }
      elementMouseIsOver.style.pointerEvents = 'none';
      elementMouseIsOver = document.elementFromPoint(x, y) as any;
    }

    stack.push({
      savedPointerEvents,
      element: elementMouseIsOver,
    });
  }

  const result: HTMLElement[] = [];

  stack.forEach(({ element, savedPointerEvents }) => {
    element.style.pointerEvents = savedPointerEvents;
    result.push(element);
  });

  return result;
};

export const buildQueryParts = (
  resources: NormalizedParsedResources,
  operator: string,
  separator: string,
  decorators: {
    leftOperand: (value: string) => string,
    rightOperand: (value: string | number) => string | number,
  },
): string => {
  return Object.keys(resources).reduce((result, fieldName) => {
    result.push(
      resources[fieldName]
        .map(v => `${decorators.leftOperand(fieldName)} ${operator} ${decorators.rightOperand(v)}`)
        .join(separator),
    );
    return result;
  }, [] as string[]).join(separator);
};

export const removeDoubleQuotesAround = (str: string): string => {
  let result = str;
  if (str[0] === '"') {
    result = result.slice(1);
  }
  if (str[str.length - 1] === '"') {
    result = result.slice(0, str.length - 2);
  }
  return result;
};
