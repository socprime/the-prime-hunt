import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ControlInput } from './ControlInput';

describe('ControlInput tests', () => {
  test('render test', () => {
    const { container } = render(
      <ControlInput
        controls="controls"
      />,
    );

    const inputs = container.querySelectorAll('input.control-input');
    expect(Array.from(inputs).length).toEqual(1);
  });

  test('edit mode test', () => {
    render(
      <ControlInput
        controls="controls"
      />,
    );

    expect(screen.queryByText('controls')).not.toBeInTheDocument();

    render(
      <ControlInput
        controls="controls"
        edit
      />,
    );

    expect(screen.queryByText('controls')).toBeInTheDocument();
  });
});
