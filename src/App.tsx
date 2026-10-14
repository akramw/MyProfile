import { useEffect, useMemo } from 'react';
import { siteConfig } from '@/config/site.config';
import { registry } from '@/sections/registry';
import { platforms, troubleshootHref } from '@/content/troubleshoot';
import { useHashRoute } from '@/hooks/useHashRoute';
import { TroubleshootPage } from '@/pages/TroubleshootPage/TroubleshootPage';
import { ErrorBoundary, Footer, Navbar } from '@/components';
import type { NavItem } from '@/components/layout/Navbar';

const troubleshootGroup: NavItem = {
  label: 'Troubleshoot',
  children: platforms.map((p) => ({ label: p.name, href: troubleshootHref(p.id) })),
};

export default function App() {
  const route = useHashRoute();
  const onTroubleshoot = route?.[0] === 'troubleshoot';
  const active = useMemo(() => siteConfig.sections.filter((s) => s.enabled), []);

  const navItems = useMemo<NavItem[]>(() => {
    const links: NavItem[] = active.flatMap((s) => (s.nav ? [{ id: s.id, label: s.nav }] : []));
    // keep Contact last
    const at = links.findIndex((l) => 'id' in l && l.id === 'contact');
    return at < 0 ? [...links, troubleshootGroup] : [...links.slice(0, at), troubleshootGroup, ...links.slice(at)];
  }, [active]);

  // returning from a routed page to `#section`: the sections mount after the hash change, so scroll then
  useEffect(() => {
    if (route) return;
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, [route]);

  return (
    <>
      <a className="skip" href={onTroubleshoot ? '#content' : '#stats'}>
        Skip to content
      </a>
      <Navbar items={navItems} route={route} />
      {onTroubleshoot ? (
        <ErrorBoundary name="troubleshoot">
          <TroubleshootPage platformId={route[1]} />
        </ErrorBoundary>
      ) : (
        <main>
          {active.map(({ id }) => {
            const Section = registry[id];
            return (
              <ErrorBoundary key={id} name={id}>
                <Section />
              </ErrorBoundary>
            );
          })}
        </main>
      )}
      <Footer />
    </>
  );
}
