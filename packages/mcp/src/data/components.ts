import type { ComponentMetadata } from '../types.js';

export const COMPONENTS: ComponentMetadata[] = [
  {
    name: 'Avatar',
    description: 'Exibe a representação visual de um usuário ou entidade, com suporte a imagem, iniciais e indicador de status.',
    category: 'Components',
    props: [
      { name: 'src', type: 'string', required: false, description: 'URL da imagem do avatar' },
      { name: 'name', type: 'string', required: false, description: 'Nome do usuário — usado para gerar as iniciais quando não há imagem' },
      { name: 'size', type: "'sm' | 'lg'", required: false, defaultValue: "'lg'", description: 'Tamanho do avatar' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o avatar visualmente' },
      { name: 'className', type: 'string', required: false, description: 'Classe CSS adicional' },
    ],
    examples: [
      '<Avatar name="Felipe Joaquim" />',
      '<Avatar src="https://example.com/photo.jpg" size="sm" />',
    ],
  },
  {
    name: 'Badge',
    description: 'Indicador visual compacto para destacar status, contagens ou categorias.',
    category: 'Components',
    props: [
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Conteúdo exibido dentro do badge' },
      { name: 'variant', type: "'filled' | 'outlined' | 'text'", required: false, defaultValue: "'filled'", description: 'Variante visual' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o badge' },
      { name: 'className', type: 'string', required: false, description: 'Classe CSS adicional' },
    ],
    examples: [
      '<Badge>Novo</Badge>',
      '<Badge variant="outlined">Pendente</Badge>',
    ],
  },
  {
    name: 'Button',
    description: 'Botão clicável com suporte a variantes, ícones, estado de loading, link externo e modo apenas-ícone com tooltip automático.',
    category: 'Components',
    props: [
      { name: 'children', type: 'React.ReactNode', required: false, description: 'Conteúdo/label do botão' },
      { name: 'variant', type: "'filled' | 'outlined' | 'text'", required: false, defaultValue: "'filled'", description: 'Variante visual do botão' },
      { name: 'size', type: "'sm' | 'lg'", required: false, defaultValue: "'lg'", description: 'Tamanho do botão' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o botão' },
      { name: 'loading', type: 'boolean', required: false, defaultValue: 'false', description: 'Exibe spinner de loading' },
      { name: 'fullWidth', type: 'boolean', required: false, defaultValue: 'false', description: 'Ocupa 100% da largura do container' },
      { name: 'icon', type: 'React.ReactNode', required: false, description: 'Ícone exibido dentro do botão' },
      { name: 'leftIcon', type: 'React.ReactNode', required: false, description: 'Ícone à esquerda do texto' },
      { name: 'rightIcon', type: 'React.ReactNode', required: false, description: 'Ícone à direita do texto' },
      { name: 'iconOnly', type: 'boolean', required: false, defaultValue: 'false', description: 'Renderiza apenas o ícone sem texto; exibe tooltip automaticamente com tooltipText' },
      { name: 'tooltipText', type: 'string', required: false, description: 'Texto do tooltip quando iconOnly=true' },
      { name: 'tooltipSide', type: "'top' | 'bottom' | 'left' | 'right'", required: false, description: 'Lado do tooltip' },
      { name: 'tooltipAlign', type: "'start' | 'center' | 'end'", required: false, description: 'Alinhamento do tooltip' },
      { name: 'href', type: 'string', required: false, description: 'Renderiza como <a> quando fornecido' },
      { name: 'to', type: 'string', required: false, description: 'Rota para React Router' },
      { name: 'external', type: 'boolean', required: false, defaultValue: 'false', description: 'Abre o link em nova aba' },
      { name: 'as', type: 'React.ElementType', required: false, description: 'Elemento HTML ou componente customizado a renderizar' },
      { name: 'type', type: "'button' | 'submit' | 'reset'", required: false, defaultValue: "'button'", description: 'Tipo HTML do botão' },
      { name: 'onClick', type: '(e: React.MouseEvent) => void', required: false, description: 'Handler de clique' },
    ],
    examples: [
      '<Button variant="filled" onClick={handleClick}>Confirmar</Button>',
      '<Button variant="outlined" size="sm" leftIcon={<PlusCircle20Regular />}>Adicionar</Button>',
      '<Button variant="text" loading={isLoading}>Salvar</Button>',
      '<Button iconOnly icon={<Edit20Regular />} tooltipText="Editar" />',
      '<Button href="https://example.com" external>Ver mais</Button>',
    ],
  },
  {
    name: 'Callout',
    description: 'Caixa de destaque para mensagens informativas, avisos, erros ou alertas de sucesso.',
    category: 'Components',
    props: [
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Conteúdo do callout' },
      { name: 'type', type: "'neutral' | 'brand' | 'color' | 'success' | 'alert'", required: false, defaultValue: "'neutral'", description: 'Tipo visual do callout' },
      { name: 'title', type: 'string', required: false, description: 'Título do callout' },
      { name: 'icon', type: 'React.ReactNode', required: false, description: 'Ícone exibido no callout' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o callout' },
    ],
    examples: [
      '<Callout type="success" title="Salvo!">Suas alterações foram salvas com sucesso.</Callout>',
      '<Callout type="alert" icon={<Warning20Regular />}>Ação irreversível.</Callout>',
    ],
  },
  {
    name: 'Checkbox',
    description: 'Campo de seleção booleana com suporte a estado indeterminado e label.',
    category: 'Components',
    props: [
      { name: 'label', type: 'string', required: false, description: 'Texto exibido ao lado do checkbox' },
      { name: 'checked', type: 'boolean', required: false, description: 'Estado controlado de marcação' },
      { name: 'defaultChecked', type: 'boolean', required: false, description: 'Estado inicial não-controlado' },
      { name: 'indeterminate', type: 'boolean', required: false, defaultValue: 'false', description: 'Estado intermediário (parcialmente selecionado)' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o checkbox' },
      { name: 'onChange', type: '(checked: boolean) => void', required: false, description: 'Handler de mudança de estado' },
    ],
    examples: [
      '<Checkbox label="Aceitar termos" onChange={setAccepted} />',
      '<Checkbox checked={allSelected} indeterminate={someSelected} label="Selecionar todos" />',
    ],
  },
  {
    name: 'Chips',
    description: 'Tag/chip visual para categorização, filtragem ou seleção de opções compactas.',
    category: 'Components',
    props: [
      { name: 'title', type: 'string', required: true, description: 'Texto exibido no chip (obrigatório)' },
      { name: 'type', type: "'neutral' | 'brand' | 'color' | 'success' | 'alert'", required: false, defaultValue: "'neutral'", description: 'Tipo visual do chip' },
      { name: 'leftIcon', type: 'React.ReactNode', required: false, description: 'Ícone à esquerda do texto' },
      { name: 'rightIcon', type: 'React.ReactNode', required: false, description: 'Ícone à direita do texto' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o chip' },
    ],
    examples: [
      '<Chips title="React" type="brand" />',
      '<Chips title="Ativo" type="success" leftIcon={<CheckmarkCircle20Regular />} />',
      '<Chips title="Removível" type="neutral" rightIcon={<Dismiss20Regular />} />',
    ],
  },
  {
    name: 'Dialog',
    description: 'Modal acessível baseado em Radix UI com overlay, título, conteúdo e ações. Substitui o antigo Dialog com props show/onClose.',
    category: 'Components',
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Controla se o dialog está aberto' },
      { name: 'onConfirm', type: '() => void', required: false, description: 'Handler do botão de confirmação' },
      { name: 'onCancel', type: '() => void', required: false, description: 'Handler do botão de cancelamento' },
      { name: 'title', type: 'string', required: false, description: 'Título do dialog' },
      { name: 'children', type: 'React.ReactNode', required: false, description: 'Conteúdo principal do dialog' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita as ações' },
    ],
    examples: [
      `<Dialog open={open} title="Confirmar exclusão" onConfirm={handleDelete} onCancel={() => setOpen(false)}>
  Deseja realmente excluir este item?
</Dialog>`,
    ],
  },
  {
    name: 'Drawer',
    description: 'Painel lateral deslizante com overlay, acessível. Abre pela direita com animação de slide.',
    category: 'Components',
    props: [
      { name: 'isOpen', type: 'boolean', required: true, description: 'Controla se o drawer está aberto' },
      { name: 'onClose', type: '() => void', required: true, description: 'Handler chamado ao fechar' },
      { name: 'title', type: 'string', required: false, defaultValue: "'Título'", description: 'Título exibido no cabeçalho do drawer' },
      { name: 'children', type: 'React.ReactNode', required: false, description: 'Conteúdo do drawer' },
      { name: 'customWidth', type: 'string', required: false, defaultValue: "'400px'", description: 'Largura customizável (ex: "600px")' },
      { name: 'onOpen', type: '() => void', required: false, description: 'Callback chamado ao abrir' },
      { name: 'closeOnOverlayClick', type: 'boolean', required: false, defaultValue: 'true', description: 'Fecha ao clicar no overlay' },
      { name: 'closeOnEscape', type: 'boolean', required: false, defaultValue: 'true', description: 'Fecha ao pressionar ESC' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita interações' },
    ],
    examples: [
      `const [open, setOpen] = React.useState(false);

<Button onClick={() => setOpen(true)}>Abrir Drawer</Button>
<Drawer isOpen={open} onClose={() => setOpen(false)} title="Detalhes">
  <p>Conteúdo do drawer</p>
</Drawer>`,
    ],
  },
  {
    name: 'Dropdown',
    description: 'Menu suspenso de seleção baseado em Radix UI com suporte a grupos, ícones e ações customizadas.',
    category: 'Components',
    props: [
      { name: 'trigger', type: 'React.ReactNode', required: true, description: 'Elemento que abre o dropdown ao ser clicado' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Itens do menu (use DropdownItem, DropdownGroup)' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o dropdown' },
    ],
    examples: [
      `<Dropdown trigger={<Button>Ações</Button>}>
  <DropdownItem onClick={handleEdit}>Editar</DropdownItem>
  <DropdownItem onClick={handleDelete}>Excluir</DropdownItem>
</Dropdown>`,
    ],
  },
  {
    name: 'Menu',
    description: 'Menu de navegação lateral ou horizontal com itens, grupos e indicador de item ativo.',
    category: 'Components',
    props: [
      { name: 'items', type: 'MenuItem[]', required: true, description: 'Array de itens do menu' },
      { name: 'activeItem', type: 'string', required: false, description: 'ID do item atualmente ativo' },
      { name: 'onItemClick', type: '(id: string) => void', required: false, description: 'Handler de clique em item' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o menu' },
    ],
    examples: [
      `<Menu
  items={[{ id: 'home', label: 'Início', icon: <Home20Regular /> }, { id: 'settings', label: 'Configurações' }]}
  activeItem="home"
  onItemClick={setActivePage}
/>`,
    ],
  },
  {
    name: 'Popover',
    description: 'Elemento flutuante baseado em Radix UI que exibe conteúdo contextual ao ativar um trigger. Substitui o padrão de tooltip para conteúdos ricos.',
    category: 'Components',
    props: [
      { name: 'trigger', type: 'React.ReactNode', required: true, description: 'Elemento que aciona o popover' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Conteúdo exibido no popover' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", required: false, defaultValue: "'bottom'", description: 'Lado de abertura' },
      { name: 'align', type: "'start' | 'center' | 'end'", required: false, defaultValue: "'center'", description: 'Alinhamento' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o popover' },
    ],
    examples: [
      `<Popover trigger={<Button variant="outlined">Info</Button>}>
  <p>Conteúdo do popover</p>
</Popover>`,
    ],
  },
  {
    name: 'Quantity',
    description: 'Campo numérico com botões de incremento/decremento para controle de quantidades.',
    category: 'Components',
    props: [
      { name: 'value', type: 'number', required: false, description: 'Valor controlado' },
      { name: 'defaultValue', type: 'number', required: false, defaultValue: '0', description: 'Valor inicial não-controlado' },
      { name: 'min', type: 'number', required: false, description: 'Valor mínimo' },
      { name: 'max', type: 'number', required: false, description: 'Valor máximo' },
      { name: 'step', type: 'number', required: false, defaultValue: '1', description: 'Incremento por passo' },
      { name: 'onChange', type: '(value: number) => void', required: false, description: 'Handler de mudança de valor' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o componente' },
    ],
    examples: [
      '<Quantity value={qty} min={1} max={99} onChange={setQty} />',
    ],
  },
  {
    name: 'Radio',
    description: 'Grupo de botões de rádio para seleção exclusiva entre opções.',
    category: 'Components',
    props: [
      { name: 'options', type: "{ label: string; value: string }[]", required: true, description: 'Array de opções disponíveis' },
      { name: 'value', type: 'string', required: false, description: 'Valor selecionado (controlado)' },
      { name: 'defaultValue', type: 'string', required: false, description: 'Valor inicial (não-controlado)' },
      { name: 'onChange', type: '(value: string) => void', required: false, description: 'Handler de seleção' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita todos os rádios' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", required: false, defaultValue: "'vertical'", description: 'Orientação do grupo' },
    ],
    examples: [
      `<Radio
  options={[{ label: 'Opção A', value: 'a' }, { label: 'Opção B', value: 'b' }]}
  value={selected}
  onChange={setSelected}
/>`,
    ],
  },
  {
    name: 'Search',
    description: 'Campo de busca com ícone de lupa, suporte a debounce e acessibilidade com teclado.',
    category: 'Components',
    props: [
      { name: 'value', type: 'string', required: false, description: 'Valor controlado' },
      { name: 'placeholder', type: 'string', required: false, defaultValue: "'Buscar...'", description: 'Texto placeholder' },
      { name: 'onChange', type: '(value: string) => void', required: false, description: 'Handler de mudança' },
      { name: 'onSearch', type: '(value: string) => void', required: false, description: 'Handler ao confirmar busca (Enter)' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o campo' },
      { name: 'size', type: "'sm' | 'lg'", required: false, defaultValue: "'lg'", description: 'Tamanho do campo' },
    ],
    examples: [
      '<Search value={query} placeholder="Buscar componentes..." onChange={setQuery} />',
    ],
  },
  {
    name: 'Select',
    description: 'Campo de seleção de opção única baseado em Radix UI com suporte a grupos, placeholder e busca.',
    category: 'Components',
    props: [
      { name: 'options', type: "{ label: string; value: string; group?: string }[]", required: true, description: 'Array de opções' },
      { name: 'value', type: 'string', required: false, description: 'Valor selecionado (controlado)' },
      { name: 'defaultValue', type: 'string', required: false, description: 'Valor inicial (não-controlado)' },
      { name: 'placeholder', type: 'string', required: false, description: 'Texto exibido quando nenhuma opção está selecionada' },
      { name: 'onChange', type: '(value: string) => void', required: false, description: 'Handler de seleção' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o select' },
      { name: 'label', type: 'string', required: false, description: 'Label do campo' },
      { name: 'size', type: "'sm' | 'lg'", required: false, defaultValue: "'lg'", description: 'Tamanho do campo' },
    ],
    examples: [
      `<Select
  label="Estado"
  placeholder="Selecione..."
  options={[{ label: 'São Paulo', value: 'sp' }, { label: 'Rio de Janeiro', value: 'rj' }]}
  value={state}
  onChange={setState}
/>`,
    ],
  },
  {
    name: 'Switch',
    description: 'Alternador liga/desliga acessível com label e suporte a estados controlado e não-controlado.',
    category: 'Components',
    props: [
      { name: 'checked', type: 'boolean', required: false, description: 'Estado controlado' },
      { name: 'defaultChecked', type: 'boolean', required: false, description: 'Estado inicial (não-controlado)' },
      { name: 'label', type: 'string', required: false, description: 'Label exibido ao lado do switch' },
      { name: 'onChange', type: '(checked: boolean) => void', required: false, description: 'Handler de mudança' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o switch' },
      { name: 'size', type: "'sm' | 'lg'", required: false, defaultValue: "'lg'", description: 'Tamanho do switch' },
    ],
    examples: [
      '<Switch label="Notificações" checked={enabled} onChange={setEnabled} />',
    ],
  },
  {
    name: 'Table',
    description: 'Tabela de dados com suporte a ordenação, seleção de linhas, paginação e células customizadas.',
    category: 'Components',
    props: [
      { name: 'columns', type: 'Column[]', required: true, description: 'Definição das colunas (key, header, render opcional)' },
      { name: 'data', type: 'Record<string, unknown>[]', required: true, description: 'Array de dados a exibir' },
      { name: 'onRowClick', type: '(row: unknown) => void', required: false, description: 'Handler de clique em linha' },
      { name: 'selectable', type: 'boolean', required: false, defaultValue: 'false', description: 'Habilita seleção de linhas com checkbox' },
      { name: 'onSelectionChange', type: '(selected: unknown[]) => void', required: false, description: 'Handler de mudança de seleção' },
      { name: 'loading', type: 'boolean', required: false, defaultValue: 'false', description: 'Exibe skeleton de loading' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita interações' },
    ],
    examples: [
      `<Table
  columns={[
    { key: 'name', header: 'Nome' },
    { key: 'email', header: 'E-mail' },
    { key: 'status', header: 'Status', render: (row) => <Chips title={row.status} type="success" /> },
  ]}
  data={users}
  selectable
  onSelectionChange={setSelected}
/>`,
    ],
  },
  {
    name: 'TextField',
    description: 'Campo de entrada de texto com suporte a label, placeholder, erro, ícones, máscara e textarea.',
    category: 'Components',
    props: [
      { name: 'label', type: 'string', required: false, description: 'Label do campo' },
      { name: 'value', type: 'string', required: false, description: 'Valor controlado' },
      { name: 'defaultValue', type: 'string', required: false, description: 'Valor inicial (não-controlado)' },
      { name: 'placeholder', type: 'string', required: false, description: 'Texto placeholder' },
      { name: 'error', type: 'string', required: false, description: 'Mensagem de erro exibida abaixo do campo' },
      { name: 'hint', type: 'string', required: false, description: 'Texto de ajuda exibido abaixo do campo' },
      { name: 'leftIcon', type: 'React.ReactNode', required: false, description: 'Ícone à esquerda do input' },
      { name: 'rightIcon', type: 'React.ReactNode', required: false, description: 'Ícone à direita do input' },
      { name: 'multiline', type: 'boolean', required: false, defaultValue: 'false', description: 'Renderiza como textarea' },
      { name: 'rows', type: 'number', required: false, description: 'Número de linhas (quando multiline=true)' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o campo' },
      { name: 'size', type: "'sm' | 'lg'", required: false, defaultValue: "'lg'", description: 'Tamanho do campo' },
      { name: 'onChange', type: '(e: React.ChangeEvent<HTMLInputElement>) => void', required: false, description: 'Handler de mudança' },
    ],
    examples: [
      '<TextField label="Nome" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} />',
      '<TextField label="Descrição" multiline rows={4} />',
      '<TextField label="E-mail" leftIcon={<Mail20Regular />} error="E-mail inválido" />',
    ],
  },
  {
    name: 'Tooltip',
    description: 'Dica flutuante que aparece ao passar o mouse sobre um elemento, baseada em Radix UI.',
    category: 'Components',
    props: [
      { name: 'content', type: 'string', required: true, description: 'Texto exibido no tooltip' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Elemento que aciona o tooltip' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", required: false, defaultValue: "'top'", description: 'Lado de exibição' },
      { name: 'align', type: "'start' | 'center' | 'end'", required: false, defaultValue: "'center'", description: 'Alinhamento' },
      { name: 'disabled', type: 'boolean', required: false, defaultValue: 'false', description: 'Desabilita o tooltip' },
    ],
    examples: [
      '<Tooltip content="Salvar alterações"><Button iconOnly icon={<Save20Regular />} /></Tooltip>',
    ],
  },
];

export const COMPONENT_NAMES = COMPONENTS.map((c) => c.name);
