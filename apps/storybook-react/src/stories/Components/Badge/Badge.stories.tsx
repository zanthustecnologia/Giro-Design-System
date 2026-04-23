import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Badge, Avatar } from '@giro-ds/react';
import type { BadgeProps } from '@giro-ds/react';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    controls: {
      sort: 'alpha',
    },
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['notification', 'status'],
    },
    badgeValue: {
      control: { type: 'text' },
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
  type: 'notification',
  badgeValue: 5,
};

export const Notification: StoryFn<BadgeProps> = () => (
  <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
    <Badge type="notification" badgeValue={1}>
      <Anchor />
    </Badge>
    <Badge type="notification" badgeValue={9}>
      <Anchor />
    </Badge>
    <Badge type="notification" badgeValue={10}>
      <Anchor />
    </Badge>
    <Badge type="notification" badgeValue={99}>
      <Anchor />
    </Badge>
    <Badge type="notification" badgeValue={100}>
      <Anchor />
    </Badge>
    <Badge type="notification" badgeValue={null}>
      <Anchor />
    </Badge>
  </div>
);

export const Status: StoryFn<BadgeProps> = () => (
  <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
    <Badge type="status" badgeValue={3}>
      <Anchor />
    </Badge>
    <Badge type="status" badgeValue={null}>
      <Anchor />
    </Badge>
  </div>
);
