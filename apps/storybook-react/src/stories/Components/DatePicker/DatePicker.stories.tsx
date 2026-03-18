import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '@giro-ds/react';
import type { DatePickerProps } from '@giro-ds/react';

const meta: Meta<typeof DatePicker> = {
  title: 'Pattern/Date Picker',
  component: DatePicker,
  decorators: [
    (Story) => (
      <div style={{ height: '50vh' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
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
      options: ['start', 'center', 'end'],
      description: 'Alinhamento do calendário em relação ao campo',
      table: {
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'center' },
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
  },
} satisfies Meta<typeof DatePickerNew>;

export default meta;
type Story = StoryObj<typeof meta>;

// Template básico
const Template = (args: DatePickerProps) => <DatePicker {...args} />;

// Template para controlled components
const ControlledTemplate = (args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div style={{ padding: '1rem' }}>
      <DatePicker
        {...args}
        value={selectedDate}
        onChange={setSelectedDate}
      />
      
      <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Estado Controlado:</strong>
        <br />
        Data selecionada: {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'Nenhuma'}
        <br />
        <button 
          onClick={() => setSelectedDate(new Date())}
          style={{ marginTop: '0.5rem', padding: '4px 8px' }}
        >
          Definir data atual
        </button>
        <button 
          onClick={() => setSelectedDate(null)}
          style={{ marginTop: '0.5rem', marginLeft: '0.5rem', padding: '4px 8px' }}
        >
          Limpar
        </button>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarSide: 'bottom',
    label: 'Data de nascimento',
    helperText: 'Selecione sua data de nascimento',
  },
};

export const Controlled: Story = {
  render: ControlledTemplate,
  args: {
    locale: 'pt-br',
    calendarSide: 'bottom',
    label: 'Data de nascimento',
    helperText: 'Selecione sua data de nascimento',
  },
};

export const WithBrazilianLocale: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarSide: 'bottom',
    label: 'Data (Brasil)',
    helperText: 'Formato: DD/MM/AAAA',
  },
};

export const EnglishLocale: Story = {
  render: Template,
  args: {
    locale: 'en-us',
    calendarSide: 'bottom',
    label: 'Date (US)',
    helperText: 'Format: MM/DD/YYYY',
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarSide: 'bottom',
    label: 'Data com erro',
    required: true,
  },
};
