import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useReveal } from '@/hooks/useReveal';
import s from './SectionShell.module.css';

type Props = {
  id: string;
  eyebrow?: string;
  title?: string;
  sub?: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, eyebrow, title, sub, children, className }: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section id={id} className={cn(s.section, className)} aria-labelledby={title ? `${id}-title` : undefined}>
      <div className="wrap">
        {(eyebrow || title) && (
          <div ref={ref} className={cn(s.head, 'reveal', shown && 'shown')}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 id={`${id}-title`} className="grad">{title}</h2>}
            {sub && <p className={s.sub}>{sub}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
