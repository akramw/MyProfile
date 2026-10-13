import { useEffect, useRef, useState } from 'react';
import { certifications, experience, profile } from '@/content';
import { yearsSince } from '@/lib/dates';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';
import s from './Stats.module.css';

function Counter({ to }: { to: number }) {
  const [v, setV] = useState(to);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setV(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1400);
          setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.8 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <b ref={ref}>{v}</b>;
}

export function Stats() {
  const { ref, p } = useScrollProgress<HTMLParagraphElement>();
  const { ref: gridRef, shown } = useReveal<HTMLDivElement>();
  const words = profile.about.split(' ');
  const stats = [
    { value: yearsSince(profile.careerStart), label: 'Years in endpoint management' },
    { value: new Set(experience.map((e) => e.company)).size, label: 'Enterprises: Wipro, Insight, Boeing' },
    { value: certifications.length, label: 'Certifications' },
  ];

  return (
    <section id="stats" className={s.section} aria-label="About">
      <div className="wrap">
        <p className="eyebrow">About</p>
        <p ref={ref} className={s.about}>
          {words.map((w, i) => (
            <span key={i} className={cn(s.aw, p >= i / words.length && s.on)}>
              {w}{' '}
            </span>
          ))}
        </p>
        <div ref={gridRef} className={cn(s.stats, 'reveal', shown && 'shown')}>
          {stats.map((st) => (
            <div key={st.label} className={s.stat}>
              <Counter to={st.value} />
              <span>{st.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
