import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import Badge from '../Badge';

describe('Badge', () => {
  // ─── type="notification" ────────────────────────────────────────────────────

  describe('type="notification"', () => {
    describe('Renderização básica', () => {
      it('renderiza o container sem erros', () => {
        const { container } = render(<Badge type="notification" />);
        expect(container.firstChild).toBeInTheDocument();
      });

      it('não renderiza o badge quando badgeValue é null (padrão)', () => {
        render(<Badge type="notification" badgeValue={null} />);
        expect(screen.queryByTestId('badge-notification')).not.toBeInTheDocument();
      });

      it('não renderiza o badge quando badgeValue não é fornecido', () => {
        render(<Badge type="notification" />);
        expect(screen.queryByTestId('badge-notification')).not.toBeInTheDocument();
      });

      it('não renderiza o badge quando badgeValue é 0', () => {
        render(<Badge type="notification" badgeValue={0} />);
        expect(screen.queryByTestId('badge-notification')).not.toBeInTheDocument();
      });

      it('não renderiza o badge quando badgeValue é negativo', () => {
        render(<Badge type="notification" badgeValue={-5} />);
        expect(screen.queryByTestId('badge-notification')).not.toBeInTheDocument();
      });

      it('não renderiza o badge quando badgeValue é Infinity', () => {
        render(<Badge type="notification" badgeValue={Infinity} />);
        expect(screen.queryByTestId('badge-notification')).not.toBeInTheDocument();
      });

      it('renderiza o badge quando badgeValue é positivo', () => {
        render(<Badge type="notification" badgeValue={5} />);
        expect(screen.getByTestId('badge-notification')).toBeInTheDocument();
      });

      it('exibe o valor numérico corretamente', () => {
        render(<Badge type="notification" badgeValue={7} />);
        expect(screen.getByText('7')).toBeInTheDocument();
      });

      it('exibe "99+" quando badgeValue é maior que 99', () => {
        render(<Badge type="notification" badgeValue={100} />);
        expect(screen.getByText('99+')).toBeInTheDocument();
      });

      it('exibe "99" quando badgeValue é exatamente 99', () => {
        render(<Badge type="notification" badgeValue={99} />);
        expect(screen.getByText('99')).toBeInTheDocument();
      });
    });

    describe('Classes CSS', () => {
      it('aplica badge__small para valores com até 2 caracteres', () => {
        render(<Badge type="notification" badgeValue={5} />);
        const badge = screen.getByTestId('badge-notification');
        expect(badge.className).toMatch(/badge__small/);
      });

      it('aplica badge__small para valor de 2 dígitos', () => {
        render(<Badge type="notification" badgeValue={42} />);
        const badge = screen.getByTestId('badge-notification');
        expect(badge.className).toMatch(/badge__small/);
      });

      it('aplica badge__large para "99+" (3 caracteres)', () => {
        render(<Badge type="notification" badgeValue={150} />);
        const badge = screen.getByTestId('badge-notification');
        expect(badge.className).toMatch(/badge__large/);
      });

      it('aplica className personalizado no badge', () => {
        render(<Badge type="notification" badgeValue={1} className="custom-badge" />);
        expect(screen.getByTestId('badge-notification')).toHaveClass('custom-badge');
      });
    });

    describe('Children', () => {
      it('renderiza children dentro de badge-content', () => {
        render(
          <Badge type="notification" badgeValue={3}>
            <button>Notificações</button>
          </Badge>
        );
        expect(screen.getByTestId('badge-content')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Notificações' })).toBeInTheDocument();
      });

      it('não renderiza badge-content quando não há children', () => {
        render(<Badge type="notification" badgeValue={1} />);
        expect(screen.queryByTestId('badge-content')).not.toBeInTheDocument();
      });
    });

    describe('ID', () => {
      it('aplica id personalizado ao elemento badge', () => {
        render(<Badge type="notification" badgeValue={5} id="meu-badge" />);
        expect(screen.getByTestId('badge-notification')).toHaveAttribute('id', 'meu-badge');
      });

      it('gera um id automaticamente quando não fornecido', () => {
        render(<Badge type="notification" badgeValue={5} />);
        const badge = screen.getByTestId('badge-notification');
        expect(badge).toHaveAttribute('id');
        expect(badge.getAttribute('id')).not.toBe('');
      });
    });

    describe('Acessibilidade', () => {
      it('o span interno não tem aria-hidden quando aria-label não é fornecido', () => {
        render(<Badge type="notification" badgeValue={5} />);
        const span = screen.getByText('5');
        expect(span).not.toHaveAttribute('aria-hidden', 'true');
      });

      it('o span interno tem aria-hidden="true" quando aria-label é fornecido', () => {
        render(
          <Badge type="notification" badgeValue={5} aria-label="5 notificações" />
        );
        const span = screen.getByText('5');
        expect(span).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  // ─── type="status" ──────────────────────────────────────────────────────────

  describe('type="status"', () => {
    describe('Renderização básica', () => {
      it('renderiza o badge-status sem erros', () => {
        render(<Badge type="status" />);
        expect(screen.getByTestId('badge-status')).toBeInTheDocument();
      });

      it('renderiza badge-status mesmo quando badgeValue é null', () => {
        render(<Badge type="status" badgeValue={null} />);
        expect(screen.getByTestId('badge-status')).toBeInTheDocument();
      });

      it('exibe valor numérico positivo corretamente', () => {
        render(<Badge type="status" badgeValue={3} />);
        expect(screen.getByText('3')).toBeInTheDocument();
      });

      it('exibe valor string corretamente', () => {
        render(<Badge type="status" badgeValue="+3" />);
        expect(screen.getByText('+3')).toBeInTheDocument();
      });

      it('exibe "99+" quando badgeValue numérico excede 99', () => {
        render(<Badge type="status" badgeValue={200} />);
        expect(screen.getByText('99+')).toBeInTheDocument();
      });

      it('não renderiza span interno quando badgeValue é vazio', () => {
        render(<Badge type="status" badgeValue={null} />);
        const statusBadge = screen.getByTestId('badge-status');
        expect(statusBadge.querySelector('span')).not.toBeInTheDocument();
      });
    });

    describe('Classes CSS', () => {
      it('aplica badge__status__empty quando não há valor', () => {
        render(<Badge type="status" badgeValue={null} />);
        const badge = screen.getByTestId('badge-status');
        expect(badge.className).toMatch(/badge__status__empty/);
      });

      it('não aplica badge__status__empty quando há valor', () => {
        render(<Badge type="status" badgeValue={5} />);
        const badge = screen.getByTestId('badge-status');
        expect(badge.className).not.toMatch(/badge__status__empty/);
      });

      it('aplica badge__status__large para valores com mais de 2 caracteres', () => {
        render(<Badge type="status" badgeValue={150} />);
        const badge = screen.getByTestId('badge-status');
        expect(badge.className).toMatch(/badge__status__large/);
      });

      it('não aplica badge__status__large para valores com até 2 caracteres', () => {
        render(<Badge type="status" badgeValue={5} />);
        const badge = screen.getByTestId('badge-status');
        expect(badge.className).not.toMatch(/badge__status__large/);
      });

      it('aplica badge__status__filterBadge quando tooFilter é true', () => {
        render(<Badge type="status" tooFilter={true} />);
        const badge = screen.getByTestId('badge-status');
        expect(badge.className).toMatch(/badge__status__filterBadge/);
      });

      it('não aplica badge__status__filterBadge quando tooFilter é false (padrão)', () => {
        render(<Badge type="status" />);
        const badge = screen.getByTestId('badge-status');
        expect(badge.className).not.toMatch(/badge__status__filterBadge/);
      });

      it('aplica className personalizado no badge-status', () => {
        render(<Badge type="status" className="custom-status" />);
        expect(screen.getByTestId('badge-status')).toHaveClass('custom-status');
      });
    });

    describe('Acessibilidade', () => {
      it('o span interno tem aria-hidden="true" quando aria-label é fornecido', () => {
        render(<Badge type="status" badgeValue={3} aria-label="3 itens" />);
        const span = screen.getByText('3');
        expect(span).toHaveAttribute('aria-hidden', 'true');
      });

      it('o span interno não tem aria-hidden quando aria-label não é fornecido', () => {
        render(<Badge type="status" badgeValue={3} />);
        const span = screen.getByText('3');
        expect(span).not.toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});
