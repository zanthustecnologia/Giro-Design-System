import {
  ShoppingBagPercent24Regular,
  CheckmarkCircle24Regular,
  Warning24Regular,
  Info24Regular,
  Star24Regular,
  Color24Regular,
} from '@fluentui/react-icons';
import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Callout } from '@giro-ds/react';
import type { CalloutProps } from '@giro-ds/react';

interface CalloutStoryArgs {
  type: 'neutral' | 'brand' | 'color' | 'alert' | 'success';
  text: string;
  title: string;
  icon: boolean;
}

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  parameters: {
    controls: {
      sort: 'alpha',
    },
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['neutral', 'brand', 'color', 'alert', 'success'],
    },
    title: {
      control: { type: 'text' },
    },
    text: {
      control: { type: 'text' },
    },
    icon: {
      control: { type: 'boolean' },
    },
    className: { table: { disable: true } },
    id: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<CalloutStoryArgs>;

export const Default: Story = {
  render: (args) => (
    <Callout
      {...args}
      icon={args.icon ? <ShoppingBagPercent24Regular /> : undefined}
    />
  ),
  args: {
    type: 'brand',
    text: 'Este recurso estará disponível a partir da próxima versão.',
    title: 'Em breve',
    icon: false,
  },
};

export const Variants: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Callout type="neutral" text="Mensagem informativa neutra em relação ao conteúdo or jornada" icon={<Info24Regular />} />
    <Callout type="brand" text="Brand: Novidade: experimente o novo modo de visualização compacta." icon={<Star24Regular />} />
    <Callout type="color" text="Color: Esta seção está em fase de testes e pode sofrer alterações." icon={<Color24Regular />} />
    <Callout type="success" text="Success: Suas alterações foram salvas e já estão em vigor." icon={<CheckmarkCircle24Regular />} />
    <Callout type="alert" text="Alerta: Esta ação é irreversível. Confira os dados antes de prosseguir." icon={<Warning24Regular />} />
  </div>
);

export const ComTitulo: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Callout
      type="success"
      title="Pedido confirmado"
      text="Seu pedido foi registrado e será processado em breve."
      icon={<CheckmarkCircle24Regular />}
    />
    <Callout
      type="alert"
      title="Ação necessária"
      text="Seu acesso expira em 3 dias. Renove sua assinatura para continuar."
      icon={<Warning24Regular />}
    />
  </div>
);

export const SemIcone: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Callout type="brand" text="Use esta funcionalidade para exportar os dados em formato CSV." />
    <Callout type="neutral" title="Requisito mínimo" text="É necessário preencher ao menos um filtro para realizar a busca." />
  </div>
);
