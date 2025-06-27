import { Add16Filled, Add16Regular } from '@fluentui/react-icons';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryFn } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import { Icon } from '../../../icons/src/Icon';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    controls: {
      sort: 'alpha',
    },
  },
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'link'],
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'text'],
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'sm'],
    },
    displayIcon: {
      control: { type: 'boolean' },
    },
    icon: {
      control: { type: 'select' },
      options: ['none', 'add', 'delete', 'edit', 'arrowDown'],
      mapping: {
        add: <Icon name="add" size={16} />,
        delete: <Icon name="delete" size={16} />,
        edit: <Icon name="edit" size={16} />,
        arrowDown: <Icon name="arrowDown" size={12} />,
      },
      if: { arg: 'displayIcon', truthy: true },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      if: { arg: 'displayIcon', truthy: true },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    disabled: {
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
  },
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps & { displayIcon?: boolean; icon?: React.ReactNode }> = ({
  icon,
  ...args
}) => {
  const { displayIcon } = args;

  return (
    <BrowserRouter>
      <div className="storybook-container">
        <Button {...args} icon={displayIcon === false || icon === 'none' ? undefined : icon} />
      </div>
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  type: 'button',
  variant: 'filled',
  size: 'lg',
};

export const Variants: StoryFn<ButtonProps> = (args) => (
  <div className="storybook-container">
    <Button type="button" variant="filled" size="lg" onClick={() => alert('clicked')}>
      Filled Button
    </Button>
    <Button type="button" variant="outlined" size="lg" onClick={() => alert('clicked')}>
      Outlined Button
    </Button>
    <Button type="button" variant="text" size="lg" onClick={() => alert('clicked')}>
      Text Button
    </Button>
  </div>
);

export const Sizes: StoryFn<ButtonProps> = () => (
  <div className="storybook-container">
    <Button type="button" variant="filled" size="lg" icon={<Add16Filled />} onClick={() => alert('clicked')}>
      Large Button
    </Button>
    <Button type="button" variant="filled" size="sm" icon={<Add16Filled />} onClick={() => alert('clicked')}>
      Small Button
    </Button>
  </div>
);

const TemplateWithIcons: StoryFn<ButtonProps> = (args) => (
  <div className="storybook-container">
    <BrowserRouter>
      <Button {...args} icon={<Add16Regular />} iconPosition="right">
        Button
      </Button>
      <Button {...args} icon={<Add16Regular />} iconPosition="left">
        Button
      </Button>
    </BrowserRouter>
  </div>
);

export const WithIcons = TemplateWithIcons.bind({});
WithIcons.args = {
  type: 'button',
  variant: 'filled',
  size: 'lg',
};