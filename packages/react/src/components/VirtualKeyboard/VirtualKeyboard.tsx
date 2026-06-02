import clsx from 'clsx';
import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import SimpleKeyboardLayouts from 'simple-keyboard-layouts';

import TextField from '../TextField';
import { LAYOUT_DISPLAY } from './components/IconDisplay';
import { NATIVE_LAYOUT_KEYS, SHIFT_TOGGLES, LAYOUT_THEMES, getNativeLayout } from './components/Variants';
import styles from './VirtualKeyboard.module.scss';

import type { VirtualKeyboardProps } from './VirtualKeyboard.type';

const keyboardLayouts = new SimpleKeyboardLayouts();
const LONG_PRESS_DELAY_MS = 400;
const ACTION_KEY_PATTERN = /^\{.+\}$/;

const ACCENT_OPTIONS: Record<string, string[]> = {
  a: ['á', 'à', 'â', 'ã', 'ä'],
  e: ['é', 'è', 'ê', 'ë'],
  i: ['í', 'ì', 'î', 'ï'],
  o: ['ó', 'ò', 'ô', 'õ', 'ö'],
  u: ['ú', 'ù', 'û', 'ü'],
  c: ['ç'],
};

type AccentMenuState = {
  sourceKey: string;
  options: string[];
  top: number;
  left: number;
};

const tokenizeRow = (row: string): string[] => row.split(/\s+/).filter(Boolean);

const isActionKey = (token: string): boolean => ACTION_KEY_PATTERN.test(token);

const pickLanguageTokens = (
  tokens: string[],
  targetCount: number,
  strategy: 'start' | 'end'
): string[] => {
  if (tokens.length <= targetCount) return tokens;
  return strategy === 'end'
    ? tokens.slice(tokens.length - targetCount)
    : tokens.slice(0, targetCount);
};

const mergeLanguageRow = (
  baseRow: string,
  languageRow: string,
  strategy: 'start' | 'end'
): string => {
  const baseTokens = tokenizeRow(baseRow);
  const languageTokens = tokenizeRow(languageRow).filter((token) => !isActionKey(token));
  const replaceIndexes = baseTokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => !isActionKey(token))
    .map(({ index }) => index);

  if (!replaceIndexes.length || !languageTokens.length) return baseRow;

  const selectedLanguageTokens = pickLanguageTokens(languageTokens, replaceIndexes.length, strategy);
  const mergedTokens = [...baseTokens];

  replaceIndexes.forEach((tokenIndex, index) => {
    const nextToken = selectedLanguageTokens[index];
    if (nextToken) mergedTokens[tokenIndex] = nextToken;
  });

  return mergedTokens.join(' ');
};

const applyLanguageRowsToBase = (baseRows: string[], languageRows?: string[]): string[] => {
  if (!languageRows?.length) return baseRows;

  const nextRows = [...baseRows];
  const mapByRow: Array<{ rowIndex: number; strategy: 'start' | 'end' }> = [
    { rowIndex: 1, strategy: 'start' },
    { rowIndex: 2, strategy: 'start' },
    { rowIndex: 3, strategy: 'end' },
  ];

  mapByRow.forEach(({ rowIndex, strategy }) => {
    const baseRow = baseRows[rowIndex];
    const languageRow = languageRows[rowIndex];
    if (!baseRow || !languageRow) return;
    nextRows[rowIndex] = mergeLanguageRow(baseRow, languageRow, strategy);
  });

  return nextRows;
};

const buildLanguageLayout = (
  languageLayout: Record<string, string[]> | undefined,
  showSmileysButton: boolean,
  showDownKeyboardButton: boolean
): Record<string, string[]> | null => {
  const baseLayout = getNativeLayout('default', showSmileysButton, showDownKeyboardButton);
  if (!baseLayout) return languageLayout ?? null;
  if (!languageLayout) return baseLayout;

  const baseDefault = baseLayout.default ?? [];
  const baseShift = baseLayout.shift ?? baseDefault;
  const baseCaps = baseLayout.caps ?? baseShift;

  const languageDefault = languageLayout.default;
  const languageShift = languageLayout.shift ?? languageDefault;

  const nextDefault = applyLanguageRowsToBase(baseDefault, languageDefault);
  const nextShift = applyLanguageRowsToBase(baseShift, languageShift);
  const nextCaps = applyLanguageRowsToBase(baseCaps, languageShift);

  return {
    ...baseLayout,
    ...languageLayout,
    default: nextDefault,
    shift: nextShift,
    caps: nextCaps,
  };
};

/**
 * Componente VirtualKeyboard — teclado virtual on-screen para entradas controladas.
 *
 * @description Baseado em `react-simple-keyboard`, oferece layouts nativos (QWERTY e numérico)
 * e mais de 40 layouts de idiomas via `simple-keyboard-layouts`,
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
  showSmileysButton = false,
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
  const [accentMenu, setAccentMenu] = useState<AccentMenuState | null>(null);
  const [accentMenuOffsetX, setAccentMenuOffsetX] = useState(0);
  const [activeLayout, setActiveLayout] = useState<Record<string, string[]> | null>(
    getNativeLayout(variant, showSmileysButton, mode === 'native')
  );
  const visualVariant = NATIVE_LAYOUT_KEYS.has(variant) ? variant : 'default';

  const [isOpen, setIsOpen] = useState(mode !== 'native');
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressNextInputRef = useRef<string | null>(null);
  const heldAccentKeyRef = useRef<string | null>(null);
  const longPressTriggeredRef = useRef(false);
  const isKeyboardInteractingRef = useRef(false);
  const keyboardWrapperRef = useRef<HTMLDivElement | null>(null);
  const keyboardInstanceRef = useRef<{ setInput: (value: string) => void } | null>(null);
  const accentMenuRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const clearLongPressTimeout = useCallback(() => {
    if (longPressTimeoutRef.current !== null) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  }, []);

  const closeAccentMenu = useCallback(() => {
    setAccentMenu(null);
  }, []);

  const syncKeyboardInput = useCallback((nextValue: string) => {
    keyboardInstanceRef.current?.setInput(nextValue);
  }, []);

  useEffect(() => {
    syncKeyboardInput(value);
  }, [value, syncKeyboardInput]);

  const scheduleHideIfBlurred = useCallback(() => {
    if (mode !== 'native') return;

    if (hideTimeoutRef.current !== null) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      const targetEl = targetRef?.current;
      const isTargetFocused = !!targetEl && document.activeElement === targetEl;

      if (!isTargetFocused && !isKeyboardInteractingRef.current) {
        setIsOpen(false);
      }
    }, 150);
  }, [mode, targetRef]);

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
      scheduleHideIfBlurred();
    };

    el.addEventListener('focus', handleFocus);
    el.addEventListener('blur', handleBlur);

    return () => {
      el.removeEventListener('focus', handleFocus);
      el.removeEventListener('blur', handleBlur);
      if (hideTimeoutRef.current !== null) clearTimeout(hideTimeoutRef.current);
    };
  }, [mode, targetRef, scheduleHideIfBlurred]);

  useEffect(() => {
    setLayoutName('default');
    setCapsLockOn(false);

    if (NATIVE_LAYOUT_KEYS.has(variant)) {
      setActiveLayout(getNativeLayout(variant, showSmileysButton, mode === 'native'));
    } else {
      const loaded = keyboardLayouts.get(variant) as { layout: Record<string, string[]> } | undefined;
      setActiveLayout(buildLanguageLayout(loaded?.layout, showSmileysButton, mode === 'native'));
    }
  }, [variant, showSmileysButton, mode]);

  useEffect(() => {
    if (!showSmileysButton && layoutName === 'smileys') {
      setLayoutName(variant === 'numeric' ? 'abc' : 'default');
    }
  }, [showSmileysButton, layoutName, variant]);

  useEffect(() => {
    return () => {
      clearLongPressTimeout();
    };
  }, [clearLongPressTimeout]);

  useEffect(() => {
    if (!accentMenu) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (accentMenuRef.current?.contains(event.target as Node)) return;
      closeAccentMenu();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAccentMenu();
      }
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown, true);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointerDown, true);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [accentMenu, closeAccentMenu]);

  useLayoutEffect(() => {
    if (!accentMenu || !accentMenuRef.current) return;

    const margin = 8;
    const rect = accentMenuRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const minCenter = margin + rect.width / 2;
    const maxCenter = window.innerWidth - margin - rect.width / 2;
    const clampedCenter = Math.min(maxCenter, Math.max(minCenter, accentMenu.left));
    const nextOffset = clampedCenter - accentMenu.left;

    if (Math.abs(nextOffset - accentMenuOffsetX) > 0.5) {
      setAccentMenuOffsetX(nextOffset);
    }
  }, [accentMenu, accentMenuOffsetX]);

  useEffect(() => {
    closeAccentMenu();
    setAccentMenuOffsetX(0);
    suppressNextInputRef.current = null;
    clearLongPressTimeout();
  }, [layoutName, variant, disabled, closeAccentMenu, clearLongPressTimeout]);

  const handleLongPressStart = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;

      isKeyboardInteractingRef.current = true;
      if (hideTimeoutRef.current !== null) {
        clearTimeout(hideTimeoutRef.current);
      }

      const keyboardWrapper = keyboardWrapperRef.current;
      if (!keyboardWrapper) return;

      const buttonEl = (event.target as HTMLElement).closest('.hg-button') as HTMLButtonElement | null;
      if (!buttonEl || !keyboardWrapper.contains(buttonEl)) return;

      const sourceKey = buttonEl.getAttribute('data-skbtn') ?? '';
      heldAccentKeyRef.current = null;
      longPressTriggeredRef.current = false;

      if (!sourceKey || sourceKey.startsWith('{')) return;

      const accentOptions = ACCENT_OPTIONS[sourceKey.toLowerCase()];
      if (!accentOptions) return;

      heldAccentKeyRef.current = sourceKey;

      clearLongPressTimeout();

      longPressTimeoutRef.current = setTimeout(() => {
        const buttonRect = buttonEl.getBoundingClientRect();
        const isUpperCaseKey = sourceKey === sourceKey.toUpperCase();
        longPressTriggeredRef.current = true;

        setAccentMenu({
          sourceKey,
          options: isUpperCaseKey
            ? accentOptions.map((option) => option.toUpperCase())
            : accentOptions,
          top: buttonRect.top - 8,
          left: buttonRect.left + buttonRect.width / 2,
        });
        setAccentMenuOffsetX(0);

        suppressNextInputRef.current = sourceKey;
      }, LONG_PRESS_DELAY_MS);
    },
    [disabled, clearLongPressTimeout]
  );

  const handleLongPressEnd = useCallback(() => {
    const heldKey = heldAccentKeyRef.current;
    const longPressTriggered = longPressTriggeredRef.current;
    const baseLayout = variant === 'numeric' ? 'abc' : 'default';

    isKeyboardInteractingRef.current = false;
    clearLongPressTimeout();

    if (heldKey && !longPressTriggered) {
      const currentValue = valueRef.current;
      if (maxLength === undefined || currentValue.length < maxLength) {
        const nextValue = `${currentValue}${heldKey}`;
        onChange?.(nextValue);
        onKeyPress?.(heldKey);
        syncKeyboardInput(nextValue);
      }

      if (layoutName === 'shift' && !capsLockOn) {
        setLayoutName(baseLayout);
      }

      suppressNextInputRef.current = heldKey;
    }

    heldAccentKeyRef.current = null;
    longPressTriggeredRef.current = false;
    scheduleHideIfBlurred();
  }, [
    clearLongPressTimeout,
    scheduleHideIfBlurred,
    maxLength,
    onChange,
    onKeyPress,
    syncKeyboardInput,
    variant,
    layoutName,
    capsLockOn,
  ]);

  const handleAccentSelect = useCallback(
    (accentedChar: string) => {
      const currentValue = valueRef.current;
      const baseLayout = variant === 'numeric' ? 'abc' : 'default';

      if (maxLength !== undefined && currentValue.length >= maxLength) {
        closeAccentMenu();
        suppressNextInputRef.current = null;
        syncKeyboardInput(currentValue);
        return;
      }

      const nextValue = `${currentValue}${accentedChar}`;
      onChange?.(nextValue);
      onKeyPress?.(accentedChar);
      closeAccentMenu();
      suppressNextInputRef.current = null;
      heldAccentKeyRef.current = null;
      longPressTriggeredRef.current = false;

      if (layoutName === 'shift' && !capsLockOn) {
        setLayoutName(baseLayout);
      }

      syncKeyboardInput(nextValue);
    },
    [maxLength, onChange, onKeyPress, closeAccentMenu, syncKeyboardInput, variant, layoutName, capsLockOn]
  );

  const handleKeyPress = useCallback(
    (button: string) => {
      if (disabled) return;

      const baseLayout = variant === 'numeric' ? 'abc' : 'default';

      if (button === '{capslock}' || button === '{lock}') {
        setCapsLockOn((prev) => {
          const next = !prev;
          setLayoutName(next ? 'caps' : baseLayout);
          return next;
        });
        return;
      }

      if (
        button === '{shift}' ||
        button === '{shiftleft}' || button === '{shiftright}' ||
        button === '{shiftactivated}'
      ) {
        if (button === '{shiftactivated}') {
          setCapsLockOn(false);
          setLayoutName(baseLayout);
          return;
        }

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
      if (button === '{smileys}') {
        if (!showSmileysButton) return;
        setLayoutName((prev) => (prev === 'smileys' ? baseLayout : 'smileys'));
        return;
      }
      if (button === '{symbols}') { setLayoutName((prev) => (prev === 'symbols' ? 'alt' : 'symbols')); return; }
      if (button === '{default}' || button === '{back}') {
        setLayoutName(baseLayout);
        return;
      }
      if (button === '{downkeyboard}') {
        setLayoutName(baseLayout);

        if (mode === 'native') {
          closeAccentMenu();
          setIsOpen(false);

          const targetElement = targetRef?.current;
          if (targetElement && document.activeElement === targetElement) {
            targetElement.blur();
          }
        }

        return;
      }

      const isHeldAccentKey = heldAccentKeyRef.current === button;

      if (button !== '{backspace}' && button !== '{bksp}' && button !== '{enter}' && !isHeldAccentKey) {
        if (layoutName === 'shift' && !capsLockOn) {
          setLayoutName(baseLayout);
        } else if (layoutName === baseLayout && capsLockOn) {
          setLayoutName('shift');
        }
      }

      if (isHeldAccentKey) {
        return;
      }

      onKeyPress?.(button);
    },
    [
      disabled,
      variant,
      layoutName,
      capsLockOn,
      onKeyPress,
      showSmileysButton,
      mode,
      closeAccentMenu,
      targetRef,
    ]
  );

  const handleChange = useCallback(
    (input: string) => {
      if (disabled) return;

      const currentValue = valueRef.current;
      const suppressedKey = suppressNextInputRef.current;
      const heldKey = heldAccentKeyRef.current;

      if (
        heldKey &&
        input.length >= currentValue.length + 1 &&
        input.startsWith(currentValue) &&
        input.slice(currentValue.length).split('').every((char) => char === heldKey)
      ) {
        syncKeyboardInput(currentValue);
        return;
      }

      if (
        suppressedKey &&
        input.length === currentValue.length + 1 &&
        input.endsWith(suppressedKey)
      ) {
        suppressNextInputRef.current = null;
        syncKeyboardInput(currentValue);
        return;
      }

      if (maxLength !== undefined && input.length > maxLength) return;
      onChange?.(input);
    },
    [disabled, maxLength, onChange, syncKeyboardInput]
  );

  const keyboardEl = activeLayout ? (
    <div
      ref={keyboardWrapperRef}
      className={styles.keyboardWrapper}
      onPointerDownCapture={handleLongPressStart}
      onPointerUpCapture={handleLongPressEnd}
      onPointerLeave={handleLongPressEnd}
      onPointerCancelCapture={handleLongPressEnd}
    >
      <Keyboard
        keyboardRef={(instance) => {
          keyboardInstanceRef.current = instance as { setInput: (value: string) => void } | null;
          if (instance) {
            (instance as { setInput: (value: string) => void }).setInput(valueRef.current);
          }
        }}
        layoutName={layoutName}
        layout={activeLayout}
        theme={LAYOUT_THEMES[visualVariant] ?? 'hg-theme-default'}
        display={LAYOUT_DISPLAY[visualVariant]}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        input={value}
        preventMouseDownDefault
      />

      {accentMenu && (
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={accentMenuRef}
            className={styles.accentMenu}
            style={{
              top: accentMenu.top,
              left: accentMenu.left + accentMenuOffsetX,
            }}
            role="listbox"
            aria-label={`Opcoes de acento para ${accentMenu.sourceKey}`}
          >
            {accentMenu.options.map((option) => (
              <button
                key={`${accentMenu.sourceKey}-${option}`}
                type="button"
                className={styles.accentOption}
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                onClick={() => handleAccentSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>,
          document.body
        )
      )}
    </div>
  ) : null;

  if (mode === 'native' && typeof document !== 'undefined') {
    return createPortal(
      <div
        id={id}
        className={clsx(
          styles.overlay,
          { [styles.overlayOpen]: isOpen },
          styles[`layout--${visualVariant}`],
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
        styles[`layout--${visualVariant}`],
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
            onChange={onChange}
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

