import { Fragment, useState } from 'react';
import type { Troubleshooter } from '@/schemas';
import { Card } from '@/components/ui/Card';
import s from './TroubleshootPage.module.css';

/** Renders `code` and [text](url) inline; everything else stays plain text. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>;
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(p);
        if (m)
          return (
            <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer">
              {m[1]}
            </a>
          );
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

export function EnrollmentTroubleshooter({ data }: { data: Troubleshooter }) {
  const [active, setActive] = useState(data.tabs[0].id);
  const tab = data.tabs.find((t) => t.id === active) ?? data.tabs[0];

  return (
    <section className={s.ts} aria-labelledby="ts-title">
      <p className="eyebrow">Troubleshooter</p>
      <h2 id="ts-title" className={s.tsTitle}>
        {data.title}
      </h2>
      <p className={s.sub}>{data.intro}</p>

      <div className={s.tabs} role="tablist" aria-label={data.title}>
        {data.tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`ts-tab-${t.id}`}
            aria-selected={t.id === tab.id}
            aria-controls="ts-panel"
            className={s.tab}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id="ts-panel" aria-labelledby={`ts-tab-${tab.id}`} key={tab.id}>
        <h3 className={s.panelHead}>{tab.heading}</h3>
        {tab.quickChecks.length > 0 && (
          <ul className={s.tags} aria-label="Quick checks">
            {tab.quickChecks.map((c) => (
              <li key={c}>
                <Rich text={c} />
              </li>
            ))}
          </ul>
        )}

        <ul className={s.list}>
          {tab.items.map((i, n) => (
            <li key={i.title}>
              <Card as="article" delay={n * 0.04} className={s.article}>
                <p className={s.issueTag}>{i.tag}</p>
                <h2>{i.title}</h2>
                <p className={s.summary}>
                  <Rich text={i.cause} />
                </p>
                <ol className={s.steps}>
                  {i.fix.map((f) => (
                    <li key={f}>
                      <Rich text={f} />
                    </li>
                  ))}
                </ol>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
