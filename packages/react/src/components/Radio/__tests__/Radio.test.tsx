import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('radix-ui', () => {
  const React = require('react');
  const ctx = React.createContext({ value: undefined, onChange: () => {} });

  const Root = ({ children, defaultValue, onValueChange, ...rest }: any) => {
    const [value, setValue] = React.useState(defaultValue);
    const handleChange = (v: any) => {
      setValue(v);
      onValueChange?.(v);
    };
    return React.createElement(ctx.Provider, { value: { value, onChange: handleChange } }, children);
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

  it('renders all items', () => {
    render(<Radio items={items} />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('calls onValueChange when an item is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio items={items} onValueChange={onChange} />);
    const labelC = screen.getByText('Option C').closest('label');
    await user.click(labelC!);
    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('respects defaultValue', () => {
    render(<Radio items={items} defaultValue="a" />);
    const labelA = screen.getByText('Option A').closest('label')!;
    const checked = labelA.querySelector('[aria-checked="true"]');
    expect(checked).not.toBeNull();
  });

  it('does not call onValueChange for disabled items and has data-disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio items={items} onValueChange={onChange} />);
    const labelB = screen.getByText('Option B').closest('label')!;
    const itemB = labelB.querySelector('[data-disabled]');
    expect(itemB).toHaveAttribute('data-disabled', 'true');
    await user.click(labelB);
    expect(onChange).not.toHaveBeenCalled();
  });
});
