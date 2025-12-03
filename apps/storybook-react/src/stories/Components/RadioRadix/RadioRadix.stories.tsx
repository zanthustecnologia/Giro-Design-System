import { Meta, StoryObj } from '@storybook/react';
import { RadioRadix } from '@giro/react';
import type { RadioRadixProps } from '@giro/react';

const meta: Meta<typeof RadioRadix> = {
  component: RadioRadix,
  title: 'Components/RadioRadix',
  argTypes:{
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal']
    }
  }

};
export default meta;

type Story = StoryObj<typeof RadioRadix>;

// Mock de dados
const mockRadioItems: RadioRadixProps['items'] = [
  {
    id: 'radio-1',
    value: 'option-1',
    label: 'Option 1',
    disabled: false,
  },
  {
    id: 'radio-2',
    value: 'option-2',
    label: 'Option 2',
    disabled: false,
  },
  {
    id: 'radio-3',
    value: 'option-3',
    label: 'Option 3 (Disabled)',
    disabled: true,
  },
  {
    id: 'radio-4',
    value: 'option-4',
    label: 'Option 4',
    disabled: false,
  },
  {
    id: 'radio-5',
    value: 'option-5',
    label: 'Option 5',
    disabled: false,
  },
];

export const Default: Story = {
  render: (args) => <RadioRadix items={mockRadioItems} orientation={args.orientation} onValueChange={(e) => console.log(e)} defaultValue='option-1' />,
};