import React, { JSX, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@giro-ds/react';
import type { CalendarProps } from '@giro-ds/react';

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
    locale: {
      control: { type: 'select' },
      options: ['pt-br', 'en-us'],
      description: 'Idioma do calendário',
      table: {
        type: { summary: "'pt-br' | 'en-us'" },
        defaultValue: { summary: "'pt-br'" },
      },
    },
    format: {
      control: { type: 'select' },
      options: ['dd/mm/yyyy', 'mm/dd/yyyy'],
      description: 'Formato de exibição da data',
      table: {
        type: { summary: "'dd/mm/yyyy' | 'mm/dd/yyyy'" },
        defaultValue: { summary: "'dd/mm/yyyy'" },
      },
    },
    selected: {
      control: { type: 'date' },
      description: 'Data selecionada atualmente',
      table: {
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'undefined' },
      },
    },
    currentDate: {
      control: { type: 'date' },
      description: 'Mês exibido no calendário',
      table: {
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'new Date()' },
      },
    },
    minDate: {
      control: { type: 'date' },
      description: 'Data mínima selecionável',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'undefined' },
      },
    },
    maxDate: {
      control: { type: 'date' },
      description: 'Data máxima selecionável',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'undefined' },
      },
    },
    autoFocus: {
      control: { type: 'boolean' },
      description: 'Foca automaticamente o primeiro dia selecionado ou hoje',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onDaySelect: {
      action: 'daySelected',
      description: 'Chamado quando o usuário seleciona um dia',
      table: {
        type: { summary: '(date: Date) => void' },
      },
    },
    onDateChange: {
      action: 'dateChanged',
      description: 'Chamado quando o usuário navega entre meses',
      table: {
        type: { summary: '(date: Date) => void' },
      },
    },
    onClear: {
      action: 'cleared',
      description: 'Chamado quando o usuário limpa a seleção',
      table: {
        type: { summary: '() => void' },
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
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: CalendarProps): JSX.Element => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  const handleDaySelect = (date: Date): void => {
    setSelected(date);
    args.onDaySelect?.(date);
  };

  const handleClear = (): void => {
    setSelected(undefined);
    args.onClear?.();
  };

  return (
    <Calendar
      {...args}
      selected={selected}
      onDaySelect={handleDaySelect}
      onClear={handleClear}
    />
  );
};

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
    },
  },
};

export const WithDateRestriction: Story = {
  render: Template,
  args: {
    locale: 'pt-br',
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 3, 0),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendário com restrição de período usando `minDate` e `maxDate`. Dias fora do intervalo ficam desabilitados.',
      },
    },
  },
};

export const EnglishLocale: Story = {
  render: Template,
  args: {
    locale: 'en-us',
    format: 'mm/dd/yyyy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendário em inglês com formato mm/dd/yyyy.',
      },
    },
  },
};
