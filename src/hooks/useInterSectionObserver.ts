import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

export const useIntersectionObserver = (
  setSize: Dispatch<SetStateAction<number>>,
  threshold = 0.1,
) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const observerCallback = useMemo(() => {
    return (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSize(prev => prev + 1);
        }
      });
    };
  }, [setSize]);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [observerCallback, target]);

  return { setTarget };
};
