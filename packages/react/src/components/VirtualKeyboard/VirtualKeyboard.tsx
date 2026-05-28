import clsx from 'clsx';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import SimpleKeyboardLayouts from 'simple-keyboard-layouts';

import TextField from '../TextField';
import { LAYOUT_DISPLAY } from './components/IconDisplay';
import { NATIVE_LAYOUTS, NATIVE_LAYOUT_KEYS, SHIFT_TOGGLES, LAYOUT_THEMES } from './components/Variants';
import styles from './VirtualKeyboard.module.scss';

import type { VirtualKeyboardProps } from './VirtualKeyboard.type';

const keyboardLayouts = new SimpleKeyboardLayouts();

/**
 * Componente VirtualKeyboard — teclado virtual on-screen para entradas controladas.
 *
 * @description Baseado em `react-simple-keyboard`, oferece layouts nativos (QWERTY, numérico,
 * teclado completo, mobile e iOS) e mais de 40 layouts de idiomas via `simple-keyboard-layouts`,
 * seguindo o visual padrão da biblioteca.
 *
 * Possui dois modos:
 * - **`native`** (padrão): age como teclado nativo — aparece ao focar no campo referenciado por `targetRef` e some ao perder o foco.
 * - **`fixed`**: teclado sempre visível com um TextField próprio acima.
 *
 * @example
 * ```tsx
 * // Modo fixed
 * <VirtualKeyboard mode="fixed" variant="default" onChange={setValue} />
 * ```
 *
 * @example
 * ```tsx
 * // Modo native — aparece ao focar no input
 * const inputRef = useRef<HTMLInputElement>(null);
 * const [value, setValue] = useState('');
 * <input ref={inputRef} value={value} readOnly />
 * <VirtualKeyboard targetRef={inputRef} value={value} onChange={setValue} />
 * ```
 */
const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  mode = 'native',
  variant = 'default',
  value = '',
  onChange,
  onKeyPress,
  maxLength,
  disabled = false,
  className,
  id,
  textFieldLabel,
  textFieldPlaceholder = 'Digite aqui...',
  helperText,
  error,
  errorMessage,
  targetRef,
}) => {
  const [layoutName, setLayoutName] = useState<string>('default');
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [activeLayout, setActiveLayout] = useState<Record<string, string[]> | null>(
    NATIVE_LAYOUTS[variant] ?? null
  );

  const [isOpen, setIsOpen] = useState(mode !== 'native');
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mode !== 'native') return;

    if (!targetRef?.current) {
      setIsOpen(true);
      return;
    }

    const el = targetRef.current;

    const handleFocus = () => {
      if (hideTimeoutRef.current !== null) clearTimeout(hideTimeoutRef.current);
      setIsOpen(true);
    };

    const handleBlur = () => {
      hideTimeoutRef.current = setTimeout(() => setIsOpen(false), 150);
    };

    el.addEventListener('focus', handleFocus);
    el.addEventListener('blur', handleBlur);

    return () => {
      el.removeEventListener('focus', handleFocus);
      el.removeEventListener('blur', handleBlur);
      if (hideTimeoutRef.current !== null) clearTimeout(hideTimeoutRef.current);
    };
  }, [mode, targetRef]);

  useEffect(() => {
    setLayoutName('default');
    setCapsLockOn(false);

    if (NATIVE_LAYOUT_KEYS.has(variant)) {
      setActiveLayout(NATIVE_LAYOUTS[variant] ?? null);
    } else {
      const loaded = keyboardLayouts.get(variant) as { layout: Record<string, string[]> } | undefined;
      setActiveLayout(loaded?.layout ?? null);
    }
  }, [variant]);

  const handleKeyPress = useCallback(
    (button: string) => {
      if (disabled) return;

      const baseLayout = variant === 'numeric' ? 'abc' : 'default';

      if (button === '{capslock}' || button === '{lock}') {
        setCapsLockOn((prev) => {
          const next = !prev;
          setLayoutName(next ? 'caps' : baseLayout);
          setCapsLockOn(false);
          return next;
        });
        return;
      }

      if (
        button === '{shift}' ||
        button === '{shiftleft}' || button === '{shiftright}' ||
        button === '{shiftactivated}'
      ) {
        setLayoutName((prev) => {
          const next = SHIFT_TOGGLES[prev] ?? 'default';
          return next === 'default' ? baseLayout : next;
        });
        return;
      }
      if (button === '{numbers}') { setLayoutName('numbers'); return; }
      if (button === '{abc}')     { setLayoutName(baseLayout); return; }
      if (button === '{alt}' || button === '{altright}') {
        setLayoutName((prev) => {
          if (prev === 'alt2') return 'alt';
          return prev === 'alt' ? baseLayout : 'alt';
        });
        return;
      }
      if (button === '{alt2}') { setLayoutName((prev) => (prev === 'alt2' ? 'alt' : 'alt2')); return; }
      if (button === '{smileys}') { setLayoutName((prev) => (prev === 'smileys' ? baseLayout : 'smileys')); return; }
      if (button === '{symbols}') { setLayoutName((prev) => (prev === 'symbols' ? 'alt' : 'symbols')); return; }
      if (button === '{default}' || button === '{back}' || button === '{downkeyboard}') { setLayoutName(baseLayout); return; }

      if (button !== '{backspace}' && button !== '{bksp}' && button !== '{enter}') {
        if (layoutName === 'shift' && !capsLockOn) {
          setLayoutName(baseLayout);
        } else if (layoutName === baseLayout && capsLockOn) {
          setLayoutName('shift');
        }
      }

      onKeyPress?.(button);
    },
    [disabled, variant, layoutName, capsLockOn, onKeyPress]
  );

  const handleChange = useCallback(
    (input: string) => {
      if (disabled) return;
      if (maxLength !== undefined && input.length > maxLength) return;
      onChange?.(input);
    },
    [disabled, maxLength, onChange]
  );

  const keyboardEl = activeLayout ? (
    <Keyboard
      layoutName={layoutName}
      layout={activeLayout}
      theme={LAYOUT_THEMES[variant] ?? 'hg-theme-default'}
      display={LAYOUT_DISPLAY[variant]}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      input={value}
      preventMouseDownDefault
    />
  ) : null;

  if (mode === 'native' && typeof document !== 'undefined') {
    return createPortal(
      <div
        id={id}
        className={clsx(
          styles.overlay,
          { [styles.overlayOpen]: isOpen },
          styles[`layout--${variant}`],
          { [styles.disabled]: disabled },
          className
        )}
      >
        {keyboardEl}
      </div>,
      document.body
    );
  }

  return (
    <div
      id={id}
      className={clsx(
        styles.container,
        styles[`mode--${mode}`],
        styles[`layout--${variant}`],
        { [styles.disabled]: disabled },
        className
      )}
    >
      {mode === 'fixed' && (
        <div className={styles.textFieldContainer}>
          <TextField
            label={textFieldLabel}
            placeholder={textFieldPlaceholder}
            value={value}
            helperText={helperText}
            error={error}
            errorMessage={errorMessage}
            readOnly
            disabled={disabled}
            maxLength={maxLength}
            attachedToVirtualKeyboard
            className={styles.textFieldWrapper}
          />
        </div>
      )}
      {keyboardEl}
    </div>
  );
};

export default VirtualKeyboard;

