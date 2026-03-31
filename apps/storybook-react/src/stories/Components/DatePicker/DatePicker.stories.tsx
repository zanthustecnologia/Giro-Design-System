import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '@giro-ds/react';
import type { DatePickerProps } from '@giro-ds/react';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Date Picker',
  component: DatePicker,
  parameters: {
    controls: {
      sort: 'alpha',
    },
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
    calendarPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Posição do calendário dropdown',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: 'left' },
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
    calendarPosition: 'left',
    label: 'Data de nascimento',
    helperText: 'Selecione sua data de nascimento',
  },
};

export const EnglishLocale: Story = {
  render: Template,
  args: {
    locale: 'en-us',
    calendarPosition: 'left',
    label: 'Date (US)',
    helperText: 'Format: MM/DD/YYYY',
  },
};

export const RightPositioned: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarPosition: 'right',
    label: 'Data (Calendário à direita)',
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarPosition: 'left',
    label: 'Data com erro',
    required: true,
    error: 'Este campo é obrigatório',
  },
};

export const Controlado: Story = {
  render: ControlledTemplate,
  args: {
    locale: 'pt-br',
    calendarPosition: 'left',
    label: 'Data de início',
    helperText: 'Selecione a data de início',
  },
};

export const ComRestricaoDeDatas: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    calendarPosition: 'left',
    label: 'Data do evento',
    helperText: 'Selecione uma data futura',
    minDate: new Date(),
  },
};
