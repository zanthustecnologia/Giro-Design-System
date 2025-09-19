import { Add16Filled, Add16Regular } from '@fluentui/react-icons';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryFn } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import { Icon } from '../../../icons/src';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    controls: {
      sort: 'alpha',
    },
    layout: 'centered'
  },
  tags: ['autodocs'],
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
    icon: {
      control: { type: 'select' },
      options: ['none', 'add', 'delete', 'edit', 'arrowDown'],
      mapping: {
        add: <Icon name='add' size={16} />,
        delete: <Icon name="delete" size={16} />,
        edit: <Icon name="edit" size={16} />,
        arrowDown: <Icon name="arrowDown" size={12} />,
      },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['none', 'left', 'right'],
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
  const {children, to, type, iconPosition, iconOnly } = args;

  return (
    <BrowserRouter>
      <div className="storybook-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px'
      }}>
        <Button {...args} iconOnly={iconOnly} icon={iconPosition === 'none' ? undefined : icon} href={to} as={type === 'link' ? 'a' : 'button'}>
          {children}
        </Button>
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
  <div className="storybook-container" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px'
  }}>
    <Button variant="filled" size="lg" onClick={() => alert('clicked')}>
      Filled Button
    </Button>
    <Button variant="outlined" size="lg" onClick={() => alert('clicked')}>
      Outlined Button
    </Button>
    <Button variant="text" size="lg" onClick={() => alert('clicked')}>
      Text Button
    </Button>
  </div>
);

export const Sizes: StoryFn<ButtonProps> = () => (
  <div className="storybook-container" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px'
  }}>
    <Button variant="filled" size="lg" icon={<Add16Filled />} onClick={() => alert('clicked')}>
      Large Button
    </Button>
    <Button variant="filled" size="sm" icon={<Add16Filled />} onClick={() => alert('clicked')}>
      Small Button
    </Button>
  </div>
);

const TemplateWithIcons: StoryFn<ButtonProps> = (args) => (
  <div className="storybook-container" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px'
  }}>
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
const TemplateIconOnly: StoryFn<ButtonProps> = (args) => (
  <div className="storybook-container" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px'
  }}>
    <Button icon={<Add16Regular />} iconOnly={true} {...args}>
      teste
    </Button>
  </div>
);

export const IconOnly = TemplateIconOnly.bind({});
IconOnly.args = {
  type: 'button',
  variant: 'filled',
  size: 'lg',
  iconOnly: true,
  icon: <Add16Regular />,
};