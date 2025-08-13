import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  MoreVertical16Regular, 
  Edit16Regular, 
  Eye16Regular, 
  Delete16Regular, 
  Settings16Regular, 
  Person16Regular, 
  Mail16Regular, 
  Phone16Regular,
  ChevronDown16Regular,
  Alert16Regular,
  Share16Regular,
  ArrowDownload16Regular,
  Filter16Regular,
} from '@fluentui/react-icons';
import Menu, { MenuItem, MenuProps } from './Menu';
import Button from '../Button/Button';

/**
 * Dados mock básicos
 */
const basicMenuItems: MenuItem[] = [
  { id: 'edit', text: 'Editar', value: 'edit', icon: <Edit16Regular /> },
  { id: 'view', text: 'Visualizar', value: 'view', icon: <Eye16Regular /> },
  { id: 'delete', text: 'Excluir', value: 'delete', icon: <Delete16Regular /> },
];

/**
 * Dados mock para menu de usuário
 */
const userMenuItems: MenuItem[] = [
  { id: 'profile', text: 'Meu Perfil', value: 'profile', icon: <Person16Regular /> },
  { id: 'settings', text: 'Configurações', value: 'settings', icon: <Settings16Regular /> },
  { id: 'logout', text: 'Sair', value: 'logout' },
];

/**
 * Dados mock para filtros
 */
const filterMenuItems: MenuItem[] = [
  { id: 'all', text: 'Todos os itens', value: 'all' },
  { id: 'active', text: 'Apenas ativos', value: 'active' },
  { id: 'inactive', text: 'Apenas inativos', value: 'inactive' },
  { id: 'pending', text: 'Pendentes', value: 'pending' },
];

const bulkActionItems: MenuItem[] = [
  { id: 'export', text: 'Exportar selecionados', value: 'export', icon: <ArrowDownload16Regular /> },
  { id: 'share', text: 'Compartilhar', value: 'share', icon: <Share16Regular /> },
  { id: 'archive', text: 'Arquivar', value: 'archive' },
  { id: 'delete-bulk', text: 'Excluir selecionados', value: 'delete-bulk', icon: <Delete16Regular /> },
];

const mockAction = (actionName: string) => (data: any) => {
  console.log(`${actionName}:`, data);
};

const meta: Meta<MenuProps> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ 
        height: '50vh', 
        padding: '2rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      description: 'Elemento React que servirá como âncora/trigger do menu',
      table: { disable: true }
    },
    menuItems: {
      description: 'Array de itens que compõem o menu',
      table: { disable: true }
    },
    onMenuItemClick: {
      description: 'Callback executado quando um item é clicado',
      table: { disable: true }
    },
    onToggle: {
      description: 'Callback executado quando o menu abre/fecha',
      table: { disable: true }
    },
    type: {
      control: 'select',
      options: ['text', 'checkbox', 'icon'],
      description: 'Tipo de dropdown que define o comportamento dos itens',
    },
    applySearch: {
      control: 'boolean',
      description: 'Habilita campo de busca para filtrar itens',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder do campo de busca',
    },
    showSubText: {
      control: 'boolean',
      description: 'Exibe subtexto nos itens do menu',
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
    },
    id: {
      control: 'text',
      description: 'ID único do componente',
    },
  },
};

export default meta;
type Story = StoryObj<MenuProps>;

export const Default: Story = {
  args: {
    menuItems: basicMenuItems,
    onMenuItemClick: mockAction('onMenuItemClick'),
    onToggle: mockAction('onToggle'),
  },
  render: (args) => (
    <Menu {...args}>
      <Button
        variant="text"
        icon={<MoreVertical16Regular />}
        aria-label="Abrir menu de ações"
      />
    </Menu>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Menu 
  menuItems={menuItems}
  onMenuItemClick={handleMenuItemClick}
>
  <Button
    variant="text"
    icon={<MoreVertical16Regular />}
    aria-label="Abrir menu de ações"
  />
</Menu>
        `,
      },
    },
  },
};

/**
 * Story 2: Menu com Botão Customizado
 * Demonstra flexibilidade de usar qualquer botão como âncora
 */
export const CustomButton: Story = {
  args: {
    menuItems: basicMenuItems,
    onMenuItemClick: mockAction('onMenuItemClick'),
  },
  render: (args) => (
    <Menu {...args}>
      <Button
        variant="outlined"
        text="Ações"
        icon={<Settings16Regular />}
      />
    </Menu>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Menu menuItems={menuItems} onMenuItemClick={handleMenuItemClick}>
  <Button
    variant="outlined"
    text="Ações"
    icon={<Settings16Regular />}
  />
</Menu>
        `,
      },
    },
  },
};

export const LinkAnchor: Story = {
  args: {
    menuItems: filterMenuItems,
    onMenuItemClick: mockAction('onMenuItemClick'),
  },
  render: (args) => (
    <Menu {...args}>
      <Button variant="text" icon={<ChevronDown16Regular />}>
        Filtrar
      </Button>
    </Menu>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Menu menuItems={filterItems} onMenuItemClick={handleMenuItemClick}>
  <a href="#" className="filter-link">
    Filtrar <ChevronDown16Regular />
  </a>
</Menu>
        `,
      },
    },
  },
};

/**
 * Story 5: Menu com Busca
 * Demonstra funcionalidade de busca integrada
 */
export const WithSearch: Story = {
  args: {
    menuItems: bulkActionItems,
    onMenuItemClick: mockAction('onMenuItemClick'),
    applySearch: true,
    placeholder: 'Buscar ações...',
  },
  render: (args) => (
    <Menu {...args}>
      <Button
        variant="filled"
        text="Ações em Lote"
        icon={<Settings16Regular />}
      />
    </Menu>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Menu 
  menuItems={bulkActionItems}
  onMenuItemClick={handleMenuItemClick}
  applySearch={true}
  placeholder="Buscar ações..."
>
  <Button
    variant="filled"
    text="Ações em Lote"
    icon={<Settings16Regular />}
  />
</Menu>
        `,
      },
    },
  },
};

/**
 * Story 6: Menu Checkbox
 * Demonstra tipo checkbox para seleções múltiplas
 */
export const CheckboxType: Story = {
  args: {
    menuItems: [
      { id: 'email', text: 'Mostrar e-mail', subText: 'Exibir endereço de e-mail', icon: <Mail16Regular /> },
      { id: 'phone', text: 'Mostrar telefone', subText: 'Exibir número de telefone', icon: <Phone16Regular /> },
      { id: 'profile', text: 'Mostrar perfil completo', subText: 'Todas as informações do perfil', icon: <Person16Regular /> },
    ],
    type: 'checkbox',
    showSubText: true,
    onMenuItemClick: mockAction('onMenuItemClick'),
  },
  render: (args) => (
    <Menu {...args}>
      <Button
        variant="outlined"
        text="Configurar Exibição"
        icon={<Filter16Regular />}
      />
    </Menu>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Menu 
  menuItems={configItems}
  type="checkbox"
  showSubText={true}
  onMenuItemClick={handleMenuItemClick}
>
  <Button
    variant="outlined"
    text="Configurar Exibição"
    icon={<Filter16Regular />}
  />
</Menu>
        `,
      },
    },
  },
};

/**
 * Story 7: Menu com Notificação
 * Demonstra uso com badge/contador
 */
export const WithNotification: Story = {
  args: {
    menuItems: [
      { id: 'read-all', text: 'Marcar todas como lidas', icon: <Mail16Regular /> },
      { id: 'settings', text: 'Configurações de notificação', icon: <Settings16Regular /> },
    ],
    onMenuItemClick: mockAction('onMenuItemClick'),
  },
  render: (args) => (
    <Menu {...args}>
      <div style={{ position: 'relative' }}>
        <Button
          variant="text"
          icon={<Alert16Regular />}
          aria-label="Notificações"
        />
        <div style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          background: '#ff4444',
          color: 'white',
          borderRadius: '50%',
          width: '16px',
          height: '16px',
          fontSize: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}>
          3
        </div>
      </div>
    </Menu>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Menu menuItems={notificationItems} onMenuItemClick={handleMenuItemClick}>
  <div className="notification-trigger">
    <Button variant="text" icon={<Alert16Regular />} />
    <span className="badge">3</span>
  </div>
</Menu>
        `,
      },
    },
  },
};

