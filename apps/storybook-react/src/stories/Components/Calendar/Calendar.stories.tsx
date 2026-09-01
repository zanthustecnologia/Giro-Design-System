import { Calendar } from '@giro-ds/react';
import React, { useState } from 'react';

import type { DateRange } from '@giro-ds/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component: 'O Calendar é um componente de seleção de datas. Suporta internacionalização, restrição de intervalo, múltiplos meses, dropdown de navegação e dias desabilitados por regras customizadas.',
      },
    },
  },
  argTypes: {
    scale: {
      control: { type: 'select' },
      options: [1, 1.5, 2],
      description: 'Escala visual do componente.',
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 4 },
      description: 'Quantidade de meses exibidos simultaneamente.',
    },
    mode: {
      control: { type: 'radio' },
      options: ['single', 'range'],
      description: 'Modo de seleção de datas.',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Date | undefined>();
    return <Calendar {...args} onDaySelect={(d) => setSelected(d)} selected={selected ?? null} />;
  },
  args: {
    scale: 1,
  },
  parameters: {
    docs: {
      description: { story: 'Calendário padrão em português brasileiro.' },
    },
  },
};

export const ComDataSelecionada: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Date | undefined>(new Date());
    return <Calendar {...args} onDaySelect={(d) => setSelected(d)} selected={selected ?? null} />;
  },
  parameters: {
    docs: {
      description: { story: 'Calendário com a data de hoje pré-selecionada.' },
    },
  },
};

export const ComRestricaoDeDatas: Story = {
  render: (args) => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <Calendar
        {...args}
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
  render: (args) => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <Calendar
        {...args}
        numberOfMonths={2}
        onDaySelect={(d) => setSelected(d)}
        selected={selected ?? null}
      />
    );
  },
  parameters: {
    docs: {
      description: { story: 'Calendário com dois meses exibidos simultaneamente via `numberOfMonths={2}`.' },
    },
  },
};

export const SelecaoDeIntervalo: Story = {
  render: (args) => {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <Calendar
        {...args}
        mode="range"
        numberOfMonths={2}
        selectedRange={range ?? null}
        onRangeSelect={(r) => setRange(r)}
      />
    );
  },
  parameters: {
    docs: {
      description: { story: 'Seleção de intervalo de datas via `mode="range"`. Clique em um dia para definir o início e em outro para definir o fim.' },
    },
  },
};

export const EmIngles: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <Calendar
        {...args}
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

export const Escalas: Story = {
  render: () => {
    const [selectedA, setSelectedA] = useState<Date | undefined>();
    const [selectedB, setSelectedB] = useState<Date | undefined>();
    const [selectedC, setSelectedC] = useState<Date | undefined>();

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '200px', alignItems: 'flex-start' }}>
        <Calendar onDaySelect={(d) => setSelectedA(d)} selected={selectedA ?? null} scale={1} />
        <Calendar onDaySelect={(d) => setSelectedB(d)} selected={selectedB ?? null} scale={1.5} />
        <Calendar onDaySelect={(d) => setSelectedC(d)} selected={selectedC ?? null} scale={2} />
      </div>
    );
  },
};

