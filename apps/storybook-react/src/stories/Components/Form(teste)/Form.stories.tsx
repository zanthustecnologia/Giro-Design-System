import React from 'react';

import Form from '../../../../../../packages/react/src/components/Form(teste)/Form';

// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Form>;

const meta: Meta<typeof Form> = {
  title: 'Components/Form (Teste)',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Formulário de teste para validar o controle externo de erros via a prop `error` do TextField. Preencha os campos e clique em Enviar para acionar as validações.',
      },
    },
  },
};

export default meta;

/** Formulário completo com validação externa no submit */
export const Default: Story = {
  render: () => (
    <div style={{ minWidth: 400 }}>
      <Form />
    </div>
  ),
};

/** Demonstra os três campos exibindo erros externos simultaneamente */
export const AllErrors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Clique em "Enviar" sem preencher nada para ver todos os erros externos sendo injetados de uma vez.',
      },
    },
  },
  render: () => (
    <div style={{ minWidth: 400 }}>
      <Form />
    </div>
  ),
};

/** Demonstra que o erro do campo é limpo ao digitar */
export const ErrorClearsOnType: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Clique em "Enviar" para exibir os erros e depois comece a digitar em qualquer campo — o erro daquele campo deve desaparecer imediatamente.',
      },
    },
  },
  render: () => (
    <div style={{ minWidth: 400 }}>
      <Form />
    </div>
  ),
};
