import { MessageToApp } from '../../../app/types/types-app-messages';
import { logErrorMessage } from './utils';
import {
  ParsedDataPayload,
  SetQueryPayload,
} from '../../../common/types/types-common-payloads';
import { debugID } from '../../../common/loggers/loggers-helpers';
import { watchersLocalStorageKey } from '../../../common/local-storage';
import { WatchingResources } from '../../../background/types/types-background-common';
import { sleep } from '../../../../common/helpers';
import { NormalizedResources } from '../../../app/resources/resources-types';
import { MessageToBackground } from '../../../background/types/types-background-messages';
import { MessageToInline } from '../../../inline/types/types-inline-messages';
import { ExtensionMessage } from '../../../common/types/types-common';

const addScenarioToWindow = (
  scenarioName: string,
  scenarioFunc: Function,
) => {
  const w = window as any;
  if (!w.scenarioFunctions) {
    w.scenarioFunctions = {};
  }
  w.scenarioFunctions[scenarioName] = scenarioFunc;
};

export const setQueryToPlatform = async (
  query: string,
) => {
  window.postMessage({
    type: MessageToApp.AppSendToBackground,
    externalType: debugID,
    payload: {
      type: MessageToBackground.BGDirectMessageToInline,
      payload: {
        type: MessageToInline.ISSetQuery,
        payload: {
          value: query,
        } as SetQueryPayload,
      },
    },
  } as ExtensionMessage);

  await sleep(0.6);
};

export const mapListenerMessages = (
  isMatched: (message: ExtensionMessage) => boolean,
  getStack: () => ExtensionMessage[],
) => {
  window.addEventListener('message', (event) => {
    const message = event.data as ExtensionMessage;
    if ((message as any).outside === 'MessageOutside' && isMatched(message)) {
      getStack().push(message);
    }
  });
};

export const getQueryFromPlatform = async () => {
  window.postMessage({
    type: MessageToApp.AppSendToBackground,
    externalType: debugID,
    payload: {
      type: MessageToBackground.BGDirectMessageToInline,
      payload: {
        type: MessageToInline.ISGetQuery,
      },
    },
  } as ExtensionMessage);

  await sleep(0.6);
};

export const openAccountsTab = async () => {
  (document.querySelector('div[style^="all:initial"]')
    ?.shadowRoot
    ?.querySelector('div.tabs-platform-resources-wrapper div.tab:nth-child(2) > button') as HTMLElement)
    ?.click?.();
  await sleep(0.3);
};

export const showExtension = async () => {
  addScenarioToWindow('showExtension', showExtension);

  window.postMessage({
    type: MessageToApp.AppShowExtension,
    externalType: debugID,
    testMode: true,
  });

  await sleep(0.3);
};

export const getWatchers = (): WatchingResources => {
  addScenarioToWindow('getWatchers', getWatchers);

  return JSON.parse(
    localStorage.getItem(watchersLocalStorageKey) || '{}',
  );
};

export const setWatchers = (watchers: WatchingResources) => {
  localStorage.setItem(watchersLocalStorageKey, JSON.stringify(watchers));
};

export const getTestData = (): NormalizedResources => {
  addScenarioToWindow('getTestData', getTestData);

  return {
    Accounts: {
      test0: ['account1', '2', 'test\\domain.com', '4', '"process.exe" -a -g https://some.site/some-page'],
      test2: ['account2', '2', '4'],
      test3: ['account3', 'test2', '4'],
      test4: ['account4', '2', 'test2', '4'],
      field: ['2'],
    },
  } as NormalizedResources;
};

export const addNewTestResources = async () => {
  addScenarioToWindow('addNewTestResources', addNewTestResources);

  window.postMessage({
    type: MessageToApp.AppTakeNewResourceData,
    externalType: debugID,
    payload: {
      resources: getTestData(),
      cacheID: 'test-cache-id',
    } as ParsedDataPayload,
  });

  await sleep(1);
};

const addElementToWindow = (
  elementName: string,
  element?: HTMLElement | Element | ShadowRoot | null,
): HTMLElement => {
  addScenarioToWindow('addElementToWindow', addElementToWindow);

  const w = window as any;
  if (!w.scenariosElements) {
    w.scenariosElements = {};
  }
  w.scenariosElements[elementName] = element;
  return element as HTMLElement;
};

export const getExtensionRoot = (withException = true): HTMLElement | null => {
  addScenarioToWindow('getExtensionRoot', getExtensionRoot);

  const root = document.querySelector('div[style^="all:initial;"]')?.shadowRoot;
  if (!root && withException) {
    throw new Error(logErrorMessage('No root'));
  }
  return addElementToWindow('root', root);
};

export const getBulkResourcesPanel = (withException = true): HTMLElement | null => {
  addScenarioToWindow('getBulkResourcesPanel', getBulkResourcesPanel);

  const root = getExtensionRoot(withException)!;
  const bulkResourcePanel = root.querySelector('.bulk-resources-panel');
  if (!bulkResourcePanel && withException) {
    throw new Error(logErrorMessage('No bulk resource panel'));
  }
  return addElementToWindow('bulkResourcePanel', bulkResourcePanel);
};

export const getIncludeBulkResourceButton = (withException = true): HTMLElement | null => {
  addScenarioToWindow('getIncludeBulkResourceButton', getIncludeBulkResourceButton);

  const bulkPanel = getBulkResourcesPanel(withException)!;
  const includeBulkResourceButton = bulkPanel.querySelector('.plus-icon')?.closest('button');
  if (!includeBulkResourceButton && withException) {
    throw new Error(logErrorMessage('No include bulk resource button'));
  }
  return addElementToWindow('includeBulkResourceButton', includeBulkResourceButton);
};

export const getExcludeBulkResourceButton = (withException = true): HTMLElement | null => {
  addScenarioToWindow('getExcludeBulkResourceButton', getExcludeBulkResourceButton);

  const bulkPanel = getBulkResourcesPanel(withException)!;
  const excludeBulkResourceButton = bulkPanel.querySelector('.minus-icon')?.closest('button');
  if (!excludeBulkResourceButton && withException) {
    throw new Error(logErrorMessage('No exclude bulk resource button'));
  }
  return addElementToWindow('excludeBulkResourceButton', excludeBulkResourceButton);
};

export const getShowAllBulkResourceButton = (withException = true): HTMLElement | null => {
  addScenarioToWindow('getShowAllBulkResourceButton', getShowAllBulkResourceButton);

  const bulkPanel = getBulkResourcesPanel(withException)!;
  const showAllBulkResourceButton = bulkPanel.querySelector('.see-document-icon')?.closest('button');
  if (!showAllBulkResourceButton && withException) {
    throw new Error(logErrorMessage('No show all bulk resource button'));
  }
  return addElementToWindow('showAllBulkResourceButton', showAllBulkResourceButton);
};

export const getPlatformResources = (withException = true): HTMLElement | null => {
  addScenarioToWindow('getPlatformResources', getPlatformResources);

  const root = getExtensionRoot(withException)!;
  const platformResources = root.querySelector('.platform-resources');
  if (!platformResources && withException) {
    throw new Error(logErrorMessage('No platform resources'));
  }
  return addElementToWindow('platformResources', platformResources);
};

export const getResourceCollapsibleByHeaderText = (
  text: string,
  withException = true,
) => {
  addScenarioToWindow('getResourceCollapsibleByHeaderText', getResourceCollapsibleByHeaderText);

  const platformResources = getPlatformResources(withException)!;
  const resourcesCollapsible = Array.from(platformResources.querySelectorAll('.collapsible-header .resource-field-name .field-name') || [])
    .find((el: HTMLElement) => el.innerText === text)
    ?.closest('.collapsible');
  if (!resourcesCollapsible && withException) {
    throw new Error(logErrorMessage(`No collapsible resource queried by text >${text}<`));
  }
  return addElementToWindow('resourcesCollapsible', resourcesCollapsible);
};

export const getResourceCollapsibleHeader = (
  collapsible: HTMLElement,
  withException = true,
) => {
  addScenarioToWindow('getResourceCollapsibleHeader', getResourceCollapsibleHeader);

  const resourceCollapsibleHeader = collapsible.querySelector('.collapsible-header');
  if (!resourceCollapsibleHeader && withException) {
    throw new Error(logErrorMessage('No collapsible resource header'));
  }
  return addElementToWindow('resourceCollapsibleHeader', resourceCollapsibleHeader);
};

export const getResourceCollapsibleRemoveButton = (
  collapsible: HTMLElement,
  withException = true,
) => {
  addScenarioToWindow('getResourceCollapsibleRemoveButton', getResourceCollapsibleRemoveButton);

  const resourceCollapsibleRemoveButton = collapsible.querySelector('.waste-basket-icon');
  if (!resourceCollapsibleRemoveButton && withException) {
    throw new Error(logErrorMessage('No resource collapsible remove button'));
  }
  return addElementToWindow('resourceCollapsibleRemoveButton', resourceCollapsibleRemoveButton);
};

export const getResourceListItem = (
  collapsible: HTMLElement,
  withException = true,
) => {
  addScenarioToWindow('getResourceListItem', getResourceListItem);

  const resourceListItem = collapsible.querySelector('.resource-list-item');
  if (!resourceListItem && withException) {
    throw new Error(logErrorMessage('No resource list item'));
  }
  return addElementToWindow('resourceListItem', resourceListItem);
};

export const getIncludeButton = (
  resourceListItem: HTMLElement,
  withException = true,
): HTMLElement | null => {
  addScenarioToWindow('getIncludeButton', getIncludeButton);

  const includeButton = resourceListItem.querySelector('.plus-icon');
  if (!includeButton && withException) {
    throw new Error(logErrorMessage(`No include button in ${resourceListItem.outerHTML}`));
  }
  return addElementToWindow('includeButton', includeButton);
};

export const getExcludeButton = (
  resourceListItem: HTMLElement,
  withException = true,
): HTMLElement | null => {
  addScenarioToWindow('getExcludeButton', getExcludeButton);

  const excludeButton = resourceListItem.querySelector('.minus-icon');
  if (!excludeButton && withException) {
    throw new Error(logErrorMessage(`No exclude button in ${resourceListItem.outerHTML}`));
  }
  return addElementToWindow('excludeButton', excludeButton);
};

export const getShowAllButton = (
  resourceListItem: HTMLElement,
  withException = true,
): HTMLElement | null => {
  addScenarioToWindow('getShowAllButton', getShowAllButton);

  const showAllButton = resourceListItem.querySelector('.see-document-icon');
  if (!showAllButton && withException) {
    throw new Error(logErrorMessage(`No show all button in ${resourceListItem.outerHTML}`));
  }
  return addElementToWindow('showAllButton', showAllButton);
};

export const getAddNewResourceTabButton = (
  withException = true,
) => {
  addScenarioToWindow('getAddNewResourceTabButton', getAddNewResourceTabButton);

  const root = getExtensionRoot(withException)!;
  const addNewResourceTabButton = root.querySelector('.add-new-tab-button');
  if (!addNewResourceTabButton && withException) {
    throw new Error(logErrorMessage('No add new tab button'));
  }
  return addElementToWindow('addNewResourceTabButton', addNewResourceTabButton);
};

export const getResourcesTabsPanel = (
  withException = true,
) => {
  addScenarioToWindow('getResourcesTabsPanel', getResourcesTabsPanel);

  const root = getExtensionRoot(withException)!;
  const resourcesTabsPanel = root.querySelector('.tabs-platform-resources');
  if (!resourcesTabsPanel && withException) {
    throw new Error(logErrorMessage('No resources tabs panel'));
  }
  return addElementToWindow('resourcesTabsPanel', resourcesTabsPanel);
};

export const getActiveResourcesTab = (
  withException = true,
) => {
  addScenarioToWindow('getActiveResourcesTab', getActiveResourcesTab);

  const resourcesTabsPanel = getResourcesTabsPanel(withException);
  const activeResourcesTab = resourcesTabsPanel.querySelector('.tab.active')!;
  if (!activeResourcesTab && withException) {
    throw new Error(logErrorMessage('No active resources tab'));
  }
  return addElementToWindow('activeResourcesTab', activeResourcesTab);
};

export const getInputInActiveResourceTab = (
  withException = true,
) => {
  addScenarioToWindow('getInputInActiveResourceTab', getInputInActiveResourceTab);

  const activeResourcesTab = getActiveResourcesTab(withException);
  const inputActiveResourcesTab = activeResourcesTab.querySelector('input');
  if (!inputActiveResourcesTab && withException) {
    throw new Error(logErrorMessage('No input active resources tab'));
  }
  return addElementToWindow('inputActiveResourcesTab', inputActiveResourcesTab) as HTMLInputElement;
};

export const getApplyButtonInActiveResourceTab = (
  withException = true,
) => {
  addScenarioToWindow('getApplyButtonInActiveResourceTab', getApplyButtonInActiveResourceTab);

  const activeResourcesTab = getActiveResourcesTab(withException);
  const applyButtonInActiveResourceTab = activeResourcesTab.querySelector('.check-icon');
  if (!applyButtonInActiveResourceTab && withException) {
    throw new Error(logErrorMessage('No apply button in active resource tab'));
  }
  return addElementToWindow('applyButtonInActiveResourceTab', applyButtonInActiveResourceTab);
};

export const getAddNewFieldButton = (
  withException = true,
) => {
  addScenarioToWindow('getAddNewFieldButton', getAddNewFieldButton);

  const root = getExtensionRoot(withException);
  const addNewFieldButton = root?.querySelector('.add-new-field');
  if (!addNewFieldButton && withException) {
    throw new Error(logErrorMessage('No add new field button'));
  }
  return addElementToWindow('addNewFieldButton', addNewFieldButton);
};

export const addNewFieldInput = (
  withException = true,
) => {
  addScenarioToWindow('addNewFieldInput', addNewFieldInput);

  const root = getExtensionRoot(withException);
  const newFieldInput = root?.querySelector('.add-field-input-wrapper input');
  if (!newFieldInput && withException) {
    throw new Error(logErrorMessage('No add new field input'));
  }
  return addElementToWindow('newFieldInput', newFieldInput) as HTMLInputElement;
};

export const getApplyAddNewFieldButton = (
  withException = true,
) => {
  addScenarioToWindow('getApplyAddNewFieldButton', getApplyAddNewFieldButton);

  const root = getExtensionRoot(withException);
  const applyAddNewFieldButton = root?.querySelector('.add-field-input-wrapper .check-icon');
  if (!applyAddNewFieldButton && withException) {
    throw new Error(logErrorMessage('No apply add new field button'));
  }
  return addElementToWindow('addNewFieldButton', applyAddNewFieldButton);
};

export const getDeleteResourceTabButton = (
  withException = true,
) => {
  addScenarioToWindow('getDeleteResourceTabButton', getDeleteResourceTabButton);

  const tabsPanel = getResourcesTabsPanel(withException);
  const deleteResourceTabButton = tabsPanel?.querySelector('.waste-basket-icon');
  if (!deleteResourceTabButton && withException) {
    throw new Error(logErrorMessage('No delete resource tab button'));
  }
  return addElementToWindow('deleteResourceTabButton', deleteResourceTabButton);
};

export const getResourcesTabByTitle = (
  title: string,
  withException = true,
) => {
  addScenarioToWindow('getResourcesTabByTitle', getResourcesTabByTitle);

  const root = getExtensionRoot(withException);
  const resourceTab = Array.from(
    root?.querySelectorAll('.virtual-input') || [],
  )
    .find((el: HTMLElement) => el.innerText === title)
    ?.closest('.tab');
  if (!resourceTab && withException) {
    throw new Error(logErrorMessage(`No resource tab queried by title: >${title}<`));
  }
  return addElementToWindow('resourceTab', resourceTab);
};
