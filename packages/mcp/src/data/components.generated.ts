// AUTO-GENERATED — do not edit manually
// Run: pnpm --filter @giro-ds/mcp generate
import type { ComponentMetadata } from '../types.js';

export const COMPONENTS: ComponentMetadata[] = [
  {
    "name": "Avatar",
    "description": "Props do componente Avatar",
    "category": "Components",
    "props": [
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Ícone ou conteúdo a ser exibido no fallback quando não há imagem ou ela falha ao carregar"
      },
      {
        "name": "size",
        "type": "Size",
        "required": false,
        "defaultValue": "'lg'",
        "description": "Tamanho do avatar: 'sm' (32px) ou 'lg' (44px)."
      },
      {
        "name": "src",
        "type": "string",
        "required": false,
        "description": "URL da imagem do avatar. Quando fornecido, exibe a imagem; caso contrário, mostra o ícone"
      },
      {
        "name": "initialLetters",
        "type": "string",
        "required": false,
        "description": "Texto alternativo da imagem do avatar, usado como as iniciais do nome"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      }
    ],
    "examples": [
      "// Avatar com ícone\n<Avatar icon={<UserIcon />} size=\"lg\" />\n\n// Avatar com imagem\n<Avatar src=\"https://example.com/avatar.jpg\" icon={<UserIcon />} size=\"sm\" />"
    ],
    "keywords": [
      "avatar",
      "props",
      "componente"
    ]
  },
  {
    "name": "Badge",
    "description": "Props do componente Badge",
    "category": "Components",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Conteúdo a ser envolvido pelo badge. Quando presente, o badge é posicionado sobre o children (modo overlay)."
      },
      {
        "name": "badgeValue",
        "type": "number | string | null",
        "required": false,
        "description": "Valor exibido no badge — aceita número ou string formatada (ex: \"+3\")"
      },
      {
        "name": "'aria-label'",
        "type": "string",
        "required": false,
        "description": "Label acessível para leitores de tela"
      },
      {
        "name": "filterVariant",
        "type": "boolean",
        "required": false,
        "description": "Quando `true`, aplica a variante de cor do Filter (fundo azul em vez do padrão vermelho)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      }
    ],
    "examples": [
      "// Modo overlay: badge flutua sobre o children\n<Badge badgeValue={5}>\n  <IconButton icon={<BellIcon />} />\n</Badge>",
      "// Modo inline: badge standalone ao lado de outros elementos\n<Badge badgeValue=\"+3\" aria-label=\"3 novos itens\" />"
    ],
    "keywords": [
      "badge",
      "props",
      "componente"
    ]
  },
  {
    "name": "Calendar",
    "description": "",
    "category": "Components",
    "props": [
      {
        "name": "selected",
        "type": "Date | null",
        "required": false,
        "description": "Data selecionada atualmente (usada pelo DatePicker)."
      },
      {
        "name": "currentDate",
        "type": "Date | null",
        "required": false,
        "description": "Mês exibido no calendário. Use junto com `onDateChange` para\r\ncontrolar a navegação externamente."
      },
      {
        "name": "defaultMonth",
        "type": "Date",
        "required": false,
        "defaultValue": "currentDate",
        "description": "Mês inicial padrão exibido quando não controlado."
      },
      {
        "name": "startMonth",
        "type": "Date",
        "required": false,
        "description": "Primeiro mês navegável."
      },
      {
        "name": "endMonth",
        "type": "Date",
        "required": false,
        "description": "Último mês navegável."
      },
      {
        "name": "onDaySelect",
        "type": "(date: Date) => void",
        "required": false,
        "description": "Chamado quando o usuário seleciona um dia."
      },
      {
        "name": "onDateChange",
        "type": "(date: Date) => void",
        "required": false,
        "description": "Chamado quando o usuário navega entre meses."
      },
      {
        "name": "onClear",
        "type": "() => void",
        "required": false,
        "description": "Chamado quando o usuário limpa a seleção."
      },
      {
        "name": "minDate",
        "type": "Date",
        "required": false,
        "description": "Data mínima selecionável."
      },
      {
        "name": "maxDate",
        "type": "Date",
        "required": false,
        "description": "Data máxima selecionável."
      },
      {
        "name": "disabled",
        "type": "Matcher | Matcher[]",
        "required": false,
        "description": "Dias desabilitados — aceita qualquer `Matcher` do react-day-picker\r\n(Date, DateRange, DateBefore, DateAfter, DayOfWeek, função…)."
      },
      {
        "name": "format",
        "type": "DateFormat",
        "required": false,
        "description": "Formato de exibição da data."
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "defaultValue": "'pt-br'",
        "description": "Idioma da interface — aceita os códigos internos do design system."
      },
      {
        "name": "'aria-label'",
        "type": "string",
        "required": false,
        "description": "Atributo `aria-label` para o elemento raiz."
      },
      {
        "name": "autoFocus",
        "type": "boolean",
        "required": false,
        "description": "Foca automaticamente o primeiro dia selecionado ou hoje."
      },
      {
        "name": "classNames",
        "type": "Partial<Record<string, string>>",
        "required": false,
        "description": "Substitui os `classNames` padrão do react-day-picker."
      }
    ],
    "examples": [],
    "keywords": [
      "calendar"
    ]
  },
  {
    "name": "Callout",
    "description": "Props do componente Callout",
    "category": "Components",
    "props": [
      {
        "name": "variant",
        "type": "Exclude<TextVariant, 'color'>",
        "required": false,
        "description": "Variante semântica do callout"
      },
      {
        "name": "title",
        "type": "React.ReactNode",
        "required": false,
        "description": "Título principal do callout"
      },
      {
        "name": "text",
        "type": "React.ReactNode",
        "required": true,
        "description": "Conteúdo descritivo do callout"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Ícone a ser exibido no callout"
      },
      {
        "name": "onDismiss",
        "type": "() => void",
        "required": false,
        "description": "Callback chamado ao clicar no botão de fechar."
      },
      {
        "name": "dismiss",
        "type": "boolean",
        "required": false,
        "description": "Exibe o botão de fechar. Requer onDismiss."
      },
      {
        "name": "backgroundColor",
        "type": "string",
        "required": false,
        "description": "Nome do token de cor de fundo (sem `--`). Sobrescreve a cor da variante."
      },
      {
        "name": "textColor",
        "type": "string",
        "required": false,
        "description": "Nome do token de cor do texto e ícone (sem `--`). Sobrescreve a cor padrão."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      }
    ],
    "examples": [
      "<Callout\n  variant=\"success\"\n  title=\"Sucesso!\"\n  text=\"Operação realizada com sucesso\"\n  icon={<CheckIcon />}\n/>",
      "<Callout\n  variant=\"alert\"\n  title=\"Atenção\"\n  text=\"Verifique os campos obrigatórios\"\n  dismiss\n  onDismiss={() => setVisible(false)}\n/>"
    ],
    "keywords": [
      "callout",
      "props",
      "componente"
    ]
  },
  {
    "name": "Card",
    "description": "Props do componente Card",
    "category": "Components",
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "Conteúdo a ser renderizado dentro do card"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS customizada aplicada ao elemento raiz do card"
      },
      {
        "name": "hoverable",
        "type": "boolean",
        "required": false,
        "description": "Define se o card é interativo, aplicando estilos de hover e cursor pointer"
      }
    ],
    "examples": [
      "<Card>\n  <h1>Conteúdo da página</h1>\n  <p>Texto dentro do card</p>\n</Card>"
    ],
    "keywords": [
      "card",
      "props",
      "componente"
    ]
  },
  {
    "name": "Checkbox",
    "description": "Props do componente Checkbox",
    "category": "Components",
    "props": [
      {
        "name": "label",
        "type": "React.ReactNode",
        "required": false,
        "description": "Label ou conteúdo a ser exibido ao lado do checkbox"
      },
      {
        "name": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Callback executado quando o estado muda: (checked) => void"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "required": false,
        "description": "Estado inicial (modo não controlado)"
      },
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": "Estado atual (modo controlado)"
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "required": false,
        "description": "Estado indeterminado (usado em selecionar todos com seleção parcial)"
      }
    ],
    "examples": [
      "<Checkbox \n  label=\"Aceito os termos\"\n  checked={accepted}\n  onCheckedChange={setAccepted}\n/>",
      "<Checkbox \n  label=\"Selecionar todos\"\n  indeterminate={someSelected}\n  onCheckedChange={handleSelectAll}\n  disabled={isLoading}\n/>"
    ],
    "keywords": [
      "checkbox",
      "props",
      "componente"
    ]
  },
  {
    "name": "Chips",
    "description": "Props do componente Chips",
    "category": "Components",
    "props": [
      {
        "name": "variant",
        "type": "Exclude<TextVariant, 'color'>",
        "required": false,
        "description": "Variante semântica do chip. Define o preset de cor de fundo."
      },
      {
        "name": "backgroundColor",
        "type": "string",
        "required": false,
        "description": "Token CSS para a cor de fundo. Ex: 'color-brand-secondary-medium'. Sobrescreve o variant."
      },
      {
        "name": "textColor",
        "type": "string",
        "required": false,
        "description": "Token CSS para a cor do texto e ícones. Ex: 'color-brand-secondary-dark'. Sobrescreve o variant."
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "Conteúdo exibido dentro do chip"
      },
      {
        "name": "leftIcon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Ícone posicionado à esquerda do texto"
      },
      {
        "name": "rightIcon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Ícone posicionado à direita do texto"
      }
    ],
    "examples": [
      "<Chips variant=\"success\" leftIcon={<CheckIcon />}>\n  Ativo\n</Chips>",
      "<Chips\n  backgroundColor=\"color-brand-secondary-medium\"\n  textColor=\"color-brand-secondary-dark\"\n>\n  Alerta\n</Chips>"
    ],
    "keywords": [
      "chips",
      "props",
      "componente"
    ]
  },
  {
    "name": "Container",
    "description": "Props do componente Container",
    "category": "Components",
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "Conteúdo a ser renderizado dentro do container"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS customizada aplicada ao elemento raiz do container"
      }
    ],
    "examples": [
      "<Container>\n  <h1>Conteúdo da página</h1>\n  <p>Texto dentro do container</p>\n</Container>"
    ],
    "keywords": [
      "container",
      "props",
      "componente"
    ]
  },
  {
    "name": "DatePicker",
    "description": "Props do componente DatePicker",
    "category": "Components",
    "props": [
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "description": "Idioma para formatação da data"
      },
      {
        "name": "calendarSide",
        "type": "Side",
        "required": false,
        "description": "Posição do calendário em relação ao campo"
      },
      {
        "name": "calendarAlign",
        "type": "Exclude<Align, 'center'>",
        "required": false,
        "description": "Alinhamento do calendário em relação ao campo"
      },
      {
        "name": "helperText",
        "type": "string",
        "required": false,
        "description": "Texto de ajuda exibido abaixo do campo"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "description": "Define se o campo é obrigatório"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Label do campo de data"
      },
      {
        "name": "value",
        "type": "Date | null",
        "required": false,
        "description": "Valor controlado da data"
      },
      {
        "name": "defaultValue",
        "type": "Date | null",
        "required": false,
        "description": "Valor inicial para modo não controlado"
      },
      {
        "name": "onChange",
        "type": "(date: Date | null) => void",
        "required": false,
        "description": "Callback executado quando a data muda: (date) => void"
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "description": "Mensagem de erro a ser exibida"
      },
      {
        "name": "minDate",
        "type": "Date",
        "required": false,
        "description": "Data mínima selecionável"
      },
      {
        "name": "maxDate",
        "type": "Date",
        "required": false,
        "description": "Data máxima selecionável"
      },
      {
        "name": "'data-testid'",
        "type": "string",
        "required": false,
        "description": "ID para testes automatizados"
      }
    ],
    "examples": [
      "<DatePicker \n  label=\"Data de nascimento\"\n  value={birthDate}\n  onChange={setBirthDate}\n  locale=\"pt-br\"\n/>",
      "<DatePicker \n  label=\"Data de início\"\n  required\n  helperText=\"Selecione a data de início do projeto\"\n  minDate={new Date()}\n  calendarSide=\"right\"\n  error={errorMessage}\n/>"
    ],
    "keywords": [
      "datepicker",
      "props",
      "componente"
    ]
  },
  {
    "name": "Dialog",
    "description": "Props do componente Dialog",
    "category": "Components",
    "props": [
      {
        "name": "show",
        "type": "boolean",
        "required": false,
        "description": "Controla a visibilidade do Dialog"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Título exibido no cabeçalho do Dialog"
      },
      {
        "name": "bodyContent",
        "type": "ReactNode",
        "required": false,
        "description": "Texto ou conteúdo do corpo do Dialog"
      },
      {
        "name": "textPrimaryAction",
        "type": "string",
        "required": false,
        "description": "Texto do botão de ação primária"
      },
      {
        "name": "textSecondaryAction",
        "type": "string",
        "required": false,
        "description": "Texto do botão de ação secundária"
      },
      {
        "name": "onPrimaryAction",
        "type": "() => void",
        "required": false,
        "description": "Função chamada ao executar a ação primária"
      },
      {
        "name": "onSecondaryAction",
        "type": "() => void",
        "required": false,
        "description": "Função chamada ao executar a ação secundária"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      }
    ],
    "examples": [
      "<Dialog\n  title=\"Confirmar ação\"\n  bodyContent=\"Tem certeza que deseja continuar?\"\n  textPrimaryAction=\"Confirmar\"\n  textSecondaryAction=\"Cancelar\"\n/>"
    ],
    "keywords": [
      "dialog",
      "props",
      "componente"
    ]
  },
  {
    "name": "Drawer",
    "description": "Props do componente Drawer",
    "category": "Components",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Conteúdo a ser exibido dentro do drawer"
      },
      {
        "name": "headerContent",
        "type": "ReactNode",
        "required": false,
        "description": "Conteúdo customizado do cabeçalho"
      },
      {
        "name": "customWidth",
        "type": "string",
        "required": false,
        "description": "Largura customizada do drawer (ex: '400px', '50%')"
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback executado ao fechar o drawer: () => void"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Título exibido no cabeçalho do drawer"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Define se o drawer está aberto"
      },
      {
        "name": "onOpen",
        "type": "() => void",
        "required": false,
        "description": "Callback executado ao abrir o drawer: () => void"
      },
      {
        "name": "onOverlayClick",
        "type": "() => void",
        "required": false,
        "description": "Callback executado ao clicar no overlay: () => void"
      },
      {
        "name": "closeOnOverlayClick",
        "type": "boolean",
        "required": false,
        "description": "Define se o drawer fecha ao clicar no overlay"
      },
      {
        "name": "closeOnEscape",
        "type": "boolean",
        "required": false,
        "description": "Define se o drawer fecha ao pressionar ESC"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "required": false,
        "description": "Conteúdo fixo exibido abaixo da área rolável, sem acompanhar o scroll"
      }
    ],
    "examples": [
      "<Drawer \n  isOpen={isDrawerOpen}\n  onClose={handleClose}\n  title=\"Menu\"\n>\n  <nav>\n    <a href=\"/home\">Home</a>\n    <a href=\"/about\">Sobre</a>\n  </nav>\n</Drawer>",
      "<Drawer \n  isOpen={showDrawer}\n  onClose={() => setShowDrawer(false)}\n  title=\"Configurações\"\n  customWidth=\"400px\"\n  closeOnOverlayClick={true}\n  closeOnEscape={true}\n>\n  <Settings />\n</Drawer>"
    ],
    "keywords": [
      "drawer",
      "props",
      "componente"
    ]
  },
  {
    "name": "Filter",
    "description": "Props do componente Filter",
    "category": "Components",
    "props": [
      {
        "name": "items",
        "type": "FilterItem[]",
        "required": false,
        "description": "Array de itens para filtros do tipo dropdown"
      },
      {
        "name": "type",
        "type": "FilterType",
        "required": false,
        "description": "Tipo do filtro (dropdown ou calendário)"
      },
      {
        "name": "selectedIds",
        "type": "string[]",
        "required": false,
        "description": "IDs dos itens selecionados"
      },
      {
        "name": "onApplyFilter",
        "type": "(selectedIds: string[]) => void",
        "required": false,
        "description": "Callback executado ao aplicar filtro: (selectedIds) => void"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder do campo de busca"
      },
      {
        "name": "enableSearch",
        "type": "boolean",
        "required": false,
        "description": "Habilita campo de busca no dropdown"
      },
      {
        "name": "buttonText",
        "type": "string | ReactNode",
        "required": false,
        "description": "Texto ou conteúdo do botão de filtro"
      },
      {
        "name": "icon",
        "type": "ReactElement",
        "required": false,
        "description": "Ícone do botão de filtro"
      },
      {
        "name": "variant",
        "type": "Variant",
        "required": false,
        "description": "Variante visual do botão"
      },
      {
        "name": "onOpen",
        "type": "() => void",
        "required": false,
        "description": "Callback executado ao abrir o filtro: () => void"
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": false,
        "description": "Callback executado ao fechar o filtro: () => void"
      },
      {
        "name": "side",
        "type": "Side",
        "required": false,
        "description": "Posição do popover em relação ao botão"
      },
      {
        "name": "align",
        "type": "Exclude<Align, 'center'>",
        "required": false,
        "description": "Alinhamento do popover em relação ao botão"
      },
      {
        "name": "selectedDate",
        "type": "Date | null",
        "required": false,
        "description": "Data selecionada (para tipo calendar)"
      },
      {
        "name": "onDateSelect",
        "type": "(date: Date) => void",
        "required": false,
        "description": "Callback executado ao selecionar data: (date) => void"
      },
      {
        "name": "onClearDate",
        "type": "() => void",
        "required": false,
        "description": "Callback executado ao limpar data: () => void"
      },
      {
        "name": "minDate",
        "type": "Date",
        "required": false,
        "description": "Data mínima selecionável (para tipo calendar)"
      },
      {
        "name": "maxDate",
        "type": "Date",
        "required": false,
        "description": "Data máxima selecionável (para tipo calendar)"
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "description": "Idioma do calendário"
      },
      {
        "name": "className",
        "type": "BaseProps['className']",
        "required": false,
        "description": "Classe CSS opcional"
      },
      {
        "name": "mode",
        "type": "'simple' | 'combined'",
        "required": false,
        "description": "Modo de exibição do filtro\r\n- `'simple'`: filtro simples com popover (padrão)\r\n- `'combined'`: filtro combinado com painel lateral onde o conteúdo é composto via children"
      },
      {
        "name": "drawerWidth",
        "type": "string",
        "required": false,
        "description": "Largura do painel lateral no modo combined (ex: '400px', '50vw'). Quando omitido, usa o tamanho padrão do Drawer"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Título do painel lateral (padrão: 'Filtrar')"
      },
      {
        "name": "activeCount",
        "type": "number",
        "required": false,
        "description": "Número de filtros ativos exibido como badge no botão"
      },
      {
        "name": "drawerHeaderContent",
        "type": "ReactNode",
        "required": false,
        "description": "Conteúdo customizado no cabeçalho do Drawer"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Conteúdo do painel lateral no modo combined"
      },
      {
        "name": "onApply",
        "type": "() => void",
        "required": false,
        "description": "Callback ao aplicar no modo combined: () => void"
      },
      {
        "name": "onClear",
        "type": "() => void",
        "required": false,
        "description": "Callback ao limpar no modo combined: () => void"
      }
    ],
    "examples": [
      "<Filter \n  items={filterItems}\n  type=\"multiple\"\n  placeholder=\"Filtrar por categoria\"\n  onApplyFilter={(ids) => handleFilter(ids)}\n  buttonText=\"Filtros\"\n/>",
      "<Filter \n  type=\"calendar\"\n  selectedDate={selectedDate}\n  onDateSelect={handleDateSelect}\n  minDate={new Date('2024-01-01')}\n  locale=\"pt-br\"\n  icon={<CalendarIcon />}\n/>"
    ],
    "keywords": [
      "filter",
      "props",
      "componente"
    ]
  },
  {
    "name": "ListItem",
    "description": "Props do componente ListItem",
    "category": "Components",
    "props": [
      {
        "name": "variant",
        "type": "ListItemVariant",
        "required": false,
        "description": "Variante do item da lista"
      },
      {
        "name": "text",
        "type": "string",
        "required": false,
        "description": "Texto principal do item"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Nome do input (para variantes checkbox/radio)"
      },
      {
        "name": "subText",
        "type": "string",
        "required": false,
        "description": "Texto secundário/descrição do item"
      },
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": "Estado de checked (para variantes checkbox/radio)"
      },
      {
        "name": "selected",
        "type": "boolean",
        "required": false,
        "description": "Estado de selecionado (para variantes text/icon)"
      },
      {
        "name": "onClick",
        "type": "(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void",
        "required": false,
        "description": "Callback executado ao clicar no item: (event) => void"
      },
      {
        "name": "onChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Callback executado quando o estado muda: (checked) => void"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Ícone do item (para variante icon)"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Valor do input (para variantes checkbox/radio)"
      },
      {
        "name": "showSubText",
        "type": "boolean",
        "required": false,
        "description": "Controla a visibilidade do subtexto explicitamente, independentemente de `subText` estar preenchido"
      },
      {
        "name": "hovered",
        "type": "boolean",
        "required": false,
        "description": "Força o estado visual de hover no item (útil para controle externo de foco/seleção)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      }
    ],
    "examples": [
      "<ListItem \n  variant=\"text\"\n  text=\"Item da lista\"\n  subText=\"Descrição do item\"\n  onClick={handleClick}\n/>",
      "<ListItem \n  variant=\"checkbox\"\n  text=\"Aceitar termos\"\n  checked={isChecked}\n  onChange={setIsChecked}\n  disabled={false}\n/>"
    ],
    "keywords": [
      "listitem",
      "props",
      "componente"
    ]
  },
  {
    "name": "Menu",
    "description": "Props do componente Menu",
    "category": "Components",
    "props": [
      {
        "name": "items",
        "type": "MenuItemProps[]",
        "required": true,
        "description": "Array de itens do menu"
      },
      {
        "name": "children",
        "type": "ReactElement",
        "required": false,
        "description": "Elemento trigger customizado para abrir o menu"
      },
      {
        "name": "type",
        "type": "'text' | 'icon'",
        "required": false,
        "description": "Tipo de visualização dos itens do menu.\r\n- `'text'` (padrão): exibe texto e ícone lado a lado\r\n- `'icon'`: exibe apenas ícones, sem texto"
      },
      {
        "name": "onItemSelect",
        "type": "(items: MenuItemProps) => void",
        "required": false,
        "description": "Callback executado quando um item é selecionado: (item) => void"
      },
      {
        "name": "selectedItems",
        "type": "MenuItemProps[]",
        "required": false,
        "description": "Array de itens selecionados"
      },
      {
        "name": "search",
        "type": "boolean",
        "required": false,
        "description": "Habilita campo de busca"
      },
      {
        "name": "align",
        "type": "'start' | 'end' | 'center'",
        "required": false,
        "description": "Alinhamento do menu"
      },
      {
        "name": "maxHeight",
        "type": "number | string",
        "required": false,
        "description": "Altura máxima do menu"
      },
      {
        "name": "enableInfiniteScroll",
        "type": "boolean",
        "required": false,
        "description": "Habilita scroll infinito"
      },
      {
        "name": "onScrollEnd",
        "type": "() => void",
        "required": false,
        "description": "Callback executado ao chegar ao final do scroll: () => void"
      },
      {
        "name": "isLoadingMore",
        "type": "boolean",
        "required": false,
        "description": "Estado de carregamento de mais itens"
      },
      {
        "name": "enableApiSearch",
        "type": "boolean",
        "required": false,
        "description": "Habilita busca via API"
      },
      {
        "name": "onApiSearch",
        "type": "(searchTerm: string) => void",
        "required": false,
        "description": "Callback executado na busca via API: (searchTerm) => void"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Callback executado quando o menu abre/fecha: (open) => void"
      }
    ],
    "examples": [
      "<Menu \n  items={[\n    { id: '1', text: 'Perfil', icon: <UserIcon /> },\n    { id: '2', text: 'Configurações', icon: <SettingsIcon /> }\n  ]}\n  onItemSelect={(item) => handleSelect(item)}\n>\n  <Button>Menu</Button>\n</Menu>",
      "<Menu \n  items={menuItems}\n  type=\"icon\"\n  search={true}\n  enableInfiniteScroll={true}\n  onScrollEnd={loadMore}\n  maxHeight=\"400px\"\n  align=\"end\"\n/>"
    ],
    "keywords": [
      "menu",
      "props",
      "componente"
    ]
  },
  {
    "name": "Modal",
    "description": "Props do componente Modal",
    "category": "Components",
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Define se o modal está aberto"
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback executado ao fechar o modal"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Título exibido no cabeçalho do modal"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Conteúdo a ser exibido dentro do modal"
      },
      {
        "name": "headerContent",
        "type": "ReactNode",
        "required": false,
        "description": "Conteúdo customizado no cabeçalho, exibido ao lado do título"
      },
      {
        "name": "closeOnOverlayClick",
        "type": "boolean",
        "required": false,
        "description": "Define se o modal fecha ao clicar no overlay (padrão: true)"
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "required": false,
        "description": "Conteúdo do rodapé do modal"
      },
      {
        "name": "customWidth",
        "type": "string",
        "required": false,
        "description": "Largura customizada do modal (ex: '500px', '80%')"
      },
      {
        "name": "fullscreen",
        "type": "boolean",
        "required": false,
        "description": "Define se o modal ocupa toda a tela. Tem prioridade sobre customWidth"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      }
    ],
    "examples": [
      "<Modal\n  isOpen={isModalOpen}\n  onClose={() => setIsModalOpen(false)}\n  title=\"Título do Modal\"\n>\n  <p>Conteúdo do modal</p>\n</Modal>",
      "<Modal\n  isOpen={showModal}\n  onClose={handleClose}\n  title=\"Confirmar ação\"\n  closeOnOverlayClick={false}\n>\n  <MyForm />\n</Modal>"
    ],
    "keywords": [
      "modal",
      "props",
      "componente"
    ]
  },
  {
    "name": "Popover",
    "description": "",
    "category": "Components",
    "props": [
      {
        "name": "trigger",
        "type": "React.ReactNode",
        "required": true,
        "description": "Elemento que aciona a abertura do popover (geralmente um botão ou ícone)"
      },
      {
        "name": "content",
        "type": "React.ReactNode",
        "required": true,
        "description": "Conteúdo exibido dentro do popover ao abrir"
      },
      {
        "name": "align",
        "type": "Align",
        "required": false,
        "defaultValue": "'center'",
        "description": "Alinhamento do popover em relação ao trigger no eixo perpendicular ao `side`."
      },
      {
        "name": "side",
        "type": "Side",
        "required": false,
        "defaultValue": "'bottom'",
        "description": "Lado em que o popover aparece em relação ao trigger."
      },
      {
        "name": "sideOffset",
        "type": "number",
        "required": false,
        "description": "Distância em pixels entre o conteúdo e o trigger"
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Controla o estado de abertura em modo controlado"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Callback chamado quando o estado de abertura muda"
      },
      {
        "name": "asAnchor",
        "type": "boolean",
        "required": false,
        "description": "Quando `true`, o trigger atua como âncora de posicionamento e o popover\r\né aberto/fechado exclusivamente via `open`/`onOpenChange` (modo DatePicker).\r\nQuando `false` (padrão), o trigger continua abrindo/fechando o popover\r\nnormalmente, mas o estado pode ser sincronizado via `open`/`onOpenChange`\r\n(modo Filter)."
      },
      {
        "name": "onOpenAutoFocus",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Callback chamado quando o foco automático é ativado ao abrir o popover"
      },
      {
        "name": "onCloseAutoFocus",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Callback chamado quando o foco automático é ativado ao fechar o popover"
      },
      {
        "name": "showArrow",
        "type": "boolean",
        "required": false,
        "description": "Quando `true`, exibe uma seta apontando para o trigger"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      }
    ],
    "examples": [],
    "keywords": [
      "popover"
    ]
  },
  {
    "name": "Quantity",
    "description": "Props do componente Quantity",
    "category": "Components",
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Valor do componente"
      },
      {
        "name": "onChange",
        "type": "(value: number) => void",
        "required": false,
        "description": "Callback executado quando o valor muda: (value) => void"
      },
      {
        "name": "decimal",
        "type": "boolean",
        "required": false,
        "description": "Habilita entrada de valores decimais"
      },
      {
        "name": "size",
        "type": "Size",
        "required": false,
        "description": "Tamanho do componente"
      },
      {
        "name": "decimalPlaces",
        "type": "number",
        "required": false,
        "description": "Número de casas decimais permitidas"
      },
      {
        "name": "valueIncrement",
        "type": "number",
        "required": false,
        "description": "Incremento/decremento ao clicar nos botões"
      },
      {
        "name": "inputSize",
        "type": "number",
        "required": false,
        "description": "Tamanho fixo do input, medido em caracteres (unidade CSS `ch`).\r\nO valor define quantos caracteres cabem visivelmente no campo sem necessidade de rolar.\r\nExemplo: `inputSize={4}` reserva espaço para 4 caracteres (\"9999\").\r\nSe omitido, o tamanho é ajustado automaticamente conforme o conteúdo digitado."
      },
      {
        "name": "minValue",
        "type": "number",
        "required": false,
        "description": "Valor mínimo permitido"
      },
      {
        "name": "maxValue",
        "type": "number",
        "required": false,
        "description": "Valor máximo permitido"
      },
      {
        "name": "decrementAriaLabel",
        "type": "string",
        "required": false,
        "description": "Aria label para o botão de decremento. Padrão: 'Diminuir quantidade'"
      },
      {
        "name": "incrementAriaLabel",
        "type": "string",
        "required": false,
        "description": "Aria label para o botão de incremento. Padrão: 'Aumentar quantidade'"
      },
      {
        "name": "inputAriaLabel",
        "type": "string",
        "required": false,
        "description": "Aria label para a entrada de quantidade. Padrão: 'Quantidade'"
      }
    ],
    "examples": [
      "<Quantity \n  value={quantity}\n  onChange={setQuantity}\n  size=\"lg\"\n/>",
      "<Quantity \n  value={1}\n  decimal={true}\n  decimalPlaces={2}\n  valueIncrement={0.5}\n  disabled={false}\n/>"
    ],
    "keywords": [
      "quantity",
      "props",
      "componente"
    ]
  },
  {
    "name": "Radio",
    "description": "Props de um item individual de rádio",
    "category": "Components",
    "props": [
      {
        "name": "id",
        "type": "string | number",
        "required": false,
        "description": "ID único do elemento"
      },
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Valor do radio button"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Label exibida ao lado do radio button"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Estado desabilitado do item"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      }
    ],
    "examples": [],
    "keywords": [
      "radio",
      "props",
      "item",
      "individual",
      "rádio"
    ]
  },
  {
    "name": "Search",
    "description": "",
    "category": "Components",
    "props": [
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder do campo de busca"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Valor controlado do campo"
      },
      {
        "name": "onChange",
        "type": "(e: React.ChangeEvent<HTMLInputElement>) => void",
        "required": false,
        "description": "Callback executado quando o valor muda: (e) => void"
      },
      {
        "name": "onKeyDown",
        "type": "(e: React.KeyboardEvent<HTMLInputElement>) => void",
        "required": false,
        "description": "Callback executado ao pressionar tecla: (e) => void"
      },
      {
        "name": "onFocus",
        "type": "(e: React.FocusEvent<HTMLInputElement>) => void",
        "required": false,
        "description": "Callback executado ao focar no campo: (e) => void"
      },
      {
        "name": "onBlur",
        "type": "(e: React.FocusEvent<HTMLInputElement>) => void",
        "required": false,
        "description": "Callback executado ao desfocar do campo: (e) => void"
      },
      {
        "name": "onClear",
        "type": "() => void",
        "required": false,
        "description": "Callback executado ao limpar o campo: () => void"
      },
      {
        "name": "onClick",
        "type": "(e: React.MouseEvent<HTMLDivElement>) => void",
        "required": false,
        "description": "Callback executado ao clicar no componente: (e) => void"
      },
      {
        "name": "onMouseDown",
        "type": "(e: React.MouseEvent<HTMLDivElement>) => void",
        "required": false,
        "description": "Callback executado ao pressionar mouse no componente: (e) => void"
      },
      {
        "name": "searchMode",
        "type": "'instant' | 'on-enter'",
        "required": false,
        "description": "Modo de pesquisa:\r\n- `'instant'` (padrão): dispara a busca a cada tecla digitada\r\n- `'on-enter'`: dispara a busca somente ao pressionar Enter"
      },
      {
        "name": "onSearch",
        "type": "(value: string) => void",
        "required": false,
        "description": "Callback executado quando a busca é acionada.\r\n- No modo `'instant'`: chamado a cada mudança de valor\r\n- No modo `'on-enter'`: chamado somente ao pressionar Enter"
      },
      {
        "name": "'data-testid'",
        "type": "string",
        "required": false,
        "description": "ID para testes automatizados"
      },
      {
        "name": "virtualKeyboard",
        "type": "VirtualKeyboardType",
        "required": false,
        "description": "Tipo do teclado virtual (padrão: undefined = desabilitado)"
      }
    ],
    "examples": [],
    "keywords": [
      "search"
    ]
  },
  {
    "name": "Select",
    "description": "Props do componente Select",
    "category": "Components",
    "props": [
      {
        "name": "items",
        "type": "SelectItemProps[]",
        "required": true,
        "description": "Array de itens do select"
      },
      {
        "name": "onValueChange",
        "type": "(value: string | string[]) => void",
        "required": false,
        "description": "Callback executado quando o valor muda: (value) => void"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Callback executado quando o select abre/fecha: (open) => void"
      },
      {
        "name": "variant",
        "type": "SelectVariant",
        "required": true,
        "description": "Variante visual do select"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "description": "Define se o campo é obrigatório"
      },
      {
        "name": "value",
        "type": "string | string[]",
        "required": false,
        "description": "Valor(es) selecionado(s)"
      },
      {
        "name": "multiple",
        "type": "boolean",
        "required": false,
        "description": "Habilita seleção múltipla"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder do campo"
      },
      {
        "name": "search",
        "type": "boolean",
        "required": false,
        "description": "Habilita campo de busca"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Label do campo"
      },
      {
        "name": "helperText",
        "type": "string",
        "required": false,
        "description": "Texto de ajuda exibido abaixo do campo"
      },
      {
        "name": "maxWidth",
        "type": "number",
        "required": false,
        "description": "Largura máxima do select"
      },
      {
        "name": "errorMessage",
        "type": "string",
        "required": false,
        "description": "Mensagem de erro a ser exibida"
      },
      {
        "name": "'aria-label'",
        "type": "string",
        "required": false,
        "description": "Label acessível para leitores de tela"
      },
      {
        "name": "'data-testid'",
        "type": "string",
        "required": false,
        "description": "ID para testes automatizados"
      },
      {
        "name": "tooltip",
        "type": "boolean",
        "required": false,
        "description": "Habilita tooltip"
      },
      {
        "name": "tooltipText",
        "type": "string",
        "required": false,
        "description": "Texto do tooltip"
      },
      {
        "name": "side",
        "type": "Side",
        "required": false,
        "description": "Lado onde o dropdown abre"
      },
      {
        "name": "align",
        "type": "Align",
        "required": false,
        "description": "Alinhamento do dropdown"
      },
      {
        "name": "enableInfiniteScroll",
        "type": "boolean",
        "required": false,
        "description": "Habilita scroll infinito"
      },
      {
        "name": "onScrollEnd",
        "type": "() => void",
        "required": false,
        "description": "Callback executado ao chegar ao final do scroll: () => void"
      },
      {
        "name": "isLoadingMore",
        "type": "boolean",
        "required": false,
        "description": "Estado de carregamento de mais itens"
      },
      {
        "name": "enableApiSearch",
        "type": "boolean",
        "required": false,
        "description": "Habilita busca via API"
      },
      {
        "name": "onApiSearch",
        "type": "(term: string) => void",
        "required": false,
        "description": "Callback executado na busca via API: (term) => void"
      },
      {
        "name": "isSearching",
        "type": "boolean",
        "required": false,
        "description": "Estado de busca em andamento"
      }
    ],
    "examples": [
      "<Select \n  items={[\n    { value: '1', text: 'Opção 1' },\n    { value: '2', text: 'Opção 2' }\n  ]}\n  variant=\"text\"\n  placeholder=\"Selecione uma opção\"\n  onValueChange={(value) => console.log(value)}\n/>",
      "<Select \n  items={options}\n  variant=\"checkbox\"\n  multiple={true}\n  search={true}\n  label=\"Selecione múltiplas opções\"\n  helperText=\"Você pode selecionar mais de uma\"\n  required={true}\n/>"
    ],
    "keywords": [
      "select",
      "props",
      "componente"
    ]
  },
  {
    "name": "Switch",
    "description": "Props do componente Switch",
    "category": "Components",
    "props": [
      {
        "name": "defaultChecked",
        "type": "boolean",
        "required": false,
        "description": "Estado inicial (modo não controlado)"
      },
      {
        "name": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Callback executado quando o estado muda: (checked) => void"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Nome do input — associa o switch a um campo de formulário (HTML `name`)"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Valor enviado no formulário quando o switch está ativo (análogo ao `value` do `<input type=\"checkbox\">`)"
      },
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": "Estado atual (modo controlado)"
      }
    ],
    "examples": [
      "<Switch \n  checked={isEnabled}\n  onCheckedChange={setIsEnabled}\n/>",
      "<Switch \n  defaultChecked={true}\n  disabled={isLoading}\n  onCheckedChange={(checked) => console.log(checked)}\n  name=\"notifications\"\n/>"
    ],
    "keywords": [
      "switch",
      "props",
      "componente"
    ]
  },
  {
    "name": "Table",
    "description": "Props do componente Table. Use genérico para autocomplete: `<Table<User>>`",
    "category": "Components",
    "props": [
      {
        "name": "columns",
        "type": "TableColumn<T>[]",
        "required": true,
        "description": "Configuração das colunas"
      },
      {
        "name": "dataSource",
        "type": "T[]",
        "required": true,
        "description": "Array de dados a serem exibidos"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "description": "Estado de carregamento"
      },
      {
        "name": "rowSelection",
        "type": "{\r\n    /** Keys das linhas selecionadas (modo controlado) */\r\n    selectedRowKeys?: (string | number)[];\r\n    /** Callback quando seleção muda: (keys, rows) => void */\r\n    onChange?: (keys: (string | number)[], rows: T[]) => void;\r\n    /** Customiza props dos checkboxes: (row, index) => { disabled? } */\r\n    getCheckboxProps?: (row: T, index: number) => { disabled?: boolean };\r\n    /** Desabilita o checkbox \"selecionar todos\" */\r\n    disableSelectAll?: boolean;\r\n  }",
        "required": false,
        "description": "Configuração de seleção de linhas"
      },
      {
        "name": "locale",
        "type": "{\r\n    /** Texto quando não há dados */\r\n    emptyText?: ReactNode;\r\n  }",
        "required": false,
        "description": "Configurações de localização"
      },
      {
        "name": "onRow",
        "type": "(row: T, index: number) => {\r\n    /** Clique simples na linha */\r\n    onClick?: () => void;\r\n    /** Clique duplo na linha */\r\n    onDoubleClick?: () => void;\r\n    /** Classe CSS da linha */\r\n    className?: string;\r\n  }",
        "required": false,
        "description": "Eventos de linha: (row, index) => { onClick?, onDoubleClick?, className? }"
      }
    ],
    "examples": [],
    "keywords": [
      "table",
      "props",
      "componente",
      "genérico",
      "para",
      "autocomplete",
      "user"
    ]
  },
  {
    "name": "TableV2",
    "description": "Props do componente TableV2.",
    "category": "Components",
    "props": [
      {
        "name": "columns",
        "type": "ColumnDef<T, any>[]",
        "required": true,
        "description": "Definições das colunas da tabela"
      },
      {
        "name": "data",
        "type": "T[]",
        "required": true,
        "description": "Dados exibidos na tabela"
      },
      {
        "name": "rowSelection",
        "type": "TableV2RowSelectionProps<T>",
        "required": false,
        "description": "Configuração de seleção de linhas via checkbox.\r\nA presença deste objeto habilita a seleção. Use `disabled` para controlar\r\nlinhas específicas e `onRowChange` para reagir às mudanças."
      },
      {
        "name": "enableSorting",
        "type": "boolean",
        "required": false,
        "description": "Habilita ordenação de colunas ao clicar no cabeçalho"
      },
      {
        "name": "bulkActions",
        "type": "TableV2BulkActionsProps<T>",
        "required": false,
        "description": "Configuração das ações em massa exibidas quando há linhas selecionadas"
      },
      {
        "name": "header",
        "type": "TableV2HeaderProps",
        "required": false,
        "description": "Header acima da tabela com busca + filtros"
      },
      {
        "name": "footer",
        "type": "TableV2FooterProps",
        "required": false,
        "description": "Footer com paginação"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS personalizada para o componente"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "description": "Estado de carregamento — exibe skeleton animado no lugar da tabela"
      },
      {
        "name": "onRow",
        "type": "(row: T, index: number) => {\r\n    onClick?: () => void;\r\n    onDoubleClick?: () => void;\r\n    className?: string;\r\n  }",
        "required": false,
        "description": "Eventos e classe aplicados por linha"
      },
      {
        "name": "emptyIcon",
        "type": "ReactNode",
        "required": false,
        "description": "Ícone exibido no estado vazio"
      },
      {
        "name": "emptyTitle",
        "type": "ReactNode",
        "required": false,
        "description": "Título exibido no estado vazio"
      },
      {
        "name": "emptyText",
        "type": "ReactNode",
        "required": false,
        "description": "Texto descritivo exibido no estado vazio"
      }
    ],
    "examples": [
      "<TableV2\n  columns={columns}\n  data={data}\n  enableSorting\n  rowSelection={{ onRowChange: (rows, keys) => console.log(rows, keys) }}\n  loading={isLoading}\n/>"
    ],
    "keywords": [
      "tablev",
      "props",
      "componente"
    ]
  },
  {
    "name": "TextArea",
    "description": "Props do componente TextArea",
    "category": "Components",
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Valor controlado do campo"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Callback executado quando o valor muda: (value) => void"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Label do campo"
      },
      {
        "name": "helperText",
        "type": "string",
        "required": false,
        "description": "Texto de ajuda exibido abaixo do campo"
      },
      {
        "name": "tooltip",
        "type": "boolean",
        "required": false,
        "description": "Habilita tooltip"
      },
      {
        "name": "tooltipText",
        "type": "string",
        "required": false,
        "description": "Texto do tooltip"
      },
      {
        "name": "side",
        "type": "Side",
        "required": false,
        "description": "Lado onde o tooltip aparece"
      },
      {
        "name": "align",
        "type": "Align",
        "required": false,
        "description": "Alinhamento do tooltip"
      },
      {
        "name": "errorMessage",
        "type": "string",
        "required": false,
        "description": "Mensagem de erro exibida no campo.\r\nUsada tanto pela validação interna (required, etc.)\r\nquanto pelo controle externo via formulários (react-hook-form, formik, etc.)"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "description": "Sinaliza erro externo para controle via formulários (react-hook-form, formik, etc.)"
      },
      {
        "name": "resize",
        "type": "'none' | 'vertical' | 'both'",
        "required": false,
        "description": "Controla o redimensionamento do textarea"
      },
      {
        "name": "showCharCount",
        "type": "boolean",
        "required": false,
        "description": "Exibe contador de caracteres (requer maxLength)"
      },
      {
        "name": "height",
        "type": "number",
        "required": false,
        "description": "Altura do textarea em pixels"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      },
      {
        "name": "virtualKeyboard",
        "type": "VirtualKeyboardType",
        "required": false,
        "description": "Tipo do teclado virtual (padrão: undefined = desabilitado)"
      }
    ],
    "examples": [
      "<TextArea\n  label=\"Descrição\"\n  value={description}\n  onChange={setDescription}\n  placeholder=\"Digite uma descrição\"\n/>",
      "<TextArea\n  label=\"Comentário\"\n  required\n  maxLength={500}\n  showCharCount\n  helperText=\"Máximo de 500 caracteres\"\n  errorMessage={error}\n/>"
    ],
    "keywords": [
      "textarea",
      "props",
      "componente"
    ]
  },
  {
    "name": "TextField",
    "description": "Props do componente TextField",
    "category": "Components",
    "props": [
      {
        "name": "value",
        "type": "string | number",
        "required": false,
        "description": "Valor controlado do campo"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Callback executado quando o valor muda: (value) => void"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Label do campo"
      },
      {
        "name": "type",
        "type": "TextFieldType",
        "required": false,
        "description": "Tipo do input"
      },
      {
        "name": "helperText",
        "type": "string",
        "required": false,
        "description": "Texto de ajuda exibido abaixo do campo"
      },
      {
        "name": "tooltip",
        "type": "boolean",
        "required": false,
        "description": "Habilita tooltip"
      },
      {
        "name": "tooltipText",
        "type": "string",
        "required": false,
        "description": "Texto do tooltip"
      },
      {
        "name": "tooltipSide",
        "type": "Side",
        "required": false,
        "description": "Lado onde o tooltip aparece"
      },
      {
        "name": "tooltipAlign",
        "type": "Align",
        "required": false,
        "description": "Alinhamento do tooltip"
      },
      {
        "name": "errorMessage",
        "type": "string",
        "required": false,
        "description": "Mensagem de erro exibida no campo.\r\nUsada tanto pela validação interna (required, formato, etc.)\r\nquanto pelo controle externo via formulários (react-hook-form, formik, etc.)"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "description": "Sinaliza erro externo para controle via formulários (react-hook-form, formik, etc.)"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Ícone a ser exibido no campo"
      },
      {
        "name": "persistIcon",
        "type": "boolean",
        "required": false,
        "description": "Mantém o ícone visível mesmo quando o campo tem valor"
      },
      {
        "name": "virtualKeyboard",
        "type": "VirtualKeyboardType",
        "required": false,
        "description": "Tipo do teclado virtual (padrão: undefined = desabilitado)"
      },
      {
        "name": "attachedToVirtualKeyboard",
        "type": "boolean",
        "required": false,
        "description": "Aplica variação visual para uso acoplado ao VirtualKeyboard no modo fixed, essa prop é de uso exclusivo do VirtualKeyboard no modo fixed"
      },
      {
        "name": "disableAutoComplete",
        "type": "boolean",
        "required": false,
        "description": "Desabilita o autocomplete nativo do browser (padrão: false)"
      }
    ],
    "examples": [
      "<TextField \n  label=\"Email\"\n  type=\"email\"\n  value={email}\n  onChange={setEmail}\n  placeholder=\"Digite seu email\"\n/>",
      "<TextField \n  label=\"Senha\"\n  type=\"password\"\n  required\n  helperText=\"Mínimo 8 caracteres\"\n  errorMessage={error}\n  tooltip={true}\n  tooltipText=\"Deve conter letras e números\"\n  icon={<LockIcon />}\n/>"
    ],
    "keywords": [
      "textfield",
      "props",
      "componente"
    ]
  },
  {
    "name": "Toast",
    "description": "Props do componente individual de notificação `Toast`.\r\n\r\nEstende {@link BaseProps} e os atributos nativos do `Toast.Root` do Radix UI,\r\nexcluindo as propriedades controladas internamente (`open`, `onOpenChange`,\r\n`duration`, `className`).",
    "category": "Components",
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Título principal exibido no toast."
      },
      {
        "name": "automaticClose",
        "type": "boolean",
        "required": false,
        "defaultValue": "true",
        "description": "Define se o toast fecha automaticamente após o tempo definido em `duration`."
      },
      {
        "name": "duration",
        "type": "number",
        "required": false,
        "defaultValue": "5000",
        "description": "Tempo em milissegundos até o toast fechar automaticamente.\r\nSó tem efeito quando `automaticClose` é `true`."
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Ícone customizado exibido no toast.\r\nQuando fornecido, substitui o ícone gerado automaticamente por `iconType`."
      },
      {
        "name": "iconClosed",
        "type": "React.ReactNode",
        "required": false,
        "defaultValue": "<Dismiss16Filled />",
        "description": "Ícone exibido no botão de fechar o toast."
      },
      {
        "name": "iconType",
        "type": "'Info' | 'Success' | 'Alert'",
        "required": false,
        "defaultValue": "'Info'",
        "description": "Tipo do ícone exibido automaticamente no toast.\r\n\r\n- `'Info'` → ícone informativo (`Info20Filled`)\r\n- `'Success'` → ícone de sucesso (`CheckmarkCircle20Filled`)\r\n- `'Alert'` → ícone de alerta/erro (`Warning20Filled`)\r\n\r\nIgnorado quando a prop `icon` for fornecida."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      }
    ],
    "examples": [
      "showToast({\n  title: 'Sucesso!',\n  iconType: 'Success',\n  duration: 3000,\n});"
    ],
    "keywords": [
      "toast",
      "props",
      "componente",
      "individual",
      "notificação",
      "estende",
      "link",
      "baseprops",
      "atributos",
      "nativos",
      "root",
      "radix",
      "excluindo",
      "propriedades",
      "controladas",
      "internamente",
      "open",
      "onopenchange",
      "duration",
      "classname"
    ]
  },
  {
    "name": "Tooltip",
    "description": "",
    "category": "Components",
    "props": [
      {
        "name": "text",
        "type": "React.ReactNode",
        "required": true,
        "description": "Conteúdo textual exibido dentro do tooltip"
      },
      {
        "name": "side",
        "type": "Side",
        "required": false,
        "defaultValue": "'top'",
        "description": "Lado em que o tooltip aparece em relação ao elemento filho."
      },
      {
        "name": "align",
        "type": "Align",
        "required": false,
        "defaultValue": "'center'",
        "description": "Alinhamento do tooltip em relação ao elemento filho."
      },
      {
        "name": "sideOffset",
        "type": "number",
        "required": false,
        "description": "Deslocamento em pixels no eixo lateral (side) entre o tooltip e o elemento filho"
      },
      {
        "name": "alignOffset",
        "type": "number",
        "required": false,
        "description": "Deslocamento em pixels no eixo de alinhamento"
      },
      {
        "name": "maxWidth",
        "type": "number",
        "required": false,
        "description": "Largura máxima do tooltip em pixels"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "Elemento que dispara o tooltip ao hover"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Classe CSS opcional"
      }
    ],
    "examples": [],
    "keywords": [
      "tooltip"
    ]
  },
  {
    "name": "VerificationCode",
    "description": "Props do componente VerificationCode",
    "category": "Components",
    "props": [
      {
        "name": "length",
        "type": "number",
        "required": false,
        "description": "Número de dígitos do código (padrão: 6)"
      },
      {
        "name": "inputType",
        "type": "InputType",
        "required": false,
        "description": "Tipo de entrada permitida (padrão: \"numeric\")"
      },
      {
        "name": "onComplete",
        "type": "(value: string) => void",
        "required": false,
        "description": "Callback executado quando todos os campos são preenchidos: (value) => void"
      },
      {
        "name": "hasError",
        "type": "boolean",
        "required": false,
        "description": "Define se o campo está em estado de erro"
      },
      {
        "name": "errorMessage",
        "type": "string",
        "required": false,
        "description": "Mensagem de erro exibida abaixo do componente"
      }
    ],
    "examples": [
      "<VerificationCode \n  length={6}\n  inputType=\"numeric\"\n  onComplete={(code) => handleVerification(code)}\n/>",
      "<VerificationCode \n  length={4}\n  inputType=\"alphanumeric\"\n  onComplete={handleCode}\n  hasError={!!error}\n  errorMessage=\"Código inválido\"\n  disabled={isVerifying}\n/>"
    ],
    "keywords": [
      "verificationcode",
      "props",
      "componente"
    ]
  },
  {
    "name": "VirtualKeyboard",
    "description": "Props do componente VirtualKeyboard",
    "category": "Components",
    "props": [
      {
        "name": "variant",
        "type": "VirtualKeyboardVariant",
        "required": false,
        "defaultValue": "'native'",
        "description": "Modo de exibição do teclado.\r\n- `native`: comporta-se como teclado nativo (acionamento por foco — futuramente implementado).\r\n- `fixed`: teclado fixo na tela com um TextField próprio acima."
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Valor controlado do input vinculado ao teclado"
      },
      {
        "name": "type",
        "type": "VirtualKeyboardType",
        "required": false,
        "description": "Tipo do teclado (padrão: \"default\")"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Callback executado quando o valor do input muda: (value) => void"
      },
      {
        "name": "onKeyPress",
        "type": "(key: string) => void",
        "required": false,
        "description": "Callback executado quando uma tecla é pressionada: (key) => void"
      },
      {
        "name": "maxLength",
        "type": "number",
        "required": false,
        "description": "Limite máximo de caracteres"
      },
      {
        "name": "Emoji",
        "type": "boolean",
        "required": false,
        "description": "Controla a exibição do botão {emoticon} nos layouts suportados"
      },
      {
        "name": "textFieldPlaceholder",
        "type": "string",
        "required": false,
        "description": "Placeholder do TextField exibido no modo `fixed`"
      },
      {
        "name": "textFieldScale",
        "type": "1 | 1.5 | 2",
        "required": false,
        "description": "Escala do TextField exibido no modo `fixed`"
      },
      {
        "name": "showEnterKey",
        "type": "boolean",
        "required": false,
        "defaultValue": "true",
        "description": "Controla a exibição da tecla Enter no teclado."
      },
      {
        "name": "helperText",
        "type": "string",
        "required": false,
        "description": "Texto de ajuda do TextField exibido no modo `fixed`"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "description": "Sinaliza erro no TextField exibido no modo `fixed`"
      },
      {
        "name": "errorMessage",
        "type": "string",
        "required": false,
        "description": "Mensagem de erro do TextField exibido no modo `fixed`"
      },
      {
        "name": "targetRef",
        "type": "RefObject<HTMLInputElement | HTMLTextAreaElement | null>",
        "required": false,
        "description": "Ref para o campo de input que aciona o teclado no modo `native`.\r\nO teclado aparece ao focar no elemento referenciado e some ao perder o foco.\r\nSe omitido no modo `native`, o teclado permanece sempre visível."
      }
    ],
    "examples": [
      "// Modo fixed: teclado sempre visível com TextField próprio\n<VirtualKeyboard\n  variant=\"fixed\"\n  type=\"default\"\n  onChange={(value) => setValue(value)}\n/>",
      "// Modo native: teclado gerenciado externamente (futuramente acionado por foco)\n<VirtualKeyboard\n  variant=\"native\"\n  type=\"numeric\"\n  value={pin}\n  onChange={setPin}\n  maxLength={4}\n/>"
    ],
    "keywords": [
      "virtualkeyboard",
      "props",
      "componente"
    ]
  }
];

export const COMPONENT_NAMES = COMPONENTS.map((c) => c.name);
