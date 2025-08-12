import { Add16Filled, Add16Regular } from '@fluentui/react-icons';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Button, { ButtonProps } from './Button';

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
    displayIcon: {
      control: { type: 'boolean' },
    },
    icon: {
      control: { type: 'select' },
      options: ['none', 'add', 'delete', 'edit', 'arrowDown'],
      mapping: {
        add: <Add16Regular />,
        delete: <Add16Regular />,
        edit: <Add16Regular />,
        arrowDown: <Add16Regular />,
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
} as any;

const Template = ({
  icon,
  ...args
}: any) => {
  const { displayIcon, to, type } = args;

  return (
    <BrowserRouter>
      <div className="storybook-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px'
      }}>
        <Button {...args} icon={displayIcon === false || icon === 'none' ? undefined : icon} href={to} as={type === 'link' ? 'a' : 'button'} />
      </div>
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
(Default as any).args = {
  children: 'Button',
  type: 'button',
  variant: 'filled',
  size: 'lg',
};

export const Variants = (args: any) => (
  <div className="storybook-container" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px'
  }}>
    <Button  variant="filled" size="lg" onClick={() => alert('clicked')}>
      Filled Button
    </Button>
    <Button  variant="outlined" size="lg" onClick={() => alert('clicked')}>
      Outlined Button
    </Button>
    <Button  variant="text" size="lg" onClick={() => alert('clicked')}>
      Text Button
    </Button>
  </div>
);

export const Sizes = () => (
  <div className="storybook-container" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px'
  }}>
    <Button  variant="filled" size="lg" icon={<Add16Filled />} onClick={() => alert('clicked')}>
      Large Button
    </Button>
    <Button  variant="filled" size="sm" icon={<Add16Filled />} onClick={() => alert('clicked')}>
      Small Button
    </Button>
  </div>
);

const TemplateWithIcons = (args: any) => (
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
(WithIcons as any).args = {
  type: 'button',
  variant: 'filled',
  size: 'lg',
};