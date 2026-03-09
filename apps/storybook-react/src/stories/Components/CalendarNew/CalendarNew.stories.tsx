import React, { JSX, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CalendarNew } from '@giro-ds/react';

// ✅ Meta configuration with proper typing
const meta: Meta<typeof CalendarNew> = {
  title: 'Components/CalendarNew',
  component: CalendarNew,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de calendário interativo com suporte a internacionalização e diferentes formatos de data.',
      },
    },
  },
} satisfies Meta<typeof CalendarNew>;

export default meta;

// ✅ Story type definition
type Story = StoryObj<typeof meta>;

// ✅ Template interface for better typing
interface TemplateArgs {
  onDateChange?: (date: Date) => void;
  onDaySelect?: (date: Date) => void;
}

/**
 * Template base para o componente Calendar
 */
const Template = (args: TemplateArgs): JSX.Element => {

  return (
    <CalendarNew
    />
  );
};

/**
 * História padrão - Calendário em português
 */
export const Default: Story = {
  render: Template,
  
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
