import TextField from './TextField';
import React from 'react';
import './styles.scss'
import { Mail16Regular, Clock16Regular, ArrowUpload16Regular } from '@fluentui/react-icons';
export default {
    title: 'Components/TextField',
    component: TextField,
    parameters: {
        controls: {
            sort: 'alpha'
        },
        layout: 'centered',

    },
    argTypes: {

        placeholder: { control: 'text' },
        label: { control: 'text' },
        disabled: { control: 'boolean' },
        positionTooltip: {
            control: 'select',
            options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'left', 'right'],
        },
        icon: {
            control: { type: 'select' },
            options: ['none', 'Mail', 'Clock', 'Upload'],
            mapping: {
                none: null,
                Mail: <Mail16Regular />,
                Clock: <Clock16Regular />,
                Upload: <ArrowUpload16Regular />,
            },
        },
        tooltip: {
            control: 'boolean'
        },
        tooltipText: {
            control: 'text',
            if: { arg: 'tooltip', truthy: true },
        },
        className: {
            table: {
                disable: true,
            },
        },
        helper: {
            control: 'boolean',
            if: { arg: 'helperText', truthy: true },
        },
        onChange: {
            table: {
                disable: true,
            }
        },
        value: {
            table: {
                disable: true
            }
        },
        id: {
            table: {
                disable: true
            }
        },
        name: {
            table: {
                disable: true
            }
        }
    },
}

export const Default = (args) => {
    return <div className='storybook__container'><TextField {...args} /></div>;
};

Default.args = {
    placeholder: 'Placeholder text',
    disabled: false,
    maxLength: 100,
    className: '',
    required: false,
    tooltip: true,
    helperText: 'Optional support text',
    trailingIcon: true,
    label: 'Label',
    tooltipText: 'Tooltip text'


}