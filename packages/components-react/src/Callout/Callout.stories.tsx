import { ShoppingBagPercent24Regular } from '@fluentui/react-icons';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Callout from './Callout';

interface CalloutStoryArgs {
  type: 'neutral' | 'brand' | 'color' | 'alert' | 'success';
  text: string;
  title: boolean;
  icon: boolean;
}

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['neutral', 'brand', 'color', 'alert', 'success'],
    },
    title: {
      control: { type: 'boolean' }, 
    },
    text: {
      control: { type: 'text' }, 
    },
    icon: {
      control: { type: 'boolean' }, 
    }
  },
};

export default meta;
type Story = StoryObj<CalloutStoryArgs>;

export const Default: Story = {
  render: (args) => (
    <Callout 
      {...args} 
      title={args.title ? 'Título do callout' : undefined} 
      icon={args.icon ? <ShoppingBagPercent24Regular /> : undefined} 
    />
  ),
  args: {
    type: 'brand',
    text: 'Texto do callout',
    title: false,
    icon: false
  }
};
