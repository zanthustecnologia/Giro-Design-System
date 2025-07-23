import Radio from './Radio';
import React from 'react';
import { useState } from 'react';
export default {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    selected: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    onClick: {
      action: 'clicked',
    },
    disabled: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
  },
};
export const Default = ({ ...args }) => {
  const [selectedValue, setSelectedValue] = useState(args.value || '');

  const handleChange = (value) => {
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
};
Default.args = {
  name: 'default-radiobutton',
  label: 'Default',
  disabled: false,
  checked: false
};

export const PreSelected = ({ ...args }) => {
  const [selectedValue, setSelectedValue] = useState('option1');
  const handleChange = (value) => {
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
};

PreSelected.args = {
  value: 'option1',
  className: 'radio-group-class',
};