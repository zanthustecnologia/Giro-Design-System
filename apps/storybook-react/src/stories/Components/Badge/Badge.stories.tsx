import { Badge, Avatar } from '@giro-ds/react';
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import type { BadgeProps } from '@giro-ds/react';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'Badge é um indicador visual sobreposto a um elemento para comunicar notificações, contagens ou estados.',
      },
    },
    controls: {
      sort: 'alpha',
    },
    // layout: 'centered',
  },
  argTypes: {
    badgeValue: {
      control: { type: 'text' },
    },
    filterVariant: {
      control: { type: 'boolean' },
    },
    'aria-label': {
      control: { type: 'text' },
    },
    className: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
} as Meta<BadgeProps>;

const Anchor = () => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: '#e0e0e0',
    }}
  />
);

const Template: StoryFn<BadgeProps> = (args) => (
  <Badge {...args}>
    <Avatar src= 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80' />
  </Badge>
);

export const Default = Template.bind({});
Default.args = {
  badgeValue: 5,
};

export const Sobreposição: StoryFn<BadgeProps> = () => (
  <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
    <Badge badgeValue={1}>
      <Anchor />
    </Badge>
    <Badge badgeValue={9}>
      <Anchor />
    </Badge>
    <Badge badgeValue={10}>
      <Anchor />
    </Badge>
    <Badge badgeValue={99}>
      <Anchor />
    </Badge>
    <Badge badgeValue={100}>
      <Anchor />
    </Badge>
    <Badge badgeValue={null}>
      <Anchor />
    </Badge>
  </div>
);
Sobreposição.storyName = 'Sobreposição (com children)';

export const Inline: StoryFn<BadgeProps> = () => (
  <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
    <Badge badgeValue={3} />
    <Badge badgeValue="+5" />
    <Badge badgeValue={null} />
    <Badge badgeValue={3} filterVariant />
  </div>
);
Inline.storyName = 'Inline (sem children)';
