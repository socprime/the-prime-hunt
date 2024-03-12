import { fireEvent, screen } from '@testing-library/react';
import { sleep } from '../../../../common/helpers';

export const openCollapsible = async (
  collapsibleEl: HTMLElement,
) => {
  if (Array.from(collapsibleEl.classList).includes('closed')) {
    fireEvent.click(collapsibleEl.querySelector('.collapsible-header')!);
  }
  await sleep(0.1);

  expect(Array.from(collapsibleEl.classList).includes('open')).toBe(true);
};

export const selectAllCollapsibleResources = async (
  collapsibleEl: HTMLElement,
) => {
  const checkbox = collapsibleEl.querySelector('.collapsible-header .checkbox .checker-wrapper')!;
  expect(checkbox).toBeInTheDocument();

  if (checkbox.classList.contains('not-checked')) {
    fireEvent.click(checkbox);
  }

  expect(checkbox.classList.contains('not-checked')).toEqual(false);
  expect(checkbox.classList.contains('checked')).toEqual(true);
};

export const getCollapsibleByHeaderText = (
  text: string,
) => {
  const fieldNameEl = screen.getByText(text);
  expect(fieldNameEl).toBeInTheDocument();

  const collapsibleEl = fieldNameEl.closest('.collapsible') as HTMLElement;
  expect(collapsibleEl).toBeInTheDocument();

  return collapsibleEl;
};

export const getResourceItem = (
  collapsibleEl: HTMLElement,
) => {
  const resourceItemEl = collapsibleEl.querySelector('.resource-list-item')!;
  expect(resourceItemEl).toBeInTheDocument();

  return resourceItemEl;
};

export const getIncludeButton = async (
  collapsibleEl: HTMLElement,
) => {
  await openCollapsible(collapsibleEl);
  const resourceItemEl = getResourceItem(collapsibleEl);
  fireEvent.mouseEnter(resourceItemEl);

  const actionMenuEl = collapsibleEl.querySelector('.collapsible-content .action-menu')!;
  expect(actionMenuEl).toBeInTheDocument();

  const plusIcon = actionMenuEl.querySelector('.plus-icon')!;
  expect(plusIcon).toBeInTheDocument();

  return plusIcon;
};

export const getExcludeButton = async (
  collapsibleEl: HTMLElement,
) => {
  await openCollapsible(collapsibleEl);
  const resourceItemEl = getResourceItem(collapsibleEl);
  fireEvent.mouseEnter(resourceItemEl);

  const actionMenuEl = collapsibleEl.querySelector('.collapsible-content .action-menu')!;
  expect(actionMenuEl).toBeInTheDocument();

  const minusIcon = actionMenuEl.querySelector('.minus-icon')!;
  expect(minusIcon).toBeInTheDocument();

  return minusIcon;
};

export const getShowAllButton = async (
  collapsibleEl: HTMLElement,
) => {
  await openCollapsible(collapsibleEl);
  const resourceItemEl = getResourceItem(collapsibleEl);
  fireEvent.mouseEnter(resourceItemEl);

  const actionMenuEl = collapsibleEl.querySelector('.collapsible-content .action-menu')!;
  expect(actionMenuEl).toBeInTheDocument();

  const seeAllEventsIcon = actionMenuEl.querySelector('.see-document-icon')!;
  expect(seeAllEventsIcon).toBeInTheDocument();

  return seeAllEventsIcon;
};

export const getCopyButton = async (
  collapsibleEl: HTMLElement,
) => {
  await openCollapsible(collapsibleEl);
  const resourceItemEl = getResourceItem(collapsibleEl);
  fireEvent.mouseEnter(resourceItemEl);

  const actionMenuEl = collapsibleEl.querySelector('.collapsible-content .action-menu')!;
  expect(actionMenuEl).toBeInTheDocument();

  const animatedCopyIcon = actionMenuEl.querySelector('.animated-copy-icon')!;
  expect(animatedCopyIcon).toBeInTheDocument();

  return animatedCopyIcon;
};

export const getCountSelectedEl = async (
  container: HTMLElement,
) => {
  const countSelectedEl = container.querySelector('.count-selected') as HTMLElement;
  expect(countSelectedEl).toBeInTheDocument();

  return countSelectedEl as HTMLElement;
};

export const getBulkResourcePanel = async (
  container: HTMLElement,
) => {
  const bulkResourcePanel = container.querySelector('.bulk-resources-panel');
  expect(bulkResourcePanel).toBeInTheDocument();

  return bulkResourcePanel as HTMLElement;
};

export const getBulkIncludeButton = async (
  container: HTMLElement,
) => {
  const bulkPanel = await getBulkResourcePanel(container);
  const bulkIncludeButton = bulkPanel.querySelector('.plus-icon')?.closest('button');
  expect(bulkIncludeButton).toBeInTheDocument();

  return bulkIncludeButton as HTMLElement;
};

export const getBulkExcludeButton = async (
  container: HTMLElement,
) => {
  const bulkPanel = await getBulkResourcePanel(container);
  const bulkExcludeButton = bulkPanel.querySelector('.minus-icon')?.closest('button');
  expect(bulkExcludeButton).toBeInTheDocument();

  return bulkExcludeButton as HTMLElement;
};

export const getBulkShowAllButton = async (
  container: HTMLElement,
) => {
  const bulkPanel = await getBulkResourcePanel(container);
  const bulkShowAllButton = bulkPanel.querySelector('.see-document-icon')?.closest('button');
  expect(bulkShowAllButton).toBeInTheDocument();

  return bulkShowAllButton as HTMLElement;
};

export const getBulkCopyButton = async (
  container: HTMLElement,
) => {
  const bulkPanel = await getBulkResourcePanel(container);
  const bulkCopyButton = bulkPanel.querySelector('.animated-copy-icon');
  expect(bulkCopyButton).toBeInTheDocument();

  return bulkCopyButton as HTMLElement;
};
