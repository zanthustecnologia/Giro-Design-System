import { Card } from '@giro-ds/react';
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'O Card é um componente de layout que agrupa conteúdos relacionados em um contêiner com borda, bordas arredondadas e espaçamento interno definidos pelos tokens do design system.',
      },
    },
  },
  argTypes: {
    hoverable: {
      control: { type: 'boolean' },
    },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <h2 style={{ margin: 0 }}>Título do Card</h2>
      <p style={{ marginBottom: 0 }}>Este é um exemplo de conteúdo dentro do Card. O componente aplica padding interno, borda e bordas arredondadas com base nos tokens do design system.</p>
    </Card>
  ),
};

export const Interativo: Story = {
  args: {
    hoverable: true,
  },
  render: (args) => (
    <Card {...args}>
      <h2 style={{ margin: 0 }}>Título do Card</h2>
      <p style={{ marginBottom: 0 }}>Passe o mouse sobre o card para ver o efeito de hover interativo.</p>
    </Card>
  ),
};

export const ComConteudoCustomizado: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <Card>
        <h3 style={{ margin: 0 }}>Informações do usuário</h3>
        <p style={{ marginBottom: 0 }}><strong>Nome:</strong> João da Silva</p>
        <p style={{ marginBottom: 0 }}><strong>E-mail:</strong> joao.silva@exemplo.com</p>
        <p style={{ marginBottom: 0 }}><strong>Cargo:</strong> Desenvolvedor Front-end</p>
      </Card>
    </div>
  ),
};
