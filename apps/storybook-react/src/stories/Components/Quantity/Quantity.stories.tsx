import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Quantity } from '@giro-ds/react';

const ControlledWrapper = (args: React.ComponentProps<typeof Quantity>) => {
  const [value, setValue] = useState<number>(args.value ?? 0);
  return (
    <Quantity
      {...args}
      value={value}
      onChange={(v) => { setValue(v); args.onChange?.(v); }}
    />
  );
};

const meta: Meta<typeof Quantity> = {
  title: 'Components/Quantity',
  component: Quantity,
  parameters: {
    docs: {
      description: {
        component: 'O Quantity é um campo de entrada numérica com botões de incremento e decremento. Permite ao usuário ajustar um valor de forma precisa, seja por clique nos botões ou por digitação direta. Funciona tanto com valores inteiros quanto com valores decimais.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Valor do componente.',
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
    valueIncrement: {
      control: { type: 'number' },
      description: 'Valor de incremento/decremento dos botões.',
    },
    inputSize: {
      control: { type: 'number' },
      description: 'Tamanho fixo do input em caracteres. Se omitido, o tamanho é calculado automaticamente.',
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
      table: { disable: true },
    },
    incrementAriaLabel: {
      table: { disable: true },
    },
    inputAriaLabel: {
      table: { disable: true },
    },
  },
  args: {
    value: 0,
    disabled: false,
    decimal: false,
    decimalPlaces: 2,
    size: 'lg',
    valueIncrement: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Quantity>;

export const Default: Story = {
  render: (args) => <ControlledWrapper {...args} />,
};

export const Desabilitado: Story = {
  render: () => <Quantity value={3} disabled />,
};

export const Decimal: Story = {
  render: () => {
    const [value, setValue] = useState(1);
    return <Quantity decimal decimalPlaces={2} valueIncrement={0.5} value={value} onChange={setValue} />;
  },
};

export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '13px', color: 'var(--color-neutral-low-medium)', width: '24px' }}>lg</span>
        <ControlledWrapper value={1} size="lg" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '13px', color: 'var(--color-neutral-low-medium)', width: '24px' }}>sm</span>
        <ControlledWrapper value={1} size="sm" />
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