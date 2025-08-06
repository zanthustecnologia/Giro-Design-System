import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import ListItem from "./ListItem";
import type { ListItemProps } from "./ListItem";
import { UsbPlug20Filled } from "@fluentui/react-icons";

const meta: Meta<typeof ListItem> = {
    title: 'Components/ListItem',
    component: ListItem,
    parameters: {
        layout: 'centered'
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
                icon={<UsbPlug20Filled />}
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