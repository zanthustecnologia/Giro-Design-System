import { Add16Filled, Add16Regular, ArrowCircleDown12Regular } from '@fluentui/react-icons';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Button from './Button.jsx';
import './Button.scss'
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    controls: {
      sort: 'alpha'
    }
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
      options: ['none', 'add16R', 'add16F', 'arrow'],
      mapping: {
        add16R: <Add16Regular />,
        add16F: <Add16Filled />,
        arrow: <ArrowCircleDown12Regular />,
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
      }
    },
  },
};

const Template = ({ icon, ...args }) => {
  const { displayIcon } = args;

  return (
    <BrowserRouter>
      <div className="storybook-container">
        <Button {...args} icon={displayIcon === false || icon == 'none' ? undefined : icon} />
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

export const Variants = (args) => (
  <div className="storybook-container">
    <Button type="button" variant="filled" size="lg" onClick={() => alert('clicked')} >
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

export const Sizes = () => (
  <div className="storybook-container">
    <Button type="button" variant="filled" size="lg" icon={<Add16Filled />} onClick={() => alert('clicked')}>
      Large Button
    </Button>
    <Button type="button" variant="filled" size="sm" icon={<Add16Filled />} onClick={() => alert('clicked')}>
      Small Button
    </Button>
  </div>
);

const TemplateWithIcons = (args) => (
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
