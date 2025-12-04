import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Search } from '@giro-ds/react';

type Story = StoryObj<typeof Search>;

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    controls: {
      sort: 'alpha',
    },
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Dica do que deve ser buscado',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    value: {
      control: { type: 'text' },
      defaultValue: '',
    },
    id: {
      control: { type: 'text' },
      defaultValue: '',
    },
    onChange: { action: 'changed' },
    onKeyDown: { action: 'keyDown' },
  },
};

export default meta;

const Template = (args: any) => {
  const [value, setValue] = useState<string>(args.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    args.onChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Search for:', e);
    }
    args.onKeyDown(e);
  };

  return <Search {...args} value={value} onChange={handleChange} onKeyDown={handleKeyDown} />;
};

export const Default: Story = {
  render: Template,
  args: {
    placeholder: 'Dica do que deve ser buscado',
    disabled: false,
    value: '',
    id: 'sample-element-id',
  },
  parameters: {
    docs: {
      source: {
        code: `
const [value, setValue] = useState('');
const handleChange = (e) => setValue(e.target.value);
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    console.log('Search for:', e.target.value);
  }
};

<Search
  placeholder="Dica do que deve ser buscado"
  value={value}
  onChange={handleChange}
  onKeyDown={handleKeyDown}
  disabled={false}
/>
        `.trim(),
      },
    },
  },
};