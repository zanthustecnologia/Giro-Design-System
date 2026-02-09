import React from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { ToastRadix, Button } from '@giro-ds/react';
import type { ToastProps } from '@giro-ds/react';



const meta: Meta<ToastProps> = {
  title: 'Components/ToastRadix',
  component: ToastRadix,
  parameters: {
    docs: {
      description: {
        component:
          'Componente Select usando Radix UI com estilização customizada e melhor organização de código.',
      },
    },
  },
  argTypes: {
    
  },
};

export default meta;

export const Default: StoryFn<ToastProps> = (args) => (
  <div style={{ maxWidth: 300 }}>
    <Button>
      Show Toast
      <ToastRadix 
      {...args}
      />
    </Button>
  </div>
);