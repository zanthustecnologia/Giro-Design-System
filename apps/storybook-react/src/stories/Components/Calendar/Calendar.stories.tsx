import React, { JSX } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@giro-ds/react';


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
  }
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (): JSX.Element => {
  return (
    <Calendar/>
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
