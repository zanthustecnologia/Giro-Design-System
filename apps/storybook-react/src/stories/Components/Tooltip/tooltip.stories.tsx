import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Avatar, Button } from '@giro-ds/react';
import { Person16Regular } from '@fluentui/react-icons';
type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    side: {
      control: 'select',
      options: ['top','bottom', 'left', 'right'],
      description: 'Posição do tooltip'
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Posição do tooltip'
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
const Template = (args: React.ComponentProps<typeof Tooltip>) => (
  <Tooltip {...args}>
    <Avatar icon={<Person16Regular />} size="sm" />
  </Tooltip>
);

// Stories
export const Default: Story = {
  args: {
    text: 'Texto aqui',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Avatar icon={<Person16Regular />} size="sm" />
    </Tooltip>
  ),
};

export const WithButton: Story = {
  args: {
    text: 'Clique no botão para realizar uma ação',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};
