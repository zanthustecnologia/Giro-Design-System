import React, { JSX } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CalendarNew } from '@giro-ds/react';
import type { CalendarProps } from '@giro-ds/react';


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
  }
} satisfies Meta<typeof CalendarNew>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (): JSX.Element => {
  return (
    <CalendarNew/>
  );
};

export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Calendário padrão em português brasileiro com formato dd/mm/yyyy.',
      }
    },
  },
};
