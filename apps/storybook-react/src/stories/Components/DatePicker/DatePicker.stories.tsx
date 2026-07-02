import { DatePicker } from '@giro-ds/react';
import React, { useState } from 'react';

import type { DatePickerProps } from '@giro-ds/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Date Picker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: 'O DatePicker é um campo de entrada de data que combina um input de texto com um calendário. O usuário pode digitar a data diretamente ou selecioná-la pelo calendário.',
      },
    },
    // layout: 'centered',
  },
  argTypes: {
    locale: {
      control: { type: 'select' },
      options: ['pt-br', 'en-us'],
      description: 'Locale para formatação da data',
      table: {
        type: { summary: "'pt-br' | 'en-us'" },
        defaultValue: { summary: 'pt-br' },
      },
    },
    calendarSide: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Posição do calendário dropdown',
      table: {
        type: { summary: "'left' | 'right' | 'top' | 'bottom'" },
        defaultValue: { summary: 'bottom' },
      },
    },
    calendarAlign: {
      control: { type: 'select' },
      options: ['start', 'end'],
      description: 'Alinhamento do calendário em relação ao campo',
      table: {
        type: { summary: "'start' | 'end'" },
        defaultValue: { summary: 'start' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Se o campo é obrigatório',
    },
    helperText: {
      control: 'text',
      description: 'Texto de ajuda exibido abaixo do campo',
    },
    label: {
      control: 'text',
      description: 'Label do campo',
    },
    scale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
      description: 'Escala visual do componente (aplica-se ao DatePicker, TextField e Calendar internos)',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Template básico
const Template = (args: DatePickerProps) => <DatePicker {...args} />;

// Template para controlled components
const ControlledTemplate = (args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <DatePicker
      {...args}
      value={selectedDate}
      onChange={setSelectedDate}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarSide: 'bottom',
    label: 'Data de nascimento',
    helperText: 'Selecione sua data de nascimento',
    scale: 1,
  },
};

export const ControladoSimples: Story = {
  render: ControlledTemplate,
  args: {
    locale: 'pt-br',
    calendarSide: 'bottom',
    label: 'Data de nascimento',
    helperText: 'Selecione sua data de nascimento',
  },
};

export const LocaleIngles: Story = {
  render: Template,
  args: {
    locale: 'en-us',
    calendarSide: 'bottom',
    label: 'Date (US)',
    helperText: 'Format: MM/DD/YYYY',
  },
};
LocaleIngles.storyName = 'Locale Inglês';

export const ComErro: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarSide: 'bottom',
    label: 'Data com erro',
    required: true,
    error: 'Este campo é obrigatório',
  },
};

export const Controlado: Story = {
  render: ControlledTemplate,
  args: {
    locale: 'pt-br',
    calendarSide: 'left',
    label: 'Data de início',
    helperText: 'Selecione a data de início',
  },
};

export const ComRestricaoDeDatas: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarSide: 'left',
    label: 'Data do evento',
    helperText: 'Selecione uma data futura',
    minDate: new Date(),
  },
};

export const AlinhamentoDireita: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarSide: 'bottom',
    calendarAlign: 'end',
    label: 'Data de nascimento',
    helperText: 'Calendário ancorado à direita',
  },
};

export const Escalas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '96px', alignItems: 'flex-start' }}>
      <DatePicker label="Scale 1.0" helperText="Exemplo" scale={1} />
      <DatePicker label="Scale 1.5" helperText="Exemplo" scale={1.5} />
      <DatePicker label="Scale 2.0" helperText="Exemplo" scale={2} />
    </div>
  ),
};
