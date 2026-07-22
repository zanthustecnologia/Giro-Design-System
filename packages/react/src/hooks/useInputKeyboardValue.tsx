import React, { useRef, useCallback } from 'react';

function useInputKeyboardValue<T extends HTMLElement>(externalRef: React.Ref<T> | undefined) {
  const internalRef = useRef<T>(null);

  const setRefs = useCallback(
    (node: T | null) => {
      internalRef.current = node;

      if (typeof externalRef === 'function') {
        externalRef(node);
        return;
      }

      if (externalRef) {
        externalRef.current = node;
      }
    },
    [externalRef]
  );

  return { internalRef, setRefs };
}

export default useInputKeyboardValue;
