import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu, Button } from '@giro-ds/react';
import type { MenuProps } from '@giro-ds/react';
import {
  Delete16Regular,
  Settings16Regular,
  Person16Regular,
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
    layout: 'centered',
  },
  argTypes: {
    search: { control: 'boolean' },
    scale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
    },
    buttonScale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
      description: 'Escala aplicada ao Button trigger do menu',
    },
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

const mockProdutos = [
  { id: '1', text: 'Notebook Dell Inspiron', subText: 'Eletronicos - R$ 3.500', value: '1' },
  { id: '2', text: 'Notebook Lenovo ThinkPad', subText: 'Eletronicos - R$ 4.200', value: '2' },
  { id: '3', text: 'MacBook Pro 14"', subText: 'Eletronicos - R$ 12.000', value: '3' },
  { id: '4', text: 'Mouse Logitech MX Master', subText: 'Perifericos - R$ 450', value: '4' },
  { id: '5', text: 'Teclado Mecanico Keychron', subText: 'Perifericos - R$ 650', value: '5' },
  { id: '6', text: 'Monitor LG UltraWide', subText: 'Monitores - R$ 2.500', value: '6' },
  { id: '7', text: 'Webcam Logitech C920', subText: 'Perifericos - R$ 380', value: '7' },
  { id: '8', text: 'Headset HyperX Cloud', subText: 'Audio - R$ 550', value: '8' },
  { id: '9', text: 'SSD Samsung 1TB', subText: 'Armazenamento - R$ 600', value: '9' },
  { id: '10', text: 'HD Externo Seagate 2TB', subText: 'Armazenamento - R$ 400', value: '10' },
  { id: '11', text: 'Impressora HP LaserJet', subText: 'Impressoras - R$ 1.800', value: '11' },
  { id: '12', text: 'Scanner Epson', subText: 'Scanners - R$ 900', value: '12' },
  { id: '13', text: 'Tablet Samsung Galaxy Tab', subText: 'Tablets - R$ 2.200', value: '13' },
  { id: '14', text: 'iPad Pro 12.9"', subText: 'Tablets - R$ 9.500', value: '14' },
  { id: '15', text: 'Camera Canon EOS', subText: 'Cameras - R$ 5.500', value: '15' },
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
    buttonScale: 1,
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

const ApiSearchDemo = () => {
  const [items, setItems] = useState<MenuItemType[]>(mockProdutos.slice(0, 8));
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleApiSearch = async (term: string) => {
    setIsLoadingMore(true);
    await new Promise((r) => setTimeout(r, 400));
    const filtered = term
      ? mockProdutos.filter(
          (p) =>
            p.text.toLowerCase().includes(term.toLowerCase()) ||
            p.subText.toLowerCase().includes(term.toLowerCase())
        )
      : mockProdutos.slice(0, 8);
    setItems(filtered);
    setIsLoadingMore(false);
  };

  return (
    <Menu
      items={items}
      enableApiSearch
      onApiSearch={handleApiSearch}
      isLoadingMore={isLoadingMore}
      search
    >
      <Button variant="outlined">Buscar produto</Button>
    </Menu>
  );
};

export const BuscaAPI: Story = {
  render: () => <ApiSearchDemo />,
};

const generateItems = (page: number, size = 15): MenuItemType[] =>
  Array.from({ length: size }, (_, i) => {
    const n = page * size + i + 1;
    return { id: String(n), text: `Produto ${n}`, subText: `SKU-${String(n).padStart(4, '0')}`, value: String(n) };
  });

const InfiniteScrollDemo = () => {
  const [items, setItems] = useState<MenuItemType[]>(() => generateItems(0));
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const total = 100;

  const handleScrollEnd = async () => {
    if (isLoadingMore || items.length >= total) return;
    setIsLoadingMore(true);
    await new Promise((r) => setTimeout(r, 600));
    const next = page + 1;
    setItems((prev) => [...prev, ...generateItems(next)]);
    setPage(next);
    setIsLoadingMore(false);
  };

  return (
    <Menu
      items={items}
      enableInfiniteScroll
      onScrollEnd={handleScrollEnd}
      isLoadingMore={isLoadingMore}
      search
    >
      <Button variant="outlined">Lista longa ({total} itens)</Button>
    </Menu>
  );
};

export const ScrollInfinito: Story = {
  render: () => <InfiniteScrollDemo />,
};

export const Escalas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'flex-start' }}>
      <Menu items={acoesItens} scale={1} buttonScale={1}>
        <Button variant="outlined">Menu 1.0 / Botão 1.0</Button>
      </Menu>
      <Menu items={acoesItens} scale={1.5} buttonScale={1.5}>
        <Button variant="outlined">Menu 1.5 / Botão 1.5</Button>
      </Menu>
      <Menu items={acoesItens} scale={2} buttonScale={2}>
        <Button variant="outlined">Menu 2.0 / Botão 2.0</Button>
      </Menu>
    </div>
  ),
};