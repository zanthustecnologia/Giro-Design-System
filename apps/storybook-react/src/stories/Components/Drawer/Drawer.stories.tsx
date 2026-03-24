import {
  Alert24Regular,
  ArrowDownload24Regular,
  Filter16Regular,
  Location24Regular,
  Mail24Regular,
  PersonCircle24Regular,
  Phone24Regular,
  Search24Regular,
  Settings24Regular,
} from '@fluentui/react-icons';
import { Button, Callout, Checkbox, DatePicker, Drawer, Search, Select, TextField } from '@giro-ds/react';
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

// ---------------------------------------------------------------------------
// Helpers de conteúdo reutilizáveis
// ---------------------------------------------------------------------------

const FilterContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <Select
      variant="text"
      label="Status"
      placeholder="Selecione..."
      items={[
        { value: 'all', text: 'Todos' },
        { value: 'active', text: 'Ativo' },
        { value: 'inactive', text: 'Inativo' },
        { value: 'pending', text: 'Pendente' },
      ]}
    />

    <div style={{ display: 'flex', gap: '8px' }}>
      <div style={{ flex: 1 }}><DatePicker label="De" /></div>
      <div style={{ flex: 1 }}><DatePicker label="Até" /></div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Categoria</span>
      {['Vendas', 'Suporte', 'Financeiro', 'Marketing'].map((cat) => (
        <Checkbox key={cat} label={cat} />
      ))}
    </div>

    <Search placeholder="Digite para buscar..." />

    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
      <div style={{ flex: 1 }}><Button variant="filled" fullWidth>Aplicar filtros</Button></div>
      <div style={{ flex: 1 }}><Button variant="outlined" fullWidth>Limpar</Button></div>
    </div>
  </div>
);

const ProfileContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '24px 0 8px' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PersonCircle24Regular style={{ color: '#fff', fontSize: '40px' }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '18px', color: '#111827' }}>Ana Souza</p>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>Gerente de Produto</p>
      </div>
    </div>

    <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: 0 }} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {[
        { icon: <Mail24Regular />, label: 'E-mail', value: 'ana.souza@empresa.com.br' },
        { icon: <Phone24Regular />, label: 'Telefone', value: '+55 (11) 99999-0000' },
        { icon: <Location24Regular />, label: 'Localização', value: 'São Paulo, SP' },
      ].map(({ icon, label, value }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ color: '#6366f1', flexShrink: 0, marginTop: '2px' }}>{icon}</span>
          <div>
            <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
            <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#374151' }}>{value}</p>
          </div>
        </div>
      ))}
    </div>

    <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: 0 }} />

    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="outlined" style={{ flex: 1 }}>Editar perfil</Button>
      <Button variant="filled" style={{ flex: 1 }}>Mensagem</Button>
    </div>
  </div>
);

const NotificationContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Callout type="brand" title="Nova mensagem recebida" text="Você tem 3 mensagens não lidas na caixa de entrada." />
    <Callout type="success" title="Pagamento confirmado" text="O pedido #4521 foi processado com sucesso." />
    <Callout type="alert" title="Atenção: prazo se aproximando" text='A tarefa "Relatório Q1" vence em 2 dias.' />
    <Callout type="color" title="Erro de sincronização" text="Não foi possível sincronizar os dados. Tente novamente." />
    <Callout type="neutral" title="Atualização disponível" text="Uma nova versão do sistema está disponível." />
  </div>
);

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'O `Drawer` é um painel lateral deslizante controlado externamente via `isOpen`. Ideal para filtros, detalhes, formulários e notificações sem abandonar o contexto da página.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título exibido no cabeçalho do drawer.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Título' } },
    },
    customWidth: {
      control: 'text',
      description: 'Largura do drawer. Aceita qualquer valor CSS válido (px, %, rem…).',
      table: { type: { summary: 'string' }, defaultValue: { summary: '400px' } },
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Fecha o drawer ao clicar no overlay.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Fecha o drawer ao pressionar Esc.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    children: { control: false },
    headerContent: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', background: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Minha Aplicação</span>
        </div>
        <div style={{ flex: 1, padding: '32px 24px', position: 'relative', overflow: 'hidden' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// ---------------------------------------------------------------------------
// Componente wrapper reutilizável
// ---------------------------------------------------------------------------

interface DrawerWrapperProps {
  title?: string;
  customWidth?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  triggerLabel?: string;
  triggerIcon?: React.ReactElement;
  headerContent?: React.ReactNode;
  children?: React.ReactNode;
}

const DrawerWrapper: React.FC<DrawerWrapperProps> = ({
  title = 'Título do Drawer',
  customWidth = '400px',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  triggerLabel = 'Abrir drawer',
  triggerIcon = <Filter16Regular />,
  headerContent,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" icon={triggerIcon} onClick={() => setIsOpen(true)}>
        {triggerLabel}
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        title={title}
        customWidth={customWidth}
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEscape={closeOnEscape}
        headerContent={headerContent}
      >
        {children}
      </Drawer>
    </>
  );
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Uso básico com filtros — caso de uso mais comum do Drawer.
 */
export const Default: Story = {
  render: () => (
    <DrawerWrapper
      title="Filtros"
      triggerLabel="Filtros avançados"
      triggerIcon={<Filter16Regular />}
      headerContent={
        <Button iconOnly variant="outlined" icon={<Search24Regular />} title="Buscar" />
      }
    >
      <FilterContent />
    </DrawerWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstração do uso mais comum do Drawer: um painel de filtros avançados. O controle de abertura/fechamento é gerenciado externamente via estado.',
      },
      source: {
        code: `const [isOpen, setIsOpen] = useState(false);

<Button variant="outlined" icon={<Filter16Regular />} onClick={() => setIsOpen(true)}>
  Filtros avançados
</Button>

<Drawer
  isOpen={isOpen}
  onOpen={() => setIsOpen(true)}
  onClose={() => setIsOpen(false)}
  title="Filtros"
>
  {/* conteúdo de filtros */}
</Drawer>`,
      },
    },
  },
};

/**
 * Detalhe de perfil de usuário dentro do Drawer.
 */
export const UserProfile: Story = {
  render: () => (
    <DrawerWrapper
      title="Perfil do usuário"
      triggerLabel="Ver perfil"
      triggerIcon={<PersonCircle24Regular />}
      headerContent={
        <Button iconOnly variant="outlined" icon={<Settings24Regular />} title="Configurações" />
      }
    >
      <ProfileContent />
    </DrawerWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer exibindo detalhes de perfil de um usuário, com avatar, contatos e ações.',
      },
    },
  },
};

/**
 * Central de notificações no drawer.
 */
export const Notifications: Story = {
  render: () => (
    <DrawerWrapper
      title="Notificações"
      triggerLabel="Ver notificações"
      triggerIcon={<Alert24Regular />}
      customWidth="420px"
      headerContent={
        <Button iconOnly variant="outlined" icon={<ArrowDownload24Regular />} title="Marcar todas como lidas" />
      }
    >
      <NotificationContent />
    </DrawerWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawer utilizado como central de notificações, com diferentes tipos de alerta.',
      },
    },
  },
};

/**
 * Drawer com largura maior — útil para formulários extensos ou tabelas.
 */
export const WideDrawer: Story = {
  render: () => (
    <DrawerWrapper
      title="Editar registro"
      triggerLabel="Editar registro"
      customWidth="600px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <TextField label="Nome" placeholder="Digite nome..." />
          <TextField label="Sobrenome" placeholder="Digite sobrenome..." />
          <TextField label="E-mail" type="email" placeholder="Digite e-mail..." />
          <TextField label="Telefone" type="tel" placeholder="Digite telefone..." />
          <TextField label="Empresa" placeholder="Digite empresa..." />
          <TextField label="Cargo" placeholder="Digite cargo..." />
        </div>
        <TextField label="Observações" placeholder="Adicione observações sobre este registro..." />
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
          <Button variant="outlined">Cancelar</Button>
          <Button variant="filled">Salvar alterações</Button>
        </div>
      </div>
    </DrawerWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Drawer com largura ampliada (`600px`) para acomodar formulários em duas colunas ou conteúdos mais densos.',
      },
    },
  },
};

/**
 * Drawer configurado para NÃO fechar ao clicar no overlay ou pressionar Esc.
 */
export const Persistent: Story = {
  render: () => (
    <DrawerWrapper
      title="Formulário obrigatório"
      triggerLabel="Abrir formulário"
      closeOnOverlayClick={false}
      closeOnEscape={false}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Callout
          type="alert"
          title="Atenção"
          text="Este drawer só fecha pelo botão X no cabeçalho. Clicar fora ou pressionar Esc não o fechará."
        />
        <TextField label="Campo obrigatório *" placeholder="Preencha este campo..." />
        <Button variant="filled" fullWidth>Confirmar</Button>
      </div>
    </DrawerWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Com `closeOnOverlayClick={false}` e `closeOnEscape={false}`, o drawer só pode ser fechado pelo botão X do cabeçalho — útil para etapas obrigatórias.',
      },
    },
  },
};
