import { OneTimePassword } from '@giro-ds/react';
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof OneTimePassword>;

const meta: Meta<typeof OneTimePassword> = {
  title: 'Components/OneTimePassword',
  component: OneTimePassword,
  parameters: {
    docs: {
      description: {
        component:
          'O One-Time Password é um campo de entrada para códigos de uso único (OTP), construído sobre o primitivo Radix UI. Suporta validação numérica e alfanumérica, estados de erro e desabilitado, e integração nativa com formulários.',
      },
    },
    controls: {
      sort: 'alpha',
    },
  },
  argTypes: {
    length: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Número de campos/dígitos do código',
    },
    validationType: {
      control: { type: 'select' },
      options: ['numeric', 'alphanumeric'],
      description: 'Tipo de entrada aceita pelo campo',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder exibido nos inputs vazios',
    },
    hasError: {
      control: 'boolean',
      description: 'Exibe o estado de erro no campo',
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro exibida abaixo do componente',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o campo',
    },
    readOnly: {
      control: 'boolean',
      description: 'Define o campo como somente leitura',
    },
    autoSubmit: {
      control: 'boolean',
      description: 'Submete o formulário associado ao completar todos os campos',
    },
    name: {
      table: { disable: true },
    },
    form: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    defaultValue: {
      table: { disable: true },
    },
    onValueChange: {
      table: { disable: true },
    },
    onAutoSubmit: {
      table: { disable: true },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    length: 6,
    validationType: 'numeric',
    disabled: false,
    hasError: false,
    placeholder: '○',
  },
  render: (args) => (
    <div className="storybook__container">
      <OneTimePassword {...args} />
    </div>
  ),
};

export const ComErro: Story = {
  args: {
    length: 6,
    validationType: 'numeric',
    hasError: true,
    errorMessage: 'Código inválido. Tente novamente.',
  },
  render: (args) => (
    <div className="storybook__container">
      <OneTimePassword {...args} />
    </div>
  ),
};

export const Desabilitado: Story = {
  args: {
    length: 6,
    validationType: 'numeric',
    disabled: true,
    defaultValue: '123',
  },
  render: (args) => (
    <div className="storybook__container">
      <OneTimePassword {...args} />
    </div>
  ),
};

export const Alfanumerico: Story = {
  args: {
    length: 6,
    validationType: 'alphanumeric',
    placeholder: '—',
  },
  render: (args) => (
    <div className="storybook__container">
      <OneTimePassword {...args} />
    </div>
  ),
};

export const QuatroCampos: Story = {
  args: {
    length: 4,
    validationType: 'numeric',
  },
  render: (args) => (
    <div className="storybook__container">
      <OneTimePassword {...args} />
    </div>
  ),
};

export const Controlado: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="storybook__container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <OneTimePassword
          length={6}
          validationType="numeric"
          value={value}
          onValueChange={setValue}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          Valor atual: <strong>{value || '—'}</strong>
        </span>
      </div>
    );
  },
};
