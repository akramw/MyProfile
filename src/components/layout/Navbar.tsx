import { useEffect, useState } from 'react';
import { profile } from '@/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/Icon';
import s from './Navbar.module.css';

export type NavItem = { id: string; label: string };

export function Navbar({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [progress, setProgress] = useState(0);
  const active = useActiveSection(items.map((i) => i.id));

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setSolid(window.scrollY > window.innerHeight * 0.6);
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);
  const links = (
    <>
      {items.map((i) => (
        <li key={i.id}>
          <a href={`#${i.id}`} aria-current={active === i.id ? 'true' : undefined} onClick={close}>
            {i.label}
          </a>
        </li>
      ))}
      <li>
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" onClick={close}>
          Resume
        </a>
      </li>
    </>
  );

  return (
    <>
    <header className={cn(s.nav, solid && !open && s.solid)}>
      <div className={cn('wrap xl', s.in)}>
        <ul className={s.links}>{links}</ul>
        <button
          type="button"
          className={s.burger}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
      </div>
      <div className={s.bar} style={{ transform: `scaleX(${progress})` }} />
    </header>
    <nav id="menu" className={cn(s.menu, open && s.menuOpen)} aria-label="Menu" aria-hidden={!open}>
      <ul onClick={(e) => e.target instanceof HTMLAnchorElement && close()}>{links}</ul>
    </nav>
    </>
  );
}
