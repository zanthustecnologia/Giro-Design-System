import React from 'react';

const ThemePreview = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-neutral-background)',
        color: 'var(--color-neutral-text)',
        padding: '2rem',
        borderRadius: '8px',
        fontFamily: 'sans-serif',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        minHeight: '200px'
      }}
    >
      <h3 style={{ margin: '0 0 1rem 0' }}>Teste de Tema Ativo</h3>
      <p>Este bloco usa <code>--color-neutral-background</code> e <code>--color-neutral-text</code>.</p>
      <p>Mude o tema no topo do Storybook para ver a mudança.</p>
      
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem',
        border: '1px solid var(--color-neutral-text)',
        borderRadius: '4px',
        opacity: 0.8
      }}>
        <strong>Valores atuais:</strong>
        <br />
        <small>
          Background: <code>var(--color-neutral-background)</code>
          <br />
          Text: <code>var(--color-neutral-text)</code>
        </small>
      </div>
    </div>
  );
};

export default {
  title: 'Design Tokens/Theme Preview',
  component: ThemePreview,
  parameters: {
    layout: 'centered',
  }
};

export const VisualTest = {
  render: () => <ThemePreview />
};