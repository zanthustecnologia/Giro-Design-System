import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import Badge from '../Badge';

describe('Badge', () => {
  // ─── com children (modo overlay) ────────────────────────────────────────────

  describe('com children (modo overlay)', () => {
    describe('Renderização básica', () => {
      it('renderiza o container sem erros', () => {
        const { container } = render(<Badge><span>x</span></Badge>);
        expect(container.firstChild).toBeInTheDocument();
      });

      it('renderiza o badge como ponto (empty) quando badgeValue é null (padrão)', () => {
        render(<Badge badgeValue={null}><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('renderiza o badge como ponto (empty) quando badgeValue não é fornecido', () => {
        render(<Badge><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('renderiza o badge como ponto (empty) quando badgeValue é 0', () => {
        render(<Badge badgeValue={0}><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('renderiza o badge como ponto (empty) quando badgeValue é negativo', () => {
        render(<Badge badgeValue={-5}><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('renderiza o badge como ponto (empty) quando badgeValue é Infinity', () => {
        render(<Badge badgeValue={Infinity}><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('não renderiza span interno quando badgeValue é vazio', () => {
        render(<Badge badgeValue={null}><span>x</span></Badge>);
        const badge = screen.getByTestId('badge');
        expect(badge.querySelector('span')).not.toBeInTheDocument();
      });

      it('renderiza o badge com valor quando badgeValue é positivo', () => {
        render(<Badge badgeValue={5}><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('exibe o valor numérico corretamente', () => {
        render(<Badge badgeValue={7}><span>x</span></Badge>);
        expect(screen.getByText('7')).toBeInTheDocument();
      });

      it('exibe "99+" quando badgeValue número excede 99', () => {
        render(<Badge badgeValue={100}><span>x</span></Badge>);
        expect(screen.getByText('99+')).toBeInTheDocument();
      });

      it('exibe "99" quando badgeValue é exatamente 99', () => {
        render(<Badge badgeValue={99}><span>x</span></Badge>);
        expect(screen.getByText('99')).toBeInTheDocument();
      });

      it('exibe "99+" quando badgeValue é string numérica pura acima de 99', () => {
        render(<Badge badgeValue="150"><span>x</span></Badge>);
        expect(screen.getByText('99+')).toBeInTheDocument();
      });

      it('exibe a string como está quando tem prefixo não numérico', () => {
        render(<Badge badgeValue="+3"><span>x</span></Badge>);
        expect(screen.getByText('+3')).toBeInTheDocument();
      });

      it('exibe a string como está quando tem prefixo mesmo que o número exceda 99', () => {
        render(<Badge badgeValue="+150"><span>x</span></Badge>);
        expect(screen.getByText('+150')).toBeInTheDocument();
      });
    });

    describe('Classes CSS', () => {
      it('aplica badge__empty quando badgeValue é vazio', () => {
        render(<Badge badgeValue={null}><span>x</span></Badge>);
        const badge = screen.getByTestId('badge');
        expect(badge.className).toMatch(/badge__empty/);
      });

      it('não aplica badge__empty quando há valor', () => {
        render(<Badge badgeValue={5}><span>x</span></Badge>);
        const badge = screen.getByTestId('badge');
        expect(badge.className).not.toMatch(/badge__empty/);
      });

      it('não aplica badge__flex para valores com 1 caractere', () => {
        render(<Badge badgeValue={5}><span>x</span></Badge>);
        const badge = screen.getByTestId('badge');
        expect(badge.className).not.toMatch(/badge__flex/);
      });

      it('aplica badge__flex para valores com 2 ou mais caracteres', () => {
        render(<Badge badgeValue={42}><span>x</span></Badge>);
        const badge = screen.getByTestId('badge');
        expect(badge.className).toMatch(/badge__flex/);
      });

      it('aplica badge__flex para "99+" (3 caracteres)', () => {
        render(<Badge badgeValue={150}><span>x</span></Badge>);
        const badge = screen.getByTestId('badge');
        expect(badge.className).toMatch(/badge__flex/);
      });

      it('aplica className personalizado no badge', () => {
        render(<Badge badgeValue={1} className="custom-badge"><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toHaveClass('custom-badge');
      });
    });

    describe('Children', () => {
      it('renderiza children dentro de badge-content', () => {
        render(
          <Badge badgeValue={3}>
            <button>Notificações</button>
          </Badge>
        );
        expect(screen.getByTestId('badge-content')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Notificações' })).toBeInTheDocument();
      });

      it('não renderiza badge-content quando não há children', () => {
        render(<Badge badgeValue={1} />);
        expect(screen.queryByTestId('badge-content')).not.toBeInTheDocument();
      });
    });

    describe('ID', () => {
      it('aplica id personalizado ao elemento badge', () => {
        render(<Badge badgeValue={5} id="meu-badge"><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toHaveAttribute('id', 'meu-badge');
      });

      it('gera um id automaticamente quando não fornecido', () => {
        render(<Badge badgeValue={5}><span>x</span></Badge>);
        const badge = screen.getByTestId('badge');
        expect(badge).toHaveAttribute('id');
        expect(badge.getAttribute('id')).not.toBe('');
      });
    });

    describe('Acessibilidade', () => {
      it('o span interno não tem aria-hidden quando aria-label não é fornecido', () => {
        render(<Badge badgeValue={5}><span>x</span></Badge>);
        const span = screen.getByText('5');
        expect(span).not.toHaveAttribute('aria-hidden', 'true');
      });

      it('o span interno tem aria-hidden="true" quando aria-label é fornecido', () => {
        render(
          <Badge badgeValue={5} aria-label="5 notificações"><span>x</span></Badge>
        );
        const span = screen.getByText('5');
        expect(span).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  // ─── sem children (modo inline) ─────────────────────────────────────────────

  describe('sem children (modo inline)', () => {
    describe('Renderização básica', () => {
      it('renderiza o badge sem erros', () => {
        render(<Badge />);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('renderiza badge mesmo quando badgeValue é null', () => {
        render(<Badge badgeValue={null} />);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('exibe valor numérico positivo corretamente', () => {
        render(<Badge badgeValue={3} />);
        expect(screen.getByText('3')).toBeInTheDocument();
      });

      it('exibe valor string com prefixo corretamente', () => {
        render(<Badge badgeValue="+3" />);
        expect(screen.getByText('+3')).toBeInTheDocument();
      });

      it('exibe "99+" quando badgeValue numérico excede 99', () => {
        render(<Badge badgeValue={200} />);
        expect(screen.getByText('99+')).toBeInTheDocument();
      });

      it('exibe "99+" quando badgeValue é string numérica pura acima de 99', () => {
        render(<Badge badgeValue="150" />);
        expect(screen.getByText('99+')).toBeInTheDocument();
      });

      it('exibe a string como está quando tem prefixo mesmo que o número exceda 99', () => {
        render(<Badge badgeValue="+150" />);
        expect(screen.getByText('+150')).toBeInTheDocument();
      });

      it('não renderiza span interno quando badgeValue é vazio', () => {
        render(<Badge badgeValue={null} />);
        const badge = screen.getByTestId('badge');
        expect(badge.querySelector('span')).not.toBeInTheDocument();
      });
    });

    describe('Classes CSS', () => {
      it('aplica badge__status__empty quando não há valor', () => {
        render(<Badge badgeValue={null} />);
        const badge = screen.getByTestId('badge');
        expect(badge.className).toMatch(/badge__status__empty/);
      });

      it('não aplica badge__status__empty quando há valor', () => {
        render(<Badge badgeValue={5} />);
        const badge = screen.getByTestId('badge');
        expect(badge.className).not.toMatch(/badge__status__empty/);
      });

      it('não aplica badge__status__flex para valores com 1 caractere', () => {
        render(<Badge badgeValue={5} />);
        const badge = screen.getByTestId('badge');
        expect(badge.className).not.toMatch(/badge__status__flex/);
      });

      it('aplica badge__status__flex para valores com 2 ou mais caracteres', () => {
        render(<Badge badgeValue={150} />);
        const badge = screen.getByTestId('badge');
        expect(badge.className).toMatch(/badge__status__flex/);
      });

      it('aplica badge__status__filterBadge quando filterVariant é true', () => {
        render(<Badge filterVariant={true} />);
        const badge = screen.getByTestId('badge');
        expect(badge.className).toMatch(/badge__status__filterBadge/);
      });

      it('não aplica badge__status__filterBadge quando filterVariant é false (padrão)', () => {
        render(<Badge />);
        const badge = screen.getByTestId('badge');
        expect(badge.className).not.toMatch(/badge__status__filterBadge/);
      });

      it('aplica className personalizado no badge', () => {
        render(<Badge className="custom-status" />);
        expect(screen.getByTestId('badge')).toHaveClass('custom-status');
      });
    });

    describe('Acessibilidade', () => {
      it('o span interno tem aria-hidden="true" quando aria-label é fornecido', () => {
        render(<Badge badgeValue={3} aria-label="3 itens" />);
        const span = screen.getByText('3');
        expect(span).toHaveAttribute('aria-hidden', 'true');
      });

      it('o span interno não tem aria-hidden quando aria-label não é fornecido', () => {
        render(<Badge badgeValue={3} />);
        const span = screen.getByText('3');
        expect(span).not.toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});


describe('Badge', () => {
  // ─── com children (modo overlay) ────────────────────────────────────────────

  describe('com children (modo overlay)', () => {
    describe('Renderização básica', () => {
      it('renderiza o container sem erros', () => {
        const { container } = render(<Badge><span>x</span></Badge>);
        expect(container.firstChild).toBeInTheDocument();
      });

      it('renderiza o badge como ponto (empty) quando badgeValue é null (padrão)', () => {
        render(<Badge badgeValue={null}><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('renderiza o badge como ponto (empty) quando badgeValue não é fornecido', () => {
        render(<Badge><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('renderiza o badge como ponto (empty) quando badgeValue é 0', () => {
        render(<Badge badgeValue={0}><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('renderiza o badge como ponto (empty) quando badgeValue é negativo', () => {
        render(<Badge badgeValue={-5}><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('renderiza o badge como ponto (empty) quando badgeValue é Infinity', () => {
        render(<Badge badgeValue={Infinity}><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('não renderiza span interno quando badgeValue é vazio', () => {
        render(<Badge badgeValue={null}><span>x</span></Badge>);
        const badge = screen.getByTestId('badge');
        expect(badge.querySelector('span')).not.toBeInTheDocument();
      });

      it('renderiza o badge com valor quando badgeValue é positivo', () => {
        render(<Badge badgeValue={5}><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('exibe o valor numérico corretamente', () => {
        render(<Badge badgeValue={7}><span>x</span></Badge>);
        expect(screen.getByText('7')).toBeInTheDocument();
      });

      it('exibe "99+" quando badgeValue é maior que 99', () => {
        render(<Badge badgeValue={100}><span>x</span></Badge>);
        expect(screen.getByText('99+')).toBeInTheDocument();
      });

      it('exibe "99" quando badgeValue é exatamente 99', () => {
        render(<Badge badgeValue={99}><span>x</span></Badge>);
        expect(screen.getByText('99')).toBeInTheDocument();
      });
    });

    describe('Classes CSS', () => {
      it('aplica badge__empty quando badgeValue é vazio', () => {
        render(<Badge badgeValue={null}><span>x</span></Badge>);
        const badge = screen.getByTestId('badge');
        expect(badge.className).toMatch(/badge__empty/);
      });

      it('não aplica badge__empty quando há valor', () => {
        render(<Badge badgeValue={5}><span>x</span></Badge>);
        const badge = screen.getByTestId('badge');
        expect(badge.className).not.toMatch(/badge__empty/);
      });

      it('aplica className personalizado no badge', () => {
        render(<Badge badgeValue={1} className="custom-badge"><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toHaveClass('custom-badge');
      });
    });

    describe('Children', () => {
      it('renderiza children dentro de badge-content', () => {
        render(
          <Badge badgeValue={3}>
            <button>Notificações</button>
          </Badge>
        );
        expect(screen.getByTestId('badge-content')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Notificações' })).toBeInTheDocument();
      });

      it('não renderiza badge-content quando não há children', () => {
        render(<Badge badgeValue={1} />);
        expect(screen.queryByTestId('badge-content')).not.toBeInTheDocument();
      });
    });

    describe('ID', () => {
      it('aplica id personalizado ao elemento badge', () => {
        render(<Badge badgeValue={5} id="meu-badge"><span>x</span></Badge>);
        expect(screen.getByTestId('badge')).toHaveAttribute('id', 'meu-badge');
      });

      it('gera um id automaticamente quando não fornecido', () => {
        render(<Badge badgeValue={5}><span>x</span></Badge>);
        const badge = screen.getByTestId('badge');
        expect(badge).toHaveAttribute('id');
        expect(badge.getAttribute('id')).not.toBe('');
      });
    });

    describe('Acessibilidade', () => {
      it('o span interno não tem aria-hidden quando aria-label não é fornecido', () => {
        render(<Badge badgeValue={5}><span>x</span></Badge>);
        const span = screen.getByText('5');
        expect(span).not.toHaveAttribute('aria-hidden', 'true');
      });

      it('o span interno tem aria-hidden="true" quando aria-label é fornecido', () => {
        render(
          <Badge badgeValue={5} aria-label="5 notificações"><span>x</span></Badge>
        );
        const span = screen.getByText('5');
        expect(span).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  // ─── sem children (modo inline) ─────────────────────────────────────────────

  describe('sem children (modo inline)', () => {
    describe('Renderização básica', () => {
      it('renderiza o badge sem erros', () => {
        render(<Badge />);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('renderiza badge mesmo quando badgeValue é null', () => {
        render(<Badge badgeValue={null} />);
        expect(screen.getByTestId('badge')).toBeInTheDocument();
      });

      it('exibe valor numérico positivo corretamente', () => {
        render(<Badge badgeValue={3} />);
        expect(screen.getByText('3')).toBeInTheDocument();
      });

      it('exibe valor string corretamente', () => {
        render(<Badge badgeValue="+3" />);
        expect(screen.getByText('+3')).toBeInTheDocument();
      });

      it('exibe "99+" quando badgeValue numérico excede 99', () => {
        render(<Badge badgeValue={200} />);
        expect(screen.getByText('99+')).toBeInTheDocument();
      });

      it('não renderiza span interno quando badgeValue é vazio', () => {
        render(<Badge badgeValue={null} />);
        const badge = screen.getByTestId('badge');
        expect(badge.querySelector('span')).not.toBeInTheDocument();
      });
    });

    describe('Classes CSS', () => {
      it('aplica badge__status__empty quando não há valor', () => {
        render(<Badge badgeValue={null} />);
        const badge = screen.getByTestId('badge');
        expect(badge.className).toMatch(/badge__status__empty/);
      });

      it('não aplica badge__status__empty quando há valor', () => {
        render(<Badge badgeValue={5} />);
        const badge = screen.getByTestId('badge');
        expect(badge.className).not.toMatch(/badge__status__empty/);
      });

      it('aplica badge__status__filterBadge quando filterVariant é true', () => {
        render(<Badge filterVariant={true} />);
        const badge = screen.getByTestId('badge');
        expect(badge.className).toMatch(/badge__status__filterBadge/);
      });

      it('não aplica badge__status__filterBadge quando filterVariant é false (padrão)', () => {
        render(<Badge />);
        const badge = screen.getByTestId('badge');
        expect(badge.className).not.toMatch(/badge__status__filterBadge/);
      });

      it('aplica className personalizado no badge', () => {
        render(<Badge className="custom-status" />);
        expect(screen.getByTestId('badge')).toHaveClass('custom-status');
      });
    });

    describe('Acessibilidade', () => {
      it('o span interno tem aria-hidden="true" quando aria-label é fornecido', () => {
        render(<Badge badgeValue={3} aria-label="3 itens" />);
        const span = screen.getByText('3');
        expect(span).toHaveAttribute('aria-hidden', 'true');
      });

      it('o span interno não tem aria-hidden quando aria-label não é fornecido', () => {
        render(<Badge badgeValue={3} />);
        const span = screen.getByText('3');
        expect(span).not.toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});

