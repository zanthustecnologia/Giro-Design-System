import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';
import type { CalendarProps } from './Calendar';

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

/**
 * História - Calendário em inglês
 */
export const English: Story = {
  render: Template,
  args: {
    locale: 'en-us',
    format: 'mm/dd/yyyy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendário em inglês americano com formato mm/dd/yyyy.',
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
  locale="en-us" 
  format="mm/dd/yyyy"
/>`.trim(),
      },
    },
  },
};

/**
 * História - Com data pré-selecionada
 */
export const WithSelectedDate: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    format: 'dd/mm/yyyy',
    selectedDate: new Date(2025, 0, 15), // 15 de janeiro de 2025
    currentDate: new Date(2025, 0, 1),   // Janeiro de 2025
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendário com uma data pré-selecionada (15 de janeiro de 2025).',
      },
      source: {
        code: `
const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2025, 0, 15));
const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 0, 1));

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

/**
 * História - Calendário customizado
 */
export const CustomStyling: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    format: 'dd/mm/yyyy',
    className: 'custom-calendar',
    id: 'my-calendar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendário com classe CSS personalizada e ID específico.',
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
  className="custom-calendar"
  id="my-calendar"
/>

<style>
.custom-calendar {
  border: 2px solid #007bff;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}
</style>`.trim(),
      },
    },
  },
};

/**
 * História - Playground interativo
 */
export const Playground: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    format: 'dd/mm/yyyy',
    currentDate: new Date(),
    selectedDate: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use os controles abaixo para experimentar diferentes configurações do calendário.',
      },
    },
  },
};

/**
 * História - Demonstração de eventos
 */
export const EventHandlers: Story = {
  render: (args: TemplateArgs): JSX.Element => {
    const [currentDate, setCurrentDate] = useState<Date>(args.currentDate || new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(args.selectedDate || null);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string): void => {
      setLogs(prev => [
        `${new Date().toLocaleTimeString()}: ${message}`,
        ...prev.slice(0, 4) // Manter apenas 5 logs
      ]);
    };

    const handleDateChange = (newDate: Date): void => {
      setCurrentDate(newDate);
      addLog(`Data alterada para: ${newDate.toLocaleDateString('pt-BR')}`);
      args.onDateChange?.(newDate);
    };

    const handleDaySelect = (newSelectedDate: Date): void => {
      setSelectedDate(newSelectedDate);
      addLog(`Dia selecionado: ${newSelectedDate.toLocaleDateString('pt-BR')}`);
      args.onDaySelect?.(newSelectedDate);
    };

    return (
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <Calendar
          {...args}
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onDaySelect={handleDaySelect}
        />
        
        <div style={{ 
          minWidth: '250px', 
          padding: '16px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontFamily: 'sans-serif' }}>Event Log:</h4>
          {logs.length === 0 ? (
            <p style={{ color: '#666', margin: 0 }}>Nenhum evento ainda...</p>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {logs.map((log, index) => (
                <li key={index} style={{ 
                  marginBottom: '4px', 
                  padding: '4px 8px', 
                  backgroundColor: index === 0 ? '#e3f2fd' : 'transparent',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s ease'
                }}>
                  {log}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
  args: {
    locale: 'pt-br',
    format: 'dd/mm/yyyy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstração dos eventos onDateChange e onDaySelect com log em tempo real.',
      },
    },
  },
};