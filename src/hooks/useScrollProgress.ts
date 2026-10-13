import { useEffect, useRef, useState } from 'react';

const clamp = (v: number) => Math.max(0, Math.min(1, v));

/** 0 when the element's top reaches `start` of the viewport height, 1 once it has scrolled `span` px further. */
export function useScrollProgress<T extends HTMLElement>(start = 0.85, extra = 0.25) {
  const ref = useRef<T>(null);
  const [p, setP] = useState(1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let tick = false;
    const update = () => {
      tick = false;
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      setP(clamp((vh * start - r.top) / (r.height + vh * extra)));
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [start, extra]);

  return { ref, p };
}
