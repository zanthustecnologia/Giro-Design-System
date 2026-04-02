import { Add16Filled, Add16Regular } from '@fluentui/react-icons';
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Button } from '@giro-ds/react';
import type { ButtonProps } from '@giro-ds/react';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    controls: {
      sort: 'alpha',
    },
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'text'],
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'sm'],
    },
    icon: {
      control: { type: 'select' },
      options: ['', 'add'],
      mapping: {
        add: <Add16Regular />,
      },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'both'],
    },
    iconOnly: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    to: {
      control: { type: 'text' },
    },
    ariaLabel: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    tooltipText: {
      control: { type: 'text' },
    },
    
  },
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => (
  <Button {...args}>
    {args.children}
  </Button>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  type: 'button',
  variant: 'filled',
  size: 'lg',
};

export const Variants: StoryFn<ButtonProps> = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <Button variant="filled" size="lg">
      Filled Button
    </Button>
    <Button variant="outlined" size="lg">
      Outlined Button
    </Button>
    <Button variant="text" size="lg">
      Text Button
    </Button>
  </div>
);

export const Sizes: StoryFn<ButtonProps> = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <Button
      variant="filled"
      size="lg"
      icon={<Add16Filled />}
    >
      Large Button
    </Button>
    <Button
      variant="filled"
      size="sm"
      icon={<Add16Filled />}
    >
      Small Button
    </Button>
  </div>
);

const TemplateWithIcons: StoryFn<ButtonProps> = (args) => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <Button {...args} icon={<Add16Regular />} iconPosition="right">
      Button
    </Button>
    <Button {...args} icon={<Add16Regular />} iconPosition="left">
      Button
    </Button>
    <Button {...args} icon={<Add16Regular />} iconPosition="both">
      Button
    </Button>
  </div>
);

export const WithIcons = TemplateWithIcons.bind({});
WithIcons.args = {
  variant: 'filled',
  size: 'lg',
};
export const IconOnly: StoryFn<ButtonProps> = (args) => <Button {...args} />;

IconOnly.args = {
  variant: 'filled',
  size: 'lg',
  iconOnly: true,
  icon: <Add16Regular />,
  ariaLabel: 'Add item',
};
