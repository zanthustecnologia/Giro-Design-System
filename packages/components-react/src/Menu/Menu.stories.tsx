import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MoreVertical16Regular, Edit16Regular, Eye16Regular, Delete16Regular, Settings16Regular, Person16Regular, Mail16Regular, Phone16Regular } from '@fluentui/react-icons';
import Menu, { MenuItem, MenuProps } from './Menu';
import Button from '../Button/Button';

/**
 * Dados mock para os itens do menu com texto simples
 */
const mockMenuItems: MenuItem[] = [
  {
    id: 'edit-user',
    text: 'Editar usuário',
    value: 'edit',
  },
  {
    id: 'view-details',
    text: 'Visualizar detalhes',
    value: 'view',
  },
  {
    id: 'remove-user',
    text: 'Remover usuário',
    value: 'remove',
  },
];

/**
 * Dados mock para os itens do menu com ícones
 */
const mockMenuItemsWithIcons: MenuItem[] = [
  {
    id: 'edit-user',
    text: 'Editar usuário',
    value: 'edit',
    icon: <Edit16Regular />,
  },
  {
    id: 'view-details',
    text: 'Visualizar detalhes',
    value: 'view',
    icon: <Eye16Regular />,
  },
  {
    id: 'remove-user',
    text: 'Remover usuário',
    value: 'remove',
    icon: <Delete16Regular />,
  },
];

/**
 * Dados mock para os itens do menu com checkbox
 */
const mockCheckboxItems: MenuItem[] = [
  {
    id: 'show-email',
    text: 'Mostrar e-mail',
    subText: 'Exibe o e-mail do usuário',
    value: 'email',
    icon: <Mail16Regular />,
  },
  {
    id: 'show-phone',
    text: 'Mostrar telefone',
    subText: 'Exibe o telefone do usuário',
    value: 'phone',
    icon: <Phone16Regular />,
  },
  {
    id: 'show-profile',
    text: 'Mostrar perfil',
    subText: 'Exibe informações do perfil',
    value: 'profile',
    icon: <Person16Regular />,
    disabled: true,
  },
  {
    id: 'show-profile-2',
    text: 'Mostrar perfil',
    subText: 'Exibe informações do perfil',
    value: 'profile',
    icon: <Person16Regular />,
    disabled: true,
  },
  {
    id: 'show-profile-3',
    text: 'Mostrar perfil',
    subText: 'Exibe informações do perfil',
    value: 'profile',
    icon: <Person16Regular />,
    disabled: true,
  },
];

// ✅ Definir interface estendida para controles do Storybook
interface StoryArgs extends MenuProps {
  useCustomAnchor?: boolean;
  anchorVariant?: 'text' | 'outlined' | 'filled';
  anchorText?: string;
}

const meta: Meta<StoryArgs> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '40vh', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    menuItems: {
      table: {
        disable: true,
      },
    },
    onMenuItemClick: {
      table: {
        disable: true,
      },
    },
    onToggle: {
      table: {
        disable: true,
      },
    },
    type: {
      control: 'select',
      options: ['text', 'checkbox', 'icon'],
      description: 'Tipo do dropdown que define o comportamento dos itens',
      defaultValue: 'text',
    },
    applySearch: {
      control: 'boolean',
      description: 'Habilita campo de busca para filtrar itens do menu',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder do campo de busca (quando habilitado)',
      defaultValue: 'Buscar...',
    },
    showSubText: {
      control: 'boolean',
      description: 'Controla a exibição do subtexto nos itens do menu',
      defaultValue: false,
    },
    showIcons: {
      control: 'boolean',
      description: 'Controla se os ícones são exibidos nos itens do menu',
      defaultValue: false,
    },
    useCustomAnchor: {
      control: 'boolean',
      description: 'Define se deve usar um botão customizado como âncora',
      defaultValue: false,
    },
    anchorVariant: {
      control: 'select',
      options: ['text', 'outlined', 'filled'],
      description: 'Variante do botão âncora customizado',
      defaultValue: 'outlined',
      if: { arg: 'useCustomAnchor', eq: true },
    },
    anchorText: {
      control: 'text',
      description: 'Texto do botão âncora customizado',
      defaultValue: 'Ações',
      if: { arg: 'useCustomAnchor', eq: true },
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais para personalização',
    },
    id: {
      control: 'text',
      description: 'ID único do componente para identificação',
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

/**
 * Template principal para o componente Menu com controle total de todas as props
 */
const Template = (args: StoryArgs) => {
  const {
    showIcons = false,
    useCustomAnchor = false,
    anchorVariant = 'outlined',
    anchorText = 'Ações',
    type = 'text',
    applySearch = false,
    placeholder = 'Buscar...',
    showSubText = false,
    className,
    id,
    ...restArgs
  } = args;

  /**
   * Função para lidar com cliques nos itens do menu
   */
  const handleMenuItemClick = (item: MenuItem): void => {
    console.log('Item clicado:', item);
    // Para demonstração no Storybook, você pode usar actions addon aqui
  };

  /**
   * Função para controlar o toggle do menu
   */
  const handleToggle = (isOpen: boolean): void => {
    console.log('Menu toggled:', isOpen);
    // Para demonstração no Storybook, você pode usar actions addon aqui
  };

  /**
   * Seleciona os itens baseado no tipo e configurações
   */
  const getMenuItems = (): MenuItem[] => {
    let baseItems: MenuItem[];

    // Seleciona o conjunto base de itens baseado no tipo
    if (type === 'checkbox') {
      baseItems = mockCheckboxItems;
    } else {
      baseItems = showIcons ? mockMenuItemsWithIcons : mockMenuItems;
    }

    // Processa os itens baseado nas configurações
    return baseItems.map((item) => ({
      ...item,
      // Controla a exibição de ícones
      icon: showIcons ? item.icon : undefined,
      // Controla a exibição do subtexto
      subText: showSubText ? item.subText : undefined,
    }));
  };

  /**
   * Renderiza a âncora customizada se habilitada
   */
  const renderCustomAnchor = (): React.ReactElement | undefined => {
    if (!useCustomAnchor) return undefined;

    return <Button variant={anchorVariant} text={anchorText} icon={<Settings16Regular />} />;
  };

  return (
    <Menu
      {...restArgs}
      type={type}
      menuItems={getMenuItems()}
      onToggle={handleToggle}
      onMenuItemClick={handleMenuItemClick}
      applySearch={applySearch}
      placeholder={placeholder}
      showSubText={showSubText}
      showIcons={showIcons}
      className={className}
      id={id}
    >
      {renderCustomAnchor()}
    </Menu>
  );
};

/**
 * Story principal com controle total de todas as propriedades
 * Permite configurar completamente o comportamento do Menu através dos controles do Storybook
 */
export const Default: Story = {
  render: Template,
  args: {
    type: 'text',
    showIcons: false,
    useCustomAnchor: false,
    anchorVariant: 'outlined',
    anchorText: 'Ações',
    applySearch: false,
    placeholder: 'Buscar...',
    showSubText: false,
    className: '',
    id: 'menu-example',
  },
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const menuItems = [
    { id: 'edit', text: 'Editar usuário', value: 'edit' },
    { id: 'view', text: 'Visualizar detalhes', value: 'view' },
    { id: 'remove', text: 'Remover usuário', value: 'remove' },
  ];

  const handleMenuItemClick = (item) => {
    console.log('Item clicado:', item);
  };

  const handleToggle = (isOpen) => {
    console.log('Menu toggled:', isOpen);
  };

  return (
    <Menu
      type="text"
      menuItems={menuItems}
      onMenuItemClick={handleMenuItemClick}
      onToggle={handleToggle}
    />
  );
}
        `.trim(),
      },
    },
  },
};

/**
 * Menu com ícones nos itens
 * Mostra ícones ao lado do texto para melhor identificação visual
 */
export const MenuWithIcons: Story = {
  render: Template,
  args: {
    type: 'icon',
    showIcons: true,
    useCustomAnchor: false,
    applySearch: false,
    showSubText: false,
  },
  parameters: {
    docs: {
      source: {
        code: `
import { Edit16Regular, Eye16Regular, Delete16Regular } from '@fluentui/react-icons';

function Example() {
  const menuItems = [
    {
      id: 'edit',
      text: 'Editar usuário',
      value: 'edit',
      icon: <Edit16Regular />,
    },
    {
      id: 'view',
      text: 'Visualizar detalhes',
      value: 'view',
      icon: <Eye16Regular />,
    },
    {
      id: 'remove',
      text: 'Remover usuário',
      value: 'remove',
      icon: <Delete16Regular />,
    },
  ];

  const handleMenuItemClick = (item) => {
    console.log('Item clicado:', item);
  };

  return (
    <Menu
      type="icon"
      menuItems={menuItems}
      showIcons={true}
      onMenuItemClick={handleMenuItemClick}
    />
  );
}
        `.trim(),
      },
    },
  },
};

/**
 * Menu com campo de busca
 * Permite filtrar os itens do menu através de busca
 */
export const MenuWithSearch: Story = {
  render: Template,
  args: {
    type: 'text',
    showIcons: true,
    useCustomAnchor: false,
    applySearch: true,
    placeholder: 'Buscar ações...',
    showSubText: false,
  },
  parameters: {
    docs: {
      source: {
        code: `
import { Edit16Regular, Eye16Regular, Delete16Regular } from '@fluentui/react-icons';

function Example() {
  const menuItems = [
    {
      id: 'edit',
      text: 'Editar usuário',
      value: 'edit',
      icon: <Edit16Regular />,
    },
    {
      id: 'view',
      text: 'Visualizar detalhes',
      value: 'view',
      icon: <Eye16Regular />,
    },
    {
      id: 'remove',
      text: 'Remover usuário',
      value: 'remove',
      icon: <Delete16Regular />,
    },
  ];

  const handleMenuItemClick = (item) => {
    console.log('Item clicado:', item);
  };

  return (
    <Menu
      type="text"
      menuItems={menuItems}
      showIcons={true}
      applySearch={true}
      placeholder="Buscar ações..."
      onMenuItemClick={handleMenuItemClick}
    />
  );
}
        `.trim(),
      },
    },
  },
};

/**
 * Menu com botão customizado como âncora
 * Utiliza um botão personalizado ao invés do padrão de três pontos
 */
export const MenuWithCustomButton: Story = {
  render: Template,
  args: {
    type: 'text',
    showIcons: false,
    useCustomAnchor: true,
    anchorVariant: 'outlined',
    anchorText: 'Ações',
    applySearch: false,
    showSubText: false,
  },
  parameters: {
    docs: {
      source: {
        code: `
import { Settings16Regular } from '@fluentui/react-icons';
import Button from '../Button/Button';

function Example() {
  const menuItems = [
    { id: 'edit', text: 'Editar usuário', value: 'edit' },
    { id: 'view', text: 'Visualizar detalhes', value: 'view' },
    { id: 'remove', text: 'Remover usuário', value: 'remove' },
  ];

  const handleMenuItemClick = (item) => {
    console.log('Item clicado:', item);
  };

  return (
    <Menu
      type="text"
      menuItems={menuItems}
      onMenuItemClick={handleMenuItemClick}
    >
      <Button
        variant="outlined"
        text="Ações"
        icon={<Settings16Regular />}
      />
    </Menu>
  );
}
        `.trim(),
      },
    },
  },
};

/**
 * Menu com checkboxes e busca
 * Combina seleção múltipla com capacidade de filtrar itens
 */
export const MenuWithCheckboxesAndSearch: Story = {
  render: Template,
  args: {
    type: 'checkbox',
    showIcons: true,
    useCustomAnchor: false,
    applySearch: true,
    showSubText: true,
    placeholder: 'Buscar opções...',
  },
  parameters: {
    docs: {
      source: {
        code: `
import { Mail16Regular, Phone16Regular, Person16Regular } from '@fluentui/react-icons';

function Example() {
  const menuItems = [
    {
      id: 'show-email',
      text: 'Mostrar e-mail',
      subText: 'Exibe o e-mail do usuário',
      value: 'email',
      icon: <Mail16Regular />,
    },
    {
      id: 'show-phone',
      text: 'Mostrar telefone',
      subText: 'Exibe o telefone do usuário',
      value: 'phone',
      icon: <Phone16Regular />,
    },
    {
      id: 'show-profile',
      text: 'Mostrar perfil',
      subText: 'Exibe informações do perfil',
      value: 'profile',
      icon: <Person16Regular />,
    },
  ];

  const handleMenuItemClick = (item) => {
    console.log('Item selecionado:', item);
  };

  return (
    <Menu
      type="checkbox"
      menuItems={menuItems}
      showIcons={true}
      showSubText={true}
      applySearch={true}
      placeholder="Buscar opções..."
      onMenuItemClick={handleMenuItemClick}
    />
  );
}
        `.trim(),
      },
    },
  },
};