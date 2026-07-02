import React, { JSX } from "react";
import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from "@giro-ds/react";
import type { ListItemProps } from "@giro-ds/react";
import { UsbPlug20Regular } from "@fluentui/react-icons";

const meta: Meta<typeof ListItem> = {
    title: 'Components/ListItem',
    component: ListItem,
    parameters: {
        docs: {
          description: {
            component: 'O ListItem é um item de lista interativo que pode ser usado com texto simples, ícone, checkbox ou radio. Suporta texto descritivo, estado desabilitado e responde a interações de mouse e teclado.',
          },
        },
        // layout: 'centered'
    },
      argTypes: {
        variant: {
            control: 'select',
            options: ['text', 'icon', 'checkbox', 'radio'],
        },
        hovered: {
            control: 'boolean',
        },
        showSubText: {
            control: {
                type: 'boolean',
            }
        },
        id: {
            table: {
                disable: true,
            },
        },
        className: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        icon: {
            table: {
                disable: true,
            },
        },
    }
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: ListItemProps): JSX.Element => {
    const { variant, disabled, showSubText, text } = args;
    return (
        <ul>
            <ListItem
                variant={variant}
                disabled={disabled}
                text={text}
                subText="List item"
                onClick={() => console.log('Clicked!')}
                hovered={true}
                showSubText={showSubText}
                icon={<UsbPlug20Regular />}
            />
        </ul>
    );
};

export const Default: Story = {
    render: Template,
    args: {
        id: '1',
        className: 'list-item',
        text: 'List Item',
        subText: 'List Item',
        disabled: false,
        showSubText: false,
        checked: false,
        selected: false,
        variant: 'text',
        onClick: () => console.log('List Item 1 clicked'),
        onChange: () => console.log('List Item 1 changed'),
    }
};

export const ComCheckbox: Story = {
    render: (args) => (
        <ul>
            <ListItem {...args} hovered={true} />
        </ul>
    ),
    args: {
        variant: 'checkbox',
        text: 'Aceitar termos de uso',
        subText: 'Leia os termos antes de continuar',
        disabled: false,
        checked: false,
        showSubText: false,
    }
};

export const ComRadio: Story = {
    render: (args) => (
        <ul>
            <ListItem {...args} hovered={true} />
        </ul>
    ),
    args: {
        variant: 'radio',
        text: 'Opção A',
        name: 'opcoes',
        value: 'opcao-a',
        disabled: false,
        checked: false,
        showSubText: false,
    }
};

export const ComIcone: Story = {
    render: (args) => (
        <ul>
            <ListItem {...args} hovered={true} icon={<UsbPlug20Regular />} />
        </ul>
    ),
    args: {
        variant: 'icon',
        text: 'Dispositivo USB',
        disabled: false,
        showSubText: false,
    }
};

export const ComSubtexto: Story = {
    render: (args) => (
        <ul>
            <ListItem {...args} hovered={true} />
        </ul>
    ),
    args: {
        variant: 'text',
        text: 'Item principal',
        subText: 'Informação complementar sobre o item',
        showSubText: true,
        disabled: false,
    }
};

export const Desabilitado: Story = {
    render: (args) => (
        <ul>
            <ListItem {...args} hovered={true} />
        </ul>
    ),
    args: {
        variant: 'text',
        text: 'Item indisponível',
        disabled: true,
        showSubText: false,
    }
};
