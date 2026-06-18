import { FileUpload } from '@giro-ds/react';
import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof FileUpload>;

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    docs: {
      description: {
        component:
          'Área de upload de arquivos que suporta clique e drag & drop. Exibe thumbnails para imagens e ícone de documento para outros tipos de arquivo.',
      },
    },
    controls: { sort: 'alpha' },
  },
  argTypes: {
    accept: {
      control: 'text',
      description: 'Tipos de arquivo aceitos (ex: "image/*", ".pdf,.docx")',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita interações com o componente',
    },
    error: {
      control: 'boolean',
      description: 'Exibe estado de erro com borda e ícone de alerta',
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem exibida no helperText quando em estado de erro',
    },
    helperText: {
      control: 'text',
      description: 'Texto auxiliar exibido abaixo da zona de drop',
    },
    instructionText: {
      control: 'text',
      description: 'Texto de instrução exibido na zona vazia',
    },
    maxFiles: {
      control: 'number',
      description: 'Quantidade máxima de arquivos permitidos',
    },
    maxSize: {
      control: 'number',
      description: 'Tamanho máximo por arquivo em bytes',
    },
    multiple: {
      control: 'boolean',
      description: 'Permite selecionar múltiplos arquivos',
    },
    // Ocultar props internas na tabela
    onChange: { table: { disable: true } },
    value: { table: { disable: true } },
    className: { table: { disable: true } },
    id: { table: { disable: true } },
  },
};

export default meta;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    multiple: true,
    helperText: 'Formatos aceitos: PNG, JPG, PDF. Tamanho máximo: 5 MB.',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args} />
    </div>
  ),
};

// ─── Sem helper text ─────────────────────────────────────────────────────────

export const SemHelperText: Story = {
  args: {
    multiple: true,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args} />
    </div>
  ),
};
SemHelperText.storyName = 'Sem helper text';

// ─── Desabilitado ─────────────────────────────────────────────────────────────

export const Desabilitado: Story = {
  args: {
    disabled: true,
    helperText: 'Upload indisponível no momento.',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args} />
    </div>
  ),
};

// ─── Estado de erro (sem arquivo) ────────────────────────────────────────────

export const ComErro: Story = {
  args: {
    error: true,
    errorMessage: 'O formato do arquivo não é suportado.',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args} />
    </div>
  ),
};
ComErro.storyName = 'Com erro';

// ─── Apenas imagens ──────────────────────────────────────────────────────────

export const ApenasImagens: Story = {
  args: {
    accept: 'image/*',
    multiple: true,
    helperText: 'Somente imagens (PNG, JPG, GIF, WebP).',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args} />
    </div>
  ),
};
ApenasImagens.storyName = 'Apenas imagens';

// ─── Arquivo único ───────────────────────────────────────────────────────────

export const ArquivoUnico: Story = {
  args: {
    multiple: false,
    helperText: 'Selecione um único arquivo.',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args} />
    </div>
  ),
};
ArquivoUnico.storyName = 'Arquivo único';

// ─── Controlado ──────────────────────────────────────────────────────────────

export const Controlado: Story = {
  args: {
    multiple: true,
    helperText: 'Arquivos selecionados exibidos abaixo.',
  },
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <FileUpload {...args} value={files} onChange={setFiles} />
        {files.length > 0 && (
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px' }}>
            {files.map((f, i) => (
              <li key={i}>{f.name} ({(f.size / 1024).toFixed(1)} KB)</li>
            ))}
          </ul>
        )}
      </div>
    );
  },
};

// ─── Com limite de tamanho ────────────────────────────────────────────────────

export const ComLimiteDeTamanho: Story = {
  args: {
    multiple: true,
    maxSize: 2 * 1024 * 1024, // 2 MB
    helperText: 'Arquivos acima de 2 MB são ignorados automaticamente.',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args} />
    </div>
  ),
};
ComLimiteDeTamanho.storyName = 'Com limite de tamanho';

// ─── Com máximo de arquivos ───────────────────────────────────────────────────

export const ComMaximoDeArquivos: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    helperText: 'Máximo de 3 arquivos.',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FileUpload {...args} />
    </div>
  ),
};
ComMaximoDeArquivos.storyName = 'Com máximo de arquivos';
