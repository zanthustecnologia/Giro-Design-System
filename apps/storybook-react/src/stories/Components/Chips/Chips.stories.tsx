import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chips } from '@giro-ds/react';
import { DismissCircle16Regular, Tag16Regular, CheckmarkCircle16Regular, Warning16Regular, Info16Regular } from '@fluentui/react-icons';

const meta: Meta<typeof Chips> = {
  title: 'Components/Chips',
  component: Chips,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Texto exibido dentro do chip. Obrigatório e não pode ser vazio.',
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
      description: 'Token CSS para cor de fundo. Ex: --color-brand-secondary-medium',
    },
    foregroundColor: {
      control: { type: 'text' },
      description: 'Token CSS para cor do texto e ícones. Ex: --color-brand-secondary-dark',
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
  render: (args) => <Chips {...args} />,
  args: {
    title: 'Etiqueta',
    variant: 'neutral',
    disabled: false,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips variant="neutral" title="Neutro" />
      <Chips variant="brand" title="Destaque" />
      <Chips variant="success" title="Ativo" />
      <Chips variant="alert" title="Inativo" />
    </div>
  ),
};

export const CoresCustomizadas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips
        backgroundColor="--color-brand-secondary-medium"
        foregroundColor="--color-brand-secondary-dark"
        title="Secundária"
      />
      <Chips
        backgroundColor="--color-feedback-info-light"
        foregroundColor="--color-feedback-info-dark"
        title="Informação"
      />
      <Chips
        backgroundColor="--color-feedback-success-light"
        foregroundColor="--color-feedback-success-dark"
        title="Sucesso custom"
        leftIcon={<CheckmarkCircle16Regular />}
      />
      <Chips
        backgroundColor="--color-feedback-alert-light"
        foregroundColor="--color-feedback-alert-dark"
        title="Alerta custom"
        leftIcon={<Warning16Regular />}
      />
    </div>
  ),
};

export const ComIconeEsquerdo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips variant="neutral" title="Categoria" leftIcon={<Tag16Regular />} />
      <Chips variant="success" title="Aprovado" leftIcon={<CheckmarkCircle16Regular />} />
      <Chips variant="alert" title="Pendente" leftIcon={<Warning16Regular />} />
      <Chips variant="brand" title="Novidade" leftIcon={<Info16Regular />} />
    </div>
  ),
};

export const ComIconeDireito: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips variant="neutral" title="Categoria" rightIcon={<DismissCircle16Regular />} />
      <Chips variant="brand" title="Destaque" rightIcon={<DismissCircle16Regular />} />
      <Chips variant="success" title="Ativo" rightIcon={<DismissCircle16Regular />} />
      <Chips variant="alert" title="Expirado" rightIcon={<DismissCircle16Regular />} />
    </div>
  ),
};

export const ComAmbosIcones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips variant="neutral" title="Filtro ativo" leftIcon={<Tag16Regular />} rightIcon={<DismissCircle16Regular />} />
      <Chips variant="success" title="Aprovado" leftIcon={<CheckmarkCircle16Regular />} rightIcon={<DismissCircle16Regular />} />
      <Chips variant="alert" title="Pendente" leftIcon={<Warning16Regular />} rightIcon={<DismissCircle16Regular />} />
    </div>
  ),
};

export const Desabilitado: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Chips variant="neutral" title="Desabilitado" disabled />
      <Chips variant="brand" title="Desabilitado" disabled />
      <Chips variant="success" title="Desabilitado" disabled leftIcon={<CheckmarkCircle16Regular />} />
    </div>
  ),
};