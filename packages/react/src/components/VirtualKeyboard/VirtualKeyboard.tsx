import clsx from 'clsx';
import React, { createElement, useState, useCallback, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import TextField from '../TextField';
import { LAYOUT_DISPLAY, ICON_KEY_MAP } from './components/IconDisplay';
import { NATIVE_LAYOUT_KEYS, SHIFT_TOGGLES, LAYOUT_THEMES, getNativeLayout } from './components/Variants';
import styles from './VirtualKeyboard.module.scss';

import type { VirtualKeyboardProps } from './VirtualKeyboard.type';
import type { Root } from 'react-dom/client';

const LONG_PRESS_DELAY_MS = 400;

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

/**
 * Componente VirtualKeyboard — teclado virtual on-screen para entradas controladas.
 *
 * @description Baseado em `react-simple-keyboard`, oferece apenas layouts nativos (QWERTY e numérico)
 * seguindo o visual padrão da biblioteca.
 *
 * Possui dois modos:
 * - **`native`** (padrão): age como teclado nativo — aparece ao focar no campo referenciado por `targetRef` e some ao perder o foco.
 * - **`fixed`**: teclado sempre visível com um TextField próprio acima.
 *
 * @example
 * ```tsx
 * // Modo fixed
 * <VirtualKeyboard variant="fixed" type="default" onChange={setValue} />
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
  variant = 'native',
  type = 'default',
  value = '',
  onChange,
  onKeyPress,
  maxLength,
  Emoji = false,
  className,
  id,
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
    getNativeLayout(type, Emoji, variant === 'native')
  );
  const visualType = NATIVE_LAYOUT_KEYS.has(type) ? type : 'default';

  const [isOpen, setIsOpen] = useState(variant !== 'native');
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressNextInputRef = useRef<string | null>(null);
  const heldAccentKeyRef = useRef<string | null>(null);
  const longPressTriggeredRef = useRef(false);
  const isKeyboardInteractingRef = useRef(false);
  const keyboardWrapperRef = useRef<HTMLDivElement | null>(null);
  const keyboardInstanceRef = useRef<{ setInput: (value: string) => void } | null>(null);
  const accentMenuRef = useRef<HTMLDivElement | null>(null);
  const accentButtonRef = useRef<HTMLButtonElement | null>(null);
  const accentMenuOpenRef = useRef(false);
  const valueRef = useRef(value);
  const iconRootsRef = useRef<Root[]>([]);

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
    accentButtonRef.current = null;
  }, []);

  const syncKeyboardInput = useCallback((nextValue: string) => {
    keyboardInstanceRef.current?.setInput(nextValue);
  }, []);

  useEffect(() => {
    syncKeyboardInput(value);
  }, [value, syncKeyboardInput]);

  const scheduleHideIfBlurred = useCallback(() => {
    if (variant !== 'native') return;

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
  }, [variant, targetRef]);

  useEffect(() => {
    if (variant !== 'native') return;

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
  }, [variant, targetRef, scheduleHideIfBlurred]);

  useEffect(() => {
    setLayoutName('default');
    setCapsLockOn(false);

    setActiveLayout(getNativeLayout(type, Emoji, variant === 'native'));
  }, [type, Emoji, variant]);

  useEffect(() => {
    if (!Emoji && layoutName === 'emoticon') {
      setLayoutName(type === 'numeric' ? 'abc' : 'default');
    }
  }, [Emoji, layoutName, type]);

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
    if (!keyboardWrapperRef.current) return;

    const inject = (container: HTMLElement) => {
      container.querySelectorAll<HTMLElement>('[data-icon-key]').forEach((slot) => {
        if (slot.hasAttribute('data-icon-root')) return;
        const key = slot.getAttribute('data-icon-key');
        const Icon = key ? ICON_KEY_MAP[key] : undefined;
        if (!Icon) return;
        slot.setAttribute('data-icon-root', 'true');
        const root = createRoot(slot);
        root.render(createElement(Icon));
        iconRootsRef.current.push(root);
      });
    };

    inject(keyboardWrapperRef.current);

    const observer = new MutationObserver(() => {
      if (keyboardWrapperRef.current) inject(keyboardWrapperRef.current);
    });

    observer.observe(keyboardWrapperRef.current, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      iconRootsRef.current.forEach((root) => { try { root.unmount(); } catch { /* noop */ } });
      iconRootsRef.current = [];
    };
  }, []);

  useEffect(() => {
    closeAccentMenu();
    setAccentMenuOffsetX(0);
    suppressNextInputRef.current = null;
    clearLongPressTimeout();
  }, [layoutName, type, closeAccentMenu, clearLongPressTimeout]);

  useEffect(() => {
    accentMenuOpenRef.current = !!accentMenu;
  }, [accentMenu]);

  useEffect(() => {
    const updateAccentPosition = () => {
      if (!accentMenuOpenRef.current) return;
      const btn = accentButtonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      setAccentMenu((prev) =>
        prev ? { ...prev, top: rect.top - 8, left: rect.left + rect.width / 2 } : null
      );
    };

    window.addEventListener('scroll', updateAccentPosition, { capture: true, passive: true });
    window.addEventListener('resize', updateAccentPosition);

    return () => {
      window.removeEventListener('scroll', updateAccentPosition, true);
      window.removeEventListener('resize', updateAccentPosition);
    };
  }, []);

  const handleLongPressStart = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
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

        accentButtonRef.current = buttonEl;
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
    [clearLongPressTimeout]
  );

  const handleLongPressEnd = useCallback(() => {
    const heldKey = heldAccentKeyRef.current;
    const longPressTriggered = longPressTriggeredRef.current;
    const baseLayout = type === 'numeric' ? 'abc' : 'default';

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
    type,
    layoutName,
    capsLockOn,
  ]);

  const handleAccentSelect = useCallback(
    (accentedChar: string) => {
      const currentValue = valueRef.current;
      const baseLayout = type === 'numeric' ? 'abc' : 'default';

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
    [maxLength, onChange, onKeyPress, closeAccentMenu, syncKeyboardInput, type, layoutName, capsLockOn]
  );

  const handleKeyPress = useCallback(
    (button: string) => {
      const baseLayout = type === 'numeric' ? 'abc' : 'default';

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
      if (button === '{emoticon}') {
        if (!Emoji) return;
        setLayoutName((prev) => (prev === 'emoticon' ? baseLayout : 'emoticon'));
        return;
      }
      if (button === '{symbols}') { setLayoutName((prev) => (prev === 'symbols' ? 'alt' : 'symbols')); return; }
      if (button === '{default}' || button === '{back}') {
        setLayoutName(baseLayout);
        return;
      }
      if (button === '{downkeyboard}') {
        setLayoutName(baseLayout);

        if (variant === 'native') {
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
      type,
      layoutName,
      capsLockOn,
      onKeyPress,
      Emoji,
      variant,
      closeAccentMenu,
      targetRef,
    ]
  );

  const handleChange = useCallback(
    (input: string) => {
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
    [maxLength, onChange, syncKeyboardInput]
  );

  const keyboardDisplay = useMemo(() => {
    const baseDisplay = LAYOUT_DISPLAY[visualType];
    if (!baseDisplay) return baseDisplay;

    if (variant !== 'fixed') {
      return baseDisplay;
    }

    return {
      ...baseDisplay,
      '{bksp}': (baseDisplay['{bksp}'] ?? '').replace(/\s*Apagar$/, ''),
    };
  }, [visualType, variant]);

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
        theme={LAYOUT_THEMES[visualType] ?? 'hg-theme-default'}
        display={keyboardDisplay}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
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

  if (variant === 'native' && typeof document !== 'undefined') {
    return createPortal(
      <div
        id={id}
        className={clsx(
          styles.overlay,
          { [styles.overlayOpen]: isOpen },
          styles[`layout--${visualType}`],
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
        styles[`mode--${variant}`],
        styles[`layout--${visualType}`],
        className
      )}
    >
      {variant === 'fixed' && (
        <div className={styles.textFieldContainer}>
          <TextField
            placeholder={textFieldPlaceholder}
            value={value}
            onChange={onChange}
            helperText={helperText}
            error={error}
            errorMessage={errorMessage}
            readOnly
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

