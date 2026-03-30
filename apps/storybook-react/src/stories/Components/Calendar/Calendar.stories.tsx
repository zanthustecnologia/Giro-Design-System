import React, { JSX, useState } from 'react';
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
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>();
    return <Calendar onDaySelect={(d) => setSelected(d)} selected={selected ?? null} />;
  },
  parameters: {
    docs: {
      description: { story: 'Calendário padrão em português brasileiro.' },
    },
  },
};

export const ComDataSelecionada: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(new Date());
    return <Calendar onDaySelect={(d) => setSelected(d)} selected={selected ?? null} />;
  },
  parameters: {
    docs: {
      description: { story: 'Calendário com a data de hoje pré-selecionada.' },
    },
  },
};

export const ComDropdownNavegacao: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <Calendar
        captionLayout="dropdown"
        onDaySelect={(d) => setSelected(d)}
        selected={selected ?? null}
      />
    );
  },
  parameters: {
    docs: {
      description: { story: 'Cabeçalho com dropdowns de mês e ano para navegação rápida.' },
    },
  },
};

export const ComRestricaoDeDatas: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <Calendar
        minDate={minDate}
        maxDate={maxDate}
        onDaySelect={(d) => setSelected(d)}
        selected={selected ?? null}
      />
    );
  },
  parameters: {
    docs: {
      description: { story: 'Navegação e seleção restritas ao mês atual via `minDate` e `maxDate`.' },
    },
  },
};

export const MultiplosMeses: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <Calendar
        numberOfMonths={2}
        onDaySelect={(d) => setSelected(d)}
        selected={selected ?? null}
      />
    );
  },
  parameters: {
    docs: {
      description: { story: 'Dois meses exibidos lado a lado via `numberOfMonths={2}`.' },
    },
  },
};

export const EmIngles: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <Calendar
        locale="en-us"
        onDaySelect={(d) => setSelected(d)}
        selected={selected ?? null}
      />
    );
  },
  parameters: {
    docs: {
      description: { story: 'Calendário com locale em inglês via `locale="en-us"`.' },
    },
  },
};

