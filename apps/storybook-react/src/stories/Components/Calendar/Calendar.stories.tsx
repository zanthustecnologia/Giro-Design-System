import React, { JSX, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@giro-ds/react';
import type { CalendarProps } from '@giro-ds/react';

// ✅ Meta configuration with proper typing
const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de calendário interativo com suporte a internacionalização e diferentes formatos de data.',
      },
    },
  },
  argTypes: {
    currentDate: {
      control: { type: 'date' },
      description: 'Data atual do calendário (controla o mês/ano exibido)',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'new Date()' },
      },
    },
    selectedDate: {
      control: { type: 'date' },
      description: 'Data selecionada pelo usuário',
      table: {
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    locale: {
      control: { type: 'select' },
      options: ['pt-br', 'en-us'] as const,
      description: 'Idioma do calendário',
      table: {
        type: { summary: "'pt-br' | 'en-us'" },
        defaultValue: { summary: "'pt-br'" },
      },
    },
    format: {
      control: { type: 'select' },
      options: ['dd/mm/yyyy', 'mm/dd/yyyy'] as const,
      description: 'Formato da data',
      table: {
        type: { summary: "'dd/mm/yyyy' | 'mm/dd/yyyy'" },
        defaultValue: { summary: "'dd/mm/yyyy'" },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Classe CSS adicional',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    id: {
      control: { type: 'text' },
      description: 'Identificador único do componente',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onDateChange: {
      action: 'dateChanged',
      description: 'Função chamada quando a data (mês/ano) é alterada',
      table: {
        type: { summary: '(date: Date) => void' },
      },
    },
    onDaySelect: {
      action: 'daySelected',
      description: 'Função chamada quando um dia é selecionado',
      table: {
        type: { summary: '(date: Date) => void' },
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

// ✅ Story type definition
type Story = StoryObj<typeof meta>;

// ✅ Template interface for better typing
interface TemplateArgs extends CalendarProps {
  onDateChange?: (date: Date) => void;
  onDaySelect?: (date: Date) => void;
}

/**
 * Template base para o componente Calendar
 */
const Template = (args: TemplateArgs): JSX.Element => {
  const [currentDate, setCurrentDate] = useState<Date>(args.currentDate || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(args.selectedDate || null);

  /**
   * Manipula mudanças na data atual (navegação entre meses/anos)
   */
  const handleDateChange = (newDate: Date): void => {
    setCurrentDate(newDate);
    args.onDateChange?.(newDate);
  };
  const handleClear = (): void  =>{
    setSelectedDate(null);
    args.onClear?.();
  }
  /**
   * Manipula seleção de um dia específico
   */
  const handleDaySelect = (newSelectedDate: Date): void => {
    setSelectedDate(newSelectedDate);
    args.onDaySelect?.(newSelectedDate);
  };

  return (
    <Calendar
      {...args}
      currentDate={currentDate}
      selectedDate={selectedDate}
      onDateChange={handleDateChange}
      onDaySelect={handleDaySelect}
      onClear={handleClear}
    />
  );
};

/**
 * História padrão - Calendário em português
 */
export const Default: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    format: 'dd/mm/yyyy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendário padrão em português brasileiro com formato dd/mm/yyyy.',
      },
      source: {
        code: `
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [currentDate, setCurrentDate] = useState<Date>(new Date());

<Calendar
  currentDate={currentDate}
  selectedDate={selectedDate}
  onDateChange={(newDate: Date) => setCurrentDate(newDate)}
  onDaySelect={(newSelectedDate: Date) => setSelectedDate(newSelectedDate)}
  locale="pt-br" 
  format="dd/mm/yyyy"
/>`.trim(),
      },
    },
  },
};
