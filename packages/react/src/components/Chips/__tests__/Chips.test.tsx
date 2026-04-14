import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import Chips from '../Chips';

describe('Chips', () => {
  const MockIcon = () => <span data-testid="mock-icon">•</span>;

  describe('Renderização básica', () => {
    it('renderiza o componente sem erros', () => {
      const { container } = render(<Chips>Etiqueta</Chips>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renderiza o texto passado como children', () => {
      render(<Chips>Ativo</Chips>);
      expect(screen.getByText('Ativo')).toBeInTheDocument();
    });

    it('renderiza children como ReactNode', () => {
      render(<Chips><strong>Negrito</strong></Chips>);
      expect(screen.getByText('Negrito')).toBeInTheDocument();
    });

    it('aplica variant neutral por padrão', () => {
      const { container } = render(<Chips>Neutro</Chips>);
      const el = container.firstChild as HTMLElement;
      expect(el.className).not.toMatch(/brand/);
      expect(el.className).not.toMatch(/success/);
      expect(el.className).not.toMatch(/alert/);
    });
  });

  describe('Variantes', () => {
    it('neutral não aplica classe de variante adicional (é o padrão)', () => {
      const { container } = render(<Chips variant="neutral">neutral</Chips>);
      const el = container.firstChild as HTMLElement;
      expect(el.className).not.toMatch(/brand/);
      expect(el.className).not.toMatch(/success/);
      expect(el.className).not.toMatch(/alert/);
    });

    it.each(['brand', 'success', 'alert'] as const)(
      'aplica a classe da variante "%s"',
      (variant) => {
        const { container } = render(<Chips variant={variant}>{variant}</Chips>);
        const el = container.firstChild as HTMLElement;
        expect(el.className).toMatch(new RegExp(variant));
      }
    );
  });

  describe('Ícones', () => {
    it('renderiza leftIcon quando fornecido', () => {
      render(<Chips leftIcon={<MockIcon />}>Com ícone</Chips>);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renderiza rightIcon quando fornecido', () => {
      render(<Chips rightIcon={<MockIcon />}>Com ícone</Chips>);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renderiza ambos os ícones ao mesmo tempo', () => {
      const LeftIcon = () => <span data-testid="left-icon">L</span>;
      const RightIcon = () => <span data-testid="right-icon">R</span>;
      render(
        <Chips leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Chips
        </Chips>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('não renderiza leftIcon quando não fornecido', () => {
      const { container } = render(<Chips>Sem ícone</Chips>);
      expect(container.querySelector('[class*="iconLeft"]')).not.toBeInTheDocument();
    });

    it('leftIcon tem aria-hidden="true"', () => {
      render(<Chips leftIcon={<MockIcon />}>Com ícone</Chips>);
      const iconSpan = screen.getByTestId('mock-icon').parentElement;
      expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Estado disabled', () => {
    it('aplica a classe disabled quando disabled=true', () => {
      const { container } = render(<Chips disabled>Desabilitado</Chips>);
      const el = container.firstChild as HTMLElement;
      expect(el.className).toMatch(/disabled/);
    });

    it('define aria-disabled quando disabled=true', () => {
      const { container } = render(<Chips disabled>Desabilitado</Chips>);
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveAttribute('aria-disabled', 'true');
    });

    it('não aplica classe disabled quando disabled=false', () => {
      const { container } = render(<Chips disabled={false}>Ativo</Chips>);
      const el = container.firstChild as HTMLElement;
      expect(el.className).not.toMatch(/disabled/);
    });
  });

  describe('Cores customizadas', () => {
    it('aplica --chips-bg via backgroundColor', () => {
      const { container } = render(
        <Chips backgroundColor="color-brand-secondary-medium">Custom</Chips>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.style.getPropertyValue('--chips-bg')).toBe(
        'var(--color-brand-secondary-medium)'
      );
    });

    it('aplica --chips-text via textColor', () => {
      const { container } = render(
        <Chips textColor="color-brand-secondary-dark">Custom</Chips>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.style.getPropertyValue('--chips-text')).toBe(
        'var(--color-brand-secondary-dark)'
      );
    });

    it('não aplica backgroundColor quando disabled=true', () => {
      const { container } = render(
        <Chips disabled backgroundColor="color-brand-secondary-medium">Custom</Chips>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.style.getPropertyValue('--chips-bg')).toBe('');
    });

    it('não aplica textColor quando disabled=true', () => {
      const { container } = render(
        <Chips disabled textColor="color-brand-secondary-dark">Custom</Chips>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.style.getPropertyValue('--chips-text')).toBe('');
    });
  });

  describe('Comportamento interativo', () => {
    it('não aplica role="button" sem onClick', () => {
      const { container } = render(<Chips>Estático</Chips>);
      const el = container.firstChild as HTMLElement;
      expect(el).not.toHaveAttribute('role', 'button');
    });

    it('aplica role="button" quando onClick é fornecido', () => {
      const { container } = render(
        <Chips onClick={() => {}}>Interativo</Chips>
      );
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveAttribute('role', 'button');
    });

    it('aplica tabIndex=0 quando onClick é fornecido e não está disabled', () => {
      const { container } = render(
        <Chips onClick={() => {}}>Interativo</Chips>
      );
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveAttribute('tabindex', '0');
    });

    it('aplica tabIndex=-1 quando onClick é fornecido e está disabled', () => {
      const { container } = render(
        <Chips onClick={() => {}} disabled>Desabilitado</Chips>
      );
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveAttribute('tabindex', '-1');
    });

    it('chama onClick ao ser clicado', async () => {
      const handleClick = vi.fn();
      render(<Chips onClick={handleClick}>Clicável</Chips>);
      await userEvent.click(screen.getByText('Clicável'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Props adicionais', () => {
    it('aplica className personalizado', () => {
      const { container } = render(<Chips className="custom">Chips</Chips>);
      const el = container.firstChild as HTMLElement;
      expect(el).toHaveClass('custom');
    });

    it('passa props extras via rest (data-testid)', () => {
      render(<Chips data-testid="my-chip">Chips</Chips>);
      expect(screen.getByTestId('my-chip')).toBeInTheDocument();
    });

    it('aplica style inline customizado', () => {
      const { container } = render(
        <Chips style={{ marginTop: '8px' }}>Chips</Chips>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.style.marginTop).toBe('8px');
    });
  });
});
