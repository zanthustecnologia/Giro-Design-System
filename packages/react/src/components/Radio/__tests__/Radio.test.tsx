import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('radix-ui', () => {
  const React = require('react');
  const ctx = React.createContext({ value: undefined, onChange: () => {} });

  const Root = ({ children, defaultValue, onValueChange, className, ...rest }: any) => {
    const [value, setValue] = React.useState(defaultValue);
    const handleChange = (v: any) => {
      setValue(v);
      onValueChange?.(v);
    };
    return React.createElement(
      ctx.Provider,
      { value: { value, onChange: handleChange } },
      React.createElement('div', { className, ...rest }, children)
    );
  };

  const Item = ({ children, value, disabled, ...rest }: any) => {
    const state = React.useContext(ctx);
    const checked = state.value === value;
    return React.createElement(
      'button',
      {
        role: 'radio',
        'aria-checked': checked ? 'true' : 'false',
        'data-disabled': disabled ? 'true' : undefined,
        onClick: () => {
          if (!disabled) state.onChange(value);
        },
        ...rest,
      },
      children,
    );
  };

  const Indicator = ({ children, ...rest }: any) => React.createElement('span', rest, children);

  return { RadioGroup: { Root, Item, Indicator } };
});
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from '../Radio';

describe('Radio', () => {
  beforeEach(() => {
    vi.spyOn(React, 'useId').mockReturnValue('test-id');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const items = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B', disabled: true },
    { value: 'c', label: 'Option C' },
  ];

  it('aplica escala 1.0 por padrão', () => {
    const { container } = render(<Radio items={items} />);
    const wrapper = container.querySelector('.scale-1-0');
    expect(wrapper).toBeInTheDocument();
  });

  it('aplica escala 1.5 quando informado', () => {
    const { container } = render(<Radio items={items} scale={1.5} />);
    const wrapper = container.querySelector('.scale-1-5');
    expect(wrapper).toBeInTheDocument();
  });

  it('aplica escala 2.0 quando informado', () => {
    const { container } = render(<Radio items={items} scale={2} />);
    const wrapper = container.querySelector('.scale-2-0');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders all items', () => {
    render(<Radio items={items} />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('calls onValueChange when an item is clicked', async () => {
    const onChange = vi.fn();
    render(<Radio id="radio-group" items={items} onValueChange={onChange} />);

    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[2]);

    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('respects defaultValue', () => {
    render(<Radio items={items} defaultValue="a" />);
    const labelA = screen.getByText('Option A').closest('label')!;
    const checked = labelA.querySelector('[aria-checked="true"]');
    expect(checked).not.toBeNull();
  });

  it('does not call onValueChange for disabled items and has data-disabled', async () => {
    const onChange = vi.fn();
    render(<Radio id="radio-group" items={items} onValueChange={onChange} />);

    const radios = screen.getAllByRole('radio');
    const itemB = radios[1];

    expect(itemB).toHaveAttribute('data-disabled', 'true');
    fireEvent.click(itemB);

    expect(onChange).not.toHaveBeenCalled();
  });
});
