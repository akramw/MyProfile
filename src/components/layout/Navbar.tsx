import { useEffect, useMemo, useState } from 'react';
import { profile } from '@/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/Icon';
import { NavDropdown, type NavChild } from './NavDropdown';
import s from './Navbar.module.css';

export type NavLink = { id: string; label: string };
export type NavGroup = { label: string; children: readonly NavChild[] };
export type NavItem = NavLink | NavGroup;

const isGroup = (i: NavItem): i is NavGroup => 'children' in i;

export function Navbar({ items, route }: { items: readonly NavItem[]; route?: string[] | null }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionIds = useMemo(() => items.filter((i): i is NavLink => !isGroup(i)).map((i) => i.id), [items]);
  const observed = useActiveSection(sectionIds);
  const active = route ? '' : observed;
  const currentHref = route ? `#/${route.join('/')}` : undefined;

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
  const renderLinks = (variant: 'popover' | 'inline') => (
    <>
      {items.map((i) =>
        isGroup(i) ? (
          <li key={i.label}>
            <NavDropdown
              label={i.label}
              items={i.children}
              variant={variant}
              currentHref={currentHref}
              onNavigate={close}
            />
          </li>
        ) : (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? 'true' : undefined} onClick={close}>
              {i.label}
            </a>
          </li>
        ),
      )}
      <li>
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" onClick={close}>
          Resume
        </a>
      </li>
    </>
  );

  return (
    <>
    <header className={cn(s.nav, (solid || route) && !open && s.solid)}>
      <div className={cn('wrap xl', s.in)}>
        <a className={s.logo} href="#hero" aria-label="Home" onClick={close}>
          <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <rect width="32" height="32" rx="8" />
            <path d="M7 10l4.5 12L16 13l4.5 9L25 10" />
          </svg>
        </a>
        <ul className={s.links}>{renderLinks('popover')}</ul>
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
      <ul onClick={(e) => e.target instanceof HTMLAnchorElement && close()}>{renderLinks('inline')}</ul>
    </nav>
    </>
  );
}
