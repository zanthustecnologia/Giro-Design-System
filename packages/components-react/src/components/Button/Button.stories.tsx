import {
  Add16Filled,
  Add16Regular,
  ArrowDown16Regular,
  Delete16Regular,
  Edit16Regular,
} from '@fluentui/react-icons';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryFn } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,

  parameters: {
    docs: {
      description: {
        component:
          'Componente de calendário interativo com suporte a internacionalização e diferentes formatos de data.',
      },

      dosAndDonts: [
        {
          do: {
            example: (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button variant="text">Cancel</Button>
                <Button variant="filled">Get started</Button>
              </div>
            ),
            description:
              'Use active verbs or phrases that clearly indicate action.',
          },
          dont: {
            example: (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button variant="text">Yes</Button>
                <Button variant="filled">No</Button>
              </div>
            ),
            description:
              'Use vague and generic labels that make the user read the dialog before taking action.',
          },
        },
        {
          do: {
            example: <Button variant="outlined">Secondary Action</Button>,
            description:
              'Use outlined variant for secondary, less important actions.',
          },
          dont: {
            example: <Button variant="filled">Cancel</Button>,
            description:
              "Don't use primary variant for destructive or cancel actions.",
          },
        },
        {
          do: {
            example: <Button disabled>Save Changes</Button>,
            description:
              'Disable buttons when the action is unavailable or invalid.',
          },
          dont: {
            example: (
              <Button style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                Save Changes
              </Button>
            ),
            description:
              "Don't manually style disabled states. Use the disabled prop.",
          },
        },
      ],
      accessibility: [
        '✓ Keyboard navigation: Tab, Enter, Space',
        '✓ ARIA: role="button" for non-button elements',
        '✓ Focus indicators clearly visible',
        '✓ Color contrast ratio minimum 4.5:1',
        '✓ Minimum touch target size: 44x44px',
      ],
       usage: [
        '✓ Keyboard navigation: Tab, Enter, Space',
      ],
      aditionalInformations:[
        'teste',
        'test2'
      ]
    },
    controls: {
      sort: 'alpha',
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    typeButton: {
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
        add: <Add16Regular />,
        delete: <Delete16Regular />,
        edit: <Edit16Regular />,
        arrowDown: <ArrowDown16Regular />,
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

const Template: StoryFn<
  ButtonProps & { displayIcon?: boolean; icon?: React.ReactNode }
> = ({ icon, ...args }) => {
  const { children, to, typeButton, iconPosition, iconOnly } = args;

  return (
    <BrowserRouter>
      <div
        className="storybook-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <Button
          {...args}
          iconOnly={iconOnly}
          icon={iconPosition === 'none' ? undefined : icon}
          href={to}
          as={typeButton === 'link' ? 'a' : 'button'}
        >
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
  <div
    className="storybook-container"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
    }}
  >
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
  <div
    className="storybook-container"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
    }}
  >
    <Button
      variant="filled"
      size="lg"
      icon={<Add16Filled />}
      onClick={() => alert('clicked')}
    >
      Large Button
    </Button>
    <Button
      variant="filled"
      size="sm"
      icon={<Add16Filled />}
      onClick={() => alert('clicked')}
    >
      Small Button
    </Button>
  </div>
);

const TemplateWithIcons: StoryFn<ButtonProps> = (args) => (
  <div
    className="storybook-container"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
    }}
  >
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
  <div
    className="storybook-container"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
    }}
  >
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
