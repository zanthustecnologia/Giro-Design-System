import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SwitchRadix } from '@giro-ds/react';
import { SwitchRadixProps } from '@giro-ds/react';
type Story = StoryObj<typeof SwitchRadix>;

const meta: Meta<SwitchRadixProps> = {
  title: 'Components/SwitchRadix',
  component: SwitchRadix,
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
const Template = (args: React.ComponentProps<typeof SwitchRadix>) => (
  <SwitchRadix {...args}>
  </SwitchRadix>
);

// Stories
export const Default: Story = {
  render: (args) => (
    <SwitchRadix {...args}>
      
    </SwitchRadix>
  ),
};
