import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from './DatePicker';
import type { DatePickerProps } from './DatePicker';

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
    controls: {
      sort: 'alpha',
    },
    layout: 'centered',
  },
  argTypes: {
    locale: {
      control: {
        type: 'select', // Define o controle como um select
      },
      options: ['pt-br', 'en-us'], // Opções disponíveis no select
      defaultValue: 'pt-br', // Valor padrão
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'pt-br' },
      },
    },
    calendarPosition: {
      control: {
        type: 'select', // Define o controle como um select
      },
      options: ['left', 'right'], // Opções disponíveis no select
      defaultValue: 'left', // Valor padrão
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    locale: 'pt-br',
    calendarPosition: 'left',
  },
};

export const WithLabel: Story = {
  args: {
    locale: 'pt-br',
    label: 'Data de nascimento',
    calendarPosition: 'left',
  },
};

export const Disabled: Story = {
  args: {
    locale: 'pt-br',
    label: 'Data desabilitada',
    disabled: true,
    calendarPosition: 'left',
  },
};

export const EnglishLocale: Story = {
  args: {
    locale: 'en-us',
    label: 'Birth date',
    calendarPosition: 'left',
  },
};

export const RightPositioned: Story = {
  args: {
    locale: 'pt-br',
    label: 'Data com calendário à direita',
    calendarPosition: 'right',
  },
};
