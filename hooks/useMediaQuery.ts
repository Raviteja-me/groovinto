'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(queryString: string, initial = false) {
  const [matches, setMatches] = useState(initial);

  useEffect(() => {
    const mql = window.matchMedia(queryString);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [queryString]);

  return matches;
}

export function useIsTouch() {
  return useMediaQuery('(pointer: coarse)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}
