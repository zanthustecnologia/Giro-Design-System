import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ListItem from '../ListItem';

const TestIcon = () => <svg data-testid="test-icon" />;

/** Wrapper semântico exigido para <li> */
const wrap = (ui: React.ReactElement) => render(<ul>{ui}</ul>);

// ─────────────────────────────────────────────────────────────────────────────
describe('ListItem', () => {

  // ── Renderização básica ────────────────────────────────────────────────────
  describe('Renderização básica', () => {
    it('deve renderizar o item com data-testid', () => {
      wrap(<ListItem text="Item" />);
      expect(screen.getByTestId('list-item')).toBeInTheDocument();
    });

    it('deve renderizar o texto principal', () => {
      wrap(<ListItem text="Meu item" />);
      expect(screen.getByText('Meu item')).toBeInTheDocument();
    });

    it('deve aplicar id personalizado', () => {
      wrap(<ListItem id="custom-id" text="Item" />);
      expect(screen.getByTestId('list-item')).toHaveAttribute('id', 'custom-id');
    });

    it('deve gerar um id automático quando não informado', () => {
      wrap(<ListItem text="Item" />);
      expect(screen.getByTestId('list-item')).toHaveAttribute('id');
    });

    it('deve aplicar className personalizada', () => {
      wrap(<ListItem className="minha-classe" text="Item" />);
      expect(screen.getByTestId('list-item')).toHaveClass('minha-classe');
    });

    it('deve aplicar width via inline style', () => {
      wrap(<ListItem text="Item" width="320px" />);
      expect(screen.getByTestId('list-item')).toHaveStyle({ width: '320px' });
    });

    it('deve aplicar scale 1 por padrão via --giro-scale', () => {
      wrap(<ListItem text="Item" />);
      expect(screen.getByTestId('list-item')).toHaveAttribute(
        'style',
        expect.stringContaining('--giro-scale: 1')
      );
    });

    it('deve aplicar scale 1.5 via --giro-scale', () => {
      wrap(<ListItem text="Item" scale={1.5} />);
      expect(screen.getByTestId('list-item')).toHaveAttribute(
        'style',
        expect.stringContaining('--giro-scale: 1.5')
      );
    });

    it('deve aplicar scale 2 via --giro-scale', () => {
      wrap(<ListItem text="Item" scale={2} />);
      expect(screen.getByTestId('list-item')).toHaveAttribute(
        'style',
        expect.stringContaining('--giro-scale: 2')
      );
    });
  });

  // ── Variantes ──────────────────────────────────────────────────────────────
  describe('Variantes', () => {
    it('deve ter role="option" na variante text (padrão)', () => {
      wrap(<ListItem text="Item" />);
      expect(screen.getByRole('option', { name: 'Item' })).toBeInTheDocument();
    });

    it('deve ter role="checkbox" na variante checkbox', () => {
      wrap(<ListItem variant="checkbox" text="Item" />);
      expect(screen.getByRole('checkbox', { name: 'Item' })).toBeInTheDocument();
    });

    it('deve ter role="option" na variante icon', () => {
      wrap(<ListItem variant="icon" text="Item" icon={<TestIcon />} />);
      expect(screen.getByRole('option', { name: 'Item' })).toBeInTheDocument();
    });

    it('deve renderizar o ícone na variante icon', () => {
      wrap(<ListItem variant="icon" text="Item" icon={<TestIcon />} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('deve usar variante text como fallback para variante inválida', () => {
      // @ts-expect-error — testando variante inválida intencionalmente
      wrap(<ListItem variant="invalida" text="Item" />);
      expect(screen.getByRole('option', { name: 'Item' })).toBeInTheDocument();
    });
  });

  // ── SubTexto ───────────────────────────────────────────────────────────────
  describe('SubTexto', () => {
    it('não deve exibir subTexto quando não informado', () => {
      wrap(<ListItem text="Item" />);
      expect(screen.queryByText('Sub')).not.toBeInTheDocument();
    });

    it('deve exibir subTexto quando subText é fornecido', () => {
      wrap(<ListItem text="Item" subText="Sub" />);
      expect(screen.getByText('Sub')).toBeInTheDocument();
    });

    it('deve definir aria-describedby quando subTexto presente', () => {
      wrap(<ListItem id="li-1" text="Item" subText="Sub" />);
      const row = screen.getByRole('option', { name: 'Item' });
      expect(row).toHaveAttribute('aria-describedby', 'li-1-subtext');
    });

    it('não deve definir aria-describedby quando subTexto ausente', () => {
      wrap(<ListItem id="li-1" text="Item" />);
      const row = screen.getByRole('option', { name: 'Item' });
      expect(row).not.toHaveAttribute('aria-describedby');
    });
  });

  // ── Estado disabled ────────────────────────────────────────────────────────
  describe('Estado disabled', () => {
    it('deve ter tabIndex=-1 quando desabilitado', () => {
      wrap(<ListItem text="Item" disabled />);
      expect(screen.getByRole('option', { name: 'Item' })).toHaveAttribute('tabIndex', '-1');
    });

    it('deve ter tabIndex=0 quando habilitado', () => {
      wrap(<ListItem text="Item" />);
      expect(screen.getByRole('option', { name: 'Item' })).toHaveAttribute('tabIndex', '0');
    });

    it('deve ter aria-disabled=true quando desabilitado', () => {
      wrap(<ListItem text="Item" disabled />);
      expect(screen.getByRole('option', { name: 'Item' })).toHaveAttribute('aria-disabled', 'true');
    });

    it('não deve chamar onClick quando desabilitado', async () => {
      const handleClick = vi.fn();
      wrap(<ListItem text="Item" disabled onClick={handleClick} />);
      fireEvent.click(screen.getByRole('option', { name: 'Item' }));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('não deve chamar onChange na variante checkbox quando desabilitado', async () => {
      const handleChange = vi.fn();
      wrap(<ListItem variant="checkbox" text="Item" disabled onChange={handleChange} />);
      fireEvent.click(screen.getByRole('checkbox', { name: 'Item' }));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  // ── Interação — variante text ──────────────────────────────────────────────
  describe('Interação — variante text', () => {
    it('deve chamar onClick ao clicar', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      wrap(<ListItem text="Item" onClick={handleClick} />);
      await user.click(screen.getByRole('option', { name: 'Item' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onClick ao pressionar Enter', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      wrap(<ListItem text="Item" onClick={handleClick} />);
      screen.getByRole('option', { name: 'Item' }).focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onClick ao pressionar Space', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      wrap(<ListItem text="Item" onClick={handleClick} />);
      screen.getByRole('option', { name: 'Item' }).focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('deve alternar aria-selected ao clicar', async () => {
      const user = userEvent.setup();
      wrap(<ListItem text="Item" />);
      const row = screen.getByRole('option', { name: 'Item' });
      expect(row).toHaveAttribute('aria-selected', 'false');
      await user.click(row);
      expect(row).toHaveAttribute('aria-selected', 'true');
    });

    it('deve iniciar com aria-selected=true quando selected=true', () => {
      wrap(<ListItem text="Item" selected />);
      expect(screen.getByRole('option', { name: 'Item' })).toHaveAttribute('aria-selected', 'true');
    });

    it('deve sincronizar aria-selected com prop selected controlada', async () => {
      const { rerender } = wrap(<ListItem text="Item" selected={false} />);
      expect(screen.getByRole('option', { name: 'Item' })).toHaveAttribute('aria-selected', 'false');
      rerender(<ul><ListItem text="Item" selected={true} /></ul>);
      expect(screen.getByRole('option', { name: 'Item' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  // ── Interação — variante checkbox ─────────────────────────────────────────
  describe('Interação — variante checkbox', () => {
    it('deve chamar onChange com true ao marcar', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      wrap(<ListItem variant="checkbox" text="Item" onChange={handleChange} />);
      await user.click(screen.getByRole('checkbox', { name: 'Item' }));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('deve chamar onChange com false ao desmarcar', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      wrap(<ListItem variant="checkbox" text="Item" checked onChange={handleChange} />);
      await user.click(screen.getByRole('checkbox', { name: 'Item' }));
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('deve refletir aria-checked=false por padrão', () => {
      wrap(<ListItem variant="checkbox" text="Item" />);
      expect(screen.getByRole('checkbox', { name: 'Item' })).toHaveAttribute('aria-checked', 'false');
    });

    it('deve refletir aria-checked=true quando checked=true', () => {
      wrap(<ListItem variant="checkbox" text="Item" checked />);
      expect(screen.getByRole('checkbox', { name: 'Item' })).toHaveAttribute('aria-checked', 'true');
    });

    it('deve sincronizar aria-checked com prop checked controlada', async () => {
      const { rerender } = wrap(<ListItem variant="checkbox" text="Item" checked={false} />);
      expect(screen.getByRole('checkbox', { name: 'Item' })).toHaveAttribute('aria-checked', 'false');
      rerender(<ul><ListItem variant="checkbox" text="Item" checked={true} /></ul>);
      expect(screen.getByRole('checkbox', { name: 'Item' })).toHaveAttribute('aria-checked', 'true');
    });

    it('não deve definir aria-selected na variante checkbox', () => {
      wrap(<ListItem variant="checkbox" text="Item" />);
      expect(screen.getByRole('checkbox', { name: 'Item' })).not.toHaveAttribute('aria-selected');
    });
  });

  // ── Comportamento de árvore — expand/collapse ──────────────────────────────
  describe('Comportamento de árvore', () => {
    it('não deve exibir o chevron sem children', () => {
      wrap(<ListItem text="Item" />);
      expect(screen.queryByTestId('list-item-chevron')).not.toBeInTheDocument();
    });

    it('deve exibir o chevron quando há children', () => {
      wrap(
        <ListItem text="Pai">
          <ListItem text="Filho" />
        </ListItem>
      );
      expect(screen.getByTestId('list-item-chevron')).toBeInTheDocument();
    });

    it('não deve renderizar children quando recolhido (padrão)', () => {
      wrap(
        <ListItem text="Pai">
          <ListItem text="Filho" />
        </ListItem>
      );
      expect(screen.queryByText('Filho')).not.toBeInTheDocument();
    });

    it('deve renderizar children quando defaultExpanded=true', () => {
      wrap(
        <ListItem text="Pai" defaultExpanded>
          <ListItem text="Filho" />
        </ListItem>
      );
      expect(screen.getByText('Filho')).toBeInTheDocument();
    });

    it('deve expandir ao clicar no item', async () => {
      const user = userEvent.setup();
      wrap(
        <ListItem text="Pai">
          <ListItem text="Filho" />
        </ListItem>
      );
      await user.click(screen.getByRole('option', { name: 'Pai' }));
      expect(screen.getByText('Filho')).toBeInTheDocument();
    });

    it('deve recolher ao clicar novamente no item', async () => {
      const user = userEvent.setup();
      wrap(
        <ListItem text="Pai" defaultExpanded>
          <ListItem text="Filho" />
        </ListItem>
      );
      await user.click(screen.getByRole('option', { name: 'Pai' }));
      expect(screen.queryByText('Filho')).not.toBeInTheDocument();
    });

    it('deve chamar onExpandedChange ao expandir', async () => {
      const user = userEvent.setup();
      const handleExpanded = vi.fn();
      wrap(
        <ListItem text="Pai" onExpandedChange={handleExpanded}>
          <ListItem text="Filho" />
        </ListItem>
      );
      await user.click(screen.getByRole('option', { name: 'Pai' }));
      expect(handleExpanded).toHaveBeenCalledWith(true);
    });

    it('deve chamar onExpandedChange ao recolher', async () => {
      const user = userEvent.setup();
      const handleExpanded = vi.fn();
      wrap(
        <ListItem text="Pai" defaultExpanded onExpandedChange={handleExpanded}>
          <ListItem text="Filho" />
        </ListItem>
      );
      await user.click(screen.getByRole('option', { name: 'Pai' }));
      expect(handleExpanded).toHaveBeenCalledWith(false);
    });

    it('deve respeitar expanded=true controlado', () => {
      wrap(
        <ListItem text="Pai" expanded>
          <ListItem text="Filho" />
        </ListItem>
      );
      expect(screen.getByText('Filho')).toBeInTheDocument();
    });

    it('expanded prop é usada como valor inicial e sincroniza ao mudar', () => {
      const { rerender } = wrap(
        <ListItem text="Pai" expanded={false}>
          <ListItem text="Filho" />
        </ListItem>
      );
      expect(screen.queryByText('Filho')).not.toBeInTheDocument();
    });

    it('deve sincronizar expanded via prop controlada', () => {
      const { rerender } = wrap(
        <ListItem text="Pai" expanded={false}>
          <ListItem text="Filho" />
        </ListItem>
      );
      expect(screen.queryByText('Filho')).not.toBeInTheDocument();
      rerender(
        <ul>
          <ListItem text="Pai" expanded={true}>
            <ListItem text="Filho" />
          </ListItem>
        </ul>
      );
      expect(screen.getByText('Filho')).toBeInTheDocument();
    });

    it('não deve expandir quando desabilitado', () => {
      wrap(
        <ListItem text="Pai" disabled>
          <ListItem text="Filho" />
        </ListItem>
      );
      fireEvent.click(screen.getByRole('option', { name: 'Pai' }));
      expect(screen.queryByText('Filho')).not.toBeInTheDocument();
    });

    it('deve definir aria-expanded=false no row quando recolhido', () => {
      wrap(
        <ListItem text="Pai">
          <ListItem text="Filho" />
        </ListItem>
      );
      expect(screen.getByRole('option', { name: 'Pai' })).toHaveAttribute('aria-expanded', 'false');
    });

    it('deve definir aria-expanded=true no row quando expandido', async () => {
      const user = userEvent.setup();
      wrap(
        <ListItem text="Pai">
          <ListItem text="Filho" />
        </ListItem>
      );
      await user.click(screen.getByRole('option', { name: 'Pai' }));
      expect(screen.getByRole('option', { name: 'Pai' })).toHaveAttribute('aria-expanded', 'true');
    });

    it('não deve definir aria-expanded quando não há children', () => {
      wrap(<ListItem text="Item" />);
      expect(screen.getByRole('option', { name: 'Item' })).not.toHaveAttribute('aria-expanded');
    });

    it('deve renderizar children dentro de ul com role="group"', async () => {
      const user = userEvent.setup();
      const { container } = wrap(
        <ListItem text="Pai">
          <ListItem text="Filho" />
        </ListItem>
      );
      await user.click(screen.getByRole('option', { name: 'Pai' }));
      const group = container.querySelector('ul[role="group"]');
      expect(group).toBeInTheDocument();
    });
  });

  // ── Árvore com checkbox — estado indeterminado ────────────────────────────
  describe('Árvore com checkbox — estado indeterminado', () => {
    const renderCheckboxTree = () =>
      wrap(
        <ListItem variant="checkbox" text="Pai" defaultExpanded>
          <ListItem variant="checkbox" text="Filho A" />
          <ListItem variant="checkbox" text="Filho B" />
        </ListItem>
      );

    it('deve marcar todos os filhos ao marcar o pai', async () => {
      const user = userEvent.setup();
      renderCheckboxTree();
      await user.click(screen.getByText('Pai'));
      expect(screen.getByRole('checkbox', { name: 'Filho A' })).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByRole('checkbox', { name: 'Filho B' })).toHaveAttribute('aria-checked', 'true');
    });

    it('deve desmarcar todos os filhos ao desmarcar o pai', async () => {
      const user = userEvent.setup();
      renderCheckboxTree();
      // marcar
      await user.click(screen.getByText('Pai'));
      // desmarcar
      await user.click(screen.getByText('Pai'));
      expect(screen.getByRole('checkbox', { name: 'Filho A' })).toHaveAttribute('aria-checked', 'false');
      expect(screen.getByRole('checkbox', { name: 'Filho B' })).toHaveAttribute('aria-checked', 'false');
    });

    it('deve exibir o checkbox pai como indeterminado quando apenas um filho está marcado', async () => {
      const user = userEvent.setup();
      const { container } = renderCheckboxTree();
      // Marcar todos via pai
      await user.click(screen.getByText('Pai'));
      // Desmarcar Filho A individualmente
      await user.click(screen.getByRole('checkbox', { name: 'Filho A' }));
      // O Checkbox interno do pai deve estar indeterminado
      const indeterminate = container.querySelector('[data-state="indeterminate"]');
      expect(indeterminate).toBeInTheDocument();
    });

    it('deve marcar todos ao clicar no pai indeterminado', async () => {
      const user = userEvent.setup();
      renderCheckboxTree();
      // Marcar todos
      await user.click(screen.getByText('Pai'));
      // Desmarcar um filho → pai indeterminado
      await user.click(screen.getByRole('checkbox', { name: 'Filho A' }));
      // Clicar no texto do pai indeterminado → vai para marcado
      await user.click(screen.getByText('Pai'));
      expect(screen.getByRole('checkbox', { name: 'Filho A' })).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByRole('checkbox', { name: 'Filho B' })).toHaveAttribute('aria-checked', 'true');
    });

    it('deve marcar o pai quando todos os filhos forem marcados individualmente', async () => {
      const user = userEvent.setup();
      renderCheckboxTree();
      await user.click(screen.getByRole('checkbox', { name: 'Filho A' }));
      await user.click(screen.getByRole('checkbox', { name: 'Filho B' }));
      expect(screen.getByRole('checkbox', { name: 'Pai' })).toHaveAttribute('aria-checked', 'true');
    });

    it('deve desmarcar o pai quando todos os filhos forem desmarcados individualmente', async () => {
      const user = userEvent.setup();
      renderCheckboxTree();
      // Marcar todos via pai
      await user.click(screen.getByText('Pai'));
      // Desmarcar filhos individualmente
      await user.click(screen.getByRole('checkbox', { name: 'Filho A' }));
      await user.click(screen.getByRole('checkbox', { name: 'Filho B' }));
      expect(screen.getByRole('checkbox', { name: 'Pai' })).toHaveAttribute('aria-checked', 'false');
    });

    it('deve preservar o estado dos filhos após fechar e reabrir a árvore', async () => {
      const user = userEvent.setup();
      wrap(
        <ListItem variant="checkbox" text="Pai" defaultExpanded>
          <ListItem variant="checkbox" text="Filho A" />
          <ListItem variant="checkbox" text="Filho B" />
        </ListItem>
      );
      // Marcar todos via pai (clica no texto)
      await user.click(screen.getByText('Pai'));
      // Desmarcar Filho A
      await user.click(screen.getByRole('checkbox', { name: 'Filho A' }));
      // Fechar árvore (clica no row)
      await user.click(screen.getByRole('checkbox', { name: 'Pai' }));
      // Reabrir árvore (clica no row)
      await user.click(screen.getByRole('checkbox', { name: 'Pai' }));
      // Filho A deve permanecer desmarcado
      expect(screen.getByRole('checkbox', { name: 'Filho A' })).toHaveAttribute('aria-checked', 'false');
      expect(screen.getByRole('checkbox', { name: 'Filho B' })).toHaveAttribute('aria-checked', 'true');
    });
  });

  // ── Acessibilidade ────────────────────────────────────────────────────────
  describe('Acessibilidade', () => {
    it('deve ter aria-labelledby apontando para o span de texto', () => {
      wrap(<ListItem id="li-a" text="Item" />);
      expect(screen.getByRole('option', { name: 'Item' })).toHaveAttribute('aria-labelledby', 'li-a-text');
    });

    it('deve ter tabIndex=0 por padrão', () => {
      wrap(<ListItem text="Item" />);
      expect(screen.getByRole('option', { name: 'Item' })).toHaveAttribute('tabIndex', '0');
    });

    it('deve ter aria-expanded=false no item com children recolhido', () => {
      wrap(
        <ListItem text="Pai">
          <ListItem text="Filho" />
        </ListItem>
      );
      expect(screen.getByRole('option', { name: 'Pai' })).toHaveAttribute('aria-expanded', 'false');
    });

    it('deve ter aria-expanded=true no item com children expandido e recolher ao clicar', async () => {
      const user = userEvent.setup();
      wrap(
        <ListItem text="Pai" defaultExpanded>
          <ListItem text="Filho" />
        </ListItem>
      );
      expect(screen.getByRole('option', { name: 'Pai' })).toHaveAttribute('aria-expanded', 'true');
      await user.click(screen.getByRole('option', { name: 'Pai' }));
      expect(screen.getByRole('option', { name: 'Pai' })).toHaveAttribute('aria-expanded', 'false');
    });

    it('não deve expandir ao clicar no item desabilitado com children', () => {
      wrap(
        <ListItem text="Pai" disabled>
          <ListItem text="Filho" />
        </ListItem>
      );
      fireEvent.click(screen.getByRole('option', { name: 'Pai' }));
      expect(screen.queryByText('Filho')).not.toBeInTheDocument();
    });
  });
});
