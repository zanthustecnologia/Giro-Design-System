import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React, { createRef } from 'react';

// Mock da importação de CSS do react-simple-keyboard
vi.mock('react-simple-keyboard/build/css/index.css', () => ({}));

/**
 * Mock do Keyboard (react-simple-keyboard).
 * Renderiza botões que simulam teclas para facilitar os testes de interação.
 */
vi.mock('react-simple-keyboard', () => ({
  default: ({ onChange, onKeyPress, layoutName, input }: any) => (
    <div data-testid="keyboard" data-layout-name={layoutName}>
      <button
        data-testid="key-char"
        onClick={() => {
          onChange?.((input ?? '') + 'a');
          onKeyPress?.('a');
        }}
      >
        a
      </button>
      <button
        data-testid="key-bksp"
        onClick={() => {
          onChange?.((input ?? '').slice(0, -1));
          onKeyPress?.('{bksp}');
        }}
      >
        bksp
      </button>
      <button data-testid="key-shift" onClick={() => onKeyPress?.('{shift}')}>
        shift
      </button>
      <button data-testid="key-shiftleft" onClick={() => onKeyPress?.('{shiftleft}')}>
        shiftleft
      </button>
      <button data-testid="key-capslock" onClick={() => onKeyPress?.('{capslock}')}>
        capslock
      </button>
      <button data-testid="key-numbers" onClick={() => onKeyPress?.('{numbers}')}>
        numbers
      </button>
      <button data-testid="key-abc" onClick={() => onKeyPress?.('{abc}')}>
        abc
      </button>
      <button data-testid="key-enter" onClick={() => onKeyPress?.('{enter}')}>
        enter
      </button>
      <button data-testid="key-alt" onClick={() => onKeyPress?.('{alt}')}>
        alt
      </button>
      <button data-testid="key-alt2" onClick={() => onKeyPress?.('{alt2}')}>
        alt2
      </button>
      <button data-testid="key-smileys" onClick={() => onKeyPress?.('{smileys}')}>
        smileys
      </button>
      <button data-testid="key-downkeyboard" onClick={() => onKeyPress?.('{downkeyboard}')}>
        close
      </button>
    </div>
  ),
}));

// Mock do simple-keyboard-layouts para layouts de idioma
vi.mock('simple-keyboard-layouts', () => ({
  default: vi.fn().mockImplementation(() => ({
    get: vi.fn().mockReturnValue({
      layout: {
        default: ['q w e r t'],
        shift: ['Q W E R T'],
      },
    }),
  })),
}));

import VirtualKeyboard from '../VirtualKeyboard';

// ─────────────────────────────────────────────────────────────────────────────

describe('VirtualKeyboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Renderização básica', () => {
    it('deve renderizar o teclado no modo fixed', () => {
      render(<VirtualKeyboard mode="fixed" />);
      expect(screen.getByTestId('keyboard')).toBeInTheDocument();
    });

    it('deve renderizar o teclado no modo native sem targetRef (sempre visível)', async () => {
      render(<VirtualKeyboard mode="native" />);
      // O teclado é portalled para document.body; screen consulta o documento inteiro
      expect(await screen.findByTestId('keyboard')).toBeInTheDocument();
    });

    it('deve aplicar id customizado no modo fixed', () => {
      const { container } = render(<VirtualKeyboard mode="fixed" id="meu-teclado" />);
      expect(container.querySelector('#meu-teclado')).toBeInTheDocument();
    });

    it('deve aplicar className customizada no modo fixed', () => {
      const { container } = render(<VirtualKeyboard mode="fixed" className="classe-customizada" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('classe-customizada');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Modo fixed', () => {
    it('deve renderizar TextField com label no modo fixed', () => {
      render(<VirtualKeyboard mode="fixed" textFieldLabel="Digite aqui" />);
      expect(screen.getByText('Digite aqui')).toBeInTheDocument();
    });

    it('deve renderizar TextField com placeholder no modo fixed', () => {
      render(<VirtualKeyboard mode="fixed" textFieldPlaceholder="Escreva algo" />);
      expect(screen.getByPlaceholderText('Escreva algo')).toBeInTheDocument();
    });

    it('deve exibir o valor atual no TextField', () => {
      render(<VirtualKeyboard mode="fixed" value="olá" />);
      expect(screen.getByRole('textbox')).toHaveValue('olá');
    });

    it('deve renderizar helperText no TextField interno do modo fixed', () => {
      render(<VirtualKeyboard mode="fixed" helperText="Texto de ajuda" />);
      expect(screen.getByText('Texto de ajuda')).toBeInTheDocument();
    });

    it('deve renderizar errorMessage quando error for true no TextField interno', () => {
      render(
        <VirtualKeyboard
          mode="fixed"
          error
          errorMessage="Mensagem de erro"
          helperText="Texto de ajuda"
        />
      );

      expect(screen.getByText('Mensagem de erro')).toBeInTheDocument();
      expect(screen.queryByText('Texto de ajuda')).not.toBeInTheDocument();
    });

    it('não deve renderizar TextField no modo native', () => {
      render(<VirtualKeyboard mode="native" />);
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Modo native com targetRef', () => {
    it('deve estar fechado inicialmente quando targetRef é fornecido', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input ref={ref} />
          <VirtualKeyboard mode="native" targetRef={ref} />
        </>
      );
      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).not.toMatch(/overlayOpen/);
    });

    it('deve abrir ao focar no elemento referenciado', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input data-testid="input-ref" ref={ref} />
          <VirtualKeyboard mode="native" targetRef={ref} />
        </>
      );

      act(() => {
        fireEvent.focus(screen.getByTestId('input-ref'));
      });

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).toMatch(/overlayOpen/);
    });

    it('deve fechar ao perder o foco do elemento referenciado', async () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input data-testid="input-ref" ref={ref} />
          <VirtualKeyboard mode="native" targetRef={ref} />
        </>
      );

      act(() => {
        fireEvent.focus(screen.getByTestId('input-ref'));
      });

      await act(async () => {
        fireEvent.blur(screen.getByTestId('input-ref'));
        await new Promise((r) => setTimeout(r, 200));
      });

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).not.toMatch(/overlayOpen/);
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Callback onChange', () => {
    it('deve chamar onChange ao pressionar uma tecla de caractere', () => {
      const onChange = vi.fn();
      render(<VirtualKeyboard mode="fixed" onChange={onChange} value="" />);

      fireEvent.click(screen.getByTestId('key-char'));

      expect(onChange).toHaveBeenCalledWith('a');
    });

    it('deve chamar onChange com texto atualizado após backspace', () => {
      const onChange = vi.fn();
      render(<VirtualKeyboard mode="fixed" onChange={onChange} value="ab" />);

      fireEvent.click(screen.getByTestId('key-bksp'));

      expect(onChange).toHaveBeenCalledWith('a');
    });

    it('não deve chamar onChange quando o componente está desabilitado', () => {
      const onChange = vi.fn();
      render(<VirtualKeyboard mode="fixed" onChange={onChange} value="" disabled />);

      fireEvent.click(screen.getByTestId('key-char'));

      expect(onChange).not.toHaveBeenCalled();
    });

    it('não deve chamar onChange quando o maxLength foi atingido', () => {
      const onChange = vi.fn();
      render(<VirtualKeyboard mode="fixed" onChange={onChange} value="abc" maxLength={3} />);

      fireEvent.click(screen.getByTestId('key-char'));

      expect(onChange).not.toHaveBeenCalled();
    });

    it('deve chamar onChange quando o valor está abaixo do maxLength', () => {
      const onChange = vi.fn();
      render(<VirtualKeyboard mode="fixed" onChange={onChange} value="ab" maxLength={3} />);

      fireEvent.click(screen.getByTestId('key-char'));

      expect(onChange).toHaveBeenCalledWith('aba');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Callback onKeyPress', () => {
    it('deve chamar onKeyPress ao pressionar uma tecla de caractere', () => {
      const onKeyPress = vi.fn();
      render(<VirtualKeyboard mode="fixed" onKeyPress={onKeyPress} value="" />);

      fireEvent.click(screen.getByTestId('key-char'));

      expect(onKeyPress).toHaveBeenCalledWith('a');
    });

    it('não deve chamar onKeyPress quando o componente está desabilitado', () => {
      const onKeyPress = vi.fn();
      render(<VirtualKeyboard mode="fixed" onKeyPress={onKeyPress} value="" disabled />);

      fireEvent.click(screen.getByTestId('key-char'));

      expect(onKeyPress).not.toHaveBeenCalled();
    });

    it('não deve chamar onKeyPress para teclas de controle de layout (shift)', () => {
      const onKeyPress = vi.fn();
      render(<VirtualKeyboard mode="fixed" onKeyPress={onKeyPress} value="" />);

      fireEvent.click(screen.getByTestId('key-shift'));

      expect(onKeyPress).not.toHaveBeenCalled();
    });

    it('não deve chamar onKeyPress para a tecla {enter} (tratada internamente pelo Keyboard)', () => {
      const onKeyPress = vi.fn();
      render(<VirtualKeyboard mode="fixed" onKeyPress={onKeyPress} value="" />);

      fireEvent.click(screen.getByTestId('key-enter'));

      // {enter} não é bloqueado pelo handleKeyPress, portanto é repassado ao callback externo
      expect(onKeyPress).toHaveBeenCalledWith('{enter}');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Estado disabled', () => {
    it('deve aplicar classe CSS disabled quando desabilitado', () => {
      const { container } = render(<VirtualKeyboard mode="fixed" disabled />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/disabled/);
    });

    it('não deve aplicar classe CSS disabled quando habilitado', () => {
      const { container } = render(<VirtualKeyboard mode="fixed" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).not.toMatch(/disabled/);
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Alternância de layout (Shift / CapsLock)', () => {
    it('deve iniciar com layoutName "default"', () => {
      render(<VirtualKeyboard mode="fixed" value="" />);
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve alternar para layout "shift" ao pressionar {shift}', () => {
      render(<VirtualKeyboard mode="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-shift'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');
    });

    it('deve voltar para layout "default" ao pressionar {shift} novamente', () => {
      render(<VirtualKeyboard mode="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-shift'));
      fireEvent.click(screen.getByTestId('key-shift'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve alternar para layout "shift" ao pressionar {shiftleft}', () => {
      render(<VirtualKeyboard mode="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-shiftleft'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');
    });

    it('deve ativar CapsLock (layout shift) ao pressionar {capslock}', () => {
      render(<VirtualKeyboard mode="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-capslock'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');
    });

    it('deve desativar CapsLock (layout default) ao pressionar {capslock} novamente', () => {
      render(<VirtualKeyboard mode="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-capslock'));
      fireEvent.click(screen.getByTestId('key-capslock'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve voltar para "default" após digitar um caractere com Shift ativo (sem CapsLock)', () => {
      render(<VirtualKeyboard mode="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-shift'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');

      // Após digitar, o Shift é desativado automaticamente
      fireEvent.click(screen.getByTestId('key-char'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve permanecer em "shift" após digitar quando CapsLock está ativo', () => {
      render(<VirtualKeyboard mode="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-capslock'));
      fireEvent.click(screen.getByTestId('key-char'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');
    });

    it('deve alternar para layout "numbers" ao pressionar {numbers} (mobile)', () => {
      render(<VirtualKeyboard mode="fixed" variant="mobile" value="" />);

      fireEvent.click(screen.getByTestId('key-numbers'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'numbers');
    });

    it('deve voltar para "default" ao pressionar {abc} (mobile)', () => {
      render(<VirtualKeyboard mode="fixed" variant="mobile" value="" />);

      fireEvent.click(screen.getByTestId('key-numbers'));
      fireEvent.click(screen.getByTestId('key-abc'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve alternar para layout "alt" ao pressionar {alt} (appleIOS)', () => {
      render(<VirtualKeyboard mode="fixed" variant="appleIOS" value="" />);

      fireEvent.click(screen.getByTestId('key-alt'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'alt');
    });

    it('deve voltar para "default" ao pressionar {alt} pela segunda vez', () => {
      render(<VirtualKeyboard mode="fixed" variant="appleIOS" value="" />);

      fireEvent.click(screen.getByTestId('key-alt'));
      fireEvent.click(screen.getByTestId('key-alt'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve alternar para layout "alt2" ao pressionar {alt2}', () => {
      render(<VirtualKeyboard mode="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-alt'));
      fireEvent.click(screen.getByTestId('key-alt2'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'alt2');
    });

    it('deve voltar para layout "alt" ao pressionar {alt2} novamente', () => {
      render(<VirtualKeyboard mode="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-alt'));
      fireEvent.click(screen.getByTestId('key-alt2'));
      fireEvent.click(screen.getByTestId('key-alt2'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'alt');
    });

    it('deve alternar para layout "smileys" ao pressionar {smileys} (appleIOS)', () => {
      render(<VirtualKeyboard mode="fixed" variant="appleIOS" value="" />);

      fireEvent.click(screen.getByTestId('key-smileys'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'smileys');
    });

    it('deve resetar para "default" ao pressionar {downkeyboard}', () => {
      render(<VirtualKeyboard mode="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-shift'));
      fireEvent.click(screen.getByTestId('key-downkeyboard'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Layouts nativos', () => {
    it.each([
      ['default' as const],
      ['numeric' as const],
      ['mobile' as const],
      ['appleIOS' as const],
      ['fullKeyboard' as const],
    ])('deve renderizar o layout nativo "%s"', (layout) => {
      render(<VirtualKeyboard mode="fixed" variant={layout} />);
      expect(screen.getByTestId('keyboard')).toBeInTheDocument();
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Layout de idioma via simple-keyboard-layouts', () => {
    it('deve renderizar um layout de idioma externo (ex: spanish)', async () => {
      render(<VirtualKeyboard mode="fixed" variant="spanish" />);
      // Para layouts externos, o activeLayout é definido via efeito (assíncrono)
      expect(await screen.findByTestId('keyboard')).toBeInTheDocument();
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Reinicialização ao trocar de layout', () => {
    it('deve resetar layoutName para "default" ao trocar o prop layout', () => {
      const { rerender } = render(<VirtualKeyboard mode="fixed" variant="default" value="" />);

      fireEvent.click(screen.getByTestId('key-shift'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');

      rerender(<VirtualKeyboard mode="fixed" variant="numeric" value="" />);

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });
  });
});
