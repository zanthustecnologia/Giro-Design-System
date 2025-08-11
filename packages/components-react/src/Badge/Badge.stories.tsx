import React, { ReactElement } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Add16Regular } from '@fluentui/react-icons';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import Badge from './Badge';
import type { BadgeProps } from './Badge';

// ✅ Types para os stories
interface BadgeStoryProps extends BadgeProps {}

interface StatusStoryProps {
  value?: number | string | null;
  type: 'status';
  variant?: 'outlined' | 'filled' | 'text';
}

/**
 * Configurações padrão do Storybook para o componente Badge
 */
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
    value: {
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
    disabled: {
      control: 'boolean',
      description: 'Se o badge está desabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    onClick: {
      action: 'clicked',
      description: 'Callback quando o badge é clicado',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;

/**
 * Template para renderizar o componente Badge
 */
const Template: StoryFn<BadgeStoryProps> = (args): ReactElement => (
  <Badge {...args}>
    <Avatar icon={<Add16Regular />} />
  </Badge>
);

/**
 * História Padrão para o Badge
 */
export const Default: StoryFn<BadgeStoryProps> = Template.bind({});
Default.args = {
  value: 0,
  type: 'notification',
};

Default.parameters = {
  docs: {
    description: {
      story: 'Badge padrão com valor zero exibido sobre um Avatar.',
    },
  },
};

/**
 * Badge sem valor (apenas indicador visual)
 */
export const WithoutValue: StoryFn<BadgeStoryProps> = Template.bind({});
WithoutValue.args = {
  value: null,
  type: 'notification',
};

WithoutValue.parameters = {
  docs: {
    description: {
      story: 'Badge sem valor, mostrando apenas um indicador visual pequeno.',
    },
  },
};

/**
 * Template para badge de status em botão
 */
const statusTemplate: StoryFn<StatusStoryProps> = (args): ReactElement => (
  <Button variant={args.variant || 'outlined'}>
    Filtro
    <Badge type={args.type} value={args.value} />
  </Button>
);

/**
 * Badge do tipo status
 */
export const Status: StoryFn<StatusStoryProps> = statusTemplate.bind({});
Status.args = {
  value: 1,
  type: 'status',
  variant: 'outlined',
};

Status.parameters = {
  docs: {
    description: {
      story: 'Badge do tipo status usado em botões para indicar filtros ativos ou estados.',
    },
  },
};