'use client';

import React, { useEffect } from 'react';

export function useDetectRef(
  ref: React.RefObject<Node>,
  handler: (event: Event) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        !ref.current ||
        (event.target instanceof Node && ref.current.contains(event.target))
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
}
