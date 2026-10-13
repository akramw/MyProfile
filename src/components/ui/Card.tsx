import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useReveal } from '@/hooks/useReveal';
import s from './Card.module.css';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  as?: 'div' | 'article' | 'li';
};

/** Translucent glass panel that sits on the black background and reveals on scroll. */
export function Card({ children, className, delay = 0, style, as: Tag = 'div' }: Props) {
  const { ref, shown } = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      className={cn(s.card, 'reveal', shown && 'shown', className)}
      style={{ ['--d' as string]: `${delay}s`, ...style }}
    >
      {children}
    </Tag>
  );
}
