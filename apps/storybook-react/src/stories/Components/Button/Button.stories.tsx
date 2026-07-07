import { Add16Filled, Add16Regular } from '@fluentui/react-icons';
import { Button } from '@giro-ds/react';
import React from 'react';

import type { ButtonProps } from '@giro-ds/react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Botões são componentes interativos que acionam uma função, navegação ou mudança de estado na interface. Indicam ações principais e secundárias, ajudando usuários a decidir o que fazer em seguida.',
      },
    },
    controls: {
      sort: 'alpha',
    },
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
      description: 'Tamanho do componente.',
    },
    scale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
      description: 'Escala visual do componente.',
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
      description: 'Exibe apenas o ícone, sem texto. **Requer obrigatoriamente a prop `icon`.**',
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Desabilita o componente.',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Exibe um indicador de carregamento.',
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

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args: ButtonProps) => (
    <Button {...args}>
      {args.children}
    </Button>
  ),
  args: {
    children: 'Button',
    type: 'button',
    variant: 'filled',
    size: 'lg',
  },
};

export const Variantes: Story = {
  render: () => (
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
  ),
};

export const Tamanhos: Story = {
  render: () => (
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
  ),
};

export const ComIcones: Story = {
  render: (args: ButtonProps) => (
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
  ),
  args: {
    variant: 'filled',
    size: 'lg',
  },
};

export const ApenasIcone: Story = {
  render: (args: ButtonProps) => <Button {...args} />,
  args: {
    variant: 'filled',
    size: 'lg',
    iconOnly: true,
    icon: <Add16Regular />,
    ariaLabel: 'Add item',
    tooltipText: 'Adicionar item',
  },
};

export const Escalas: StoryFn<ButtonProps> = () => (
  <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>
    <Button scale={1}>Scale 1.0</Button>
    <Button scale={1.5}>Scale 1.5</Button>
    <Button scale={2}>Scale 2.0</Button>
  </div>
);
