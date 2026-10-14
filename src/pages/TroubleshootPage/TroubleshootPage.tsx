import { useMemo, useState } from 'react';
import { getPlatform } from '@/content/troubleshoot';
import { EnrollmentTroubleshooter } from './EnrollmentTroubleshooter';
import { Card } from '@/components/ui/Card';
import s from './TroubleshootPage.module.css';

/** Generic page: renders whichever platform the route names, entirely from data. */
export function TroubleshootPage({ platformId }: { platformId?: string }) {
  const platform = getPlatform(platformId);
  const [query, setQuery] = useState('');

  const articles = useMemo(() => {
    if (!platform) return [];
    const q = query.trim().toLowerCase();
    if (!q) return platform.articles;
    return platform.articles.filter((a) =>
      [a.title, a.summary, ...a.tags].some((t) => t.toLowerCase().includes(q)),
    );
  }, [platform, query]);

  if (!platform) {
    return (
      <main id="content" className={s.page}>
        <div className="wrap">
          <p className="eyebrow">Troubleshoot</p>
          <h1 className={`grad ${s.title}`}>Page not found</h1>
          <p className={s.sub}>That troubleshooting guide doesn't exist.</p>
          <a className={s.back} href="#hero">
            ← Back home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main id="content" className={s.page}>
      <div className="wrap">
        <a className={s.back} href="#hero">
          ← Back home
        </a>
        <p className="eyebrow">Troubleshoot</p>
        <h1 key={platform.id} className={`grad ${s.title}`}>
          {platform.name}
        </h1>
        <p className={s.sub}>{platform.tagline}</p>

        {platform.troubleshooter && (
          <EnrollmentTroubleshooter key={platform.id} data={platform.troubleshooter} />
        )}

        <label className={s.search}>
          <span className="sr-only">Search {platform.name} guides</span>
          <input
            type="search"
            placeholder="Search issues, e.g. enrollment, compliance…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        {articles.length === 0 ? (
          <p className={s.sub}>No guides match "{query}".</p>
        ) : (
          <ul className={s.list}>
            {articles.map((a, i) => (
              <li key={`${platform.id}-${a.id}`}>
                <Card as="article" delay={i * 0.05} className={s.article}>
                  {a.errorCode && <p className={s.errorCode}>{a.errorCode}</p>}
                  <h2>{a.title}</h2>
                  <p className={s.summary}>{a.summary}</p>
                  {a.tags.length > 0 && (
                    <ul className={s.tags}>
                      {a.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                  <ol className={s.steps}>
                    {a.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  {a.fix && (
                    <p className={s.fix}>
                      <b>Resolution:</b> {a.fix}
                    </p>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
