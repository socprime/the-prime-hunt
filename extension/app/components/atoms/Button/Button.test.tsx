import '@testing-library/jest-dom';
import { Button } from './Button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button tests', () => {
  test('render and click tests', () => {
    const onClick = jest.fn();

    render(
      <Button
        onClick={onClick}
      >
        test-button
      </Button>,
    );

    const button = screen.getByText('test-button').closest('button')!;
    expect(button).toBeInTheDocument();
    expect(button.classList.contains('button')).toEqual(true);

    fireEvent.click(button);

    expect(onClick.mock.calls.length).toEqual(1);
    expect(Array.from(button.classList).includes('disabled')).not.toEqual(true);
  });

  test('disabled click test', () => {
    const onClick = jest.fn();

    render(
      <Button
        onClick={onClick}
        disabled
      >
        test-button-disabled
      </Button>,
    );

    const button = screen.getByText('test-button-disabled').closest('button')!;
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(onClick.mock.calls.length).toEqual(0);
    expect(Array.from(button.classList).includes('disabled')).toEqual(true);
  });
});