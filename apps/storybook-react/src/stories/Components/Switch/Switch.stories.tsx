import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@giro-ds/react';
import { SwitchProps } from '@giro-ds/react';
type Story = StoryObj<typeof Switch>;

const meta: Meta<SwitchProps> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: 'O Switch é um controle de alternância que representa dois estados: ativado ou desativado. É a versão visual de uma escolha binária imediata: ao ser acionado, o efeito acontece na hora, sem necessidade de confirmação.',
      },
    },
  },
  argTypes: {
    disabled: {
      description: 'Campo desabilitado',
      control: { type: 'boolean' },
    },
    name: {
      description: 'Nome do switch para formulários',
      type: 'string',
    },
    value: {
      description: 'Valor do switch para formulários',
      type: 'string',
    },
  },
};

export default meta;

// Stories
export const Default: Story = {
  render: (args) => (
    <Switch {...args} />
  ),
};

export const Marcado: Story = {
  render: (args) => <Switch {...args} />,
  args: {
    defaultChecked: true,
  },
};

export const Desabilitado: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Switch disabled />
      <Switch disabled defaultChecked />
    </div>
  ),
};

export const Controlado: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <Switch checked={checked} onCheckedChange={setChecked} />
        <span style={{ fontSize: '13px', color: 'var(--color-neutral-low-medium)' }}>
          {checked ? 'Ativado' : 'Desativado'}
        </span>
      </div>
    );
  },
};
