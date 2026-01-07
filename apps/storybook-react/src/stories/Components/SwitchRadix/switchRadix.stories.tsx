import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SwitchRadix } from '@giro-ds/react';
type Story = StoryObj<typeof SwitchRadix>;

const meta: Meta<typeof SwitchRadix> = {
  title: 'Components/SwitchRadix',
  component: SwitchRadix,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    text: {
      control: 'text',
      description: 'Texto a ser exibido no tooltip',
    },
    children: {
      control: false,
      description: 'Elemento que receberá o tooltip',
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
  args: {
    text: 'Texto aqui',
  },
  render: (args) => (
    <SwitchRadix {...args}>
      
    </SwitchRadix>
  ),
};
