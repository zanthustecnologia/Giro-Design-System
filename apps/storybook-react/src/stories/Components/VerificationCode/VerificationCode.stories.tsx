import React, { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VerificationCode } from '@zanthus/react';

type Story = StoryObj<typeof VerificationCode>;

const meta: Meta<typeof VerificationCode> = {
    title: 'Components/VerificationCode',
    component: VerificationCode,
      parameters: {
        docs: {
            description: {
                component:
                    'Componente de entrada para códigos de verificação (ex: OTP), com suporte a diferentes tipos de entrada (numérico, alfabético, alfanumérico), estados de erro e desabilitado.',
            },
        },
        a11y: {
            element: '#root',
            config: {},
            options: {},
        },
    },
    decorators: [
        (Story) => (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
            }}>
                <div style={{
                    background: '#fff',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    textAlign: 'center',
                }}>
                    <Story />
                </div>
            </div>
        ),
    ],
    argTypes: {
        length: {
            control: { type: 'number', min: 1, max: 20 },
            description: 'Define o número de dígitos do código.',
        },
        inputType: {
            control: { type: 'select' },
            options: ['numeric', 'alpha', 'alphanumeric'],
            description: 'Tipo de entrada (números | letras | letras e números).',
        },
        hasError: {
            control: { type: 'boolean' },
            description: 'Campo em estado de erro.',
        },
        errorMessage: {
            control: { type: 'text' },
            description: 'Mensagem de erro.',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Campo desabilitado.',
        },
        className: {
            control: { type: 'text' },
            description: 'Classe CSS adicional.',
        },
    },
};

export default meta;

export const Default: Story = {
    args: {
        length: 6,
        inputType: 'numeric',
        hasError: false,
        errorMessage: '',
        disabled: false,
        className: '',
    },
};

export const WithError: Story = {
    args: {
        ...Default.args,
        hasError: true,
        errorMessage: 'Código inválido.',
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
};