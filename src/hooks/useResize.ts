import { useRef, useCallback, useEffect, useState } from 'react';

interface WindowDimensions {
  width: number;
  height: number;
}

const DEBOUNCE_TIMEOUT = 300;

export const useResize = () => {
  const timeoutRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }, DEBOUNCE_TIMEOUT);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dimensions;
};
