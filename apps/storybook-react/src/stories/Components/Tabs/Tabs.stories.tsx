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
    keyboardActivationMode: {
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
    keyboardActivationMode: 'automatic',
    loop: true,
  },
};

export const Overflow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Quando as abas excedem o espaço disponível, setas de navegação aparecem automaticamente. Em dispositivos touch, o scroll é feito via gesto nativo.',
      },
    },
  },
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <Tabs {...args} />
    </div>
  ),
  args: {
    defaultValue: 'tab-1',
    items: Array.from({ length: 12 }, (_, i) => ({
      value: `tab-${i + 1}`,
      label: `Tab ${i + 1}`,
      content: (
        <div style={{ padding: '16px' }}>
          <p>Conteúdo da Tab {i + 1}</p>
        </div>
      ),
    })),
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

export const NavegacaoPorSeta: Story = {
  render: (args) => <Tabs {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Com `keyboardActivationMode="manual"`, o usuário precisa pressionar **Enter** ou **Space** para ativar a aba ao navegar por teclado.',
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
    keyboardActivationMode: 'manual',
  },
};
