import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TooltipRadix, Avatar, Button } from '@giro-ds/react';
import { Person16Regular } from '@fluentui/react-icons';
type Story = StoryObj<typeof TooltipRadix>;

const meta: Meta<typeof TooltipRadix> = {
  title: 'Components/TooltipRadix',
  component: TooltipRadix,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
        'left',
        'right',
      ],
    },
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
const Template = (args: React.ComponentProps<typeof TooltipRadix>) => (
  <TooltipRadix {...args}>
    <Avatar icon={<Person16Regular />} size="small" />
  </TooltipRadix>
);

// Stories
export const Default: Story = {
  args: {
    text: 'Texto aqui',
    position: 'top-right',
  },
  render: (args) => (
    <TooltipRadix {...args}>
      <Avatar icon={<Person16Regular />} size="small" />
    </TooltipRadix>
  ),
};

export const WithButton: Story = {
  args: {
    text: 'Clique no botão para realizar uma ação',
    position: 'top-right',
  },
  render: (args) => (
    <TooltipRadix {...args}>
      <Button>Hover me</Button>
    </TooltipRadix>
  ),
};
