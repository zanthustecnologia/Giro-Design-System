import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Quantity } from '@giro-ds/react';

const meta: Meta<typeof Quantity> = {
  title: 'Components/Quantity',
  component: Quantity,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultValue: {
      control: { type: 'number' },
      description: 'Valor inicial no modo não controlado.',
    },
    value: {
      control: { type: 'number' },
      description: 'Valor atual no modo controlado. Use junto com onChange.',
    },
    onChange: {
      table: { disable: true },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Desabilita toda a interação com o componente.',
    },
    decimal: {
      control: { type: 'boolean' },
      description: 'Habilita entrada de valores decimais.',
    },
    decimalPlaces: {
      control: { type: 'number' },
      description: 'Número de casas decimais (1 a 10). Ativo apenas quando decimal=true.',
      if: { arg: 'decimal', eq: true },
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'sm'],
      description: 'Tamanho do componente.',
    },
    step: {
      control: { type: 'number' },
      description: 'Valor de incremento/decremento dos botões.',
    },
    inputSize: {
      control: { type: 'number' },
      description: 'Controla o tamanho do input baseado no número de caracteres. Ignorado se inputSizeControl=true.',
    },
    inputSizeControl: {
      control: { type: 'boolean' },
      description: 'Habilita controle automático do tamanho do input baseado no número de caracteres.',
    },
    minValue: {
      control: { type: 'number' },
      description: 'Valor mínimo permitido. Padrão 0.',
    },
    maxValue: {
      control: { type: 'number' },
      description: 'Valor máximo permitido. Padrão 9999.',
    },
    decrementAriaLabel: {
      control: { type: 'text' },
      description: 'Aria label do botão de decrementar. Padrão: "Decrease quantity".',
    },
    incrementAriaLabel: {
      control: { type: 'text' },
      description: 'Aria label do botão de incrementar. Padrão: "Increase quantity".',
    },
    inputAriaLabel: {
      control: { type: 'text' },
      description: 'Aria label do input de quantidade. Padrão: "Quantity".',
    },
  },
  args: {
    defaultValue: 0,
    disabled: false,
    decimal: false,
    decimalPlaces: 2,
    size: 'lg',
    step: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Quantity>;

export const Default: Story = {
  render: (args) => <Quantity {...args} />,
};

export const Desabilitado: Story = {
  render: () => <Quantity defaultValue={3} disabled />,
};

export const Decimal: Story = {
  render: () => <Quantity decimal decimalPlaces={2} step={0.5} defaultValue={1} />,
};

export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '13px', color: 'var(--color-neutral-low-medium)', width: '24px' }}>lg</span>
        <Quantity defaultValue={1} size="lg" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '13px', color: 'var(--color-neutral-low-medium)', width: '24px' }}>sm</span>
        <Quantity defaultValue={1} size="sm" />
      </div>
    </div>
  ),
};

export const Controlado: Story = {
  render: () => {
    const [qty, setQty] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <Quantity value={qty} onChange={setQty} />
        <span style={{ fontSize: '13px', color: 'var(--color-neutral-low-medium)' }}>
          Valor atual: <strong style={{ color: 'var(--color-neutral-low-dark)' }}>{qty}</strong>
        </span>
      </div>
    );
  },
};