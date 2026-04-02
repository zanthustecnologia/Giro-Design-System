import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import Callout from '../Callout';

describe('Callout', () => {
  const MockIcon = () => <span data-testid="mock-icon">⚠</span>;

  describe('Renderização básica', () => {
    it('renderiza o componente sem erros', () => {
      const { container } = render(<Callout text="Mensagem" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renderiza text quando fornecido', () => {
      render(<Callout text="Conteúdo do callout" />);
      expect(screen.getByText('Conteúdo do callout')).toBeInTheDocument();
    });

    it('renderiza title quando fornecido', () => {
      render(<Callout title="Título do callout" text="Texto" />);
      expect(screen.getByText('Título do callout')).toBeInTheDocument();
    });

    it('renderiza title e text ao mesmo tempo', () => {
      render(<Callout title="Título" text="Descrição" />);
      expect(screen.getByText('Título')).toBeInTheDocument();
      expect(screen.getByText('Descrição')).toBeInTheDocument();
    });

    it('renderiza title como ReactNode', () => {
      render(<Callout title={<strong>Negrito</strong>} text="Texto" />);
      expect(screen.getByText('Negrito')).toBeInTheDocument();
    });

    it('não renderiza title quando não fornecido', () => {
      const { container } = render(<Callout text="Texto" />);
      expect(container.querySelector('[class*="title"]')).not.toBeInTheDocument();
    });

    it('usa variant neutral por padrão', () => {
      const { container } = render(<Callout text="Neutro" />);
      const el = container.firstChild as HTMLElement;
      expect(el.className).not.toMatch(/info/);
      expect(el.className).not.toMatch(/brand/);
      expect(el.className).not.toMatch(/success/);
      expect(el.className).not.toMatch(/alert/);
    });
  });

  describe('Variantes', () => {
    it.each(['neutral', 'brand', 'success', 'alert'] as const)(
      'aceita variant="%s" sem erros',
      (variant) => {
        const { container } = render(<Callout variant={variant} text={variant} />);
        expect(container.firstChild).toBeInTheDocument();
      }
    );

    it.each(['brand', 'success', 'alert'] as const)(
      'aplica a classe da variante "%s" no elemento raiz',
      (variant) => {
        const { container } = render(<Callout variant={variant} text={variant} />);
        const el = container.firstChild as HTMLElement;
        expect(el.className).toMatch(new RegExp(variant));
      }
    );

    it('neutral não aplica classe de variante adicional (é o padrão)', () => {
      const { container } = render(<Callout variant="neutral" text="neutro" />);
      const el = container.firstChild as HTMLElement;
      expect(el.className).not.toMatch(/info/);
      expect(el.className).not.toMatch(/brand/);
      expect(el.className).not.toMatch(/success/);
      expect(el.className).not.toMatch(/alert/);
    });
  });

  describe('Semântica e acessibilidade', () => {
    it('usa role="status" para variantes não-alert', () => {
      const { container } = render(<Callout variant="brand" text="Info" />);
      expect(container.firstChild).toHaveAttribute('role', 'status');
    });

    it('usa role="alert" para variant="alert"', () => {
      const { container } = render(<Callout variant="alert" text="Alerta crítico" />);
      expect(container.firstChild).toHaveAttribute('role', 'alert');
    });

    it('usa aria-live="polite" para variantes não-alert', () => {
      const { container } = render(<Callout variant="success" text="Sucesso" />);
      expect(container.firstChild).toHaveAttribute('aria-live', 'polite');
    });

    it('usa aria-live="assertive" para variant="alert"', () => {
      const { container } = render(<Callout variant="alert" text="Urgente" />);
      expect(container.firstChild).toHaveAttribute('aria-live', 'assertive');
    });

    it('define aria-labelledby quando title é fornecido', () => {
      render(<Callout title="Título acessível" text="Texto" />);
      const container = screen.getByRole('status');
      expect(container).toHaveAttribute('aria-labelledby');
    });

    it('não define aria-labelledby quando title não é fornecido', () => {
      const { container } = render(<Callout text="Sem título" />);
      expect(container.firstChild).not.toHaveAttribute('aria-labelledby');
    });

    it('o id do title corresponde ao aria-labelledby do container', () => {
      render(<Callout title="Meu título" text="Texto" />);
      const statusEl = screen.getByRole('status');
      const labelId = statusEl.getAttribute('aria-labelledby')!;
      const titleEl = document.getElementById(labelId);
      expect(titleEl).toBeInTheDocument();
      expect(titleEl).toHaveTextContent('Meu título');
    });

    it('o ícone tem aria-hidden="true"', () => {
      render(<Callout text="Com ícone" icon={<MockIcon />} />);
      const iconWrapper = screen.getByTestId('mock-icon').parentElement!;
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Ícone', () => {
    it('renderiza o ícone quando fornecido', () => {
      render(<Callout text="Texto" icon={<MockIcon />} />);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('não renderiza o ícone quando não fornecido', () => {
      const { container } = render(<Callout text="Sem ícone" />);
      expect(container.querySelector('[class*="icon"]')).not.toBeInTheDocument();
    });
  });

  describe('Dismiss (dismiss + onDismiss)', () => {
    it('não renderiza botão de fechar sem dismiss', () => {
      render(<Callout text="Sem fechar" />);
      expect(screen.queryByRole('button', { name: /fechar/i })).not.toBeInTheDocument();
    });

    it('renderiza botão de fechar quando dismiss={true}', () => {
      render(<Callout text="Removível" dismiss />);
      expect(screen.getByRole('button', { name: /fechar/i })).toBeInTheDocument();
    });

    it('chama onDismiss ao clicar no botão fechar', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(<Callout text="Removível" dismiss onDismiss={onDismiss} />);
      await user.click(screen.getByRole('button', { name: /fechar/i }));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('o botão de fechar tem type="button"', () => {
      render(<Callout text="Removível" dismiss />);
      expect(screen.getByRole('button', { name: /fechar/i })).toHaveAttribute('type', 'button');
    });

    it('usa "Fechar" como label padrão do botão dismiss', () => {
      render(<Callout text="Removível" dismiss />);
      expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument();
    });

    it('usa dismissLabel personalizado quando fornecido', () => {
      render(<Callout text="Removível" dismiss dismissLabel="Close" />);
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });
  });

  describe('Props passadas através', () => {
    it('aplica className personalizado', () => {
      const { container } = render(<Callout text="Texto" className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('aplica id personalizado quando fornecido', () => {
      render(<Callout text="Texto" id="my-callout" />);
      expect(screen.getByRole('status')).toHaveAttribute('id', 'my-callout');
    });

    it('repassa atributos HTML extras', () => {
      const { container } = render(<Callout text="Texto" data-testid="extra-attr" />);
      expect(container.firstChild).toHaveAttribute('data-testid', 'extra-attr');
    });

    it('não vaza disabled para o elemento div', () => {
      const { container } = render(<Callout text="Texto" disabled />);
      expect(container.firstChild).not.toHaveAttribute('disabled');
    });
  });

  describe('Cores customizadas', () => {
    it('aplica backgroundColor via CSS custom property', () => {
      const { container } = render(
        <Callout text="Texto" backgroundColor="color-brand-secondary-light" />
      );
      const el = container.firstChild as HTMLElement;
      expect(el.style.getPropertyValue('--callout-bg')).toBe('var(--color-brand-secondary-light)');
    });

    it('aplica foregroundColor via CSS custom property', () => {
      const { container } = render(
        <Callout text="Texto" foregroundColor="color-brand-primary-dark" />
      );
      const el = container.firstChild as HTMLElement;
      expect(el.style.getPropertyValue('--callout-fg')).toBe('var(--color-brand-primary-dark)');
    });

    it('não define style inline quando backgroundColor/foregroundColor não são fornecidos', () => {
      const { container } = render(<Callout text="Texto" />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.getPropertyValue('--callout-bg')).toBe('');
      expect(el.style.getPropertyValue('--callout-fg')).toBe('');
    });

    it('mescla style externo com cores customizadas', () => {
      const { container } = render(
        <Callout text="Texto" backgroundColor="color-brand-secondary-light" style={{ marginTop: '8px' }} />
      );
      const el = container.firstChild as HTMLElement;
      expect(el.style.getPropertyValue('--callout-bg')).toBe('var(--color-brand-secondary-light)');
      expect(el.style.marginTop).toBe('8px');
    });
  });
});
