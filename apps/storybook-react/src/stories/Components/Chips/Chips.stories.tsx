import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chips } from '@zanthus/react';
import { DismissCircle16Regular, Tag16Regular } from '@fluentui/react-icons';

interface StoryArgs {
  title: string;
  type: 'neutral' | 'brand' | 'color' | 'success' | 'alert';
  disabled: boolean;
  leftIcon: React.ReactNode | null;
  rightIcon: React.ReactNode | null;
}

const meta: Meta<typeof Chips> = {
  title: 'Components/Chips',
  component: Chips,
  parameters: {
    layout: 'centered'
  },
  
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    type: {
      control: { type: 'select' },
      options: ['neutral', 'brand', 'color', 'success', 'alert'], 
    },
    leftIcon: {
      control: { type: 'select' },
      options: ['none', 'Tag'],
      mapping: {
        none: null, 
        Tag: <Tag16Regular />  
      },
    },
    rightIcon: {
      control: { type: 'select' },
      options: ['none', 'DismissCircle'],
      mapping: {
        none: null,
        DismissCircle: <DismissCircle16Regular />
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  args: {
    title: 'Chips',
    type: 'neutral',
    disabled: false,
  },
};