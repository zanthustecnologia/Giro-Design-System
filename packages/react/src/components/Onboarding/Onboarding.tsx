import React, { useEffect, useRef } from 'react';
import introJs from 'intro.js';
import type { IntroJs } from 'intro.js';
import type { Hint } from 'intro.js/src/packages/hint/hint';
import 'intro.js/introjs.css';
import './Onboarding.module.scss';

import { OnboardingProps } from './Onboarding.types';

const Onboarding: React.FC<OnboardingProps> = (props) => {
  const tourRef = useRef<IntroJs | null>(null);
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

    instance.setOptions({
      steps: props.steps.map((step) => ({
        element: step.element as string | Element | undefined,
        intro: step.intro,
        title: step.title,
        position: step.position,
      })),
      startingStep: props.initialStep ?? 0,
      prevLabel: 'Voltar',
      nextLabel: 'Próximo',
      doneLabel: 'Concluir',
      skipLabel: '✕',
    });

    if (props.onComplete) {
      instance.oncomplete(props.onComplete);
    }

    if (props.onExit) {
      instance.onexit(props.onExit);
    }

    instance.start();
    tourRef.current = instance;

    return () => {
      instance.exit(true);
      tourRef.current = null;
    };
  }, [props.isOpen, props.mode]);

  return null;
};

export default Onboarding;

