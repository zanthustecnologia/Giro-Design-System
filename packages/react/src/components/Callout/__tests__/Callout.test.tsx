import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Callout from '../Callout';

// Mock de ícone simples
const MockIcon = () => <span data-testid="mock-icon">✓</span>;

describe('Callout', () => {
  
  test('deve renderizar com texto', () => {
    render(<Callout text="Mensagem de teste" />);
    expect(screen.getByText('Mensagem de teste')).toBeInTheDocument();
  });

  test('deve renderizar com título', () => {
    render(<Callout title="Título" />);
    expect(screen.getByText('Título')).toBeInTheDocument();
  });

  test('deve renderizar com ícone', () => {
    render(<Callout icon={<MockIcon />} text="Com ícone" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  test('deve aplicar tipo correto', () => {
    render(<Callout type="success" text="Sucesso" />);
    const callout = screen.getByRole('alert');
    expect(callout).toHaveClass('zds-callout__success');
  });

  test('deve ter role alert', () => {
    render(<Callout text="Alert test" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('deve usar ID customizado', () => {
    render(<Callout id="custom-id" text="Test" />);
    const callout = screen.getByRole('alert');
    expect(callout).toHaveAttribute('id', 'custom-id');
  });

  test('deve aplicar className customizada', () => {
    render(<Callout className="custom-class" text="Test" />);
    const callout = screen.getByRole('alert');
    expect(callout).toHaveClass('custom-class');
  });

  test('deve ter aria-labelledby quando há título', () => {
    render(<Callout title="Título" text="Texto" />);
    const callout = screen.getByRole('alert');
    expect(callout).toHaveAttribute('aria-labelledby');
  });
});