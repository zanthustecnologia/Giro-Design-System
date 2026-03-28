import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Popover from '../Popover';

describe('Popover', () => {
  describe('Renderização básica', () => {
    it('renderiza o trigger corretamente', () => {
      render(
        <Popover
          trigger={<button>Abrir Popover</button>}
          content={<div>Conteúdo</div>}
        />
      );

      expect(screen.getByText('Abrir Popover')).toBeInTheDocument();
    });

    it('não renderiza o conteúdo quando está fechado', () => {
      render(
        <Popover
          trigger={<button>Abrir Popover</button>}
          content={<div>Conteúdo do Popover</div>}
        />
      );

      expect(screen.queryByText('Conteúdo do Popover')).not.toBeInTheDocument();
    });

    it('renderiza o conteúdo ao clicar no trigger', async () => {
      const user = userEvent.setup();
      render(
        <Popover
          trigger={<button>Abrir Popover</button>}
          content={<div>Conteúdo do Popover</div>}
        />
      );

      await user.click(screen.getByText('Abrir Popover'));

      await waitFor(() => {
        expect(screen.getByText('Conteúdo do Popover')).toBeInTheDocument();
      });
    });

    it('renderiza qualquer elemento como trigger', () => {
      render(
        <Popover
          trigger={<span data-testid="trigger-span">Trigger Span</span>}
          content={<p>Conteúdo</p>}
        />
      );

      expect(screen.getByTestId('trigger-span')).toBeInTheDocument();
    });

    it('renderiza conteúdo complexo dentro do popover', async () => {
      const user = userEvent.setup();
      render(
        <Popover
          trigger={<button>Abrir</button>}
          content={
            <div>
              <h3>Título</h3>
              <p>Descrição</p>
            </div>
          }
        />
      );

      await user.click(screen.getByText('Abrir'));

      await waitFor(() => {
        expect(screen.getByText('Título')).toBeInTheDocument();
        expect(screen.getByText('Descrição')).toBeInTheDocument();
      });
    });
  });

  describe('Interação', () => {
    it('abre o popover ao clicar no trigger', async () => {
      const user = userEvent.setup();
      render(
        <Popover
          trigger={<button>Abrir Popover</button>}
          content={<div>Conteúdo visível</div>}
        />
      );

      expect(screen.queryByText('Conteúdo visível')).not.toBeInTheDocument();

      await user.click(screen.getByText('Abrir Popover'));

      await waitFor(() => {
        expect(screen.getByText('Conteúdo visível')).toBeInTheDocument();
      });
    });

    it('fecha o popover ao pressionar Escape', async () => {
      const user = userEvent.setup();
      render(
        <Popover
          trigger={<button>Abrir Popover</button>}
          content={<div>Conteúdo</div>}
        />
      );

      await user.click(screen.getByText('Abrir Popover'));

      await waitFor(() => {
        expect(screen.getByText('Conteúdo')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByText('Conteúdo')).not.toBeInTheDocument();
      });
    });

    it('fecha o popover ao clicar fora', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Popover
            trigger={<button>Abrir Popover</button>}
            content={<div>Conteúdo</div>}
          />
          <div data-testid="fora">Área externa</div>
        </div>
      );

      await user.click(screen.getByText('Abrir Popover'));

      await waitFor(() => {
        expect(screen.getByText('Conteúdo')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('fora'));

      await waitFor(() => {
        expect(screen.queryByText('Conteúdo')).not.toBeInTheDocument();
      });
    });
  });

  describe('Props opcionais', () => {
    it('aceita a prop align sem erros', () => {
      expect(() =>
        render(
          <Popover
            align="start"
            trigger={<button>Trigger</button>}
            content={<div>Conteúdo</div>}
          />
        )
      ).not.toThrow();
    });

    it('aceita a prop side sem erros', () => {
      expect(() =>
        render(
          <Popover
            side="bottom"
            trigger={<button>Trigger</button>}
            content={<div>Conteúdo</div>}
          />
        )
      ).not.toThrow();
    });

    it('aceita todos os valores válidos de align', () => {
      const aligns = ['start', 'center', 'end'] as const;
      aligns.forEach((align) => {
        expect(() =>
          render(
            <Popover
              align={align}
              trigger={<button>Trigger</button>}
              content={<div>Conteúdo</div>}
            />
          )
        ).not.toThrow();
      });
    });

    it('aceita todos os valores válidos de side', () => {
      const sides = ['top', 'right', 'bottom', 'left'] as const;
      sides.forEach((side) => {
        expect(() =>
          render(
            <Popover
              side={side}
              trigger={<button>Trigger</button>}
              content={<div>Conteúdo</div>}
            />
          )
        ).not.toThrow();
      });
    });

    it('aceita showArrow sem erros', () => {
      expect(() =>
        render(
          <Popover
            showArrow
            trigger={<button>Trigger</button>}
            content={<div>Conteúdo</div>}
          />
        )
      ).not.toThrow();
    });

    it('aceita onOpenAutoFocus e onCloseAutoFocus sem erros', () => {
      const onOpenAutoFocus = (e: Event) => e.preventDefault();
      const onCloseAutoFocus = (e: Event) => e.preventDefault();
      expect(() =>
        render(
          <Popover
            onOpenAutoFocus={onOpenAutoFocus}
            onCloseAutoFocus={onCloseAutoFocus}
            trigger={<button>Trigger</button>}
            content={<div>Conteúdo</div>}
          />
        )
      ).not.toThrow();
    });
  });

  describe('Modo asAnchor', () => {
    it('não abre o popover ao clicar no trigger quando asAnchor=true', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(
        <Popover
          asAnchor
          open={false}
          onOpenChange={onOpenChange}
          trigger={<button>Trigger Âncora</button>}
          content={<div>Conteúdo</div>}
        />
      );

      await user.click(screen.getByText('Trigger Âncora'));

      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('abre o popover via prop open quando asAnchor=true', async () => {
      render(
        <Popover
          asAnchor
          open={true}
          onOpenChange={() => {}}
          trigger={<button>Trigger Âncora</button>}
          content={<div>Conteúdo Controlado</div>}
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Conteúdo Controlado')).toBeInTheDocument();
      });
    });

    it('sincroniza estado externo via open/onOpenChange sem asAnchor (modo Filter)', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(
        <Popover
          open={false}
          onOpenChange={onOpenChange}
          trigger={<button>Trigger Filter</button>}
          content={<div>Conteúdo Filter</div>}
        />
      );

      await user.click(screen.getByText('Trigger Filter'));

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });
});
