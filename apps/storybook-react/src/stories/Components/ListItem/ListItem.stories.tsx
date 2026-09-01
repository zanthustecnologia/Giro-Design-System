import { UsbPlug20Regular } from "@fluentui/react-icons";
import { ListItem } from "@giro-ds/react";
import React, { JSX } from "react";

import type { ListItemProps } from "@giro-ds/react";
import type { Meta, StoryObj } from '@storybook/react-vite';


const meta: Meta<typeof ListItem> = {
    title: 'Components/ListItem',
    component: ListItem,
    parameters: {
        docs: {
          description: {
            component: 'O ListItem é um item de lista interativo que pode ser usado com texto simples, ícone ou checkbox. Suporta texto descritivo, estado desabilitado e responde a interações de mouse e teclado.',
          },
        },
        // layout: 'centered'
    },
      argTypes: {
        variant: {
            control: 'select',
            options: ['text', 'icon', 'checkbox'],
        },
        customWidth: {
            control: 'text',
            description: 'Largura do item. Deixe vazio para ocupar 100% do container.',
        },
        scale: {
            control: 'select',
            options: [1, 1.5, 2],
            description: 'Escala visual do componente.',
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
            control: false,
            description: 'Outros ListItems filhos para criar estrutura de árvore. Consulte as stories de Árvore para exemplos.',
        },
        onExpandedChange: {
            table: {
                disable: true,
            },
        },
        defaultExpanded: {
            table: {
                disable: true,
            },
        },
        expanded: {
            table: {
                disable: true,
            },
        },
    }
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: ListItemProps): JSX.Element => {
    return (
        <ul>
            <ListItem
                {...args}
                icon={<UsbPlug20Regular />}
                onClick={() => console.log('Clicked!')}
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
        disabled: false,
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
    }
};

export const ArvoreControlada: Story = {
    render: (args) => (
        <ul>
            <ListItem
                text="Pasta principal"
                expanded={args.expanded}
            >
                <ListItem text="Arquivo 1" />
                <ListItem text="Arquivo 2" />
                <ListItem text="Arquivo 3" />
            </ListItem>
        </ul>
    ),
    args: {
        expanded: false,
    },
    argTypes: {
        expanded: {
            control: 'boolean',
            description: 'Estado de expansão controlado externamente.',
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Árvore com expansão controlada via prop `expanded`. Use o control para expandir/recolher.',
            },
        },
    },
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
