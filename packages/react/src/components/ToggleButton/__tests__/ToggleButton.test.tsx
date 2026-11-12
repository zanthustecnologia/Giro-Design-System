import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock radix-ui Toggle e ToggleGroup
vi.mock('radix-ui', () => {
  const React = require('react');

  const ToggleRoot = ({
    children,
    onPressedChange,
    pressed,
    defaultPressed,
    disabled,
    className,
    id,
    style,
    ...rest
  }: any) => {
    const [internalPressed, setInternalPressed] = React.useState(
      defaultPressed ?? false,
    );
    const isPressed = pressed !== undefined ? pressed : internalPressed;

    return (
      <button
        {...rest}
        id={id}
        style={style}
        className={className}
        disabled={disabled}
        aria-pressed={isPressed}
        data-state={isPressed ? 'on' : 'off'}
        onClick={() => {
          if (!disabled) {
            const next = !isPressed;
            setInternalPressed(next);
            onPressedChange?.(next);
          }
        }}
      >
        {children}
      </button>
    );
  };

  const ToggleGroupRoot = ({
    children,
    type,
    value,
    defaultValue,
    onValueChange,
    disabled,
    className,
    id,
    style,
    ...rest
  }: any) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? (type === 'multiple' ? [] : ''),
    );
    const currentValue = value !== undefined ? value : internalValue;

    const handleItemClick = (itemValue: string) => {
      if (disabled) return;
      if (type === 'multiple') {
        const arr = Array.isArray(currentValue) ? currentValue : [];
        const next = arr.includes(itemValue)
          ? arr.filter((v: string) => v !== itemValue)
          : [...arr, itemValue];
        setInternalValue(next);
        onValueChange?.(next);
      } else {
        const next = currentValue === itemValue ? '' : itemValue;
        setInternalValue(next);
        onValueChange?.(next);
      }
    };

    return (
      <div
        {...rest}
        id={id}
        style={style}
        className={className}
        role="group"
      >
        {React.Children.map(children, (child: any) =>
          child
            ? React.cloneElement(child, {
                _onItemClick: handleItemClick,
                _currentValue: currentValue,
                _groupDisabled: disabled,
                _groupType: type,
              })
            : child,
        )}
      </div>
    );
  };

  const ToggleGroupItem = ({
    children,
    value,
    disabled,
    _onItemClick,
    _currentValue,
    _groupDisabled,
    _groupType,
    className,
    style,
    ...rest
  }: any) => {
    const isDisabled = disabled || _groupDisabled;
    const isSelected =
      _groupType === 'multiple'
        ? Array.isArray(_currentValue) && _currentValue.includes(value)
        : _currentValue === value;

    return (
      <button
        {...rest}
        className={className}
        style={style}
        disabled={isDisabled}
        aria-pressed={isSelected}
        data-state={isSelected ? 'on' : 'off'}
        data-value={value}
        onClick={() => {
          if (!isDisabled && _onItemClick) {
            _onItemClick(value);
          }
        }}
      >
        {children}
      </button>
    );
  };

  return {
    Toggle: { Root: ToggleRoot },
    ToggleGroup: { Root: ToggleGroupRoot, Item: ToggleGroupItem },
  };
});

// Mock Tooltip para isolar o comportamento
vi.mock('../../Tooltip', () => {
  const React = require('react');
  return {
    default: ({ children, text }: { children: React.ReactNode; text: string }) => (
      <div data-testid="tooltip-wrapper" data-tooltip-text={text}>
        {children}
      </div>
    ),
  };
});

import ToggleButton from '../ToggleButton';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const items = [
  { value: 'bold', label: 'Negrito' },
  { value: 'italic', label: 'Itálico' },
  { value: 'underline', label: 'Sublinhado' },
];

// ---------------------------------------------------------------------------
// Testes
// ---------------------------------------------------------------------------

describe('ToggleButton', () => {
  // -------------------------------------------------------------------------
  // Modo padrão (simple)
  // -------------------------------------------------------------------------
  describe('modo simple (padrão)', () => {
    it('deve renderizar um botão toggle', () => {
      render(<ToggleButton label="Negrito" />);
      expect(screen.getByRole('button', { name: /negrito/i })).toBeInTheDocument();
    });

    it('deve exibir o label', () => {
      render(<ToggleButton label="Meu conteúdo" />);
      expect(screen.getByText('Meu conteúdo')).toBeInTheDocument();
    });

    it('deve ter aria-pressed=false por padrão', () => {
      render(<ToggleButton label="Toggle" />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    });

    it('deve refletir defaultPressed=true no estado inicial', () => {
      render(<ToggleButton defaultPressed label="Toggle" />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('deve refletir a prop pressed controlada', () => {
      const { rerender } = render(<ToggleButton pressed={false} label="Toggle" />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');

      rerender(<ToggleButton pressed={true} label="Toggle" />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('deve chamar onPressedChange ao clicar', () => {
      const onPressedChange = vi.fn();
      render(<ToggleButton onPressedChange={onPressedChange} label="Toggle" />);
      fireEvent.click(screen.getByRole('button'));
      expect(onPressedChange).toHaveBeenCalledWith(true);
    });

    it('deve chamar onPressedChange com false ao clicar novamente', () => {
      const onPressedChange = vi.fn();
      render(<ToggleButton defaultPressed onPressedChange={onPressedChange} label="Toggle" />);
      fireEvent.click(screen.getByRole('button'));
      expect(onPressedChange).toHaveBeenCalledWith(false);
    });

    it('não deve chamar onPressedChange quando desabilitado', () => {
      const onPressedChange = vi.fn();
      render(
        <ToggleButton disabled onPressedChange={onPressedChange} label="Toggle" />,
      );
      fireEvent.click(screen.getByRole('button'));
      expect(onPressedChange).not.toHaveBeenCalled();
    });

    it('deve renderizar desabilitado', () => {
      render(<ToggleButton disabled label="Toggle" />);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('deve aplicar id customizado', () => {
      render(<ToggleButton id="toggle-id" label="Toggle" />);
      expect(screen.getByRole('button')).toHaveAttribute('id', 'toggle-id');
    });

    it('deve aplicar className customizada', () => {
      render(<ToggleButton className="custom-class" label="Toggle" />);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('deve aplicar style customizado', () => {
      render(<ToggleButton style={{ color: 'red' }} label="Toggle" />);
      expect(screen.getByRole('button')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    });
  });

  // -------------------------------------------------------------------------
  // Tamanhos
  // -------------------------------------------------------------------------
  describe('tamanhos (modo simple)', () => {
    it('deve aplicar classe toggle-lg por padrão', () => {
      const { container } = render(<ToggleButton label="Toggle" />);
      expect(container.querySelector('[class*="toggle-lg"]')).toBeInTheDocument();
    });

    it('deve aplicar classe toggle-sm quando size="sm"', () => {
      const { container } = render(<ToggleButton size="sm" label="Toggle" />);
      expect(container.querySelector('[class*="toggle-sm"]')).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // Escala
  // -------------------------------------------------------------------------
  describe('escala (modo simple)', () => {
    it('deve aplicar --giro-scale: 1 por padrão', () => {
      render(<ToggleButton label="Toggle" />);
      const btn = screen.getByRole('button');
      expect(btn).toHaveAttribute('style', expect.stringContaining('--giro-scale: 1'));
    });

    it('deve aplicar --giro-scale: 1.5 quando scale={1.5}', () => {
      render(<ToggleButton scale={1.5} label="Toggle" />);
      const btn = screen.getByRole('button');
      expect(btn).toHaveAttribute('style', expect.stringContaining('--giro-scale: 1.5'));
    });

    it('deve aplicar --giro-scale: 2 quando scale={2}', () => {
      render(<ToggleButton scale={2} label="Toggle" />);
      const btn = screen.getByRole('button');
      expect(btn).toHaveAttribute('style', expect.stringContaining('--giro-scale: 2'));
    });
  });

  // -------------------------------------------------------------------------
  // Ícone (modo simple)
  // -------------------------------------------------------------------------
  describe('ícone (modo simple)', () => {
    it('deve renderizar ícone ao lado do label', () => {
      render(
        <ToggleButton icon={<svg data-testid="icon" />} label="Negrito" />,
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Negrito')).toBeInTheDocument();
    });

    it('deve aplicar classe toggleWithIcon quando há ícone e não é iconOnly', () => {
      const { container } = render(
        <ToggleButton icon={<svg data-testid="icon" />} label="Label" />,
      );
      expect(container.querySelector('[class*="toggleWithIcon"]')).toBeInTheDocument();
    });

    it('deve renderizar somente o ícone em modo iconOnly', () => {
      render(
        <ToggleButton icon={<svg data-testid="icon" />} iconOnly label="Negrito" />,
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.queryByText('Negrito')).not.toBeInTheDocument();
    });

    it('deve aplicar classe toggleIconOnly quando iconOnly=true', () => {
      const { container } = render(
        <ToggleButton icon={<svg />} iconOnly label="Label" />,
      );
      expect(container.querySelector('[class*="toggleIconOnly"]')).toBeInTheDocument();
    });

    it('deve envolver o ícone num span com aria-hidden em modo iconOnly', () => {
      render(
        <ToggleButton icon={<svg data-testid="icon" />} iconOnly label="Label" />,
      );
      const iconSpan = screen.getByTestId('icon').parentElement;
      expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
    });

    it('deve envolver o ícone num span com aria-hidden quando há ícone + label', () => {
      render(
        <ToggleButton icon={<svg data-testid="icon" />} label="Label" />,
      );
      const iconSpan = screen.getByTestId('icon').parentElement;
      expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // -------------------------------------------------------------------------
  // Tooltip (modo simple)
  // -------------------------------------------------------------------------
  describe('tooltip (modo simple)', () => {
    it('deve envolver o toggle em Tooltip quando tooltipText é fornecido', () => {
      render(<ToggleButton tooltipText="Dica" label="Toggle" />);
      expect(screen.getByTestId('tooltip-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('tooltip-wrapper')).toHaveAttribute(
        'data-tooltip-text',
        'Dica',
      );
    });

    it('não deve renderizar Tooltip quando tooltipText não é fornecido', () => {
      render(<ToggleButton label="Toggle" />);
      expect(screen.queryByTestId('tooltip-wrapper')).not.toBeInTheDocument();
    });

    it('o toggle deve ser filho do Tooltip', () => {
      render(<ToggleButton tooltipText="Dica" label="Toggle" />);
      const wrapper = screen.getByTestId('tooltip-wrapper');
      expect(wrapper.querySelector('button')).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // Modo combined (ToggleGroup)
  // -------------------------------------------------------------------------
  describe('modo combined', () => {
    it('deve renderizar um grupo (role="group")', () => {
      render(<ToggleButton mode="combined" items={items} />);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('deve renderizar todos os items', () => {
      render(<ToggleButton mode="combined" items={items} />);
      expect(screen.getByText('Negrito')).toBeInTheDocument();
      expect(screen.getByText('Itálico')).toBeInTheDocument();
      expect(screen.getByText('Sublinhado')).toBeInTheDocument();
    });

    it('deve renderizar o número correto de botões', () => {
      render(<ToggleButton mode="combined" items={items} />);
      expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    it('deve aplicar id no grupo', () => {
      render(<ToggleButton mode="combined" id="group-id" items={items} />);
      expect(screen.getByRole('group')).toHaveAttribute('id', 'group-id');
    });

    it('deve aplicar className no grupo', () => {
      render(
        <ToggleButton mode="combined" className="custom-group" items={items} />,
      );
      expect(screen.getByRole('group')).toHaveClass('custom-group');
    });

    it('deve aplicar --giro-scale no grupo', () => {
      render(<ToggleButton mode="combined" scale={1.5} items={items} />);
      expect(screen.getByRole('group')).toHaveAttribute(
        'style',
        expect.stringContaining('--giro-scale: 1.5'),
      );
    });
  });

  // -------------------------------------------------------------------------
  // ToggleGroup - seleção single
  // -------------------------------------------------------------------------
  describe('modo combined - seleção single', () => {
    it('deve ter todos os itens não selecionados inicialmente', () => {
      render(<ToggleButton mode="combined" items={items} />);
      screen.getAllByRole('button').forEach((btn) => {
        expect(btn).toHaveAttribute('aria-pressed', 'false');
      });
    });

    it('deve selecionar um item ao clicar', () => {
      const onValueChange = vi.fn();
      render(
        <ToggleButton
          mode="combined"
          items={items}
          onValueChange={onValueChange}
        />,
      );
      fireEvent.click(screen.getByText('Negrito'));
      expect(onValueChange).toHaveBeenCalledWith('bold');
    });

    it('deve desselecionar item ao clicar novamente (single)', () => {
      const onValueChange = vi.fn();
      render(
        <ToggleButton
          mode="combined"
          defaultValue="bold"
          items={items}
          onValueChange={onValueChange}
        />,
      );
      fireEvent.click(screen.getByText('Negrito'));
      expect(onValueChange).toHaveBeenCalledWith('');
    });

    it('deve refletir defaultValue no estado inicial', () => {
      render(
        <ToggleButton mode="combined" defaultValue="italic" items={items} />,
      );
      const italicBtn = screen.getByText('Itálico').closest('button');
      expect(italicBtn).toHaveAttribute('aria-pressed', 'true');
    });

    it('deve refletir value controlado', () => {
      render(
        <ToggleButton mode="combined" value="underline" items={items} />,
      );
      const underlineBtn = screen.getByText('Sublinhado').closest('button');
      expect(underlineBtn).toHaveAttribute('aria-pressed', 'true');
    });
  });

  // -------------------------------------------------------------------------
  // ToggleGroup - requireSelection (seleção única sempre com um item marcado)
  // -------------------------------------------------------------------------
  describe('modo combined - requireSelection', () => {
    it('não deve desmarcar o item ativo ao clicar nele novamente (não controlado)', () => {
      const onValueChange = vi.fn();
      render(
        <ToggleButton
          mode="combined"
          defaultValue="bold"
          requireSelection
          items={items}
          onValueChange={onValueChange}
        />,
      );
      const boldBtn = screen.getByText('Negrito').closest('button');
      fireEvent.click(boldBtn!);
      expect(boldBtn).toHaveAttribute('aria-pressed', 'true');
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('não deve desmarcar o item ativo ao clicar nele novamente (controlado)', () => {
      const onValueChange = vi.fn();
      render(
        <ToggleButton
          mode="combined"
          value="bold"
          requireSelection
          items={items}
          onValueChange={onValueChange}
        />,
      );
      const boldBtn = screen.getByText('Negrito').closest('button');
      fireEvent.click(boldBtn!);
      expect(boldBtn).toHaveAttribute('aria-pressed', 'true');
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('deve permitir trocar para outro item normalmente', () => {
      const onValueChange = vi.fn();
      render(
        <ToggleButton
          mode="combined"
          defaultValue="bold"
          requireSelection
          items={items}
          onValueChange={onValueChange}
        />,
      );
      fireEvent.click(screen.getByText('Itálico'));
      expect(onValueChange).toHaveBeenCalledWith('italic');
      expect(screen.getByText('Itálico').closest('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('deve permitir desmarcar quando requireSelection=false (padrão)', () => {
      const onValueChange = vi.fn();
      render(
        <ToggleButton
          mode="combined"
          defaultValue="bold"
          items={items}
          onValueChange={onValueChange}
        />,
      );
      fireEvent.click(screen.getByText('Negrito'));
      expect(onValueChange).toHaveBeenCalledWith('');
    });
  });

  // -------------------------------------------------------------------------
  // ToggleGroup - seleção multiple
  // -------------------------------------------------------------------------
  describe('modo combined - seleção multiple', () => {
    it('deve selecionar múltiplos itens ao clicar', () => {
      const onValueChange = vi.fn();
      render(
        <ToggleButton
          mode="combined"
          selectionType="multiple"
          items={items}
          onValueChange={onValueChange}
        />,
      );
      fireEvent.click(screen.getByText('Negrito'));
      expect(onValueChange).toHaveBeenCalledWith(['bold']);

      fireEvent.click(screen.getByText('Itálico'));
      expect(onValueChange).toHaveBeenCalledWith(['bold', 'italic']);
    });

    it('deve desselecionar item ao clicar novamente em seleção multiple', () => {
      const onValueChange = vi.fn();
      render(
        <ToggleButton
          mode="combined"
          selectionType="multiple"
          defaultValue={['bold', 'italic']}
          items={items}
          onValueChange={onValueChange}
        />,
      );
      fireEvent.click(screen.getByText('Negrito'));
      expect(onValueChange).toHaveBeenCalledWith(['italic']);
    });

    it('deve refletir defaultValue array no estado inicial', () => {
      render(
        <ToggleButton
          mode="combined"
          selectionType="multiple"
          defaultValue={['bold', 'italic']}
          items={items}
        />,
      );
      expect(screen.getByText('Negrito').closest('button')).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByText('Itálico').closest('button')).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByText('Sublinhado').closest('button')).toHaveAttribute('aria-pressed', 'false');
    });

    it('deve refletir value array controlado', () => {
      render(
        <ToggleButton
          mode="combined"
          selectionType="multiple"
          value={['bold', 'underline']}
          items={items}
        />,
      );
      expect(screen.getByText('Negrito').closest('button')).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByText('Itálico').closest('button')).toHaveAttribute('aria-pressed', 'false');
      expect(screen.getByText('Sublinhado').closest('button')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  // -------------------------------------------------------------------------
  // ToggleGroup - disabled
  // -------------------------------------------------------------------------
  describe('modo combined - disabled', () => {
    it('não deve chamar onValueChange quando o grupo está desabilitado', () => {
      const onValueChange = vi.fn();
      render(
        <ToggleButton
          mode="combined"
          disabled
          items={items}
          onValueChange={onValueChange}
        />,
      );
      fireEvent.click(screen.getByText('Negrito'));
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('deve desabilitar item individual', () => {
      const disabledItems = [
        { value: 'bold', label: 'Negrito', disabled: true },
        { value: 'italic', label: 'Itálico' },
      ];
      render(<ToggleButton mode="combined" items={disabledItems} />);
      expect(screen.getByText('Negrito').closest('button')).toBeDisabled();
      expect(screen.getByText('Itálico').closest('button')).not.toBeDisabled();
    });

    it('não deve selecionar item desabilitado ao clicar', () => {
      const onValueChange = vi.fn();
      const disabledItems = [{ value: 'bold', label: 'Negrito', disabled: true }];
      render(
        <ToggleButton
          mode="combined"
          items={disabledItems}
          onValueChange={onValueChange}
        />,
      );
      fireEvent.click(screen.getByText('Negrito'));
      expect(onValueChange).not.toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------------------------
  // ToggleGroup - itens com ícone
  // -------------------------------------------------------------------------
  describe('modo combined - itens com ícone', () => {
    it('deve renderizar ícone e label no item', () => {
      const iconItems = [
        { value: 'bold', label: 'Negrito', icon: <svg data-testid="icon-bold" /> },
      ];
      render(<ToggleButton mode="combined" items={iconItems} />);
      expect(screen.getByTestId('icon-bold')).toBeInTheDocument();
      expect(screen.getByText('Negrito')).toBeInTheDocument();
    });

    it('deve renderizar somente ícone em item iconOnly', () => {
      const iconItems = [
        {
          value: 'bold',
          label: 'Negrito',
          icon: <svg data-testid="icon-bold" />,
          iconOnly: true,
        },
      ];
      render(<ToggleButton mode="combined" items={iconItems} />);
      expect(screen.getByTestId('icon-bold')).toBeInTheDocument();
      expect(screen.queryByText('Negrito')).not.toBeInTheDocument();
    });

    it('deve aplicar classe toggleWithIcon no item com ícone', () => {
      const iconItems = [
        { value: 'bold', label: 'Negrito', icon: <svg data-testid="icon" /> },
      ];
      const { container } = render(
        <ToggleButton mode="combined" items={iconItems} />,
      );
      expect(container.querySelector('[class*="toggleWithIcon"]')).toBeInTheDocument();
    });

    it('deve aplicar classe toggleIconOnly no item iconOnly', () => {
      const iconItems = [
        {
          value: 'bold',
          label: 'Negrito',
          icon: <svg />,
          iconOnly: true,
        },
      ];
      const { container } = render(
        <ToggleButton mode="combined" items={iconItems} />,
      );
      expect(container.querySelector('[class*="toggleIconOnly"]')).toBeInTheDocument();
    });

    it('deve envolver o ícone num span com aria-hidden', () => {
      const iconItems = [
        { value: 'bold', label: 'Negrito', icon: <svg data-testid="icon-bold" /> },
      ];
      render(<ToggleButton mode="combined" items={iconItems} />);
      const iconSpan = screen.getByTestId('icon-bold').parentElement;
      expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // -------------------------------------------------------------------------
  // ToggleGroup - tamanhos dos itens
  // -------------------------------------------------------------------------
  describe('modo combined - tamanhos dos itens', () => {
    it('deve aplicar classe item-lg por padrão nos itens', () => {
      const { container } = render(
        <ToggleButton mode="combined" items={items} />,
      );
      expect(container.querySelector('[class*="item-lg"]')).toBeInTheDocument();
    });

    it('deve aplicar classe item-sm quando size="sm"', () => {
      const { container } = render(
        <ToggleButton mode="combined" size="sm" items={items} />,
      );
      expect(container.querySelector('[class*="item-sm"]')).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // Tooltip (modo combined)
  // -------------------------------------------------------------------------
  describe('tooltip (modo combined)', () => {
    it('deve envolver o grupo em Tooltip quando tooltipText é fornecido', () => {
      render(
        <ToggleButton mode="combined" items={items} tooltipText="Dica do grupo" />,
      );
      expect(screen.getByTestId('tooltip-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('tooltip-wrapper')).toHaveAttribute(
        'data-tooltip-text',
        'Dica do grupo',
      );
    });

    it('não deve renderizar Tooltip quando tooltipText não é fornecido no modo combined', () => {
      render(<ToggleButton mode="combined" items={items} />);
      expect(screen.queryByTestId('tooltip-wrapper')).not.toBeInTheDocument();
    });
  });
});
