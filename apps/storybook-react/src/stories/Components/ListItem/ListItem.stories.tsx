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
        width: {
            control: 'text',
            description: 'Largura do item. Deixe vazio para ocupar 100% do container.',
        },
        scale: {
            control: 'select',
            options: [1, 1.5, 2],
            description: 'Escala visual do componente.',
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
        children: {
            table: {
                disable: true,
            },
        },
        onExpandedChange: {
            table: {
                disable: true,
            },
        },
        defaultExpanded: {
            control: 'boolean',
        },
        expanded: {
            control: 'boolean',
        },
    }
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: ListItemProps): JSX.Element => {
    const { variant, disabled, showSubText, text, width, scale } = args;
    return (
        <ul>
            <ListItem
                variant={variant}
                disabled={disabled}
                text={text}
                subText="List item"
                onClick={() => console.log('Clicked!')}
                showSubText={showSubText}
                icon={<UsbPlug20Regular />}
                width={width}
                scale={scale}
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
            <ListItem {...args} />
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
            <ListItem {...args} />
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
            <ListItem {...args} icon={<UsbPlug20Regular />} />
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
            <ListItem {...args} />
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
            <ListItem {...args} />
        </ul>
    ),
    args: {
        variant: 'text',
        text: 'Item indisponível',
        disabled: true,
        showSubText: false,
    }
};

export const ArvoreSimples: Story = {
    render: () => (
        <ul>
            <ListItem text="Pasta principal" defaultExpanded>
                <ListItem text="Arquivo 1" />
                <ListItem text="Arquivo 2" />
                <ListItem text="Sub-pasta" defaultExpanded>
                    <ListItem text="Arquivo 3" />
                    <ListItem text="Arquivo 4" />
                </ListItem>
            </ListItem>
            <ListItem text="Outra pasta">
                <ListItem text="Arquivo 5" />
            </ListItem>
        </ul>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Estrutura de árvore com itens de texto. Clique no chevron para expandir/recolher.',
            },
        },
    },
};

export const ArvoreComCheckbox: Story = {
    render: () => (
        <ul>
            <ListItem variant="checkbox" text="Selecionar grupo" defaultExpanded>
                <ListItem variant="checkbox" text="Opção A" />
                <ListItem variant="checkbox" text="Opção B" />
                <ListItem variant="checkbox" text="Opção C" disabled />
            </ListItem>
        </ul>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Estrutura de árvore com checkboxes aninhados.',
            },
        },
    },
};

export const ArvoreComIcone: Story = {
    render: () => (
        <ul>
            <ListItem variant="icon" icon={<UsbPlug20Regular />} text="Dispositivos" defaultExpanded>
                <ListItem variant="icon" icon={<UsbPlug20Regular />} text="Dispositivo A" />
                <ListItem variant="icon" icon={<UsbPlug20Regular />} text="Dispositivo B" />
            </ListItem>
        </ul>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Estrutura de árvore com itens de ícone.',
            },
        },
    },
};
