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
} from '@fluentui/react-icons';
import Menu, { MenuItem, MenuProps } from './Menu';
import Button from '../Button/Button';

/**
 * Dados mock básicos
 */
const basicMenuItems: MenuItem[] = [
  { id: 'edit', text: 'Editar', value: 'edit', subText: 'Arquivar', icon: <Edit16Regular /> },
  { id: 'view', text: 'Visualizar', value: 'view', subText: 'Ver detalhes', icon: <Eye16Regular /> },
  { id: 'delete', text: 'Excluir', value: 'delete', subText: 'Remover', icon: <Delete16Regular /> },
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
  tags: ['autodocs'],
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
      options: ['text', 'icon'],
      description: 'Tipo de dropdown que define o comportamento dos itens',
    },
    minWidth: {
      control: 'text',
      description: 'Largura mínima do menu',
    },
    maxWidth: {
      control: 'text',
      description: 'Largura máxima do menu',
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
    position: {
      control: 'select',
      options: ['left', 'right', 'auto'],
      description: 'Posição do menu em relação ao elemento âncora',
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
  render: (args) => {
    const { showSubText } = args;
    return (
      <>
      <Menu {...args} showSubText={showSubText}>
        <Button
          iconOnly={true}
          icon={<MoreVertical16Regular />}
          aria-label="Abrir menu de ações"
        />
      </Menu>
      </>
    );
  },
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
    <div style={{display: 'flex', flexDirection: 'column'}}>
    <Menu {...args}>
      <Button
        variant="outlined"
        text="Ações"
        iconOnly={true}
        icon={<Settings16Regular />}
      />
    </Menu>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime error amet eum optio tenetur libero magni corrupti ducimus fugiat? Distinctio modi alias odit dolore laudantium, dolorem dolores inventore earum rerum?</p>
    </div>
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
    placeholder: 'Buscar',
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
  placeholder="Buscar"
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
          iconOnly={true}
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

/**
 * Menu com posicionamento à esquerda
 */
