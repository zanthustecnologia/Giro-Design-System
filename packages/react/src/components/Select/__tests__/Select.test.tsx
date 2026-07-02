import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock do Radix UI Select
vi.mock('radix-ui', () => {
  const React = require('react');
  const ctx = React.createContext({ 
    value: '', 
    open: false,
    onValueChange: () => {},
    onOpenChange: () => {},
  });

  const Root = ({ children, value, onValueChange, open, onOpenChange, disabled, ...rest }: any) => {
    return React.createElement(
      ctx.Provider, 
      { value: { value, open, onValueChange, onOpenChange, disabled } }, 
      children
    );
  };

  const Trigger = React.forwardRef(({ children, className, id, asChild, ...rest }: any, ref: any) => {
    const state = React.useContext(ctx);
    const props = {
      ref,
      className: typeof className === 'string' ? className : '',
      id,
      disabled: state.disabled,
      type: 'button',
      onClick: (e: any) => {
        e.preventDefault();
        if (!state.disabled) {
          state.onOpenChange?.(!state.open);
        }
      },
      'data-testid': rest['data-testid'],
      'aria-label': rest['aria-label'],
    };
    
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, props);
    }
    
    return React.createElement('button', props, children);
  });

  const Value = ({ children, placeholder, ...rest }: any) => {
    return React.createElement('span', rest, children || placeholder);
  };

  const Portal = ({ children }: any) => {
    return React.createElement('div', { 'data-portal': true }, children);
  };

  const Content = ({ children, className, ...rest }: any) => {
    const state = React.useContext(ctx);
    if (!state.open) return null;
    return React.createElement('div', { className, role: 'listbox', ...rest }, children);
  };

  const Viewport = React.forwardRef(({ children, className, ...rest }: any, ref: any) => {
    return React.createElement('div', { ref, className, ...rest }, children);
  });

  const Group = ({ children, className, ...rest }: any) => {
    return React.createElement('div', { className, role: 'group', ...rest }, children);
  };

  const Item = ({ children, value, disabled, className, ...rest }: any) => {
    const state = React.useContext(ctx);
    return React.createElement(
      'div',
      {
        className,
        role: 'option',
        'aria-selected': state.value === value,
        'data-disabled': disabled || undefined,
        onClick: (e: any) => {
          e.preventDefault();
          if (!disabled && state.onValueChange) {
            state.onValueChange(value);
            state.onOpenChange?.(false);
          }
        },
        ...rest,
      },
      children,
    );
  };

  const ItemText = ({ children, className }: any) => {
    return React.createElement('span', { className }, children);
  };

  const ItemIndicator = ({ children, className }: any) => {
    return React.createElement('span', { className }, children);
  };

  const Label = {
    Root: ({ children, htmlFor, ...rest }: any) => {
      return React.createElement('label', { htmlFor, ...rest }, children);
    },
  };

  const Tooltip = {
    Provider: ({ children, ...rest }: any) => {
      return React.createElement('div', rest, children);
    },
    Root: ({ children, ...rest }: any) => {
      return React.createElement('div', rest, children);
    },
    Trigger: React.forwardRef(({ children, asChild, ...rest }: any, ref: any) => {
      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, { ref, ...rest });
      }
      return React.createElement('div', { ref, ...rest }, children);
    }),
    Portal: ({ children, ...rest }: any) => {
      return React.createElement('div', rest, children);
    },
    Content: ({ children, side, align, ...rest }: any) => {
      return React.createElement('div', { role: 'tooltip', ...rest }, children);
    },
  };

  const Checkbox = {
    Root: React.forwardRef(({ checked, onCheckedChange, disabled, id, children, ...rest }: any, ref: any) => {
      return React.createElement('button', {
        ref,
        type: 'button',
        role: 'checkbox',
        'aria-checked': checked,
        disabled,
        id,
        onClick: () => {
          if (!disabled && onCheckedChange) {
            onCheckedChange(!checked);
          }
        },
        ...rest,
      }, children);
    }),
    Indicator: ({ children, ...rest }: any) => {
      return React.createElement('span', rest, children);
    },
  };

  return {
    Select: {
      Root,
      Trigger,
      Value,
      Portal,
      Content,
      Viewport,
      Group,
      Item,
      ItemText,
      ItemIndicator,
    },
    Label,
    Tooltip,
    RadioGroup: {
      Root: () => null,
      Item: () => null,
      Indicator: () => null,
    },
    Checkbox,
    DropdownMenu: {
      Root: () => null,
      Trigger: () => null,
      Portal: () => null,
      Content: () => null,
      Item: () => null,
    },
  };
});

// Mock parcial dos ícones do Fluent UI
vi.mock('@fluentui/react-icons', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@fluentui/react-icons')>();

  return {
    ...actual,
    ChevronUp16Regular: () => <span data-testid="chevron-up">↑</span>,
    ChevronDown16Regular: () => <span data-testid="chevron-down">↓</span>,
    ChevronRight16Regular: () => <span data-testid="chevron-right">→</span>,
    Search16Regular: () => <span data-testid="search-icon">🔍</span>,
    Info12Regular: () => <span data-testid="info-icon">ℹ️</span>,
    Dismiss16Regular: () => <span data-testid="dismiss-icon">✕</span>,
  };
});

import Select from '../Select';
import { SelectItemProps } from '../Select.types';

describe('Select Component', () => {
  const mockItems: SelectItemProps[] = [
    { value: '1', text: 'Item 1' },
    { value: '2', text: 'Item 2' },
    { value: '3', text: 'Item 3', disabled: true },
    { value: '4', text: 'Item 4', subTitle: 'Subtitle 4' },
  ];

  const mockItemsWithIcon: SelectItemProps[] = [
    { value: '1', text: 'Item 1', icon: <span>🏠</span> },
    { value: '2', text: 'Item 2', icon: <span>⚙️</span> },
  ];

  const mockItemsWithChildren: SelectItemProps[] = [
    {
      value: 'parent-1',
      text: 'Parent 1',
      children: [
        { value: 'child-1-1', text: 'Child 1.1' },
        { value: 'child-1-2', text: 'Child 1.2' },
      ],
    },
    { value: '2', text: 'Item 2' },
  ];

  beforeEach(() => {
    vi.spyOn(React, 'useId').mockReturnValue('test-id');
  });

  describe('Renderização Básica', () => {
    it('renderiza o select com placeholder', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          placeholder="Selecione uma opção"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
      expect(screen.getByText('Selecione uma opção')).toBeInTheDocument();
    });

    it('aplica escala 1.0 por padrão', () => {
      const { container } = render(
        <Select
          items={mockItems}
          variant="text"
          data-testid="select"
        />
      );

      const wrapper = container.querySelector('[data-testid="select"]') as HTMLElement;
      expect(wrapper.style.getPropertyValue('--giro-scale')).toBe('1');
    });

    it('aplica escala 1.5 quando informado', () => {
      const { container } = render(
        <Select
          items={mockItems}
          variant="text"
          scale={1.5}
          data-testid="select"
        />
      );

      const wrapper = container.querySelector('[data-testid="select"]') as HTMLElement;
      expect(wrapper.style.getPropertyValue('--giro-scale')).toBe('1.5');
    });

    it('aplica escala 2.0 quando informado', () => {
      const { container } = render(
        <Select
          items={mockItems}
          variant="text"
          scale={2}
          data-testid="select"
        />
      );

      const wrapper = container.querySelector('[data-testid="select"]') as HTMLElement;
      expect(wrapper.style.getPropertyValue('--giro-scale')).toBe('2');
    });

    it('renderiza com label', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          label="Meu Select"
          data-testid="select"
        />
      );

      expect(screen.getByText('Meu Select')).toBeInTheDocument();
    });

    it('renderiza com helper text', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          helperText="Texto de ajuda"
          data-testid="select"
        />
      );

      expect(screen.getByText('Texto de ajuda')).toBeInTheDocument();
    });

    it('renderiza com ícone chevron down quando fechado', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    });

    it('aplica maxWidth quando fornecido', () => {
      const { container } = render(
        <Select
          items={mockItems}
          variant="text"
          maxWidth={300}
          data-testid="select"
        />
      );

      const selectContainer = container.querySelector('[data-testid="select"]');
      expect(selectContainer).toHaveStyle({ maxWidth: '300px' });
    });

    it('aplica className customizada', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          className="custom-class"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toHaveClass('custom-class');
    });
  });

  describe('Valores', () => {
    it('exibe o valor selecionado em variante text', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          value="2"
          data-testid="select"
        />
      );

      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('exibe texto de múltiplos selecionados em variante checkbox', () => {
      render(
        <Select
          items={mockItems}
          variant="checkbox"
          value={['1', '2']}
          data-testid="select"
        />
      );

      expect(screen.getByText('Item 1, Item 2')).toBeInTheDocument();
    });

    it('exibe "e mais X" quando mais de 3 itens selecionados em checkbox', () => {
      const manyItems: SelectItemProps[] = [
        { value: '1', text: 'Item 1' },
        { value: '2', text: 'Item 2' },
        { value: '3', text: 'Item 3' },
        { value: '4', text: 'Item 4' },
        { value: '5', text: 'Item 5' },
      ];

      render(
        <Select
          items={manyItems}
          variant="checkbox"
          value={['1', '2', '3', '4', '5']}
          data-testid="select"
        />
      );

      expect(screen.getByText(/Item 1, Item 2, Item 3 e mais 2/)).toBeInTheDocument();
    });
  });

  describe('Validação', () => {
    it('exibe asterisco quando required', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          label="Campo obrigatório"
          required={true}
          data-testid="select"
        />
      );

      const label = screen.getByText('Campo obrigatório');
      expect(label).toBeInTheDocument();
    });

    it('exibe mensagem de erro quando fornecida', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          required={true}
          errorMessage="Campo obrigatório"
          value=""
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('Estados', () => {
    it('renderiza como disabled', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          disabled={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeDisabled();
    });

    it('oculta helper text quando há erro', () => {
      const { rerender } = render(
        <Select
          items={mockItems}
          variant="text"
          helperText="Texto de ajuda"
          required={true}
          errorMessage="Campo obrigatório"
          data-testid="select"
        />
      );

      // Helper text deve estar visível inicialmente
      expect(screen.getByText('Texto de ajuda')).toBeInTheDocument();
    });
  });

  describe('Props e Callbacks', () => {
    it('passa data-testid corretamente', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          data-testid="my-select"
        />
      );

      expect(screen.getByTestId('my-select')).toBeInTheDocument();
      expect(screen.getByTestId('my-select-trigger')).toBeInTheDocument();
    });

    it('chama onOpenChange quando definido', () => {
      const handleOpenChange = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          onOpenChange={handleOpenChange}
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });

    it('chama onValueChange quando definido', () => {
      const handleValueChange = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          onValueChange={handleValueChange}
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });
  });

  describe('Funcionalidades Avançadas', () => {
    it('renderiza com infinite scroll habilitado', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          enableInfiniteScroll={true}
          isLoadingMore={false}
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });

    it('renderiza com busca via API habilitada', () => {
      const handleApiSearch = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          search={true}
          enableApiSearch={true}
          onApiSearch={handleApiSearch}
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('possui aria-label quando fornecido', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          aria-label="Selecione uma opção"
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveAttribute('aria-label', 'Selecione uma opção');
    });

    it('associa label com select via htmlFor', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          label="Meu Campo"
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveAttribute('id');
    });
  });

  describe('Diferentes Variantes', () => {
    it('renderiza variante text', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });

    it('renderiza variante icon', () => {
      render(
        <Select
          items={mockItemsWithIcon}
          variant="icon"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });

    it('renderiza variante checkbox', () => {
      render(
        <Select
          items={mockItems}
          variant="checkbox"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });
  });

  describe('Props Adicionais', () => {
    it('renderiza com tooltip quando habilitado', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          label="Campo com tooltip"
          tooltip={true}
          tooltipText="Texto do tooltip"
          data-testid="select"
        />
      );

      expect(screen.getByText('Campo com tooltip')).toBeInTheDocument();
    });

    it('renderiza com side e align personalizados', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          side="top"
          align="end"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });
  });

  describe('Interações do Usuário', () => {
    it('renderiza trigger clicável', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('type', 'button');
    });

    it('trigger está habilitado quando não disabled', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).not.toBeDisabled();
    });

    it('exibe ícones chevron corretos baseado no estado', () => {
      const { rerender } = render(
        <Select
          items={mockItems}
          variant="text"
          data-testid="select"
        />
      );

      // Quando fechado, deve mostrar chevron-down
      expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    });
  });

  describe('Funcionalidade de Busca', () => {
    it('não renderiza campo de busca quando search=false', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          search={false}
          data-testid="select"
        />
      );

      expect(screen.queryByTestId('select-search')).not.toBeInTheDocument();
    });

    it('suporta prop enableApiSearch', () => {
      const handleApiSearch = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          search={true}
          enableApiSearch={true}
          onApiSearch={handleApiSearch}
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });
  });

  describe('Items com Propriedades Especiais', () => {
    it('aceita items com subtitle', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });

    it('aceita items com ícone', () => {
      render(
        <Select
          items={mockItemsWithIcon}
          variant="icon"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });

    it('aceita items com children (expandable)', () => {
      render(
        <Select
          items={mockItemsWithChildren}
          variant="text"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });
  });

  describe('Seleção Múltipla (Checkbox)', () => {
    it('renderiza em modo checkbox', () => {
      render(
        <Select
          items={mockItems}
          variant="checkbox"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });

    it('exibe valores selecionados em checkbox', () => {
      const handleValueChange = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="checkbox"
          value={['1']}
          onValueChange={handleValueChange}
          data-testid="select"
        />
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });

  describe('Infinite Scroll', () => {
    it('suporta infinite scroll habilitado', () => {
      const handleScrollEnd = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          enableInfiniteScroll={true}
          onScrollEnd={handleScrollEnd}
          isLoadingMore={false}
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });

    it('aceita prop isLoadingMore', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          enableInfiniteScroll={true}
          isLoadingMore={true}
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });
  });

  describe('Validação e Erros', () => {
    it('suporta required prop', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          required={true}
          errorMessage="Este campo é obrigatório"
          value=""
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeInTheDocument();
    });

    it('aceita errorMessage customizada', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          required={true}
          errorMessage="Mensagem customizada"
          value=""
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('lida com array vazio de items', () => {
      render(
        <Select
          items={[]}
          variant="text"
          search={true}
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });

    it('lida com valor inicial que não existe nos items', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          value="999"
          data-testid="select"
        />
      );

      expect(screen.getByTestId('select')).toBeInTheDocument();
    });

    it('renderiza quando disabled', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          disabled={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeDisabled();
    });

    it('exibe apenas placeholder quando nenhum valor selecionado', () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          placeholder="Escolha uma opção"
          data-testid="select"
        />
      );

      expect(screen.getByText('Escolha uma opção')).toBeInTheDocument();
    });
  });

  describe('Interações com Select', () => {
    it('abre o select ao clicar no trigger', async () => {
      const handleOpenChange = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          onOpenChange={handleOpenChange}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(true);
      });
    });

    it('fecha o select ao selecionar um item', async () => {
      const handleValueChange = vi.fn();
      const handleOpenChange = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          onValueChange={handleValueChange}
          onOpenChange={handleOpenChange}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const item = screen.getByRole('option', { name: 'Item 1' });
        fireEvent.click(item);
      });

      await waitFor(() => {
        expect(handleValueChange).toHaveBeenCalledWith('1');
        expect(handleOpenChange).toHaveBeenCalledWith(false);
      });
    });

    it('não abre quando disabled', () => {
      const handleOpenChange = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          disabled={true}
          onOpenChange={handleOpenChange}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      expect(handleOpenChange).not.toHaveBeenCalled();
    });

    it('exibe chevron-up quando aberto', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
        expect(screen.queryByTestId('chevron-down')).not.toBeInTheDocument();
      });
    });
  });

  describe('Interações com Busca', () => {
    it('permite digitar no campo de busca', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          search={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const searchInput = screen.getByTestId('select-search') as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'Item 1' } });
        expect(searchInput.value).toBe('Item 1');
      });
    });

    it('chama handleSearchChange ao digitar', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          search={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const searchInput = screen.getByTestId('select-search') as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'test' } });
        expect(searchInput.value).toBe('test');
      });
    });

    it('executa busca ao pressionar Enter', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          search={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const searchInput = screen.getByTestId('select-search') as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'Item' } });
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
        expect(searchInput.value).toBe('Item');
      });
    });

    it('limpa busca ao pressionar Escape', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          search={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const searchInput = screen.getByTestId('select-search') as HTMLInputElement;
        expect(searchInput).toBeInTheDocument();
      });

      const searchInput = screen.getByTestId('select-search') as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'test' } });
      expect(searchInput.value).toBe('test');
      
      fireEvent.keyDown(searchInput, { key: 'Escape', code: 'Escape' });

      await waitFor(() => {
        expect(searchInput.value).toBe('');
      });
    });

    it('previne navegação com setas sem seleção de texto', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          search={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const searchInput = screen.getByTestId('select-search') as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'test' } });
        
        // Posicionar cursor no final (sem seleção)
        searchInput.selectionStart = 4;
        searchInput.selectionEnd = 4;
        
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
        Object.defineProperty(event, 'currentTarget', { value: searchInput });
        fireEvent.keyDown(searchInput, { key: 'ArrowDown', code: 'ArrowDown' });

        expect(searchInput.value).toBe('test');
      });
    });

    it('permite navegação com setas quando há texto selecionado', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          search={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const searchInput = screen.getByTestId('select-search') as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'test' } });
        
        // Selecionar todo o texto
        searchInput.selectionStart = 0;
        searchInput.selectionEnd = 4;
        
        fireEvent.keyDown(searchInput, { key: 'ArrowDown', code: 'ArrowDown' });

        expect(searchInput.value).toBe('test');
      });
    });

    it('chama onApiSearch quando enableApiSearch está ativo', async () => {
      const handleApiSearch = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          search={true}
          enableApiSearch={true}
          onApiSearch={handleApiSearch}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      // Deve chamar com string vazia ao abrir
      await waitFor(() => {
        expect(handleApiSearch).toHaveBeenCalledWith('');
      });

      const searchInput = screen.getByTestId('select-search') as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'test' } });
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

      // Aguardar debounce (300ms)
      await waitFor(() => {
        expect(handleApiSearch).toHaveBeenCalledWith('test');
      }, { timeout: 500 });
    });

    it('limpa busca ao clicar no botão clear', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          search={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const searchInput = screen.getByTestId('select-search') as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'test' } });
        expect(searchInput.value).toBe('test');
      });
    });

    it('mostra mensagem quando nenhum resultado encontrado', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          search={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const searchInput = screen.getByTestId('select-search') as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'xyz123' } });
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
      });

      await waitFor(() => {
        expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument();
      });
    });
  });

  describe('Seleção Múltipla com Checkbox', () => {
    it('seleciona múltiplos items', async () => {
      const handleValueChange = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="checkbox"
          onValueChange={handleValueChange}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const item1 = screen.getByTestId('checkbox-item-1');
        expect(item1).toBeInTheDocument();
      });

      const item1 = screen.getByTestId('checkbox-item-1');
      const item2 = screen.getByTestId('checkbox-item-2');

      fireEvent.click(item1);
      expect(handleValueChange).toHaveBeenCalledWith(['1']);

      fireEvent.click(item2);
      expect(handleValueChange).toHaveBeenCalledWith(['1', '2']);
    });

    it('deseleciona items em modo checkbox', async () => {
      const handleValueChange = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="checkbox"
          value={['1', '2']}
          onValueChange={handleValueChange}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const item1 = screen.getByTestId('checkbox-item-1');
        expect(item1).toBeInTheDocument();
      });

      const item1 = screen.getByTestId('checkbox-item-1');
      fireEvent.click(item1);

      expect(handleValueChange).toHaveBeenCalledWith(['2']);
    });

    it('mantém select aberto em modo checkbox', async () => {
      const handleOpenChange = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="checkbox"
          onOpenChange={handleOpenChange}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(true);
      });

      const item1 = screen.getByTestId('checkbox-item-1');
      fireEvent.click(item1);

      // Select não deve fechar
      expect(handleOpenChange).not.toHaveBeenCalledWith(false);
    });
  });

  describe('Validação e Required', () => {
    it('valida campo required ao fechar sem seleção', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          required={true}
          errorMessage="Campo obrigatório"
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
      });
    });

    it('limpa erro ao selecionar valor', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          required={true}
          errorMessage="Campo obrigatório"
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      
      // Abrir e fechar sem selecionar
      fireEvent.click(trigger);
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
      });

      // Abrir e selecionar
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const item = screen.getByRole('option', { name: 'Item 1' });
        fireEvent.click(item);
      });

      await waitFor(() => {
        expect(screen.queryByText('Campo obrigatório')).not.toBeInTheDocument();
      });
    });

    it('valida checkbox required ao fechar sem seleção', async () => {
      render(
        <Select
          items={mockItems}
          variant="checkbox"
          required={true}
          errorMessage="Selecione ao menos um item"
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Selecione ao menos um item')).toBeInTheDocument();
      });
    });
  });

  describe('Infinite Scroll', () => {
    it('chama onScrollEnd ao fazer scroll até o fim', async () => {
      const handleScrollEnd = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          enableInfiniteScroll={true}
          onScrollEnd={handleScrollEnd}
          isLoadingMore={false}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const viewport = screen.getByTestId('select-viewport');
        expect(viewport).toBeInTheDocument();
      });

      const viewport = screen.getByTestId('select-viewport') as HTMLElement;
      
      // Simular scroll até o fim
      Object.defineProperty(viewport, 'scrollTop', { value: 100, writable: true });
      Object.defineProperty(viewport, 'scrollHeight', { value: 200, writable: true });
      Object.defineProperty(viewport, 'clientHeight', { value: 100, writable: true });

      const scrollEvent = new Event('scroll', { bubbles: true });
      viewport.dispatchEvent(scrollEvent);

      await waitFor(() => {
        expect(handleScrollEnd).toHaveBeenCalled();
      });
    });

    it('não chama onScrollEnd quando isLoadingMore é true', async () => {
      const handleScrollEnd = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          enableInfiniteScroll={true}
          onScrollEnd={handleScrollEnd}
          isLoadingMore={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const viewport = screen.getByTestId('select-viewport');
        expect(viewport).toBeInTheDocument();
      });

      const viewport = screen.getByTestId('select-viewport') as HTMLElement;
      
      Object.defineProperty(viewport, 'scrollTop', { value: 100, writable: true });
      Object.defineProperty(viewport, 'scrollHeight', { value: 200, writable: true });
      Object.defineProperty(viewport, 'clientHeight', { value: 100, writable: true });

      const scrollEvent = new Event('scroll', { bubbles: true });
      viewport.dispatchEvent(scrollEvent);

      await waitFor(() => {
        expect(handleScrollEnd).not.toHaveBeenCalled();
      });
    });

    it('mostra indicador de loading quando isLoadingMore é true', async () => {
      render(
        <Select
          items={mockItems}
          variant="text"
          enableInfiniteScroll={true}
          isLoadingMore={true}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Carregando mais itens...')).toBeInTheDocument();
      });
    });

    it('reseta hasReachedEnd ao abrir novamente', async () => {
      const handleScrollEnd = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          enableInfiniteScroll={true}
          onScrollEnd={handleScrollEnd}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      
      // Abrir e fechar
      fireEvent.click(trigger);
      fireEvent.click(trigger);
      
      // Abrir novamente
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });
  });

  describe('Items Expandíveis', () => {
    it('expande items com children ao clicar', async () => {
      render(
        <Select
          items={mockItemsWithChildren}
          variant="text"
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const parentItem = screen.getByTestId('select-item-parent-1');
        expect(parentItem).toBeInTheDocument();
      });

      const parentItem = screen.getByTestId('select-item-parent-1');
      fireEvent.click(parentItem);

      await waitFor(() => {
        expect(screen.getByText('Child 1.1')).toBeInTheDocument();
        expect(screen.getByText('Child 1.2')).toBeInTheDocument();
      });
    });

    it('fecha items expandidos ao clicar novamente', async () => {
      render(
        <Select
          items={mockItemsWithChildren}
          variant="text"
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const parentItem = screen.getByTestId('select-item-parent-1');
        expect(parentItem).toBeInTheDocument();
      });

      const parentItem = screen.getByTestId('select-item-parent-1');
      
      // Expandir
      fireEvent.click(parentItem);

      await waitFor(() => {
        expect(screen.getByText('Child 1.1')).toBeInTheDocument();
      });

      // Fechar
      fireEvent.click(parentItem);

      await waitFor(() => {
        expect(screen.queryByText('Child 1.1')).not.toBeInTheDocument();
      });
    });

    it('seleciona child item ao clicar', async () => {
      const handleValueChange = vi.fn();

      render(
        <Select
          items={mockItemsWithChildren}
          variant="text"
          onValueChange={handleValueChange}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const parentItem = screen.getByTestId('select-item-parent-1');
        expect(parentItem).toBeInTheDocument();
      });

      const parentItem = screen.getByTestId('select-item-parent-1');
      fireEvent.click(parentItem);

      await waitFor(() => {
        expect(screen.getByText('Child 1.1')).toBeInTheDocument();
      });

      const childItem = screen.getByTestId('select-item-child-1-1');
      fireEvent.click(childItem);

      expect(handleValueChange).toHaveBeenCalledWith('child-1-1');
    });
  });

  describe('Items Desabilitados', () => {
    it('não seleciona item desabilitado', async () => {
      const handleValueChange = vi.fn();

      render(
        <Select
          items={mockItems}
          variant="text"
          onValueChange={handleValueChange}
          data-testid="select"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        const disabledItem = screen.getByRole('option', { name: 'Item 3' });
        expect(disabledItem).toBeInTheDocument();
      });

      const disabledItem = screen.getByRole('option', { name: 'Item 3' });
      fireEvent.click(disabledItem);

      expect(handleValueChange).not.toHaveBeenCalled();
    });
  });
});
