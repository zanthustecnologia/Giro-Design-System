import { Meta, StoryObj } from '@storybook/react';
import { RadioRadix } from '@giro-ds/react';
import type { RadioRadixProps } from '@giro-ds/react';

const meta: Meta<typeof RadioRadix> = {
  title: 'Components/RadioRadix',
  component: RadioRadix,
  parameters: {
    layout: 'centered'
  },
  args: {
    orientation: 'vertical',
    defaultValue: 'option-1',
    ariaLabel: 'Option 1 (change me!)',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    defaultValue: {
      control: { type: 'text' },
    },
    ariaLabel: {
      control: { type: 'text' },
    },
    onValueChange: {
      action: 'valueChanged',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioRadix>;

const basicItems: RadioRadixProps['items'] = [
  {
    id: 'radio-1',
    value: 'option-1',
    label: 'Option 1',
  },
  {
    id: 'radio-2',
    value: 'option-2',
    label: 'Option 2',
  },
];

const itemsWithDisabled: RadioRadixProps['items'] = [
  {
    id: 'radio-1',
    value: 'option-1',
    label: 'Option 1',
  },
  {
    id: 'radio-2',
    value: 'option-2',
    label: 'Option 2 (Disabled)',
    disabled: true,
  },
  {
    id: 'radio-3',
    value: 'option-3',
    label: 'Option 3',
  },
];

export const Default: Story = {
  render: (args) => {
    const items = [...basicItems];

    items[0].label = args.ariaLabel || 'Option 1';

    return (
      <RadioRadix
        items={items}
        orientation={args.orientation}
        ariaLabel={args.ariaLabel}
        onValueChange={(e) => console.log(e)}
      />
    );
  },
};

export const DisabledRadio: Story = {
  render: (args) => {
      const items = [...itemsWithDisabled];

      items[0].label = args.ariaLabel || 'Option 1';

      return (
        <RadioRadix
          items={items}
          orientation={args.orientation}
          ariaLabel={args.ariaLabel}
          onValueChange={(e) => console.log(e)}
        />
      );
  }
};

export const MultiRadio: Story = {
  render: (args) => {
      const items = [
        { id: '1', value: '1', label: args.ariaLabel || 'Option 1' },
        { id: '2', value: '2', label: 'Option 2' },
        { id: '3', value: '3', label: 'Option 3' },
        { id: '4', value: '4', label: 'Option 4' },
        { id: '5', value: '5', label: 'Option 5' },
      ]

      return (
        <RadioRadix
          items={items}
          orientation={args.orientation}
          ariaLabel={args.ariaLabel}
          onValueChange={(e) => console.log(e)}
        />
      );
  }
}