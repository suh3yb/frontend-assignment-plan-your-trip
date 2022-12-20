import { useEffect } from 'react';

const listenerCallbacks = new WeakMap();

let observer: IntersectionObserver | undefined;

const handleIntersections: IntersectionObserverCallback = entries => {
  entries.forEach(entry => {
    if (listenerCallbacks.has(entry.target)) {
      const cb = listenerCallbacks.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer?.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
};

const getIntersectionObserver = (): IntersectionObserver => {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '100px',
      threshold: 0.15,
    });
  }
  return observer;
};

export const useIntersection = <T extends Element>(
  elem: React.RefObject<T>,
  callback: () => void
): void => {
  useEffect(() => {
    const target = elem.current;
    if (!target) return;

    const observer = getIntersectionObserver();
    listenerCallbacks.set(target, callback);
    observer.observe(target);

    return () => {
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
  }, []);
};
