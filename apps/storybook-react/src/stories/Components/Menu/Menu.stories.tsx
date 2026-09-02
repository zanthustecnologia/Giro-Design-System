import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu, Button } from '@giro-ds/react';
import type { MenuProps } from '@giro-ds/react';
import {
  Edit16Regular,
  Eye16Regular,
  Archive16Regular,
  Share16Regular,
  Copy16Regular,
  Flag16Regular,
  MoreHorizontal16Regular,
} from '@fluentui/react-icons';

type MenuItemType = MenuProps['items'][number];

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component: 'O Menu é um painel flutuante com lista de ações contextuais, vinculado a um gatilho. Abre ao clicar no gatilho e fecha ao selecionar um item ou clicar fora. Suporta ícones, subtexto, itens desabilitados, submenus aninhados e busca integrada.',
      },
    },
    // layout: 'centered',
  },
  argTypes: {
    search: { control: 'boolean' },
    align: {
      control: { type: 'select' },
      options: ['start', 'end', 'center'],
    },
    children: { table: { disable: true } },
    onItemSelect: { table: { disable: true } },
    selectedItems: { table: { disable: true } },
    onScrollEnd: { table: { disable: true } },
    onApiSearch: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    className: { table: { disable: true } },
    id: { table: { disable: true } },
    scale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
      description: 'Escala visual do menu (dropdown e trigger).',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const acoesItens: MenuItemType[] = [
  { id: '1', text: 'Editar', value: 'editar' },
  { id: '2', text: 'Visualizar', value: 'visualizar' },
  { id: '3', text: 'Duplicar', value: 'duplicar' },
  { id: '4', text: 'Arquivar', value: 'arquivar' },
  { id: '5', text: 'Compartilhar', value: 'compartilhar' },
  { id: '6', text: 'Excluir', value: 'excluir', disabled: true },
];

const acoesComSubtexto: MenuItemType[] = [
  { id: '1', text: 'Editar', subText: 'Alterar dados do registro', value: 'editar' },
  { id: '2', text: 'Visualizar', subText: 'Abrir em modo somente leitura', value: 'visualizar' },
  { id: '3', text: 'Duplicar', subText: 'Criar uma copia identica', value: 'duplicar' },
  { id: '4', text: 'Arquivar', subText: 'Mover para arquivo morto', value: 'arquivar' },
  { id: '5', text: 'Compartilhar', subText: 'Enviar link de acesso', value: 'compartilhar' },
  { id: '6', text: 'Excluir', subText: 'Remover permanentemente', value: 'excluir', disabled: true },
];

const acoesComIcone: MenuItemType[] = [
  { id: '1', text: 'Editar', icon: <Edit16Regular />, value: 'editar' },
  { id: '2', text: 'Visualizar', icon: <Eye16Regular />, value: 'visualizar' },
  { id: '3', text: 'Duplicar', icon: <Copy16Regular />, value: 'duplicar' },
  { id: '4', text: 'Arquivar', icon: <Archive16Regular />, value: 'arquivar' },
  { id: '5', text: 'Compartilhar', icon: <Share16Regular />, value: 'compartilhar' },
  { id: '6', text: 'Reportar', icon: <Flag16Regular />, value: 'reportar', disabled: true },
];

const categorias: MenuItemType[] = [
  {
    id: '1', text: 'Documentos', value: '1',
    children: [
      { id: '1-1', text: 'Contratos', value: '1-1' },
      { id: '1-2', text: 'Relatorios', value: '1-2' },
      { id: '1-3', text: 'Faturas', value: '1-3' },
    ],
  },
  {
    id: '2', text: 'Contatos', value: '2',
    children: [
      { id: '2-1', text: 'Clientes', value: '2-1' },
      { id: '2-2', text: 'Fornecedores', value: '2-2' },
    ],
  },
  {
    id: '3', text: 'Financeiro', value: '3',
    children: [
      { id: '3-1', text: 'Receitas', value: '3-1' },
      { id: '3-2', text: 'Despesas', value: '3-2' },
      { id: '3-3', text: 'Investimentos', value: '3-3' },
    ],
  },
  { id: '4', text: 'Configuracoes', value: '4' },
];

export const Default: Story = {
  render: (args) => (
    <Menu {...args} items={acoesItens}>
      <Button icon={<MoreHorizontal16Regular />} variant="text" iconOnly aria-label="Acoes" tooltipText="Mais ações" />
    </Menu>
  ),
  args: {
    search: false,
    align: 'start',
    scale: 1,
  },
};

export const ComSubtexto: Story = {
  render: () => (
    <Menu items={acoesComSubtexto} search={true}>
      <Button icon={<MoreHorizontal16Regular />} variant="text" iconOnly aria-label="Acoes" tooltipText="Mais ações" />
    </Menu>
  ),
};

export const ComIcone: Story = {
  render: () => (
    <Menu items={acoesComIcone} search={false}>
      <Button icon={<MoreHorizontal16Regular />} variant="text" iconOnly aria-label="Acoes" tooltipText="Mais ações" />
    </Menu>
  ),
};

export const ComSubmenu: Story = {
  render: () => (
    <Menu items={categorias} search={false}>
      <Button variant="outlined">Categorias</Button>
    </Menu>
  ),
};

export const Escalas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', alignItems: 'flex-start' }}>
      <Menu items={acoesItens} scale={1}>
        <Button variant="outlined">Menu 1.0 / Botão 1.0</Button>
      </Menu>
      <Menu items={acoesItens} scale={1.5}>
        <Button variant="outlined">Menu 1.5 / Botão 1.5</Button>
      </Menu>
      <Menu items={acoesItens} scale={2}>
        <Button variant="outlined">Menu 2.0 / Botão 2.0</Button>
      </Menu>
    </div>
  ),
};