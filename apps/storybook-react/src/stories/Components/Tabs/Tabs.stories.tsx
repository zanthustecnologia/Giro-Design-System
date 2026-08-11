import { Person16Regular, Settings16Regular, Shield16Regular, Info16Regular } from '@fluentui/react-icons';
import { Tabs } from '@giro-ds/react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'Tabs organizam o conteúdo em painéis separados, exibidos um de cada vez. Use-as quando o conteúdo puder ser categorizado em seções independentes e o usuário precisar alternar entre elas sem sair da página.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientação das abas.',
    },
    activationMode: {
      control: { type: 'select' },
      options: ['automatic', 'manual'],
      description: 'Define se a aba é ativada ao receber foco (automatic) ou ao pressionar Enter/Space (manual).',
    },
    loop: {
      control: 'boolean',
      description: 'Quando verdadeiro, a navegação por teclado retorna ao início ao atingir o último item.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita todas as abas do componente.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const itemsBase = [
  {
    value: 'perfil',
    label: 'Perfil',
    content: (
      <div style={{ padding: '16px' }}>
        <p>Gerencie as informações do seu perfil aqui.</p>
      </div>
    ),
  },
  {
    value: 'configuracoes',
    label: 'Configurações',
    content: (
      <div style={{ padding: '16px' }}>
        <p>Ajuste as configurações da sua conta.</p>
      </div>
    ),
  },
  {
    value: 'seguranca',
    label: 'Segurança',
    content: (
      <div style={{ padding: '16px' }}>
        <p>Gerencie senhas, autenticação e permissões.</p>
      </div>
    ),
  },
];

export const Default: Story = {
  render: (args) => <Tabs {...args} />,
  args: {
    defaultValue: 'perfil',
    items: itemsBase,
    orientation: 'horizontal',
    activationMode: 'automatic',
    loop: true,
  },
};

export const Vertical: Story = {
  render: (args) => <Tabs {...args} />,
  args: {
    defaultValue: 'perfil',
    items: itemsBase,
    orientation: 'vertical',
  },
};

export const ComIcone: Story = {
  render: (args) => <Tabs {...args} />,
  args: {
    defaultValue: 'perfil',
    items: [
      {
        value: 'perfil',
        label: 'Perfil',
        icon: <Person16Regular />,
        content: (
          <div style={{ padding: '16px' }}>
            <p>Gerencie as informações do seu perfil aqui.</p>
          </div>
        ),
      },
      {
        value: 'configuracoes',
        label: 'Configurações',
        icon: <Settings16Regular />,
        content: (
          <div style={{ padding: '16px' }}>
            <p>Ajuste as configurações da sua conta.</p>
          </div>
        ),
      },
      {
        value: 'seguranca',
        label: 'Segurança',
        icon: <Shield16Regular />,
        content: (
          <div style={{ padding: '16px' }}>
            <p>Gerencie senhas, autenticação e permissões.</p>
          </div>
        ),
      },
    ],
  },
};

export const AbaDesabilitada: Story = {
  render: (args) => <Tabs {...args} />,
  args: {
    defaultValue: 'perfil',
    items: [
      {
        value: 'perfil',
        label: 'Perfil',
        content: (
          <div style={{ padding: '16px' }}>
            <p>Gerencie as informações do seu perfil aqui.</p>
          </div>
        ),
      },
      {
        value: 'configuracoes',
        label: 'Configurações',
        disabled: true,
        content: (
          <div style={{ padding: '16px' }}>
            <p>Ajuste as configurações da sua conta.</p>
          </div>
        ),
      },
      {
        value: 'seguranca',
        label: 'Segurança',
        content: (
          <div style={{ padding: '16px' }}>
            <p>Gerencie senhas, autenticação e permissões.</p>
          </div>
        ),
      },
    ],
  },
};

export const Controlado: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('perfil');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {itemsBase.map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              style={{
                padding: '4px 12px',
                borderRadius: '4px',
                border: '1px solid var(--color-brand-default, #0066cc)',
                background: activeTab === item.value ? 'var(--color-brand-default, #0066cc)' : 'transparent',
                color: activeTab === item.value ? '#fff' : 'var(--color-brand-default, #0066cc)',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Ir para {item.label}
            </button>
          ))}
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} items={itemsBase} />
      </div>
    );
  },
};

export const ActivationModeManual: Story = {
  render: (args) => <Tabs {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Com `activationMode="manual"`, o usuário precisa pressionar **Enter** ou **Space** para ativar a aba ao navegar por teclado.',
      },
    },
  },
  args: {
    defaultValue: 'perfil',
    items: [
      {
        value: 'perfil',
        label: 'Perfil',
        icon: <Info16Regular />,
        content: (
          <div style={{ padding: '16px' }}>
            <p>
              Navegue pelas abas com <strong>ArrowLeft / ArrowRight</strong> e pressione{' '}
              <strong>Enter</strong> para ativar.
            </p>
          </div>
        ),
      },
      ...itemsBase.slice(1),
    ],
    activationMode: 'manual',
  },
};
