import clsx from 'clsx';
import React, { useState, useCallback, useEffect } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import SimpleKeyboardLayouts from 'simple-keyboard-layouts';

import { NATIVE_LAYOUTS, NATIVE_LAYOUT_KEYS, SHIFT_TOGGLES, LAYOUT_THEMES, LAYOUT_DISPLAY } from './components/Layouts';
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
 * - **`native`** (padrão): age como teclado nativo — será exibido ao focar em um campo (futuramente).
 * - **`fixed`**: teclado sempre visível com um TextField próprio acima.
 *
 * @example
 * ```tsx
 * // Modo fixed
 * <VirtualKeyboard mode="fixed" layout="default" textFieldLabel="Busca" onChange={setValue} />
 * ```
 *
 * @example
 * ```tsx
 * // Modo native (controlado externamente)
 * const [value, setValue] = useState('');
 * <TextField value={value} onChange={setValue} readOnly />
 * <VirtualKeyboard layout="default" value={value} onChange={setValue} />
 * ```
 */
const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  mode = 'native',
  layout = 'brazilian',
  value = '',
  onChange,
  onKeyPress,
  maxLength,
  disabled = false,
  className,
  id,
  textFieldPlaceholder,
}) => {
  const [layoutName, setLayoutName] = useState<string>('default');
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [activeLayout, setActiveLayout] = useState<Record<string, string[]> | null>(
    NATIVE_LAYOUTS[layout] ?? null
  );

  useEffect(() => {
    setLayoutName('default');
    setCapsLockOn(false);

    if (NATIVE_LAYOUT_KEYS.has(layout)) {
      setActiveLayout(NATIVE_LAYOUTS[layout] ?? null);
    } else {
      const loaded = keyboardLayouts.get(layout) as { layout: Record<string, string[]> } | undefined;
      setActiveLayout(loaded?.layout ?? null);
    }
  }, [layout]);

  const handleKeyPress = useCallback(
    (button: string) => {
      if (disabled) return;

      if (button === '{capslock}' || button === '{lock}') {
        setCapsLockOn((prev) => {
          const next = !prev;
          setLayoutName(next ? 'shift' : 'default');
          return next;
        });
        return;
      }

      if (
        button === '{shift}' ||
        button === '{shiftleft}' || button === '{shiftright}' ||
        button === '{shiftactivated}'
      ) {
        setLayoutName((prev) => SHIFT_TOGGLES[prev] ?? 'default');
        return;
      }
      if (button === '{numbers}') { setLayoutName('numbers'); return; }
      if (button === '{abc}')     { setLayoutName('default'); return; }
      if (button === '{alt}' || button === '{altright}') { setLayoutName((prev) => (prev === 'alt' ? 'default' : 'alt')); return; }
      if (button === '{smileys}') { setLayoutName((prev) => (prev === 'smileys' ? 'default' : 'smileys')); return; }
      if (button === '{symbols}') { setLayoutName((prev) => (prev === 'symbols' ? 'alt' : 'symbols')); return; }
      if (button === '{default}' || button === '{back}' || button === '{downkeyboard}') { setLayoutName('default'); return; }

      if (button !== '{backspace}' && button !== '{bksp}' && button !== '{enter}') {
        if (layoutName === 'shift' && !capsLockOn) {
          setLayoutName('default');
        } else if (layoutName === 'default' && capsLockOn) {
          setLayoutName('shift');
        }
      }

      onKeyPress?.(button);
    },
    [disabled, layoutName, capsLockOn, onKeyPress]
  );

  const handleChange = useCallback(
    (input: string) => {
      if (disabled) return;
      if (maxLength !== undefined && input.length > maxLength) return;
      onChange?.(input);
    },
    [disabled, maxLength, onChange]
  );

  return (
    <div
      id={id}
      className={clsx(
        styles.container,
        styles[`mode--${mode}`],
        styles[`layout--${layout}`],
        { [styles.disabled]: disabled },
        className
      )}
    >
      {mode === 'fixed' && (
        <div className={styles.textFieldWrapper}>
          <input
            className={styles.textFieldInput}
            placeholder={textFieldPlaceholder}
            value={value}
            readOnly
            disabled={disabled}
          />
        </div>
      )}
      {activeLayout && (
        <Keyboard
          layoutName={layoutName}
          layout={activeLayout}
          theme={LAYOUT_THEMES[layout] ?? 'hg-theme-default'}
          display={LAYOUT_DISPLAY[layout]}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          input={value}
          preventMouseDownDefault
        />
      )}
    </div>
  );
};

export default VirtualKeyboard;

