import React, { useEffect, useRef } from 'react';
import introJs from 'intro.js';
import type { IntroJs } from 'intro.js';
import 'intro.js/introjs.css';

import { TourProps } from './Tour.types';

const Tour: React.FC<TourProps> = ({
  steps,
  isOpen,
  onExit,
  onComplete,
  initialStep = 0,
}) => {
  const instanceRef = useRef<IntroJs | null>(null);

  useEffect(() => {
    if (!isOpen) {
      instanceRef.current?.exit(true);
      instanceRef.current = null;
      return;
    }

    const instance = introJs();

    instance.setOptions({
      steps: steps.map((step) => ({
        element: step.element as string | Element | undefined,
        intro: step.intro,
        title: step.title,
        position: step.position,
      })),
      startingStep: initialStep,
    });

    if (onComplete) {
      instance.oncomplete(onComplete);
    }

    if (onExit) {
      instance.onexit(onExit);
    }

    instance.start();
    instanceRef.current = instance;

    return () => {
      instance.exit(true);
      instanceRef.current = null;
    };
  }, [isOpen]);

  return null;
};

export default Tour;
