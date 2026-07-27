import introJs from 'intro.js';
import React, { useEffect, useRef } from 'react';
import 'intro.js/introjs.css';

import { OnboardingProps } from './Onboarding.types';
import './Onboarding.module.scss';

import type { Hint } from 'intro.js/src/packages/hint/hint';

type IntroJsInstance = ReturnType<typeof introJs>;

function withDefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;
}

const Onboarding: React.FC<OnboardingProps> = (props) => {
  const tourRef = useRef<IntroJsInstance | null>(null);
  const hintRef = useRef<Hint | null>(null);

  useEffect(() => {
    // — Modo Hint —
    if (props.mode === 'hint') {
      if (!props.isOpen) {
        hintRef.current?.hideHints();
        return;
      }

      const instance = introJs.hint();
      instance.setOptions({
        hints: props.hints.map((h) => ({
          element: h.element as string | HTMLElement,
          hint: h.hint,
          hintPosition: h.hintPosition ?? 'top-middle',
        })),
        ...withDefined({
          hintButtonLabel: props.hintButtonLabel,
          hintAnimation: props.hintAnimation,
          hintShowButton: props.hintShowButton,
          hintAutoRefreshInterval: props.hintAutoRefreshInterval,
          tooltipClass: props.tooltipClass,
        }),
      });

      const rafId = requestAnimationFrame(() => {
        instance.render();
        hintRef.current = instance;
      });

      return () => {
        cancelAnimationFrame(rafId);
        instance.destroy();
        hintRef.current = null;
      };
    }

    // — Modo Tour (padrão) —
    if (!props.isOpen) {
      tourRef.current?.exit(true);
      tourRef.current = null;
      return;
    }

    const instance = introJs();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (instance.setOptions as (o: any) => void)({
      steps: props.steps.map((step) => ({
        element: step.element as string | Element | undefined,
        intro: step.intro,
        title: step.title,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        position: step.position as any,
        tooltipClass: step.tooltipClass,
        highlightClass: step.highlightClass,
        disableInteraction: step.disableInteraction,
        scrollTo: step.scrollTo,
        step: step.step,
      })),
      startingStep: props.initialStep ?? 0,
      prevLabel: props.prevLabel ?? 'Voltar',
      nextLabel: props.nextLabel ?? 'Próximo',
      doneLabel: props.doneLabel ?? 'Concluir',
      skipLabel: props.skipLabel ?? '✕',
      ...withDefined({
        showProgress: props.showProgress,
        showBullets: props.showBullets,
        showButtons: props.showButtons,
        showStepNumbers: props.showStepNumbers,
        tooltipClass: props.tooltipClass,
        highlightClass: props.highlightClass,
        progressBarAdditionalClass: props.progressBarAdditionalClass,
        overlayOpacity: props.overlayOpacity,
        helperElementPadding: props.helperElementPadding,
        tooltipRenderAsHtml: props.tooltipRenderAsHtml,
        exitOnEsc: props.exitOnEsc,
        exitOnOverlayClick: props.exitOnOverlayClick,
        keyboardNavigation: props.keyboardNavigation,
        scrollToElement: props.scrollToElement,
        scrollTo: props.scrollTo,
        scrollPadding: props.scrollPadding,
        disableInteraction: props.disableInteraction,
        nextToDone: props.nextToDone,
        hidePrev: props.hidePrev,
        hideNext: props.hideNext,
        autoPosition: props.autoPosition,
        dontShowAgain: props.dontShowAgain,
        dontShowAgainLabel: props.dontShowAgainLabel,
        dontShowAgainCookie: props.dontShowAgainCookie,
        dontShowAgainCookieDays: props.dontShowAgainCookieDays,
      }),
    });

    if (props.onComplete) instance.oncomplete(props.onComplete);
    if (props.onExit)     instance.onexit(props.onExit);
    if (props.onSkip)     instance.onskip(props.onSkip);
    if (props.onStart)    instance.onstart(props.onStart as () => void);
    if (props.onChange)   instance.onchange(props.onChange as () => void);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (props.onBeforeChange) instance.onbeforechange(props.onBeforeChange as any);
    if (props.onAfterChange)  instance.onafterchange(props.onAfterChange as () => void);
    if (props.onBeforeExit)   instance.onbeforeexit(props.onBeforeExit);

    instance.start();
    tourRef.current = instance;

    return () => {
      instance.exit(true);
      tourRef.current = null;
    };
    // A dependência é intencional: o tour é completamente recriado apenas quando isOpen ou mode muda.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen, props.mode]);

  return null;
};

export default Onboarding;

