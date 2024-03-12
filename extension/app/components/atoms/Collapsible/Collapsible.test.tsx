import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Collapsible } from './Collapsible';
import { getMockedResizeObserver } from '../../../../tests/mocks';

describe('Collapsible tests', () => {
  const g = global as any;

  g.ResizeObserver = getMockedResizeObserver();

  test('should open/close collapsible on header clicking', () => {
    render(
      <Collapsible header="test-collapsible-header">
        <span>test-collapsible-content</span>
      </Collapsible>,
    );

    const headerTextEl = screen.getByText('test-collapsible-header');
    expect(headerTextEl).toBeInTheDocument();

    let contentTextEl = screen.queryByText('test-collapsible-content');
    expect(contentTextEl).not.toBeInTheDocument();

    const collapsibleHeaderEl = headerTextEl.closest('.collapsible-header') as HTMLElement;
    expect(collapsibleHeaderEl).toBeInTheDocument();

    expect(collapsibleHeaderEl.classList.contains('closed')).toEqual(true);
    expect(collapsibleHeaderEl.classList.contains('open')).toEqual(false);

    fireEvent(collapsibleHeaderEl, new MouseEvent('click', { bubbles: true }));
    expect(collapsibleHeaderEl.classList.contains('closed')).toEqual(false);
    expect(collapsibleHeaderEl.classList.contains('open')).toEqual(true);

    contentTextEl = screen.getByText('test-collapsible-content');
    expect(contentTextEl).toBeInTheDocument();

    fireEvent(collapsibleHeaderEl, new MouseEvent('click', { bubbles: true }));
    expect(collapsibleHeaderEl.classList.contains('closed')).toEqual(true);
    expect(collapsibleHeaderEl.classList.contains('open')).toEqual(false);
  });

  test('disabled test', () => {
    const onClick = jest.fn();

    render(
      <Collapsible onClick={onClick} header="test-collapsible-header" disabled>
        <span>test-collapsible-content</span>
      </Collapsible>,
    );

    const headerTextEl = screen.getByText('test-collapsible-header');
    expect(headerTextEl).toBeInTheDocument();

    const collapsibleHeaderEl = headerTextEl.closest('.collapsible-header') as HTMLElement;
    expect(collapsibleHeaderEl).toBeInTheDocument();

    expect(onClick.mock.calls.length).toEqual(0);

    fireEvent.click(collapsibleHeaderEl);

    expect(onClick.mock.calls.length).toEqual(0);
  });
});
