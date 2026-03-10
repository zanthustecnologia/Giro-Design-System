import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Popover from '../Popover';

describe('Popover', () => {
  describe('Renderização básica', () => {
    it('renderiza o trigger corretamente', () => {
      render(
        <Popover>
          <button>Abrir Popover</button>
          <div>Conteúdo</div>
        </Popover>
      );

      expect(screen.getByText('Abrir Popover')).toBeInTheDocument();
    });

    it('não renderiza o conteúdo quando está fechado', () => {
      render(
        <Popover>
          <button>Abrir Popover</button>
          <div>Conteúdo do Popover</div>
        </Popover>
      );

      expect(screen.queryByText('Conteúdo do Popover')).not.toBeInTheDocument();
    });

    it('renderiza o conteúdo ao clicar no trigger', async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <button>Abrir Popover</button>
          <div>Conteúdo do Popover</div>
        </Popover>
      );

      await user.click(screen.getByText('Abrir Popover'));

      await waitFor(() => {
        expect(screen.getByText('Conteúdo do Popover')).toBeInTheDocument();
      });
    });

    it('renderiza qualquer elemento como trigger', () => {
      render(
        <Popover>
          <span data-testid="trigger-span">Trigger Span</span>
          <p>Conteúdo</p>
        </Popover>
      );

      expect(screen.getByTestId('trigger-span')).toBeInTheDocument();
    });

    it('renderiza conteúdo complexo dentro do popover', async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <button>Abrir</button>
          <div>
            <h3>Título</h3>
            <p>Descrição</p>
          </div>
        </Popover>
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
        <Popover>
          <button>Abrir Popover</button>
          <div>Conteúdo visível</div>
        </Popover>
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
        <Popover>
          <button>Abrir Popover</button>
          <div>Conteúdo</div>
        </Popover>
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
          <Popover>
            <button>Abrir Popover</button>
            <div>Conteúdo</div>
          </Popover>
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
    it('aceita a prop onDateSelect sem erros', () => {
      const onDateSelect = () => {};
      expect(() =>
        render(
          <Popover onDateSelect={onDateSelect}>
            <button>Trigger</button>
            <div>Conteúdo</div>
          </Popover>
        )
      ).not.toThrow();
    });

    it('aceita a prop align sem erros', () => {
      expect(() =>
        render(
          <Popover align="start">
            <button>Trigger</button>
            <div>Conteúdo</div>
          </Popover>
        )
      ).not.toThrow();
    });

    it('aceita a prop side sem erros', () => {
      expect(() =>
        render(
          <Popover side="bottom">
            <button>Trigger</button>
            <div>Conteúdo</div>
          </Popover>
        )
      ).not.toThrow();
    });

    it('aceita todos os valores válidos de align', () => {
      const aligns = ['start', 'center', 'end'] as const;
      aligns.forEach((align) => {
        expect(() =>
          render(
            <Popover align={align}>
              <button>Trigger</button>
              <div>Conteúdo</div>
            </Popover>
          )
        ).not.toThrow();
      });
    });

    it('aceita todos os valores válidos de side', () => {
      const sides = ['top', 'right', 'bottom', 'left'] as const;
      sides.forEach((side) => {
        expect(() =>
          render(
            <Popover side={side}>
              <button>Trigger</button>
              <div>Conteúdo</div>
            </Popover>
          )
        ).not.toThrow();
      });
    });
  });
});
