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
    },
    disabled: {
      control: { type: 'boolean' },
    },
    type: {
      control: { type: 'select' },
      options: ['neutral', 'brand', 'color', 'success', 'alert'],
    },
    leftIcon: {
      control: { type: 'select' },
      options: ['none', 'Tag'],
      mapping: {
        none: null,
        Tag: <Tag16Regular />
      },
    },
    rightIcon: {
      control: { type: 'select' },
      options: ['none', 'DismissCircle'],
      mapping: {
        none: null,
        DismissCircle: <DismissCircle16Regular />
      },
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
    type: 'neutral',
    disabled: false,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips type="neutral" title="Neutro" />
      <Chips type="brand" title="Destaque" />
      <Chips type="color" title="Cor" />
      <Chips type="success" title="Ativo" />
      <Chips type="alert" title="Inativo" />
    </div>
  ),
};

export const ComIconeEsquerdo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips type="neutral" title="Categoria" leftIcon={<Tag16Regular />} />
      <Chips type="success" title="Aprovado" leftIcon={<CheckmarkCircle16Regular />} />
      <Chips type="alert" title="Pendente" leftIcon={<Warning16Regular />} />
      <Chips type="brand" title="Novidade" leftIcon={<Info16Regular />} />
    </div>
  ),
};

export const ComIconeDireito: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips type="neutral" title="Categoria" rightIcon={<DismissCircle16Regular />} />
      <Chips type="brand" title="Destaque" rightIcon={<DismissCircle16Regular />} />
      <Chips type="success" title="Ativo" rightIcon={<DismissCircle16Regular />} />
      <Chips type="alert" title="Expirado" rightIcon={<DismissCircle16Regular />} />
    </div>
  ),
};

export const ComAmbosIcones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Chips type="neutral" title="Filtro ativo" leftIcon={<Tag16Regular />} rightIcon={<DismissCircle16Regular />} />
      <Chips type="success" title="Aprovado" leftIcon={<CheckmarkCircle16Regular />} rightIcon={<DismissCircle16Regular />} />
      <Chips type="alert" title="Pendente" leftIcon={<Warning16Regular />} rightIcon={<DismissCircle16Regular />} />
    </div>
  ),
};

export const Desabilitado: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Chips type="neutral" title="Desabilitado" disabled />
      <Chips type="brand" title="Desabilitado" disabled />
      <Chips type="success" title="Desabilitado" disabled leftIcon={<CheckmarkCircle16Regular />} />
    </div>
  ),
};