import { ShoppingBagPercent24Regular } from '@fluentui/react-icons';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Callout from './Callout';

interface CalloutStoryArgs {
  type: 'neutral' | 'brand' | 'color' | 'alert' | 'success';
  text: string;
  title: string;
  icon: boolean;
  showText: boolean;
  showTitle: boolean;
}

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  parameters:{
    controls: {
      sort: 'alpha'
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['neutral', 'brand', 'color', 'alert', 'success'],
    },
    showText: {
      control: { type: 'boolean' },
    },
    showTitle: {
      control: { type: 'boolean' },
    },
    title: {
      control: { type: 'text' },
      if: {arg: 'showTitle', truthy: true}
    },
    text: {
      control: { type: 'text' },
      if: { arg: 'showText', truthy: true },
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
      icon={args.icon ? <ShoppingBagPercent24Regular /> : undefined}
    />
  ),
  args: {
    type: 'brand',
    text: 'Texto do callout',
    title: 'Título do callout',
    icon: false,
    showText: true,
    showTitle: false
  }
};
