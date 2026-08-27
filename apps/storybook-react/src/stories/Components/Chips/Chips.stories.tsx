import { DismissCircle16Regular, Tag16Regular, CheckmarkCircle16Regular, Warning16Regular, Info16Regular } from '@fluentui/react-icons';
import { Chips } from '@giro-ds/react';
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Chips> = {
  title: 'Components/Chips',
  component: Chips,
  parameters: {
    docs: {
      description: {
        component: 'Chips são elementos compactos e em destaque usados para representar atributos, categorias, status ou filtros associados a um conteúdo. Eles comunicam informação de forma concisa e visual, sem a necessidade de ações do usuário.',
      },
    },
    // layout: 'centered'
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Conteúdo exibido dentro do chip.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Desabilita o chip visualmente e bloqueia interações. Sobrescreve backgroundColor e foregroundColor.',
    },
    variant: {
      control: { type: 'select' },
      options: ['neutral', 'brand', 'success', 'alert'],
      description: 'Preset semântico de cor. Pode ser sobrescrito por backgroundColor/foregroundColor.',
    },
    backgroundColor: {
      control: { type: 'text' },
      description: 'Token CSS para cor de fundo sem o prefixo --. Ex: color-brand-secondary-medium',
    },
    textColor: {
      control: { type: 'text' },
      description: 'Token CSS para cor do texto e ícones sem o prefixo --. Ex: color-brand-secondary-dark',
    },
    scale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
      description: 'Escala visual do componente.',
    },
    leftIcon: {
      control: { type: 'select' },
      options: ['none', 'Tag'],
      mapping: {
        none: null,
        Tag: <Tag16Regular />
      },
      description: 'Ícone posicionado à esquerda do texto.',
    },
    rightIcon: {
      control: { type: 'select' },
      options: ['none', 'DismissCircle'],
      mapping: {
        none: null,
        DismissCircle: <DismissCircle16Regular />
      },
      description: 'Ícone posicionado à direita do texto. Comum para chips removíveis.',
    },
    className: { table: { disable: true } },
    id: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Chips>;

export const Default: Story = {
  render: ({ children, ...args }) => <Chips {...args}>{children}</Chips>,
  args: {
    children: 'Etiqueta',
    variant: 'neutral',
    disabled: false,
    scale: 1,
  },
};

export const Variantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips variant="neutral">Neutro</Chips>
      <Chips variant="brand">Destaque</Chips>
      <Chips variant="success">Ativo</Chips>
      <Chips variant="alert">Inativo</Chips>
    </div>
  ),
};

export const CoresCustomizadas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips
        backgroundColor="color-brand-secondary-medium"
        textColor="color-brand-secondary-dark"
      >
        Secundária
      </Chips>
      <Chips
        backgroundColor="color-feedback-info-light"
        textColor="color-feedback-info-dark"
      >
        Informação
      </Chips>
      <Chips
        backgroundColor="color-feedback-success-light"
        textColor="color-feedback-success-dark"
        leftIcon={<CheckmarkCircle16Regular />}
      >
        Sucesso custom
      </Chips>
      <Chips
        backgroundColor="color-feedback-alert-light"
        textColor="color-feedback-alert-dark"
        leftIcon={<Warning16Regular />}
      >
        Alerta custom
      </Chips>
    </div>
  ),
};

export const ComIconeEsquerdo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips variant="neutral" leftIcon={<Tag16Regular />}>Categoria</Chips>
      <Chips variant="success" leftIcon={<CheckmarkCircle16Regular />}>Aprovado</Chips>
      <Chips variant="alert" leftIcon={<Warning16Regular />}>Pendente</Chips>
      <Chips variant="brand" leftIcon={<Info16Regular />}>Novidade</Chips>
    </div>
  ),
};

export const ComIconeDireito: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips variant="neutral" rightIcon={<DismissCircle16Regular />}>Categoria</Chips>
      <Chips variant="brand" rightIcon={<DismissCircle16Regular />}>Destaque</Chips>
      <Chips variant="success" rightIcon={<DismissCircle16Regular />}>Ativo</Chips>
      <Chips variant="alert" rightIcon={<DismissCircle16Regular />}>Expirado</Chips>
    </div>
  ),
};

export const ComAmbosIcones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips variant="neutral" leftIcon={<Tag16Regular />} rightIcon={<DismissCircle16Regular />}>Filtro ativo</Chips>
      <Chips variant="success" leftIcon={<CheckmarkCircle16Regular />} rightIcon={<DismissCircle16Regular />}>Aprovado</Chips>
      <Chips variant="alert" leftIcon={<Warning16Regular />} rightIcon={<DismissCircle16Regular />}>Pendente</Chips>
    </div>
  ),
};

export const Desabilitado: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Chips variant="neutral" disabled>Desabilitado</Chips>
      <Chips variant="brand" disabled>Desabilitado</Chips>
      <Chips variant="success" disabled leftIcon={<CheckmarkCircle16Regular />}>Desabilitado</Chips>
    </div>
  ),
};

export const Interativo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips
        variant="neutral"
        rightIcon={<DismissCircle16Regular />}
        onClick={() => alert('Chip removido!')}
      >
        Removível
      </Chips>
      <Chips
        variant="brand"
        leftIcon={<Tag16Regular />}
        onClick={() => alert('Filtro selecionado!')}
      >
        Filtro
      </Chips>
      <Chips
        variant="success"
        disabled
        rightIcon={<DismissCircle16Regular />}
        onClick={() => alert('Não deve disparar')}
      >
        Desabilitado
      </Chips>
    </div>
  ),
};

export const Escalas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', alignItems: 'flex-start' }}>
      <Chips scale={1}>Scale 1.0</Chips>
      <Chips scale={1.5}>Scale 1.5</Chips>
      <Chips scale={2}>Scale 2.0</Chips>
    </div>
  ),
};