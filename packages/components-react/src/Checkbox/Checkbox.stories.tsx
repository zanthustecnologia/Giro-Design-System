import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import './Checkbox.scss';

interface MockCheck {
  title: string;
}

const mockChecks: MockCheck[] = [
  { title: 'Child 1' },
  { title: 'Child 2' },
  { title: 'Child 3' },
  { title: 'Child 4' },
];

interface StoryArgs {
  id?: string;
  name?: string;
  displayLabel: boolean;
  label: string;
  className?: string;
  disabled: boolean;
  indeterminate: boolean;
  checked: boolean;
}

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters:{
    layout: 'centered'
  },
  argTypes: {
    id: {
      control: { type: 'text' },
    },
    name: {
      control: { type: 'text' },
    },
    onChange: {
      action: 'changed',
    },
    displayLabel: {
      control: 'boolean',
    },
    label: {
      control: { type: 'text' },
      if: { arg: 'displayLabel', truthy: true },
    },
    className: {
      control: { type: 'text' },
      table: {
        disable: true,
      },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    indeterminate: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  render: (args) => {
    const { displayLabel, label, checked, indeterminate } = args;
    const [internalIndeterminate, setInternalIndeterminate] = useState<boolean>(indeterminate);
    const [internalChecked, setInternalChecked] = useState<boolean>(checked);

    const handleChange = (): void => {
      if (internalIndeterminate) {
        setInternalIndeterminate(false);
        setInternalChecked(true); 
      } else {
        setInternalChecked(!internalChecked);
      }
    };

    useEffect(() => {
      setInternalIndeterminate(indeterminate);
    }, [indeterminate]);

    useEffect(() => {
      setInternalChecked(checked);
    }, [checked]);

    return (
      <Checkbox
        {...args}
        label={displayLabel ? (label ?? '') : ''}
        checked={internalChecked}
        indeterminate={internalIndeterminate}
        onChange={handleChange}
      />
    );
  },
  args: {
    label: 'Checkbox',
    disabled: false,
    indeterminate: false,
    displayLabel: true,
    checked: false
  }
};

export const CheckboxOnly: Story = {
  render: (args) => {
    const { displayLabel, label, checked } = args;
    return (
      <Checkbox
        label={displayLabel ? label : ''}
        checked={checked}
      />
    );
  },
  args: {
    name: 'checked-checkbox',
    label: 'Checkbox',
    disabled: false,
    indeterminate: false,
    displayLabel: false,
    checked: false
  }
};

export const CheckboxWithText: Story = {
  render: (args) => {
    const { displayLabel, label, checked } = args;
    return (
      <Checkbox
        label={displayLabel ? label : ''}
        checked={checked}
      />
    );
  },
  args: {
    label: 'Checkbox',
    disabled: false,
    indeterminate: false,
    displayLabel: true,
    checked: false
  }
};

export const Indeterminate: Story = {
  render: (args) => {
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [indeterminate, setIndeterminate] = useState<boolean>(false);
    const [selected, setSelected] = useState<number[]>([]);

    const toggleSelectAll = (): void => {
      const newSelectAll = !selectAll;
      setSelectAll(newSelectAll);

      if (!newSelectAll) {
        setSelected([]);
        return;
      }

      setSelected(mockChecks.map((_, index) => index));
    };

    useEffect(() => {
      if (selected.length > 0 && selected.length < mockChecks.length) {
        setIndeterminate(true);
      } else if (selected.length === mockChecks.length) {
        setIndeterminate(false);
        setSelectAll(true);
      } else {
        setIndeterminate(false);
        setSelectAll(false);
      }
    }, [selected]);

    const toggleCheckbox = (index: number): void => {
      setSelected((prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index)
          : [...prevSelected, index]
      );
    };

    return (
      <div className="container-storybook-checkbox">
        <div className="container-storybook-left">
          <Checkbox
            label="Parent (Select All)"
            indeterminate={indeterminate}
            checked={selectAll}
            onChange={toggleSelectAll}
          />
        </div>
        {mockChecks.map(({ title }, index) => (
          <div key={index} className="container-storybook-center">
            <Checkbox
              {...args}
              checked={selected.includes(index)}
              label={title}
              onChange={() => toggleCheckbox(index)}
            />
          </div>
        ))}
      </div>
    );
  },
  args: {
    disabled: false
  }
};