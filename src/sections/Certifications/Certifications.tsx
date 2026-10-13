import { useState, type CSSProperties, type PointerEvent } from 'react';
import { certifications } from '@/content';
import { Icon, SectionShell } from '@/components';
import { BrandLogo, brandColor } from '@/components/ui/BrandLogo';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';
import type { Certification } from '@/schemas';
import s from './Certifications.module.css';

/** left cards enter from the left, right cards from the right, the middle one rises */
const from = (i: number) => {
  const mid = (certifications.length - 1) / 2;
  return i < mid ? s.fromLeft : i > mid ? s.fromRight : s.fromBottom;
};

function Cert({ c, i }: { c: Certification; i: number }) {
  const { ref, shown } = useReveal<HTMLAnchorElement>();
  const [pos, setPos] = useState<{ x: number; y: number }>();

  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const style = {
    ['--d' as string]: `${i * 0.1}s`,
    ['--brand' as string]: c.logo ? brandColor(c.logo) : '#f5f5f7',
    ['--mx' as string]: pos ? `${pos.x}px` : '50%',
    ['--my' as string]: pos ? `${pos.y}px` : '0px',
  } as CSSProperties;

  return (
    <li className={s.cell}>
      <a
        ref={ref}
        className={cn(s.card, from(i), shown && s.shown, c.featured && s.featured)}
        style={style}
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${c.title}, ${c.issuer}`}
        onPointerMove={move}
      >
        <span className={s.top}>
          {c.featured ? <span className={s.badge}>Featured</span> : <span />}
          <span className={s.go}>
            <Icon name="ext" />
          </span>
        </span>
        <span className={s.logo}>
          {c.logo ? <BrandLogo name={c.logo} /> : <b>{c.title[0]}</b>}
        </span>
        <span className={s.meta}>
          <b>{c.title}</b>
          <small>
            {c.issuer}
            {c.date && ` · ${c.date}`}
          </small>
        </span>
      </a>
    </li>
  );
}

export function Certifications() {
  return (
    <SectionShell
      id="certifications"
      eyebrow="Certification"
      title="Credentials"
      sub="Verified badges and course certificates. Select a card to open the original."
    >
      <ul className={s.grid}>
        {certifications.map((c, i) => (
          <Cert key={c.href} c={c} i={i} />
        ))}
      </ul>
    </SectionShell>
  );
}
