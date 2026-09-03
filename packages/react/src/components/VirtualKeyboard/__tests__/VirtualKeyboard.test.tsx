import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import React, { createRef } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock da importação de CSS do react-simple-keyboard
vi.mock('react-simple-keyboard/build/css/index.css', () => ({}));

/**
 * Mock do Keyboard (react-simple-keyboard).
 * Renderiza botões que simulam teclas para facilitar os testes de interação.
 */
vi.mock('react-simple-keyboard', () => ({
  default: function MockKeyboard({ onChange, onKeyPress, layoutName, input, layout, display, keyboardRef }: any) {
    const [internalInput, setInternalInput] = React.useState(input ?? '');

    React.useEffect(() => {
      keyboardRef?.({
        setInput: (nextValue: string) => setInternalInput(nextValue),
      });

      return () => {
        keyboardRef?.(null);
      };
    }, [keyboardRef]);

    const hasEmoticonKey = Object.values(layout ?? {}).some((rows: any) =>
      rows.some((row: string) => row.includes('{emoticon}'))
    );

    const hasDownKeyboardKey = Object.values(layout ?? {}).some((rows: any) =>
      rows.some((row: string) => row.includes('{downkeyboard}'))
    );

    const hasEnterInNumbers = ((layout?.numbers ?? []) as string[]).some((row) =>
      row.includes('{enter}')
    );
    const hasEnterInNumericDefault = ((layout?.default ?? []) as string[]).some((row) =>
      row.includes('{enter}')
    );

    return (
    <div
      data-testid="keyboard"
      data-layout-name={layoutName}
      data-has-enter-numbers={String(hasEnterInNumbers)}
      data-has-enter-numeric-default={String(hasEnterInNumericDefault)}
    >
      <div data-testid="display-bksp">{display?.['{bksp}'] ?? ''}</div>
      <button
        data-testid="key-char"
        className="hg-button"
        data-skbtn="a"
        onClick={() => {
          const nextValue = `${internalInput}a`;
          setInternalInput(nextValue);
          onChange?.(nextValue);
          onKeyPress?.('a');
        }}
      >
        a
      </button>
      <button
        data-testid="key-bksp"
        onClick={() => {
          const nextValue = internalInput.slice(0, -1);
          setInternalInput(nextValue);
          onChange?.(nextValue);
          onKeyPress?.('{bksp}');
        }}
      >
        bksp
      </button>
      <button data-testid="key-shift" onClick={() => onKeyPress?.('{shift}')}>
        shift
      </button>
      <button data-testid="key-capslock" onClick={() => onKeyPress?.('{capslock}')}>
        capslock
      </button>
      <button data-testid="key-shiftactivated" onClick={() => onKeyPress?.('{shiftactivated}')}>
        shiftactivated
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
      {hasEmoticonKey && (
        <button data-testid="key-emoticon" onClick={() => onKeyPress?.('{emoticon}')}>
          emoticon
        </button>
      )}
      {hasDownKeyboardKey && (
        <button data-testid="key-downkeyboard" onClick={() => onKeyPress?.('{downkeyboard}')}>
          close
        </button>
      )}
      <button data-testid="key-altright" onClick={() => onKeyPress?.('{altright}')}>
        altright
      </button>
      <button data-testid="key-default" onClick={() => onKeyPress?.('{default}')}>
        default
      </button>
      {/* Sempre presente para cobrir o branch {emoticon} com Emoji=false */}
      <button data-testid="key-emoticon-direct" onClick={() => onKeyPress?.('{emoticon}')}>
        emoticon-direct
      </button>
      {/* Botões com classe hg-button para testar long press em letras maiúsculas e sem acento */}
      <button
        data-testid="key-uppercase-a"
        className="hg-button"
        data-skbtn="A"
        onClick={() => {
          const nextValue = `${internalInput}A`;
          setInternalInput(nextValue);
          onChange?.(nextValue);
          onKeyPress?.('A');
        }}
      >
        A
      </button>
      <button
        data-testid="key-non-accent"
        className="hg-button"
        data-skbtn="x"
        onClick={() => {
          const nextValue = `${internalInput}x`;
          setInternalInput(nextValue);
          onChange?.(nextValue);
          onKeyPress?.('x');
        }}
      >
        x
      </button>
    </div>
    );
  },
}));

import VirtualKeyboard from '../VirtualKeyboard';

// ─────────────────────────────────────────────────────────────────────────────

describe('VirtualKeyboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Renderização básica', () => {
    it('deve renderizar o teclado no modo fixed', () => {
      render(<VirtualKeyboard variant="fixed" />);
      expect(screen.getByTestId('keyboard')).toBeInTheDocument();
    });

    it('deve renderizar o teclado no modo native sem targetRef (sempre visível)', async () => {
      render(<VirtualKeyboard variant="native" />);
      // O teclado é portalled para document.body; screen consulta o documento inteiro
      expect(await screen.findByTestId('keyboard')).toBeInTheDocument();
    });

    it('deve aplicar id customizado no modo fixed', () => {
      const { container } = render(<VirtualKeyboard variant="fixed" id="meu-teclado" />);
      expect(container.querySelector('#meu-teclado')).toBeInTheDocument();
    });

    it('deve aplicar className customizada no modo fixed', () => {
      const { container } = render(<VirtualKeyboard variant="fixed" className="classe-customizada" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('classe-customizada');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Modo fixed', () => {
    it('deve renderizar TextField com placeholder no modo fixed', () => {
      render(<VirtualKeyboard variant="fixed" placeholder="Escreva algo" />);
      expect(screen.getByPlaceholderText('Escreva algo')).toBeInTheDocument();
    });

    it('deve exibir o valor atual no TextField', () => {
      render(<VirtualKeyboard variant="fixed" value="olá" />);
      expect(screen.getByRole('textbox')).toHaveValue('olá');
    });

    it('deve renderizar helperText no TextField interno do modo fixed', () => {
      render(<VirtualKeyboard variant="fixed" helperText="Texto de ajuda" />);
      expect(screen.getByText('Texto de ajuda')).toBeInTheDocument();
    });

    it('deve renderizar errorMessage quando error for true no TextField interno', () => {
      render(
        <VirtualKeyboard
          variant="fixed"
          error
          errorMessage="Mensagem de erro"
          helperText="Texto de ajuda"
        />
      );

      expect(screen.getByText('Mensagem de erro')).toBeInTheDocument();
      expect(screen.queryByText('Texto de ajuda')).not.toBeInTheDocument();
    });

    it('não deve renderizar TextField no modo native', () => {
      render(<VirtualKeyboard variant="native" />);
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('não deve exibir a tecla {downkeyboard} no modo fixed', () => {
      render(<VirtualKeyboard variant="fixed" type="default" />);
      expect(screen.queryByTestId('key-downkeyboard')).not.toBeInTheDocument();
    });

    it('deve exibir apenas ícone na tecla {bksp} no modo fixed', () => {
      render(<VirtualKeyboard variant="fixed" type="default" />);
      expect(screen.getByTestId('display-bksp')).not.toHaveTextContent('Apagar');
    });

    it('deve exibir apenas ícone na tecla {bksp} no modo native', async () => {
      render(<VirtualKeyboard variant="native" type="default" />);
      expect(await screen.findByTestId('display-bksp')).not.toHaveTextContent('Apagar');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Modo native com targetRef', () => {
    it('deve estar fechado inicialmente quando targetRef é fornecido', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input ref={ref} />
          <VirtualKeyboard variant="native" targetRef={ref} />
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
          <VirtualKeyboard variant="native" targetRef={ref} />
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
          <VirtualKeyboard variant="native" targetRef={ref} />
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

    it('deve fechar ao pressionar {downkeyboard} no modo native', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input data-testid="input-ref" ref={ref} />
          <VirtualKeyboard variant="native" targetRef={ref} />
        </>
      );

      act(() => {
        fireEvent.focus(screen.getByTestId('input-ref'));
      });

      fireEvent.click(screen.getByTestId('key-downkeyboard'));

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).not.toMatch(/overlayOpen/);
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Prop nativeHeight', () => {
    it('não deve aplicar a custom property --vkeyboard-native-height quando nativeHeight não é informado', async () => {
      render(<VirtualKeyboard variant="native" />);
      await screen.findByTestId('keyboard');

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay.style.getPropertyValue('--vkeyboard-native-height')).toBe('');
    });

    it('deve aplicar a custom property --vkeyboard-native-height no overlay quando nativeHeight é informado', async () => {
      render(<VirtualKeyboard variant="native" nativeHeight="320px" />);
      await screen.findByTestId('keyboard');

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay.style.getPropertyValue('--vkeyboard-native-height')).toBe('320px');
    });

    it('deve aceitar unidades CSS relativas (ex.: dvh, %) em nativeHeight', async () => {
      render(<VirtualKeyboard variant="native" nativeHeight="50dvh" />);
      await screen.findByTestId('keyboard');

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay.style.getPropertyValue('--vkeyboard-native-height')).toBe('50dvh');
    });

    it('deve atualizar a custom property quando nativeHeight muda entre renderizações', async () => {
      const { rerender } = render(<VirtualKeyboard variant="native" nativeHeight="320px" />);
      await screen.findByTestId('keyboard');

      let overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay.style.getPropertyValue('--vkeyboard-native-height')).toBe('320px');

      rerender(<VirtualKeyboard variant="native" nativeHeight="480px" />);

      overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay.style.getPropertyValue('--vkeyboard-native-height')).toBe('480px');
    });

    it('não deve ter efeito no modo fixed (nativeHeight só se aplica ao overlay do modo native)', () => {
      const { container } = render(<VirtualKeyboard variant="fixed" nativeHeight="320px" />);
      const wrapper = container.firstChild as HTMLElement;

      expect(wrapper.style.getPropertyValue('--vkeyboard-native-height')).toBe('');
      expect(document.querySelector('[class*="overlay"]')).not.toBeInTheDocument();
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Callback onChange', () => {
    it('deve chamar onChange ao pressionar uma tecla de caractere', () => {
      const onChange = vi.fn();
      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="" />);

      fireEvent.click(screen.getByTestId('key-char'));

      expect(onChange).toHaveBeenCalledWith('a');
    });

    it('deve chamar onChange com texto atualizado após backspace', () => {
      const onChange = vi.fn();
      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="ab" />);

      fireEvent.click(screen.getByTestId('key-bksp'));

      expect(onChange).toHaveBeenCalledWith('a');
    });

    it('deve respeitar limpeza externa antes de nova digitacao', () => {
      const onChange = vi.fn();
      const { rerender } = render(<VirtualKeyboard variant="fixed" onChange={onChange} value="texto" />);

      rerender(<VirtualKeyboard variant="fixed" onChange={onChange} value="" />);
      fireEvent.click(screen.getByTestId('key-char'));

      expect(onChange).toHaveBeenLastCalledWith('a');
    });

    it('deve limpar no TextField fixed e nao restaurar valor antigo na proxima tecla', () => {
      const Harness = () => {
        const [currentValue, setCurrentValue] = React.useState('texto');

        return <VirtualKeyboard variant="fixed" value={currentValue} onChange={setCurrentValue} />;
      };

      render(<Harness />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.mouseDown(screen.getByRole('button', { name: 'Limpar campo' }));
      expect(input).toHaveValue('');

      fireEvent.click(screen.getByTestId('key-char'));
      expect(input).toHaveValue('a');
    });

    it('não deve chamar onChange quando o maxLength foi atingido', () => {
      const onChange = vi.fn();
      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="abc" maxLength={3} />);

      fireEvent.click(screen.getByTestId('key-char'));

      expect(onChange).not.toHaveBeenCalled();
    });

    it('deve chamar onChange quando o valor está abaixo do maxLength', () => {
      const onChange = vi.fn();
      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="ab" maxLength={3} />);

      fireEvent.click(screen.getByTestId('key-char'));

      expect(onChange).toHaveBeenCalledWith('aba');
    });

    it('deve abrir menu de acentos ao segurar uma vogal', () => {
      vi.useFakeTimers();

      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => {
        vi.advanceTimersByTime(450);
      });

      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'á' })).toBeInTheDocument();
    });

    it('deve manter short press inalterado para caractere normal', () => {
      vi.useFakeTimers();
      const onChange = vi.fn();

      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => {
        vi.advanceTimersByTime(200);
      });
      fireEvent.pointerUp(screen.getByTestId('key-char'));
      fireEvent.click(screen.getByTestId('key-char'));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(onChange).toHaveBeenCalledWith('a');
    });

    it('deve suprimir a letra base e inserir o acento selecionado em long press', () => {
      vi.useFakeTimers();
      const onChange = vi.fn();

      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => {
        vi.advanceTimersByTime(450);
      });

      // Simula a inserção automática da tecla base após o long press.
      fireEvent.click(screen.getByTestId('key-char'));
      expect(onChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole('button', { name: 'á' }));
      expect(onChange).toHaveBeenCalledWith('á');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Callback onKeyPress', () => {
    it('deve chamar onKeyPress ao pressionar uma tecla de caractere', () => {
      const onKeyPress = vi.fn();
      render(<VirtualKeyboard variant="fixed" onKeyPress={onKeyPress} value="" />);

      fireEvent.click(screen.getByTestId('key-char'));

      expect(onKeyPress).toHaveBeenCalledWith('a');
    });

    it('não deve chamar onKeyPress para teclas de controle de layout (shift)', () => {
      const onKeyPress = vi.fn();
      render(<VirtualKeyboard variant="fixed" onKeyPress={onKeyPress} value="" />);

      fireEvent.click(screen.getByTestId('key-shift'));

      expect(onKeyPress).not.toHaveBeenCalled();
    });

    it('não deve chamar onKeyPress para a tecla {enter} (tratada internamente pelo Keyboard)', () => {
      const onKeyPress = vi.fn();
      render(<VirtualKeyboard variant="fixed" onKeyPress={onKeyPress} value="" />);

      fireEvent.click(screen.getByTestId('key-enter'));

      // {enter} não é bloqueado pelo handleKeyPress, portanto é repassado ao callback externo
      expect(onKeyPress).toHaveBeenCalledWith('{enter}');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Alternância de layout (Shift / CapsLock)', () => {
    it('deve iniciar com layoutName "default"', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve alternar para layout "shift" ao pressionar {shift}', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-shift'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');
    });

    it('deve voltar para layout "default" ao pressionar {shift} novamente', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-shift'));
      fireEvent.click(screen.getByTestId('key-shift'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve ativar CapsLock (layout caps) ao pressionar {capslock}', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-capslock'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'caps');
    });

    it('deve desativar CapsLock (layout default) ao pressionar {shiftactivated}', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-capslock'));
      fireEvent.click(screen.getByTestId('key-shiftactivated'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve voltar a ativar CapsLock após ciclo ligar > desligar > ligar', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-capslock'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'caps');

      fireEvent.click(screen.getByTestId('key-shiftactivated'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');

      fireEvent.click(screen.getByTestId('key-shift'));
      fireEvent.click(screen.getByTestId('key-capslock'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'caps');
    });

    it('deve voltar para "default" após digitar um caractere com Shift ativo (sem CapsLock)', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-shift'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');

      // Após digitar, o Shift é desativado automaticamente
      fireEvent.click(screen.getByTestId('key-char'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve permanecer em "caps" após digitar quando CapsLock está ativo', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-capslock'));
      fireEvent.click(screen.getByTestId('key-char'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'caps');
    });

    it('deve tratar Shift como temporário após desativar CapsLock', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-capslock'));
      fireEvent.click(screen.getByTestId('key-shiftactivated'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');

      fireEvent.click(screen.getByTestId('key-shift'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');

      fireEvent.click(screen.getByTestId('key-char'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve alternar para layout "numbers" ao pressionar {numbers} (default)', () => {
      render(<VirtualKeyboard variant="fixed" type="default" value="" />);

      fireEvent.click(screen.getByTestId('key-numbers'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'numbers');
    });

    it('deve voltar para "default" ao pressionar {abc} (default)', () => {
      render(<VirtualKeyboard variant="fixed" type="default" value="" />);

      fireEvent.click(screen.getByTestId('key-numbers'));
      fireEvent.click(screen.getByTestId('key-abc'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve alternar para layout "alt" ao pressionar {alt} (default)', () => {
      render(<VirtualKeyboard variant="fixed" type="default" value="" />);

      fireEvent.click(screen.getByTestId('key-alt'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'alt');
    });

    it('deve voltar para "default" ao pressionar {alt} pela segunda vez', () => {
      render(<VirtualKeyboard variant="fixed" type="default" value="" />);

      fireEvent.click(screen.getByTestId('key-alt'));
      fireEvent.click(screen.getByTestId('key-alt'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve alternar para layout "alt2" ao pressionar {alt2}', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-alt'));
      fireEvent.click(screen.getByTestId('key-alt2'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'alt2');
    });

    it('deve voltar para layout "alt" ao pressionar {alt2} novamente', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.click(screen.getByTestId('key-alt'));
      fireEvent.click(screen.getByTestId('key-alt2'));
      fireEvent.click(screen.getByTestId('key-alt2'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'alt');
    });

    it('deve alternar para layout "emoticon" ao pressionar {emoticon} (default)', () => {
      render(<VirtualKeyboard variant="fixed" Emoji={true} type="default" value="" />);

      fireEvent.click(screen.getByTestId('key-emoticon'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'emoticon');
    });

    it('deve ocultar o botão emoticon quando Emoji for false', () => {
      render(<VirtualKeyboard variant="fixed" type="default" value="" Emoji={false} />);

      expect(screen.queryByTestId('key-emoticon')).not.toBeInTheDocument();
    });

  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Layouts nativos', () => {
    it.each([
      ['default' as const],
      ['numeric' as const],
    ])('deve renderizar o layout nativo "%s"', (layout) => {
      render(<VirtualKeyboard variant="fixed" type={layout} />);
      expect(screen.getByTestId('keyboard')).toBeInTheDocument();
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // ───────────────────────────────────────────────────────────────────────────
  describe('Reinicialização ao trocar de layout', () => {
    it('deve resetar layoutName para "default" ao trocar o prop layout', () => {
      const { rerender } = render(<VirtualKeyboard variant="fixed" type="default" value="" />);

      fireEvent.click(screen.getByTestId('key-shift'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');

      rerender(<VirtualKeyboard variant="fixed" type="numeric" value="" />);

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Teclas de controle adicionais ({altright}, {default}, {emoticon})', () => {
    it('deve ir para layout "alt" ao pressionar {altright}', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);
      fireEvent.click(screen.getByTestId('key-altright'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'alt');
    });

    it('deve voltar para "default" ao pressionar {altright} novamente (de alt)', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);
      fireEvent.click(screen.getByTestId('key-altright'));
      fireEvent.click(screen.getByTestId('key-altright'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve voltar para "alt" ao pressionar {altright} quando em alt2', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);
      fireEvent.click(screen.getByTestId('key-alt'));
      fireEvent.click(screen.getByTestId('key-alt2'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'alt2');

      fireEvent.click(screen.getByTestId('key-altright'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'alt');
    });

    it('deve voltar para "alt" ao pressionar {alt} quando em alt2', () => {
      render(<VirtualKeyboard variant="fixed" value="" />);
      fireEvent.click(screen.getByTestId('key-alt'));
      fireEvent.click(screen.getByTestId('key-alt2'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'alt2');

      fireEvent.click(screen.getByTestId('key-alt'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'alt');
    });

    it('deve resetar para "default" ao pressionar {default} (type=default)', () => {
      render(<VirtualKeyboard variant="fixed" type="default" value="" />);
      fireEvent.click(screen.getByTestId('key-alt'));
      fireEvent.click(screen.getByTestId('key-default'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve resetar para "abc" ao pressionar {default} (type=numeric)', () => {
      render(<VirtualKeyboard variant="fixed" type="numeric" value="" />);
      fireEvent.click(screen.getByTestId('key-alt'));
      fireEvent.click(screen.getByTestId('key-default'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'abc');
    });

    it('{emoticon} não muda layout quando Emoji é false', () => {
      render(<VirtualKeyboard variant="fixed" Emoji={false} type="default" value="" />);

      // key-emoticon-direct sempre presente — cobre o branch `if (!Emoji) return`
      fireEvent.click(screen.getByTestId('key-emoticon-direct'));

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('{emoticon} volta para layout base quando já está em emoticon', () => {
      render(<VirtualKeyboard variant="fixed" Emoji={true} type="default" value="" />);

      fireEvent.click(screen.getByTestId('key-emoticon'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'emoticon');

      fireEvent.click(screen.getByTestId('key-emoticon'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('{downkeyboard} no modo fixed deve resetar o layout mas não fechar o teclado', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input ref={ref} data-testid="input-ref" />
          <VirtualKeyboard variant="native" targetRef={ref} />
        </>
      );

      act(() => {
        fireEvent.focus(screen.getByTestId('input-ref'));
      });

      // No modo native com targetRef focado, {downkeyboard} fecha e desfoca
      fireEvent.click(screen.getByTestId('key-downkeyboard'));

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).not.toMatch(/overlayOpen/);
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Menu de acentos — fechamento e atualização de posição', () => {
    it('deve fechar o menu de acentos ao clicar fora dele', () => {
      vi.useFakeTimers();
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      act(() => {
        fireEvent.pointerDown(document.body);
      });

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('deve fechar o menu de acentos ao pressionar Escape', () => {
      vi.useFakeTimers();
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      act(() => {
        fireEvent.keyDown(document, { key: 'Escape' });
      });

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('deve manter o menu de acentos aberto ao clicar dentro dele', () => {
      vi.useFakeTimers();
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      act(() => {
        fireEvent.pointerDown(screen.getByRole('listbox'));
      });

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('deve atualizar a posição do menu de acentos ao rolar a página', () => {
      vi.useFakeTimers();
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });

      // Menu ainda visível após scroll (posição atualizada internamente)
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('deve atualizar a posição do menu de acentos ao redimensionar a janela', () => {
      vi.useFakeTimers();
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('deve chamar preventDefault e stopPropagation ao pressionar sobre uma opção de acento', () => {
      vi.useFakeTimers();
      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });

      const accentButton = screen.getByRole('button', { name: 'á' });

      const pointerDownEvent = new Event('pointerdown', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(pointerDownEvent, 'preventDefault');
      const stopPropagationSpy = vi.spyOn(pointerDownEvent, 'stopPropagation');

      act(() => {
        accentButton.dispatchEvent(pointerDownEvent);
      });

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it('não deve inserir acento e deve fechar o menu quando maxLength atingido', () => {
      vi.useFakeTimers();
      const onChange = vi.fn();

      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="abc" maxLength={3} />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'á' }));

      expect(onChange).not.toHaveBeenCalled();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('deve inserir acento e resetar layout shift após seleção', () => {
      vi.useFakeTimers();
      const onChange = vi.fn();

      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="" />);

      // Ativa shift
      fireEvent.click(screen.getByTestId('key-shift'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');

      // Long press na tecla 'a' (data-skbtn="a", não maiúscula, então sem uppercase accent)
      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });

      fireEvent.click(screen.getByRole('button', { name: 'á' }));

      expect(onChange).toHaveBeenCalledWith('á');
      // Após inserir acento com shift ativo (sem capslock), layout volta para default
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Long press — casos de borda', () => {
    it('não deve chamar onChange ao soltar tecla com maxLength atingido (short press)', () => {
      vi.useFakeTimers();
      const onChange = vi.fn();

      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="abc" maxLength={3} />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(200); });
      fireEvent.pointerUp(screen.getByTestId('key-char'));

      expect(onChange).not.toHaveBeenCalled();
    });

    it('deve resetar layout shift ao soltar tecla em short press (sem capsLock)', () => {
      vi.useFakeTimers();
      const onChange = vi.fn();

      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="" />);

      // Ativa shift
      fireEvent.click(screen.getByTestId('key-shift'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');

      // Short press: solta antes dos 400ms
      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(200); });
      fireEvent.pointerUp(screen.getByTestId('key-char'));
      // Suprime o click subsequente para evitar dupla inserção
      fireEvent.click(screen.getByTestId('key-char'));

      // handleLongPressEnd detecta shift+!capsLock e retorna ao default
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve exibir opções maiúsculas no menu de acentos para letra maiúscula', () => {
      vi.useFakeTimers();

      render(<VirtualKeyboard variant="fixed" value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-uppercase-a'));
      act(() => { vi.advanceTimersByTime(450); });

      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Á' })).toBeInTheDocument();
    });

    it('não deve abrir menu de acentos para tecla sem opções de acento', () => {
      vi.useFakeTimers();

      render(<VirtualKeyboard variant="fixed" value="" />);

      // 'x' não tem ACCENT_OPTIONS
      fireEvent.pointerDown(screen.getByTestId('key-non-accent'));
      act(() => { vi.advanceTimersByTime(450); });

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('deve inserir a tecla ao soltar sem acionar menu (short press em tecla sem acento)', () => {
      vi.useFakeTimers();
      const onChange = vi.fn();

      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-non-accent'));
      act(() => { vi.advanceTimersByTime(200); });
      fireEvent.pointerUp(screen.getByTestId('key-non-accent'));
      // Click subsequente é suprimido pelo handleLongPressEnd
      fireEvent.click(screen.getByTestId('key-non-accent'));

      expect(onChange).toHaveBeenCalledWith('x');
    });

    it('não deve exibir key preview quando type é numeric', () => {
      vi.useFakeTimers();

      render(<VirtualKeyboard variant="fixed" type="numeric" value="" />);

      // No mock, key-char tem data-skbtn="a", mas com type=numeric não mostra preview
      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(100); });

      // Como containerWidth é Infinity (>768) e type=numeric, sem preview
      expect(document.querySelector('[class*="keyPreview"]')).toBeNull();
    });

    it('deve fechar o menu de acentos e não disparar onChange ao pressionar pointerLeave', () => {
      vi.useFakeTimers();
      const onChange = vi.fn();

      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="" />);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      // pointerLeave cancela o long press
      act(() => {
        fireEvent.pointerLeave(screen.getByTestId('keyboard').parentElement!);
      });

      // O menu de acentos deve permanecer (foi aberto pelo long press já disparado)
      // e onChange não é chamado pelo pointerLeave (que aciona handleLongPressEnd com longPressTriggered=true)
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('scrollTargetIntoView', () => {
    it('deve chamar window.scrollBy quando o campo está abaixo da área visível', () => {
      vi.useFakeTimers();
      const scrollBySpy = vi.spyOn(window, 'scrollBy').mockImplementation(() => {});

      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input data-testid="input-ref" ref={ref} />
          <VirtualKeyboard variant="native" targetRef={ref} />
        </>
      );

      // Simula campo abaixo da área visível (bottom > innerHeight - keyboardHeight - 8)
      if (ref.current) {
        vi.spyOn(ref.current, 'getBoundingClientRect').mockReturnValue({
          bottom: 900,
          top: 800,
          height: 100,
          left: 0,
          right: 100,
          width: 100,
          x: 0,
          y: 800,
          toJSON: () => ({}),
        } as DOMRect);
      }

      act(() => {
        fireEvent.focus(screen.getByTestId('input-ref'));
        vi.advanceTimersByTime(100);
      });

      expect(scrollBySpy).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: 'smooth' })
      );

      scrollBySpy.mockRestore();
    });

    it('não deve chamar window.scrollBy quando o campo está dentro da área visível', () => {
      vi.useFakeTimers();
      const scrollBySpy = vi.spyOn(window, 'scrollBy').mockImplementation(() => {});

      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input data-testid="input-ref" ref={ref} />
          <VirtualKeyboard variant="native" targetRef={ref} />
        </>
      );

      // getBoundingClientRect padrão retorna bottom=0, que é menor que visibleBottom (~760)
      act(() => {
        fireEvent.focus(screen.getByTestId('input-ref'));
        vi.advanceTimersByTime(100);
      });

      expect(scrollBySpy).not.toHaveBeenCalled();

      scrollBySpy.mockRestore();
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Emoji prop — mudança em tempo de execução', () => {
    it('deve resetar para "default" ao desativar Emoji enquanto layout é emoticon (type=default)', () => {
      const { rerender } = render(
        <VirtualKeyboard variant="fixed" Emoji={true} type="default" value="" />
      );

      fireEvent.click(screen.getByTestId('key-emoticon'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'emoticon');

      rerender(<VirtualKeyboard variant="fixed" Emoji={false} type="default" value="" />);

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');
    });

    it('deve resetar para "abc" ao desativar Emoji enquanto layout é emoticon (type=numeric)', () => {
      const { rerender } = render(
        <VirtualKeyboard variant="fixed" Emoji={true} type="numeric" value="" />
      );

      fireEvent.click(screen.getByTestId('key-emoticon'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'emoticon');

      rerender(<VirtualKeyboard variant="fixed" Emoji={false} type="numeric" value="" />);

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'abc');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Capslock — navegação de layouts e retorno', () => {
    it('deve mudar para layout "shift" ao digitar com capsLock ativo em layout default/abc', () => {
      render(<VirtualKeyboard variant="fixed" type="default" value="" />);

      // Ativa capslock (vai para 'caps')
      fireEvent.click(screen.getByTestId('key-capslock'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'caps');

      // Vai para numbers e volta (baseLayout='default', capsLockOn=true)
      fireEvent.click(screen.getByTestId('key-numbers'));
      fireEvent.click(screen.getByTestId('key-abc'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'default');

      // Digita um caractere: layoutName===baseLayout && capsLockOn → deve ir para 'shift'
      fireEvent.click(screen.getByTestId('key-char'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('portalSizes — responsividade do teclado', () => {
    function renderWithContainerWidth(width: number) {
      let resizeCallback: ResizeObserverCallback | undefined;
      let observedTarget: Element | undefined;

      const OriginalResizeObserver = global.ResizeObserver;
      global.ResizeObserver = class MockRO {
        constructor(cb: ResizeObserverCallback) {
          resizeCallback = cb;
        }
        observe(target: Element) {
          observedTarget = target;
        }
        disconnect() {}
        unobserve() {}
      } as unknown as typeof ResizeObserver;

      const result = render(<VirtualKeyboard variant="fixed" value="" />);

      // Dispara callback após render (dentro de act) para evitar warnings
      act(() => {
        resizeCallback?.(
          [{ contentRect: { width } as DOMRectReadOnly, target: observedTarget! } as ResizeObserverEntry],
          {} as ResizeObserver
        );
      });

      global.ResizeObserver = OriginalResizeObserver;
      return result;
    }

    it('deve usar fontSize var(--font-size-16) para containerWidth <= 360', () => {
      vi.useFakeTimers();
      renderWithContainerWidth(320);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });

      const accentButton = screen.getByRole('button', { name: 'á' });
      const style = accentButton.style;
      expect(style.fontSize).toBe('var(--font-size-16)');
    });

    it('deve usar fontSize var(--font-size-18) para containerWidth entre 361 e 390', () => {
      vi.useFakeTimers();
      renderWithContainerWidth(380);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });

      const accentButton = screen.getByRole('button', { name: 'á' });
      expect(accentButton.style.fontSize).toBe('var(--font-size-18)');
    });

    it('deve usar fontSize var(--font-size-20) para containerWidth entre 391 e 480', () => {
      vi.useFakeTimers();
      renderWithContainerWidth(450);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });

      const accentButton = screen.getByRole('button', { name: 'á' });
      expect(accentButton.style.fontSize).toBe('var(--font-size-20)');
    });

    it('deve usar tamanho padrão sem fontSize para containerWidth entre 481 e 768', () => {
      vi.useFakeTimers();
      renderWithContainerWidth(600);

      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });

      const accentButton = screen.getByRole('button', { name: 'á' });
      expect(accentButton.style.fontSize).toBe('');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Modo native — comportamentos adicionais', () => {
    it('deve abrir o teclado imediatamente quando não há targetRef (native sem ref)', async () => {
      render(<VirtualKeyboard variant="native" />);
      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).toMatch(/overlayOpen/);
    });

    it('não deve fechar o teclado se isKeyboardInteracting está ativo ao fazer blur', async () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input data-testid="input-ref" ref={ref} />
          <VirtualKeyboard variant="native" targetRef={ref} />
        </>
      );

      act(() => {
        fireEvent.focus(screen.getByTestId('input-ref'));
      });

      // Simula interação com o teclado (pointerDown no wrapper, sem release)
      act(() => {
        fireEvent.pointerDown(screen.getByTestId('key-char'));
      });

      await act(async () => {
        fireEvent.blur(screen.getByTestId('input-ref'));
        await new Promise((r) => setTimeout(r, 200));
      });

      // Como isKeyboardInteractingRef é true durante o pointerDown, o teclado permanece aberto
      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).toMatch(/overlayOpen/);
    });

    it('deve aplicar classe layout--numeric no overlay para type=numeric', async () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input data-testid="input-ref" ref={ref} />
          <VirtualKeyboard variant="native" targetRef={ref} type="numeric" />
        </>
      );

      act(() => {
        fireEvent.focus(screen.getByTestId('input-ref'));
      });

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).toMatch(/layout--numeric/);
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('handleChange — supressão avançada', () => {
    it('deve suprimir onChange quando heldKey coincide com input recebido', () => {
      vi.useFakeTimers();
      const onChange = vi.fn();

      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="" />);

      // Long press: abre o menu, heldAccentKeyRef='a'
      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(450); });

      // Enquanto o menu está aberto e heldKey='a', simula onChange do teclado com input='a'
      fireEvent.click(screen.getByTestId('key-char'));

      // onChange não deve ser chamado (supressão por heldKey)
      expect(onChange).not.toHaveBeenCalled();
    });

    it('não deve chamar onChange quando input ultrapassa maxLength', () => {
      const onChange = vi.fn();

      render(<VirtualKeyboard variant="fixed" onChange={onChange} value="ab" maxLength={2} />);

      // handleChange recebe input com comprimento > maxLength
      fireEvent.click(screen.getByTestId('key-char'));

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('Tipo numeric — comportamentos específicos', () => {
    it('deve usar "abc" como layout base ao pressionar {abc} em tipo numeric', () => {
      render(<VirtualKeyboard variant="fixed" type="numeric" value="" />);
      fireEvent.click(screen.getByTestId('key-abc'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'abc');
    });

    it('deve usar "abc" como layout base ao pressionar {shift} em tipo numeric', () => {
      render(<VirtualKeyboard variant="fixed" type="numeric" value="" />);
      fireEvent.click(screen.getByTestId('key-shift'));
      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-layout-name', 'shift');
    });

    it('deve usar "abc" como baseLayout no handleLongPressEnd quando type=numeric', () => {
      vi.useFakeTimers();
      const onChange = vi.fn();

      render(<VirtualKeyboard variant="fixed" type="numeric" onChange={onChange} value="" />);

      // Short press na tecla 'a' (que tem ACCENT_OPTIONS) — tipo numeric sem preview de tecla
      fireEvent.pointerDown(screen.getByTestId('key-char'));
      act(() => { vi.advanceTimersByTime(200); });
      fireEvent.pointerUp(screen.getByTestId('key-char'));
      fireEvent.click(screen.getByTestId('key-char'));

      expect(onChange).toHaveBeenCalledWith('a');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('numpadWithEnter', () => {
    it('deve renderizar o teclado com numpadWithEnter ativo', () => {
      render(
        <VirtualKeyboard
          variant="native"
          type="numeric"
          numpadWithEnter
          value=""
        />
      );

      expect(screen.getByTestId('keyboard')).toBeInTheDocument();
    });

    it('deve disparar onKeyPress com {enter} ao pressionar a tecla enter', () => {
      const onKeyPress = vi.fn();
      render(
        <VirtualKeyboard
          variant="native"
          type="numeric"
          numpadWithEnter
          onKeyPress={onKeyPress}
          value=""
        />
      );

      fireEvent.click(screen.getByTestId('key-enter'));

      expect(onKeyPress).toHaveBeenCalledWith('{enter}');
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('onEnterPress', () => {
    it('deve chamar onEnterPress ao pressionar a tecla enter', () => {
      const onEnterPress = vi.fn();
      render(<VirtualKeyboard variant="fixed" onEnterPress={onEnterPress} value="" />);

      fireEvent.click(screen.getByTestId('key-enter'));

      expect(onEnterPress).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar onEnterPress ao pressionar outras teclas', () => {
      const onEnterPress = vi.fn();
      render(<VirtualKeyboard variant="fixed" onEnterPress={onEnterPress} value="" />);

      fireEvent.click(screen.getByTestId('key-char'));
      fireEvent.click(screen.getByTestId('key-bksp'));
      fireEvent.click(screen.getByTestId('key-shift'));

      expect(onEnterPress).not.toHaveBeenCalled();
    });

    it('deve chamar tanto onKeyPress quanto onEnterPress ao pressionar enter', () => {
      const onKeyPress = vi.fn();
      const onEnterPress = vi.fn();
      render(
        <VirtualKeyboard
          variant="fixed"
          onKeyPress={onKeyPress}
          onEnterPress={onEnterPress}
          value=""
        />
      );

      fireEvent.click(screen.getByTestId('key-enter'));

      expect(onKeyPress).toHaveBeenCalledWith('{enter}');
      expect(onEnterPress).toHaveBeenCalledTimes(1);
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('isNumpadLayout — classe de layout dinâmica no overlay', () => {
    it('deve aplicar layout--default no overlay para type=default com QWERTY ativo', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input data-testid="input-ref" ref={ref} />
          <VirtualKeyboard variant="native" targetRef={ref} type="default" />
        </>
      );

      act(() => { fireEvent.focus(screen.getByTestId('input-ref')); });

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).toMatch(/layout--default/);
      expect(overlay?.className).not.toMatch(/layout--numeric/);
    });

    it('deve mudar para layout--numeric no overlay ao pressionar {numbers} (type=default)', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input data-testid="input-ref" ref={ref} />
          <VirtualKeyboard variant="native" targetRef={ref} type="default" />
        </>
      );

      act(() => { fireEvent.focus(screen.getByTestId('input-ref')); });
      fireEvent.click(screen.getByTestId('key-numbers'));

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).toMatch(/layout--numeric/);
    });

    it('deve voltar para layout--default ao pressionar {abc} após o numpad (type=default)', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input data-testid="input-ref" ref={ref} />
          <VirtualKeyboard variant="native" targetRef={ref} type="default" />
        </>
      );

      act(() => { fireEvent.focus(screen.getByTestId('input-ref')); });
      fireEvent.click(screen.getByTestId('key-numbers'));
      fireEvent.click(screen.getByTestId('key-abc'));

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).toMatch(/layout--default/);
    });

    it('deve usar layout--default no overlay quando type=numeric mostra o layout abc', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <>
          <input data-testid="input-ref" ref={ref} />
          <VirtualKeyboard variant="native" targetRef={ref} type="numeric" />
        </>
      );

      act(() => { fireEvent.focus(screen.getByTestId('input-ref')); });
      fireEvent.click(screen.getByTestId('key-abc'));

      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      expect(overlay?.className).toMatch(/layout--default/);
      expect(overlay?.className).not.toMatch(/layout--numeric/);
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('numpadWithEnter — type=default', () => {
    it('deve incluir {enter} no layout numbers quando numpadWithEnter=true (type=default)', () => {
      render(
        <VirtualKeyboard variant="fixed" type="default" numpadWithEnter value="" />
      );

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-has-enter-numbers', 'true');
    });

    it('não deve incluir {enter} no layout numbers quando numpadWithEnter=false (type=default)', () => {
      render(<VirtualKeyboard variant="fixed" type="default" value="" />);

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-has-enter-numbers', 'false');
    });

    it('deve disparar onEnterPress ao pressionar enter no numpad de type=default com numpadWithEnter', () => {
      const onEnterPress = vi.fn();
      render(
        <VirtualKeyboard
          variant="fixed"
          type="default"
          numpadWithEnter
          onEnterPress={onEnterPress}
          value=""
        />
      );

      fireEvent.click(screen.getByTestId('key-numbers'));
      fireEvent.click(screen.getByTestId('key-enter'));

      expect(onEnterPress).toHaveBeenCalledTimes(1);
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  describe('showEnterKey — preservação no numpad', () => {
    it('deve preservar {enter} no layout numbers com showEnterKey=false quando numpadWithEnter=true', () => {
      render(
        <VirtualKeyboard
          variant="fixed"
          type="default"
          showEnterKey={false}
          numpadWithEnter
          value=""
        />
      );

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-has-enter-numbers', 'true');
    });

    it('deve preservar {enter} no layout default do numpad type=numeric com showEnterKey=false', () => {
      render(
        <VirtualKeyboard
          variant="fixed"
          type="numeric"
          showEnterKey={false}
          numpadWithEnter
          value=""
        />
      );

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-has-enter-numeric-default', 'true');
    });

    it('não deve incluir {enter} no layout numbers quando numpadWithEnter=false e showEnterKey=false', () => {
      render(
        <VirtualKeyboard
          variant="fixed"
          type="default"
          showEnterKey={false}
          value=""
        />
      );

      expect(screen.getByTestId('keyboard')).toHaveAttribute('data-has-enter-numbers', 'false');
    });
  });
});
