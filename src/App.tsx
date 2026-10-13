import { siteConfig } from '@/config/site.config';
import { registry } from '@/sections/registry';
import { ErrorBoundary, Footer, Navbar } from '@/components';

export default function App() {
  const active = siteConfig.sections.filter((s) => s.enabled);
  const navItems = active.flatMap((s) => (s.nav ? [{ id: s.id, label: s.nav }] : []));

  return (
    <>
      <a className="skip" href="#stats">
        Skip to content
      </a>
      <Navbar items={navItems} />
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
      <Footer />
    </>
  );
}
