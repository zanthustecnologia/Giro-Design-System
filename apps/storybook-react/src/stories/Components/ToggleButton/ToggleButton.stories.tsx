import { Add16Regular, Tag16Regular, Info16Regular, Filter16Regular, TextBold16Regular, Person16Regular, Building16Regular, TextAlignLeft16Regular, TextAlignCenter16Regular, TextAlignRight16Regular } from '@fluentui/react-icons';
import { ToggleButton } from '@giro-ds/react';
import { useArgs } from 'storybook/preview-api';
import { useState } from 'react';

import type { ToggleButtonProps } from '@giro-ds/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    docs: {
      description: {
        component:
          'O ToggleButton é um botão de dois estados. No modo padrão (`simple`), é um único botão toggle que alterna entre ligado e desligado. No modo `combined`, exibe um grupo de toggles onde o usuário seleciona um ou mais itens.',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['simple', 'combined'],
      description:
        'Modo do componente: toggle único (`simple`, padrão) ou grupo de toggles (`combined`)',
      table: {
        type: { summary: "'simple' | 'combined'" },
        defaultValue: { summary: 'simple' },
      },
    },
    selectionType: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Tipo de seleção do grupo (modo `combined`): única ou múltipla',
      if: { arg: 'mode', eq: 'combined' },
      table: {
        type: { summary: "'single' | 'multiple'" },
        defaultValue: { summary: 'single' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Desabilita o componente inteiro',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    pressed: {
      control: { type: 'boolean' },
      description: 'Estado pressionado controlado (modo `simple`)',
      if: { arg: 'mode', eq: 'simple' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultPressed: {
      control: { type: 'boolean' },
      description: 'Estado pressionado padrão não controlado (modo `simple`)',
      if: { arg: 'mode', eq: 'simple' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    onPressedChange: {
      action: 'pressed-changed',
      description: 'Callback ao alterar o estado do toggle único (modo `simple`)',
      if: { arg: 'mode', eq: 'simple' },
      table: {
        type: { summary: '(pressed: boolean) => void' },
      },
    },
    onValueChange: {
      action: 'value-changed',
      description: 'Callback ao alterar a seleção do grupo (modo `combined`)',
      if: { arg: 'mode', eq: 'combined' },
      table: {
        type: { summary: '(value: string | string[]) => void' },
      },
    },
    items: {
      control: { type: 'object' },
      description:
        'Items do grupo de toggles (modo `combined`). Use `item.iconOnly` para exibir sempre apenas o ícone.',
      if: { arg: 'mode', eq: 'combined' },
      table: {
        type: { summary: 'ToggleGroupItem[]' },
      },
    },
    expandOnSelect: {
      control: { type: 'boolean' },
      description:
        'Exibe apenas o ícone dos itens não selecionados; ícone + label no item selecionado (modo `combined`). Pode ser sobrescrito por item via `item.expandOnSelect`.',
      if: { arg: 'mode', eq: 'combined' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    requireSelection: {
      control: { type: 'boolean' },
      description:
        'Impede desmarcar o item ativo ao clicar novamente nele, garantindo que sempre haja uma seleção (modo `combined`, `selectionType="single"`).',
      if: { arg: 'mode', eq: 'combined' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: { type: 'object' },
      description: 'Valor(es) selecionado(s) controlado(s) (modo `combined`)',
      if: { arg: 'mode', eq: 'combined' },
      table: {
        type: { summary: 'string | string[]' },
      },
    },
    defaultValue: {
      control: { type: 'object' },
      description: 'Valor(es) selecionado(s) padrão não controlado(s) (modo `combined`)',
      if: { arg: 'mode', eq: 'combined' },
      table: {
        type: { summary: 'string | string[]' },
      },
    },
    size: {
      control: 'select',
      options: ['lg', 'sm'],
      description: 'Tamanho do componente',
      table: {
        type: { summary: "'lg' | 'sm'" },
        defaultValue: { summary: 'lg' },
      },
    },
    scale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
      description: 'Escala visual do componente (multiplica dimensões relativas)',
      table: {
        type: { summary: '1 | 1.5 | 2' },
        defaultValue: { summary: '1' },
      },
    },
    tooltipText: {
      control: 'text',
      description: 'Texto do tooltip exibido no hover',
      table: {
        type: { summary: 'string' },
      },
    },
    tooltipSide: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Lado em que o tooltip será exibido',
      table: {
        type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
        defaultValue: { summary: 'top' },
      },
    },
    tooltipAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alinhamento do tooltip',
      table: {
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'center' },
      },
    },
    icon: {
      control: { type: 'select' },
      options: ['', 'B', 'add'],
      mapping: { add: <Add16Regular />, B: <TextBold16Regular /> },
      description: 'Ícone exibido à esquerda do conteúdo (modo `simple`)',
      if: { arg: 'mode', eq: 'simple' },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Exibe apenas o ícone, sem texto (modo `simple`). Requer a prop `icon`.',
      if: { arg: 'mode', eq: 'simple' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Texto exibido no botão (modo `simple`)',
      if: { arg: 'mode', eq: 'simple' },
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Dados de exemplo ────────────────────────────────────────────────────────

const alignmentItems = [
  { value: 'left', label: 'Esquerda', icon: <TextAlignLeft16Regular /> },
  { value: 'center', label: 'Centro', icon: <TextAlignCenter16Regular /> },
  { value: 'right', label: 'Direita', icon: <TextAlignRight16Regular /> },
];

const fontStyleItems = [
  { value: 'bold', label: 'N' },
  { value: 'underline', label: 'S' },
];

const filterItemsWithIcons = [
  { value: 'tags', label: 'Tags', icon: <Tag16Regular /> },
  { value: 'info', label: 'Info', icon: <Info16Regular /> },
  { value: 'filter', label: 'Filtro', icon: <Filter16Regular /> },
];

const iconOnlyItems = [
  { value: 'tags', icon: <Tag16Regular />, iconOnly: true },
  { value: 'info', icon: <Info16Regular />, iconOnly: true },
  { value: 'filter', icon: <Filter16Regular />, iconOnly: true },
];

const personTypeItems = [
  { value: 'cliente', label: 'Cliente', icon: <Person16Regular /> },
  { value: 'operador', label: 'Operador', icon: <Building16Regular /> },
];

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Toggle único (mode='simple', padrão) */
export const Default: Story = {
  argTypes: {
    id: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  render: (args: ToggleButtonProps) => {
    const [, updateArgs] = useArgs();
    const [pressed, setPressed] = useState(false);

    if (args.mode === 'combined') {
      return (
        <ToggleButton
          {...args}
          onValueChange={(v) => updateArgs({ value: v })}
        />
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
        <ToggleButton {...args} pressed={pressed} onPressedChange={setPressed} />
      </div>
    );
  },
  args: {
    mode: 'simple',
    size: 'lg',
    scale: 1,
    disabled: false,
    label: 'Exemplo',
    selectionType: 'single',
    items: alignmentItems,
  },
};

/** Grupo de seleção única (mode='combined', type='single') */
export const GrupoSelecaoUnica: Story = {
  argTypes: {
    pressed: { table: { disable: true } },
    onPressedChange: { table: { disable: true } },
    icon: { table: { disable: true } },
    iconOnly: { table: { disable: true } },
    label: { table: { disable: true } },
  },
  render: (args: ToggleButtonProps) => {
    const [value, setValue] = useState<string>('');
    return (
      <ToggleButton
        {...args}
        value={value}
        onValueChange={(v) => setValue(v as string)}
      />
    );
  },
  args: {
    mode: 'combined',
    selectionType: 'single',
    size: 'lg',
    scale: 1,
    items: alignmentItems,
    disabled: false,
  },
};

/** Grupo de seleção única que sempre mantém um item marcado (prop requireSelection) */
export const GrupoRequireSelection: Story = {
  argTypes: {
    pressed: { table: { disable: true } },
    onPressedChange: { table: { disable: true } },
    icon: { table: { disable: true } },
    iconOnly: { table: { disable: true } },
    label: { table: { disable: true } },
  },
  render: (args: ToggleButtonProps) => {
    const [value, setValue] = useState<string>('left');
    return (
      <ToggleButton
        {...args}
        value={value}
        onValueChange={(v) => setValue(v as string)}
      />
    );
  },
  args: {
    mode: 'combined',
    selectionType: 'single',
    size: 'lg',
    scale: 1,
    items: alignmentItems,
    requireSelection: true,
    disabled: false,
  },
};

/** Grupo de seleção múltipla (mode='combined', type='multiple') */
export const SelecaoMultipla: Story = {
  argTypes: {
    pressed: { table: { disable: true } },
    onPressedChange: { table: { disable: true } },
    icon: { table: { disable: true } },
    iconOnly: { table: { disable: true } },
    label: { table: { disable: true } },
  },
  render: (args: ToggleButtonProps) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <ToggleButton
        {...args}
        value={value}
        onValueChange={(v) => setValue(v as string[])}
      />
    );
  },
  args: {
    mode: 'combined',
    selectionType: 'multiple',
    size: 'lg',
    scale: 1,
    items: fontStyleItems,
    disabled: false,
  },
};

/** Toggle único com ícone à esquerda do texto (mode='simple') */
export const ComIcone: Story = {
  argTypes: {
    selectionType: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
  render: (args: ToggleButtonProps) => {
    const [pressed, setPressed] = useState(false);
    return (
      <ToggleButton {...args} pressed={pressed} onPressedChange={setPressed} />
    );
  },
  args: {
    mode: 'simple',
    size: 'lg',
    scale: 1,
    icon: <Add16Regular />,
    label: 'Adicionar',
    disabled: false,
  },
};

/** Toggle único exibindo apenas o ícone (mode='simple', iconOnly) */
export const IconOnly: Story = {
  argTypes: {
    selectionType: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    label: { table: { disable: true } },
  },
  render: (args: ToggleButtonProps) => {
    const [pressed, setPressed] = useState(false);
    return (
      <ToggleButton
        {...args}
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label="Adicionar"
      />
    );
  },
  args: {
    mode: 'simple',
    size: 'lg',
    scale: 1,
    icon: <TextBold16Regular />,
    iconOnly: true,
    disabled: false,
  },
};

/** Grupo com ícone à esquerda do label em cada item (mode='combined') */
export const GrupoComIcones: Story = {
  argTypes: {
    pressed: { table: { disable: true } },
    onPressedChange: { table: { disable: true } },
    icon: { table: { disable: true } },
    iconOnly: { table: { disable: true } },
    label: { table: { disable: true } },
  },
  render: (args: ToggleButtonProps) => {
    const [value, setValue] = useState<string>('');
    return (
      <ToggleButton
        {...args}
        value={value}
        onValueChange={(v) => setValue(v as string)}
      />
    );
  },
  args: {
    mode: 'combined',
    selectionType: 'single',
    size: 'lg',
    scale: 1,
    items: filterItemsWithIcons,
    disabled: false,
  },
};

/** Grupo com itens somente ícone (mode='combined', item.iconOnly) */
export const GrupoIconOnly: Story = {
  argTypes: {
    pressed: { table: { disable: true } },
    onPressedChange: { table: { disable: true } },
    icon: { table: { disable: true } },
    iconOnly: { table: { disable: true } },
    label: { table: { disable: true } },
  },
  render: (args: ToggleButtonProps) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <ToggleButton
        {...args}
        value={value}
        onValueChange={(v) => setValue(v as string[])}
      />
    );
  },
  args: {
    mode: 'combined',
    selectionType: 'multiple',
    size: 'lg',
    scale: 1,
    items: iconOnlyItems,
    disabled: false,
  },
};

/** Grupo com item selecionado exibindo ícone + label e demais itens somente ícone (prop expandOnSelect) */
export const GrupoExpandOnSelect: Story = {
  argTypes: {
    pressed: { table: { disable: true } },
    onPressedChange: { table: { disable: true } },
    icon: { table: { disable: true } },
    iconOnly: { table: { disable: true } },
    label: { table: { disable: true } },
  },
  render: (args: ToggleButtonProps) => {
    const [value, setValue] = useState<string>('');
    return (
      <div style={{ width: '280px' }}>
        <ToggleButton
          {...args}
          value={value}
          onValueChange={(v) => setValue(v as string)}
        />
      </div>
    );
  },
  args: {
    mode: 'combined',
    selectionType: 'single',
    size: 'lg',
    scale: 1,
    items: personTypeItems,
    expandOnSelect: true,
    disabled: false,
  },
};

/** Estados desabilitados */
export const Desabilitado: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <ToggleButton mode="simple" icon={<TextBold16Regular />} iconOnly disabled />
      <ToggleButton
        mode="combined"
        selectionType="single"
        items={alignmentItems}
        defaultValue="left"
        disabled
      />
    </div>
  ),
};
