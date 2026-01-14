import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@giro-ds/react';
import { SwitchProps } from '@giro-ds/react';
type Story = StoryObj<typeof Switch>;

const meta: Meta<SwitchProps> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'Componente Switch usando Radix UI com estilização customizada e melhor organização de código.',
      },
    },
    layout: 'centered',
  },

  argTypes: {
    disabled: {
      description: 'Campo desabilitado',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

// Template base
const Template = (args: React.ComponentProps<typeof Switch>) => (
  <Switch {...args}>
  </Switch>
);

// Stories
export const Default: Story = {
  render: (args) => (
    <Switch {...args}>
      
    </Switch>
  ),
};
