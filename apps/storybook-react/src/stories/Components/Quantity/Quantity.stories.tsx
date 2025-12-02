import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Quantity } from '@giro/react';
import type { QuantityProps } from '@giro/react';

const meta: Meta<typeof Quantity> = {
  title: 'Components/Quantity',
  component: Quantity,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultValue: {
      control: { type: 'number' },
      defaultValue: 0,
    },
    value: {
      control: { type: 'number' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    decimal: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    decimalPlaces: {
      control: { type: 'number' },
      if: { arg: 'decimal', eq: true },
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'sm'],
    },
    step: {
      control: { type: 'number' },
      defaultValue: 1,
    },
    onChange: {
      action: 'changed',
    },
  },
};

export default meta;

/**
 * Story padrão - componente não controlado
 * Usa defaultValue para definir valor inicial
 */
export const Default: StoryFn<QuantityProps> = (args) => <Quantity {...args} />;
Default.args = {
  defaultValue: 0,
  disabled: false,
  decimal: false,
  decimalPlaces: 2,
  size: 'lg',
  step: 1,
};

Default.parameters = {
  docs: {
    source: {
      code: `
/**
 * Exemplo de uso do componente Quantity não controlado.
 * - O valor inicial é definido via defaultValue.
 * - O componente gerencia seu próprio estado interno.
 */
function Example() {
  const [value, setValue] = useState<number>(1);

  // Atualiza o valor da quantidade
  const handleChange = (newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Quantity
      defaultValue={value}
      onChange={handleChange}
      size="lg"
      step={1}
      decimal={false}
      disabled={false}
    />
  );
}
      `.trim(),
    },
  },
};