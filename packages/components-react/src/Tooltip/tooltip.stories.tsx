import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import Avatar from '../Avatar/Avatar';
import { Person16Regular } from '@fluentui/react-icons';
import { Button } from '../../..';

type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'left', 'right'],
    },
    text: { 
      control: 'text',
      description: 'Texto a ser exibido no tooltip'
    },
    children: {
      control: false, // Desabilita controle para children
      description: 'Elemento que receberá o tooltip'
    },
  },
  tags: ['autodocs'],
};

export default meta;

// Template base
const Template = (args: React.ComponentProps<typeof Tooltip>) => (
  <Tooltip {...args}>
    <Avatar icon={<Person16Regular />} size="small" />
  </Tooltip>
);

// Stories
export const Default: Story = {
  args: {
    text: 'Texto aqui',
    position: 'top-right',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Avatar icon={<Person16Regular />} size="small" />
    </Tooltip>
  ),
};

export const WithButton: Story = {
  args: {
    text: 'Clique no botão para realizar uma ação',
    position: 'top-right',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>
        Hover me
      </Button>
    </Tooltip>
  ),
};