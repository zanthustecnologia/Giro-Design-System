import React from 'react';
import DatePicker from './DatePicker';

export default {
  title: 'Patterns/Date Picker',
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
};

const Template = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  locale: 'pt-br',
  calendarPosition: 'left', // Valor inicial para a prop calendarPosition
};
