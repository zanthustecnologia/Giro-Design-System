import { OneTimePassword } from '@giro-ds/react';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof OneTimePassword>;

const meta: Meta<typeof OneTimePassword> = {
  title: 'Components/OneTimePassword',
  component: OneTimePassword,
  parameters: {
    docs: {
      description: {
        component:
          'O One-Time Password é um campo de entrada para códigos de uso único (OTP), construído sobre o primitivo Radix UI. Suporta validação numérica, alfanumérica e alfabética, estados de erro e desabilitado, e integração nativa com formulários.',
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
      options: ['numeric', 'alphanumeric', 'alpha'],
      description: 'Tipo de entrada aceita pelo campo',
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
      table: { disable: true },
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
  },
  render: (args) => (
    <div className="storybook__container">
      <OneTimePassword {...args} />
    </div>
  ),
};
