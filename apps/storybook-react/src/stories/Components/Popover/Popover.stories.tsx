import React, { JSX } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover, Calendar, Button } from '@giro-ds/react';


const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
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

const Template = (): JSX.Element => {
  return (
    <Popover>
      <Button>Open Popover</Button>
      <Calendar />
    </Popover>
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
