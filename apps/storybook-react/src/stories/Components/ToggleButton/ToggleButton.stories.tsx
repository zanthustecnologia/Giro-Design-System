import { ToggleButton } from '@giro-ds/react';
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
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Tipo de seleção do grupo (modo `combined`): única ou múltipla',
      table: {
        type: { summary: "'single' | 'multiple'" },
        defaultValue: { summary: 'single' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do grupo de toggles (modo `combined`)',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
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
      table: {
        type: { summary: 'boolean' },
      },
    },
    onPressedChange: {
      action: 'pressed-changed',
      description: 'Callback ao alterar o estado do toggle único (modo `simple`)',
      table: {
        type: { summary: '(pressed: boolean) => void' },
      },
    },
    onValueChange: {
      action: 'value-changed',
      description: 'Callback ao alterar a seleção do grupo (modo `combined`)',
      table: {
        type: { summary: '(value: string | string[]) => void' },
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
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Dados de exemplo ────────────────────────────────────────────────────────

const alignmentItems = [
  { value: 'left', label: 'Esquerda' },
  { value: 'center', label: 'Centro' },
  { value: 'right', label: 'Direita' },
];

const fontStyleItems = [
  { value: 'bold', label: 'N' },
  { value: 'italic', label: 'I' },
  { value: 'underline', label: 'S' },
];

const viewItems = [
  { value: 'day', label: 'Dia' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mês' },
];

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Toggle único (mode='simple', padrão) */
export const Default: Story = {
  render: (args: ToggleButtonProps) => {
    const [pressed, setPressed] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
        <ToggleButton {...args} pressed={pressed} onPressedChange={setPressed}>
          Negrito
        </ToggleButton>
        <span style={{ fontSize: '13px', color: 'var(--color-neutral-low-medium)' }}>
          Estado: {pressed ? 'ativado' : 'desativado'}
        </span>
      </div>
    );
  },
  args: {
    mode: 'simple',
    size: 'lg',
    disabled: false,
  },
};

/** Grupo de seleção única (mode='combined', type='single') */
export const GrupoSelecaoUnica: Story = {
  render: (args: ToggleButtonProps) => {
    const [value, setValue] = useState<string>('left');
    return (
      <ToggleButton
        {...args}
        value={value}
        onValueChange={(v) => {
          if (v) setValue(v as string);
        }}
      />
    );
  },
  args: {
    mode: 'combined',
    type: 'single',
    size: 'lg',
    items: alignmentItems,
    orientation: 'horizontal',
    disabled: false,
  },
};

/** Grupo de seleção múltipla (mode='combined', type='multiple') */
export const SelecaoMultipla: Story = {
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
    type: 'multiple',
    size: 'lg',
    items: fontStyleItems,
    orientation: 'horizontal',
    disabled: false,
  },
};

/** Grupo com orientação vertical */
export const Vertical: Story = {
  render: (args: ToggleButtonProps) => {
    const [value, setValue] = useState<string>('day');
    return (
      <ToggleButton
        {...args}
        value={value}
        onValueChange={(v) => {
          if (v) setValue(v as string);
        }}
      />
    );
  },
  args: {
    mode: 'combined',
    type: 'single',
    size: 'lg',
    items: viewItems,
    orientation: 'vertical',
    disabled: false,
  },
};

/** Estados desabilitados */
export const Desabilitado: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <ToggleButton mode="simple" disabled>
        Negrito
      </ToggleButton>
      <ToggleButton
        mode="combined"
        type="single"
        items={alignmentItems}
        defaultValue="left"
        disabled
      />
    </div>
  ),
};
