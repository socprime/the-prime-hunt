import { StandardPropertiesHyphen } from 'csstype';
import { NormalizedParsedResources } from '../app/resources/resources-types';

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
  name: string,
) => {
  const prefix = type === 'csv'
    ? 'data:text/csv;charset=utf-8,'
    : 'data:text/csv;charset=utf-8,';

  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(`${prefix}${content}`));
  link.setAttribute('download', `${name}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getElementsUnderCursor = (
  e: MouseEvent,
  filter?: (elem: HTMLElement) => boolean,
): HTMLElement[] => {
  const x = e.clientX;
  const y = e.clientY;

  const filtered: HTMLElement[] = [];
  const elements: {
    element: HTMLElement;
    savedPointerEvents: string;
  }[] = [];

  let elementMouseIsOver = document.elementFromPoint(x, y) as HTMLElement;

  while (elementMouseIsOver.tagName !== 'HTML') {
    const savedPointerEvents = elementMouseIsOver.style.pointerEvents;

    if (!elementMouseIsOver) {
      break;
    }

    if (
      !filter
      || (filter && filter(elementMouseIsOver))
    ) {
      filtered.push(elementMouseIsOver);
    }

    elements.push({
      savedPointerEvents,
      element: elementMouseIsOver,
    });
    elementMouseIsOver.style.pointerEvents = 'none';
    elementMouseIsOver = document.elementFromPoint(x, y) as HTMLElement;
  }

  elements.forEach(({ element, savedPointerEvents }) => {
    if (savedPointerEvents) {
      element.style.pointerEvents = savedPointerEvents;
    } else {
      element.style.removeProperty('pointer-events');
    }
    if (!element.getAttribute('style')) {
      element.removeAttribute('style');
    }
  });

  return filtered;
};

export const buildQueryParts = (
  resources: NormalizedParsedResources,
  operator: string,
  valuesSeparator: string,
  fieldsSeparator: string,
  decorators: {
    leftOperand: (value: string) => string,
    rightOperand: (value: string | number) => string | number,
  },
  prefix?: string,
): string => {
  const queryParts = Object.keys(resources).reduce((result, fieldName) => {
    result.push(
      resources[fieldName]
        .map(v => `${decorators.leftOperand(fieldName)}${operator}${decorators.rightOperand(v)}`)
        .join(valuesSeparator),
    );
    return result;
  }, [] as string[]).join(fieldsSeparator);
  return prefix
    ? `${prefix} ${queryParts}`
    : queryParts;
};

export const removeBracketsAround = (str: string): string => {
  let result = str;
  if (str[0] === '(') {
    result = result.slice(1);
  }
  if (str[str.length - 1] === ')') {
    result = result.slice(0, str.length - 2);
  }
  return result;
};

export const removeQuotesAround = (str: string): string => {
  let result = str;
  if (str[0] === '"' || str[0] === "'") {
    result = result.slice(1);
  }
  if (str[str.length - 1] === '"' || str[str.length - 1] === "'") {
    result = result.slice(0, str.length - 2);
  }
  return result;
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

export const getVersionFromString = (version: unknown): number => {
  if (
    typeof version !== 'string'
    || !/^[.0-9]+$/.test(version)
  ) {
    return 0;
  }
  const result = parseInt(version.replace(/\./g, ''));
  return isNaN(result) ? 0 : result;
};

export const compareVersions = (
  version1: string,
  version2: string,
): 'equal' | 'less' | 'greater' => {
  const nVersion1 = getVersionFromString(version1);
  const nVersion2 = getVersionFromString(version2);
  return nVersion1 === nVersion2
    ? 'equal'
    : nVersion1 > nVersion2
      ? 'greater'
      : 'less';
};

export const createFormDataString = (data: object): string => {
  const urlEncodedDataPairs = [];
  for (const [name, value] of Object.entries(data)) {
    urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
  }
  return urlEncodedDataPairs
    .join('&')
    .replace(/%20/g, '+');
};
