import React, { ReactElement } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Add16Regular } from '@fluentui/react-icons';
import { Avatar, Button, Badge } from '@giro-ds/react';
import type { BadgeProps } from '@giro-ds/react';

// ✅ Types para os stories
interface BadgeStoryProps extends BadgeProps {}

interface StatusStoryProps {
  value?: number | string | null;
  type: 'status';
  variant?: 'outlined' | 'filled' | 'text';
}

const meta: Meta<typeof Badge> = {
  title: 'Pattern/Badge',
  component: Badge,
  parameters: {
    controls: {
      sort: 'alpha',
    },
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Badge para exibir notificações e indicadores de status.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '20vh' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    badgeValue: {
      control: {
        type: 'number',
      },
      description: 'Valor a ser exibido no badge',
      table: {
        type: { summary: 'number | string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['notification', 'status'],
      },
      description: 'Tipo do badge',
      table: {
        type: { summary: "'notification' | 'status'" },
        defaultValue: { summary: "'notification'" },
      },
    },
    children: {
      control: false,
      description: 'Conteúdo envolvido pelo badge',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
      table: {
        type: { summary: 'string' },
      },
    },
   maxValue: {
      control: 'number',
      description: 'Valor máximo para exibição',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '99' },
      },
    },
  
    },
  };


export default meta;

const Template: StoryFn<BadgeStoryProps> = (args): ReactElement => (
  <Badge {...args}>
    <Avatar icon={<Add16Regular />} />
  </Badge>
);

export const Default: StoryFn<BadgeStoryProps> = Template.bind({});
Default.args = {
  badgeValue: 1,
  type: 'notification',
};

export const SemValor: StoryFn<BadgeStoryProps> = (args): ReactElement => (
  <Badge {...args}>
    <Avatar icon={<Add16Regular />} />
  </Badge>
);
SemValor.args = {
  type: 'notification',
  badgeValue: null,
};

export const ValorAlto: StoryFn<BadgeStoryProps> = (args): ReactElement => (
  <Badge {...args}>
    <Avatar icon={<Add16Regular />} />
  </Badge>
);
ValorAlto.args = {
  type: 'notification',
  badgeValue: 150,
  maxValue: 99,
};

export const EmBotao: StoryFn<BadgeStoryProps> = (args): ReactElement => (
  <Badge {...args}>
    <Button>Notificações</Button>
  </Badge>
);
EmBotao.args = {
  type: 'notification',
  badgeValue: 3,
};

export const Status: StoryFn<BadgeStoryProps> = (args): ReactElement => (
  <Badge {...args}>
    <Avatar icon={<Add16Regular />} />
  </Badge>
);
Status.args = {
  type: 'status',
  badgeValue: null,
};
