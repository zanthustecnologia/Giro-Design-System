import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Radio } from '@giro/react';
import type { RadioProps } from '@giro/react';

// Definindo tipos para as props do Radio (caso não existam)


const meta: Meta<RadioProps> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    onChange: {
      action: 'changed',
    },
    disabled: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
    name: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<RadioProps>;

export const Default: Story = {
  args: {
    value: 'teste',
    name: 'default-radiobutton',
    label: 'Default',
    disabled: false,
    checked: false,
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string>(args.value || '');

    const handleChange = (value: string): void => {
      setSelectedValue(value);
    };

    return (
      <div>
        <Radio
          {...args}
          value="default"
          checked={selectedValue === 'default'}
          onChange={() => handleChange('default')}
        />
      </div>
    );
  },
};

export const PreSelected: Story = {
  args: {
    value: 'option1',
    className: 'radio-group-class',
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string>('option1');
    
    const handleChange = (value: string): void => {
      setSelectedValue(value);
    };

    return (
      <div>
        <Radio
          {...args}
          name="radio-group"
          label="Option 1"
          value="option1"
          checked={selectedValue === 'option1'}
          onChange={() => handleChange('option1')}
        />
        <Radio
          {...args}
          name="radio-group"
          label="Option 2"
          value="option2"
          checked={selectedValue === 'option2'}
          onChange={() => handleChange('option2')}
        />
        <Radio
          {...args}
          name="radio-group"
          label="Option 3"
          value="option3"
          checked={selectedValue === 'option3'}
          onChange={() => handleChange('option3')}
        />
        <Radio
          {...args}
          name="radio-group"
          label="Option 4"
          value="option4"
          checked={selectedValue === 'option4'}
          onChange={() => handleChange('option4')}
        />
      </div>
    );
  },
};