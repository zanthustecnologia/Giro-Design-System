import React, { JSX } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover, Calendar, Button } from '@giro-ds/react';


const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Lado onde o popover é exibido em relação ao trigger.',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alinhamento do popover em relação ao trigger.',
    },
  },
  args: {
    side: 'left',
    align: 'end',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de popover interativo com suporte a diferentes conteúdos e ações.',
      },
    },
  }
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = ({ side, align }: React.ComponentProps<typeof Popover>): JSX.Element => {
  const [dateLocale, setDateLocale] = React.useState('');

  return (
    <Popover
      side={side}
      align={align}
      trigger={<Button>Open Popover</Button>}
      content={<Calendar onDaySelect={(date) => setDateLocale(date.toLocaleDateString('pt-BR'))} />}
    />
  );
};

export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Popover padrão com conteúdo interativo.',
      }
    },
  },
};
