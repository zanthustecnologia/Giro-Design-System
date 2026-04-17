import {
  ShoppingBagPercent24Regular,
  CheckmarkCircle24Regular,
  Warning24Regular,
  Info24Regular,
  Star24Regular,
} from '@fluentui/react-icons';
import React, { useState } from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Callout } from '@giro-ds/react';

const ICON_OPTIONS: Record<string, React.ReactNode> = {
  none: undefined,
  Info: <Info24Regular />,
  Star: <Star24Regular />,
  Check: <CheckmarkCircle24Regular />,
  Warning: <Warning24Regular />,
  ShoppingBag: <ShoppingBagPercent24Regular />,
};

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['neutral', 'brand', 'success', 'alert'],
      description: 'Variante semântica do callout',
    },
    title: {
      control: { type: 'text' },
      description: 'Título principal do callout',
    },
    text: {
      control: { type: 'text' },
      description: 'Conteúdo descritivo do callout',
      table: { type: { summary: 'ReactNode' } },
    },
    icon: {
      description: 'Ícone a ser exibido no callout. Aceita qualquer ReactNode.',
      table: { disable: true },
    },
    onDismiss: {
      description: 'Callback chamado ao clicar no botão de fechar.',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    dismiss: {
      control: { type: 'boolean' },
      description: 'Exibe o botão de fechar com o ícone X. Requer onDismiss para capturar o evento.',
      table: { defaultValue: { summary: 'false' } },
    },
    dismissLabel: {
      control: { type: 'text' },
      description: 'Label acessível do botão de fechar. Útil para internacionalização.',
      table: { defaultValue: { summary: '"Fechar"' } },
    },
    backgroundColor: {
      control: { type: 'text' },
      description: 'Nome do token de cor de fundo sem `--`. Sobrescreve a cor da variante.',
      table: { type: { summary: 'string' } },
    },
    foregroundColor: {
      control: { type: 'text' },
      description: 'Nome do token de cor do texto e ícone sem `--`. Sobrescreve a cor padrão.',
      table: { type: { summary: 'string' } },
    },
    disabled: { table: { disable: true } },
    className: { table: { disable: true } },
    id: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Callout & { iconKey: string }>;

export const Default: Story = {
  argTypes: {
    iconKey: {
      name: 'icon',
      control: { type: 'select' },
      options: Object.keys(ICON_OPTIONS),
      description: 'Ícone a exibir no callout',
    },
  },
  render: ({ iconKey, ...args }) => (
    <Callout {...args} icon={ICON_OPTIONS[iconKey ?? 'none']} />
  ),
  args: {
    variant: 'brand',
    text: 'Este recurso estará disponível a partir da próxima versão.',
    iconKey: 'Star',
  } as any,
};

export const Removivel_DismissLabel: Story = {
  name: 'Dismiss Label Customizado',
  args: {
    variant: 'neutral',
    text: 'This notification can be dismissed.',
    dismiss: true,
    dismissLabel: 'Close',
    onDismiss: () => {},
  },
};

export const CoresCustomizadas: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Callout
      variant="neutral"
      text="Fundo personalizado com token de cor da marca."
      icon={<Star24Regular />}
      backgroundColor="color-brand-secondary-light"
    />
    <Callout
      variant="neutral"
      text="Fundo e texto com tokens customizados."
      icon={<Info24Regular />}
      backgroundColor="color-brand-primary-light"
      foregroundColor="color-brand-primary-dark"
    />
  </div>
);

export const Variants: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Callout variant="neutral" text="Neutral: Mensagem informativa neutra em relação ao conteúdo da jornada." icon={<Info24Regular />} />
    <Callout variant="brand" text="Brand: Novidade: experimente o novo modo de visualização compacta." icon={<Star24Regular />} />
    <Callout variant="success" text="Success: Suas alterações foram salvas e já estão em vigor." icon={<CheckmarkCircle24Regular />} />
    <Callout variant="alert" text="Alert: Esta ação é irreversível. Confira os dados antes de prosseguir." icon={<Warning24Regular />} />
  </div>
);

export const ComTitulo: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Callout
      variant="success"
      title="Pedido confirmado"
      text="Seu pedido foi registrado e será processado em breve."
      icon={<CheckmarkCircle24Regular />}
    />
    <Callout
      variant="alert"
      title="Ação necessária"
      text="Seu acesso expira em 3 dias. Renove sua assinatura para continuar."
      icon={<Warning24Regular />}
    />
  </div>
);

export const SemIcone: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Callout variant="brand" text="Use esta funcionalidade para exportar os dados em formato CSV." />
    <Callout variant="neutral" title="Requisito mínimo" text="É necessário preencher ao menos um filtro para realizar a busca." />
  </div>
);

export const Removivel: StoryFn = () => {
  const [items, setItems] = useState([
    { id: 1, variant: 'neutral', text: 'Novidade disponível: confira as últimas atualizações do produto.' },
    { id: 2, variant: 'success', text: 'Configurações salvas com sucesso.' },
    { id: 3, variant: 'alert', text: 'Atenção: sua sessão expira em 10 minutos.' },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item) => (
        <Callout
          key={item.id}
          variant={item.variant}
          text={item.text}
          dismiss
          onDismiss={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
        />
      ))}
      {items.length === 0 && (
        <p style={{ color: 'var(--color-neutral-low-medium)' }}>Todos os callouts foram removidos.</p>
      )}
    </div>
  );
};
