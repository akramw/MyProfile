import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/Icon';
import s from './Navbar.module.css';

export type NavChild = { label: string; href: string };

type Props = {
  label: string;
  items: readonly NavChild[];
  /** 'popover' floats under the button (desktop bar); 'inline' expands in place (full-screen menu). */
  variant: 'popover' | 'inline';
  currentHref?: string;
  onNavigate?: () => void;
};

export function NavDropdown({ label, items, variant, currentHref, onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || variant !== 'popover') return;
    const onDown = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, variant]);

  return (
    <div ref={root} className={cn(s.dd, s[variant])}>
      <button
        type="button"
        className={cn(s.ddBtn, open && s.ddOpen)}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <Icon name="chevron" size={16} />
      </button>
      {open && (
        <ul className={s.ddList}>
          {items.map((c) => (
            <li key={c.href}>
              <a
                href={c.href}
                aria-current={currentHref === c.href ? 'true' : undefined}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
