import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('radix-ui', () => {
  const React = require('react');
  const Root = ({ children, onCheckedChange, checked, disabled, ...rest }: any) => (
    <button
      {...rest}
      disabled={disabled}
      onClick={() => {
        if (!disabled && typeof onCheckedChange === 'function') onCheckedChange(!checked);
      }}
    >
      {children}
    </button>
  );

  const Indicator = ({ children }: any) => <span>{children}</span>;

  return { Checkbox: { Root, Indicator } };
});

import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('aplica escala 1.0 por padrão', () => {
    const { container } = render(<Checkbox label="Scale" />);
    const wrapper = container.querySelector('[class*="checkbox-scale-1-0"]');
    expect(wrapper).toBeInTheDocument();
  });

  it('aplica escala 1.5 quando informado', () => {
    const { container } = render(<Checkbox label="Scale" scale={1.5} />);
    const wrapper = container.querySelector('[class*="checkbox-scale-1-5"]');
    expect(wrapper).toBeInTheDocument();
  });

  it('aplica escala 2.0 quando informado', () => {
    const { container } = render(<Checkbox label="Scale" scale={2} />);
    const wrapper = container.querySelector('[class*="checkbox-scale-2-0"]');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders the label and control', () => {
    render(<Checkbox label="My Checkbox" />);
    expect(screen.getByLabelText('My Checkbox')).toBeInTheDocument();
  });

  it('reflects checked prop via aria-checked', () => {
    const { rerender } = render(<Checkbox label="c" checked={false} />);
    expect(screen.getByLabelText('c')).toHaveAttribute('aria-checked', 'false');

    rerender(<Checkbox label="c" checked={true} />);
    expect(screen.getByLabelText('c')).toHaveAttribute('aria-checked', 'true');
  });

  it('reflects indeterminate state as mixed', () => {
    render(<Checkbox label="ind" indeterminate />);
    expect(screen.getByLabelText('ind')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('calls onCheckedChange when clicked', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="call" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByLabelText('call'));
    expect(onCheckedChange).toHaveBeenCalled();
  });

  it('does not call onCheckedChange when disabled', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="disabled" onCheckedChange={onCheckedChange} disabled />);
    fireEvent.click(screen.getByLabelText('disabled'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('uses provided id on control and label htmlFor', () => {
    render(<Checkbox label="idlabel" id="custom-id" />);
    const control = screen.getByLabelText('idlabel');
    expect(control.id).toBe('custom-id');

    const label = screen.getByText('idlabel');
    expect(label).toHaveAttribute('for', 'custom-id');
  });
});
