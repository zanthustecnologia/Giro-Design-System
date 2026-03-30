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
      }
    ],
    "examples": [
      "* \r\n * // Avatar com ícone\r\n * <Avatar icon={<UserIcon />} size=\"lg\" />\r\n * \r\n * // Avatar com imagem\r\n * <Avatar src=\"https://example.com/avatar.jpg\" icon={<UserIcon />} size=\"sm\" />\r\n * ```"
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
        "name": "type",
        "type": "BadgeType",
        "required": true,
        "description": "Tipo de badge (notificação ou status)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Conteúdo a ser envolvido pelo badge"
      },
      {
        "name": "badgeValue",
        "type": "BadgeValue",
        "required": false,
        "description": "Valor a ser exibido no badge (número, texto ou null)"
      },
      {
        "name": "maxValue",
        "type": "number",
        "required": false,
        "description": "Valor máximo a ser exibido (ex: 99+ quando badgeValue > maxValue)"
      },
      {
        "name": "'aria-label'",
        "type": "string",
        "required": false,
        "description": "Label acessível para leitores de tela"
      }
    ],
    "examples": [
      "* \r\n * <Badge type=\"notification\" badgeValue={5}>\r\n *   <IconButton icon={<BellIcon />} />\r\n * </Badge>\r\n * ```\r\n *",
      "* \r\n * <Badge \r\n *   type=\"status\" \r\n *   badgeValue=\"novo\"\r\n *   aria-label=\"Novo item disponível\"\r\n * >\r\n *   <Avatar icon={<UserIcon />} />\r\n * </Badge>\r\n * ```"
    ],
    "keywords": [
      "badge",
      "props",
      "componente"
    ]
  },
  {
    "name": "Button",
    "description": "Props do componente Button",
    "category": "Components",
    "props": [
      {
        "name": "as",
        "type": "React.ElementType",
        "required": false,
        "description": "Elemento customizado a ser renderizado (ex: 'a', Link do React Router)"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Conteúdo do botão"
      },
      {
        "name": "variant",
        "type": "Variant",
        "required": false,
        "description": "Variante visual do botão"
      },
      {
        "name": "iconOnly",
        "type": "boolean",
        "required": false,
        "description": "Define se o botão exibe apenas ícone (sem texto)"
      },
      {
        "name": "iconPosition",
        "type": "Position",
        "required": false,
        "description": "Posição do ícone em relação ao texto"
      },
      {
        "name": "href",
        "type": "string",
        "required": false,
        "description": "URL de destino quando usado como link (renderiza <a>)"
      },
      {
        "name": "to",
        "type": "string",
        "required": false,
        "description": "Rota de destino para roteadores (ex: React Router)"
      },
      {
        "name": "external",
        "type": "boolean",
        "required": false,
        "description": "Define se o link abre em nova aba"
      },
      {
        "name": "target",
        "type": "string",
        "required": false,
        "description": "Atributo target do HTML para links"
      },
      {
        "name": "rel",
        "type": "string",
        "required": false,
        "description": "Atributo rel do HTML para links"
      },
      {
        "name": "type",
        "type": "'button' | 'submit' | 'reset'",
        "required": false,
        "description": "Tipo HTML do botão"
      },
      {
        "name": "size",
        "type": "Size",
        "required": false,
        "description": "Tamanho do botão"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Ícone a ser exibido no botão"
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "required": false,
        "description": "Define se o botão ocupa 100% da largura do container"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "required": false,
        "description": "Label acessível para leitores de tela"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "description": "Estado de carregamento (exibe spinner)"
      },
      {
        "name": "tooltipText",
        "type": "string",
        "required": false,
        "description": "Texto do tooltip exibido quando o botão é apenas ícone"
      },
      {
        "name": "tooltipSide",
        "type": "'top' | 'bottom' | 'left' | 'right'",
        "required": false,
        "description": "Lado em que o tooltip será exibido"
      },
      {
        "name": "tooltipAlign",
        "type": "'start' | 'center' | 'end'",
        "required": false,
        "description": "Alinhamento do tooltip"
      }
    ],
    "examples": [
      "* \r\n * <Button variant=\"filled\" size=\"lg\" onClick={handleClick}>\r\n *   Clique aqui\r\n * </Button>\r\n * ```\r\n *",
      "* \r\n * <Button \r\n *   variant=\"outlined\" \r\n *   icon={<Icon />} \r\n *   iconPosition=\"left\"\r\n *   loading={isLoading}\r\n * >\r\n *   Salvar\r\n * </Button>\r\n * ```"
    ],
    "keywords": [
      "button",
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
        "name": "selectedDate",
        "type": "Date | null",
        "required": false,
        "description": "Data selecionada atualmente (usada pelo Filter)."
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
        "defaultValue": "currentMonth",
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
        "name": "numberOfMonths",
        "type": "number",
        "required": false,
        "defaultValue": "1",
        "description": "Número de meses exibidos simultaneamente."
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
        "name": "hidden",
        "type": "Matcher | Matcher[]",
        "required": false,
        "description": "Dias ocultados — aceita qualquer `Matcher` do react-day-picker."
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
        "description": "Locale da interface — aceita os códigos internos do design system."
      },
      {
        "name": "captionLayout",
        "type": "'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years'",
        "required": false,
        "description": "Layout do cabeçalho do calendário.\r\n- `'label'` — exibe mês/ano como texto (padrão).\r\n- `'dropdown'` — exibe dropdowns para mês e ano.\r\n- `'dropdown-months'` — dropdown apenas para mês.\r\n- `'dropdown-years'` — dropdown apenas para ano."
      },
      {
        "name": "reverseYears",
        "type": "boolean",
        "required": false,
        "description": "Inverte a ordem dos anos no dropdown."
      },
      {
        "name": "fixedWeeks",
        "type": "boolean",
        "required": false,
        "description": "Sempre exibe 6 semanas por mês, preenchendo com dias do mês seguinte."
      },
      {
        "name": "showOutsideDays",
        "type": "boolean",
        "required": false,
        "description": "Exibe os dias pertencentes ao mês anterior/próximo."
      },
      {
        "name": "showWeekNumber",
        "type": "boolean",
        "required": false,
        "description": "Exibe a coluna com o número da semana."
      },
      {
        "name": "hideNavigation",
        "type": "boolean",
        "required": false,
        "description": "Oculta os botões de navegação (sem desabilitar a navegação)."
      },
      {
        "name": "disableNavigation",
        "type": "boolean",
        "required": false,
        "description": "Desabilita a navegação entre meses."
      },
      {
        "name": "navLayout",
        "type": "'after' | 'around'",
        "required": false,
        "description": "Posicionamento dos botões de navegação.\r\n- `'around'` — um botão de cada lado do caption.\r\n- `'after'` — ambos após o caption."
      },
      {
        "name": "'aria-label'",
        "type": "string",
        "required": false,
        "description": "Atributo `aria-label` para o elemento raiz."
      },
      {
        "name": "'aria-labelledby'",
        "type": "string",
        "required": false,
        "description": "Atributo `aria-labelledby` para o elemento raiz."
      },
      {
        "name": "autoFocus",
        "type": "boolean",
        "required": false,
        "description": "Foca automaticamente o primeiro dia selecionado ou hoje."
      },
      {
        "name": "role",
        "type": "'application' | 'dialog'",
        "required": false,
        "description": "Atributo `role` do elemento raiz (`'application'` ou `'dialog'`)."
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Atributo `title` do elemento raiz."
      },
      {
        "name": "animate",
        "type": "boolean",
        "required": false,
        "description": "Anima a transição entre meses."
      },
      {
        "name": "timeZone",
        "type": "string",
        "required": false,
        "description": "Fuso horário IANA usado nos cálculos de datas."
      },
      {
        "name": "style",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Estilos inline para o elemento raiz."
      },
      {
        "name": "classNames",
        "type": "Partial<Record<string, string>>",
        "required": false,
        "description": "Substitui os `classNames` padrão do react-day-picker."
      },
      {
        "name": "modifiers",
        "type": "Record<string, Matcher | Matcher[] | undefined>",
        "required": false,
        "description": "Modificadores customizados para dias específicos."
      },
      {
        "name": "modifiersClassNames",
        "type": "Record<string, string>",
        "required": false,
        "description": "ClassNames aplicadas aos dias que correspondem aos `modifiers`."
      },
      {
        "name": "footer",
        "type": "React.ReactNode",
        "required": false,
        "description": "Rodapé do calendário — exibido como live region para acessibilidade."
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
        "name": "type",
        "type": "TextVariant",
        "required": false,
        "description": "Tipo visual do callout"
      },
      {
        "name": "title",
        "type": "string | null",
        "required": false,
        "description": "Título principal do callout (texto em destaque)"
      },
      {
        "name": "text",
        "type": "string",
        "required": false,
        "description": "Texto descritivo do callout"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Ícone a ser exibido no callout"
      }
    ],
    "examples": [
      "* \r\n * <Callout \r\n *   type=\"success\" \r\n *   title=\"Sucesso!\"\r\n *   text=\"Operação realizada com sucesso\"\r\n *   icon={<CheckIcon />}\r\n * />\r\n * ```\r\n *",
      "* \r\n * <Callout \r\n *   type=\"alert\"\r\n *   title=\"Atenção\"\r\n *   text=\"Verifique os campos obrigatórios\"\r\n * />\r\n * ```"
    ],
    "keywords": [
      "callout",
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
      "* \r\n * <Checkbox \r\n *   label=\"Aceito os termos\"\r\n *   checked={accepted}\r\n *   onCheckedChange={setAccepted}\r\n * />\r\n * ```\r\n *",
      "* \r\n * <Checkbox \r\n *   label=\"Selecionar todos\"\r\n *   indeterminate={someSelected}\r\n *   onCheckedChange={handleSelectAll}\r\n *   disabled={isLoading}\r\n * />\r\n * ```"
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
        "name": "type",
        "type": "TextVariant",
        "required": false,
        "description": "Tipo visual do chip"
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Texto a ser exibido dentro do chip"
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
      "* \r\n * <Chips \r\n *   type=\"success\"\r\n *   title=\"Ativo\"\r\n *   leftIcon={<CheckIcon />}\r\n * />\r\n * ```\r\n *",
      "* \r\n * <Chips \r\n *   type=\"brand\"\r\n *   title=\"Novo\"\r\n *   rightIcon={<CloseIcon />}\r\n *   disabled={false}\r\n * />\r\n * ```"
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
      }
    ],
    "examples": [
      "* \r\n * <Container>\r\n *   <h1>Conteúdo da página</h1>\r\n *   <p>Texto dentro do container</p>\r\n * </Container>\r\n * ```"
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
        "description": "Locale para formatação da data"
      },
      {
        "name": "calendarPosition",
        "type": "Position",
        "required": false,
        "description": "Posição do calendário em relação ao campo"
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
      "* \r\n * <DatePicker \r\n *   label=\"Data de nascimento\"\r\n *   value={birthDate}\r\n *   onChange={setBirthDate}\r\n *   locale=\"pt-br\"\r\n * />\r\n * ```\r\n *",
      "* \r\n * <DatePicker \r\n *   label=\"Data de início\"\r\n *   required\r\n *   helperText=\"Selecione a data de início do projeto\"\r\n *   minDate={new Date()}\r\n *   calendarPosition=\"right\"\r\n *   error={errorMessage}\r\n * />\r\n * ```"
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
        "required": true,
        "description": "Conteúdo customizado do diálogo"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Título exibido no cabeçalho do diálogo"
      },
      {
        "name": "bodyContent",
        "type": "ReactNode",
        "required": false,
        "description": "Texto ou conteúdo do corpo do diálogo"
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
      }
    ],
    "examples": [
      "* <Dialog\r\n *   title=\"Confirmar ação\"\r\n *   bodyContent=\"Tem certeza que deseja continuar?\"\r\n *   textConfirm=\"Confirmar\"\r\n *   textCancel=\"Cancelar\"\r\n * />"
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
      }
    ],
    "examples": [
      "* \r\n * <Drawer \r\n *   isOpen={isDrawerOpen}\r\n *   onClose={handleClose}\r\n *   title=\"Menu\"\r\n * >\r\n *   <nav>\r\n *     <a href=\"/home\">Home</a>\r\n *     <a href=\"/about\">Sobre</a>\r\n *   </nav>\r\n * </Drawer>\r\n * ```\r\n *",
      "* \r\n * <Drawer \r\n *   isOpen={showDrawer}\r\n *   onClose={() => setShowDrawer(false)}\r\n *   title=\"Configurações\"\r\n *   customWidth=\"400px\"\r\n *   closeOnOverlayClick={true}\r\n *   closeOnEscape={true}\r\n * >\r\n *   <Settings />\r\n * </Drawer>\r\n * ```"
    ],
    "keywords": [
      "drawer",
      "props",
      "componente"
    ]
  },
  {
    "name": "Dropdown",
    "description": "Props do componente Dropdown",
    "category": "Components",
    "props": [
      {
        "name": "position",
        "type": "'top' | 'bottom'",
        "required": false,
        "description": "Força posição do dropdown: 'top' abre para cima, 'bottom' para baixo (detecção automática se não especificado)"
      },
      {
        "name": "items",
        "type": "DropdownItem[]",
        "required": true,
        "description": "Array de itens para o dropdown"
      },
      {
        "name": "type",
        "type": "DropdownType",
        "required": false,
        "description": "Tipo do dropdown"
      },
      {
        "name": "applySearch",
        "type": "boolean",
        "required": false,
        "description": "Habilita campo de busca"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder do campo de busca"
      },
      {
        "name": "onSelectionChange",
        "type": "(selectedIds: string[]) => void",
        "required": false,
        "description": "Callback executado quando a seleção muda: (selectedIds) => void"
      },
      {
        "name": "showSubText",
        "type": "boolean",
        "required": false,
        "description": "Controla exibição do subtexto dos itens"
      },
      {
        "name": "defaultSelectedIds",
        "type": "string[]",
        "required": false,
        "description": "IDs dos itens selecionados por padrão"
      },
      {
        "name": "initialItemsSelected",
        "type": "Record<string, boolean>",
        "required": false,
        "description": "Estado inicial dos itens selecionados (objeto chave-valor)"
      },
      {
        "name": "width",
        "type": "string | number",
        "required": false,
        "description": "Largura do dropdown"
      },
      {
        "name": "maxWidth",
        "type": "string | number",
        "required": false,
        "description": "Largura máxima do dropdown"
      },
      {
        "name": "minWidth",
        "type": "string | number",
        "required": false,
        "description": "Largura mínima do dropdown"
      },
      {
        "name": "maxHeight",
        "type": "string | number",
        "required": false,
        "description": "Altura máxima do dropdown"
      },
      {
        "name": "filter",
        "type": "boolean",
        "required": false,
        "description": "Define se o componente está sendo usado para filtro"
      },
      {
        "name": "infiniteScroll",
        "type": "{\r\n    /** Status atual do carregamento */\r\n    status: 'idle' | 'loading' | 'succeeded' | 'failed';\r\n    /** Página atual */\r\n    page: number;\r\n    /** Última página disponível */\r\n    lastPage: number;\r\n    /** Callback executado para carregar próxima página: () => void */\r\n    onLoadMore: () => void;\r\n    /** Threshold para trigger do scroll infinito (0-1) */\r\n    threshold?: number;\r\n    /** Margem para trigger do scroll infinito */\r\n    rootMargin?: string;\r\n    /** Modo de debug */\r\n    debug?: boolean;\r\n  }",
        "required": false,
        "description": "Configurações para paginação infinita"
      }
    ],
    "examples": [
      "* \r\n * <Dropdown \r\n *   items={[\r\n *     { text: 'Opção 1', icon: <Icon1 /> },\r\n *     { text: 'Opção 2', icon: <Icon2 /> }\r\n *   ]}\r\n *   type=\"text\"\r\n *   placeholder=\"Selecione uma opção\"\r\n * />\r\n * ```\r\n *",
      "* \r\n * <Dropdown \r\n *   items={items}\r\n *   type=\"checkbox\"\r\n *   applySearch={true}\r\n *   onSelectionChange={(ids) => console.log(ids)}\r\n *   defaultSelectedIds={['1', '2']}\r\n *   maxHeight=\"300px\"\r\n * />\r\n * ```"
    ],
    "keywords": [
      "dropdown",
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
        "type": "DropdownItem[]",
        "required": false,
        "description": "Array de itens para filtros do tipo dropdown"
      },
      {
        "name": "type",
        "type": "DropdownType | 'calendar'",
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
        "name": "position",
        "type": "Position",
        "required": false,
        "description": "Posição do dropdown em relação ao botão"
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
        "description": "Locale do calendário"
      }
    ],
    "examples": [
      "* \r\n * <Filter \r\n *   items={filterItems}\r\n *   type=\"checkbox\"\r\n *   placeholder=\"Filtrar por categoria\"\r\n *   onApplyFilter={(ids) => handleFilter(ids)}\r\n *   buttonText=\"Filtros\"\r\n * />\r\n * ```\r\n *",
      "* \r\n * <Filter \r\n *   type=\"calendar\"\r\n *   selectedDate={selectedDate}\r\n *   onDateSelect={handleDateSelect}\r\n *   minDate={new Date('2024-01-01')}\r\n *   locale=\"pt-br\"\r\n *   icon={<CalendarIcon />}\r\n * />\r\n * ```"
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
        "description": "Define se deve mostrar o subtexto"
      },
      {
        "name": "hovered",
        "type": "boolean",
        "required": false,
        "description": "Estado de hover"
      }
    ],
    "examples": [
      "* \r\n * <ListItem \r\n *   variant=\"text\"\r\n *   text=\"Item da lista\"\r\n *   subText=\"Descrição do item\"\r\n *   onClick={handleClick}\r\n * />\r\n * ```\r\n *",
      "* \r\n * <ListItem \r\n *   variant=\"checkbox\"\r\n *   text=\"Aceitar termos\"\r\n *   checked={isChecked}\r\n *   onChange={setIsChecked}\r\n *   disabled={false}\r\n * />\r\n * ```"
    ],
    "keywords": [
      "listitem",
      "props",
      "componente"
    ]
  },
  {
    "name": "Quantity",
    "description": "Props do componente Quantity",
    "category": "Components",
    "props": [
      {
        "name": "defaultValue",
        "type": "number",
        "required": false,
        "description": "Valor inicial (modo não controlado)"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Valor atual (modo controlado)"
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
        "name": "step",
        "type": "number",
        "required": false,
        "description": "Incremento/decremento ao clicar nos botões"
      }
    ],
    "examples": [
      "* \r\n * <Quantity \r\n *   value={quantity}\r\n *   onChange={setQuantity}\r\n *   size=\"lg\"\r\n * />\r\n * ```\r\n *",
      "* \r\n * <Quantity \r\n *   defaultValue={1}\r\n *   decimal={true}\r\n *   decimalPlaces={2}\r\n *   step={0.5}\r\n *   disabled={false}\r\n * />\r\n * ```"
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
        "name": "'data-testid'",
        "type": "string",
        "required": false,
        "description": "ID para testes automatizados"
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
      "* \r\n * <Select \r\n *   items={[\r\n *     { value: '1', text: 'Opção 1' },\r\n *     { value: '2', text: 'Opção 2' }\r\n *   ]}\r\n *   variant=\"text\"\r\n *   placeholder=\"Selecione uma opção\"\r\n *   onValueChange={(value) => console.log(value)}\r\n * />\r\n * ```\r\n *",
      "* \r\n * <Select \r\n *   items={options}\r\n *   variant=\"checkbox\"\r\n *   multiple={true}\r\n *   search={true}\r\n *   label=\"Selecione múltiplas opções\"\r\n *   helperText=\"Você pode selecionar mais de uma\"\r\n *   required={true}\r\n * />\r\n * ```"
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
        "description": "Nome do input"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Valor do input"
      },
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": "Estado atual (modo controlado)"
      }
    ],
    "examples": [
      "* \r\n * <Switch \r\n *   checked={isEnabled}\r\n *   onCheckedChange={setIsEnabled}\r\n * />\r\n * ```\r\n *",
      "* \r\n * <Switch \r\n *   defaultChecked={true}\r\n *   disabled={isLoading}\r\n *   onCheckedChange={(checked) => console.log(checked)}\r\n *   name=\"notifications\"\r\n * />\r\n * ```"
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
        "description": "Mensagem de erro a ser exibida"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Ícone a ser exibido no campo"
      }
    ],
    "examples": [
      "* \r\n * <TextField \r\n *   label=\"Email\"\r\n *   type=\"email\"\r\n *   value={email}\r\n *   onChange={setEmail}\r\n *   placeholder=\"Digite seu email\"\r\n * />\r\n * ```\r\n *",
      "* \r\n * <TextField \r\n *   label=\"Senha\"\r\n *   type=\"password\"\r\n *   required\r\n *   helperText=\"Mínimo 8 caracteres\"\r\n *   errorMessage={error}\r\n *   tooltip={true}\r\n *   tooltipText=\"Deve conter letras e números\"\r\n *   icon={<LockIcon />}\r\n * />\r\n * ```"
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
      }
    ],
    "examples": [
      "* \r\n * showToast({\r\n *   title: 'Sucesso!',\r\n *   iconType: 'Success',\r\n *   duration: 3000,\r\n * });\r\n * ```"
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
        "description": ""
      },
      {
        "name": "side",
        "type": "Side",
        "required": false,
        "description": ""
      },
      {
        "name": "align",
        "type": "Align",
        "required": false,
        "description": ""
      },
      {
        "name": "sideOffset",
        "type": "number",
        "required": false,
        "description": ""
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
      "* \r\n * <VerificationCode \r\n *   length={6}\r\n *   inputType=\"numeric\"\r\n *   onComplete={(code) => handleVerification(code)}\r\n * />\r\n * ```\r\n *",
      "* \r\n * <VerificationCode \r\n *   length={4}\r\n *   inputType=\"alphanumeric\"\r\n *   onComplete={handleCode}\r\n *   hasError={!!error}\r\n *   errorMessage=\"Código inválido\"\r\n *   disabled={isVerifying}\r\n * />\r\n * ```"
    ],
    "keywords": [
      "verificationcode",
      "props",
      "componente"
    ]
  }
];

export const COMPONENT_NAMES = COMPONENTS.map((c) => c.name);
