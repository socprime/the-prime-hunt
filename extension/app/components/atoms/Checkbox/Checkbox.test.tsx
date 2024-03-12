import '@testing-library/jest-dom';
import { Checkbox } from './Checkbox';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Checkbox tests', () => {
  const getCheckbox = (text: string) => {
    const checkbox = screen.getByText(text).closest('div.checkbox')!;
    expect(checkbox).toBeInTheDocument();

    return checkbox as HTMLElement;
  };

  const getCheckboxWrapper = (checkbox: HTMLElement) => {
    const checkboxWrapper = checkbox.querySelector('.checker-wrapper')!;

    expect(checkboxWrapper).toBeInTheDocument();

    return checkboxWrapper as HTMLElement;
  };

  test('render test', () => {
    render(
      <Checkbox
        checkIcon={['checkIcon']}
        uncheckIcon={['uncheckIcon']}
        content="test-checkbox"
      />,
    );

    getCheckbox('test-checkbox');
  });

  test('click test', () => {
    const onClick = jest.fn();
    const onStateChanged = jest.fn();

    render(
      <Checkbox
        checkIcon={['checkIcon']}
        uncheckIcon={['uncheckIcon']}
        onClick={onClick}
        onStateChanged={onStateChanged}
        content="test-checkbox"
      />,
    );

    const checkbox = getCheckbox('test-checkbox');

    expect(screen.getByText('uncheckIcon')).toBeInTheDocument();
    expect(screen.queryByText('checkIcon')).not.toBeInTheDocument();

    const checkerWrapper = getCheckboxWrapper(checkbox);

    fireEvent.click(checkerWrapper);

    expect(onClick.mock.calls.length).toEqual(1);
    expect(onStateChanged.mock.calls.length).toEqual(1);
    expect(onStateChanged.mock.calls[0][0]).toEqual(true);

    expect(screen.queryByText('uncheckIcon')).not.toBeInTheDocument();
    expect(screen.getByText('checkIcon')).toBeInTheDocument();

    fireEvent.click(checkerWrapper);

    expect(onClick.mock.calls.length).toEqual(2);
    expect(onStateChanged.mock.calls.length).toEqual(2);
    expect(onStateChanged.mock.calls[1][0]).toEqual(false);

    expect(screen.getByText('uncheckIcon')).toBeInTheDocument();
    expect(screen.queryByText('checkIcon')).not.toBeInTheDocument();
  });

  test('property "checked" test', () => {
    render(
      <Checkbox
        checkIcon={['checkIcon']}
        uncheckIcon={['uncheckIcon']}
        content="test-checkbox"
        checked
      />,
    );

    const checkbox = getCheckbox('test-checkbox');

    expect(screen.queryByText('uncheckIcon')).not.toBeInTheDocument();
    expect(screen.getByText('checkIcon')).toBeInTheDocument();

    const checkerWrapper = getCheckboxWrapper(checkbox);

    fireEvent.click(checkerWrapper);

    expect(screen.getByText('uncheckIcon')).toBeInTheDocument();
    expect(screen.queryByText('checkIcon')).not.toBeInTheDocument();
  });
});
