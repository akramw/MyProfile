import { projects } from '@/content';
import { Card, Icon, LinkButton, SectionShell } from '@/components';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';
import s from './Projects.module.css';

function Steps({ steps }: { steps: { title: string; caption: string }[] }) {
  const { ref, shown } = useReveal<HTMLOListElement>();
  return (
    <ol ref={ref} className={cn(s.run, shown && s.in)}>
      {steps.map((st, i) => (
        <li key={st.title} style={{ ['--i' as string]: i }}>
          <span className={s.n}>{i + 1}</span>
          <div>
            <b>{st.title}</b>
            <span>{st.caption}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Projects() {
  return (
    <SectionShell id="projects" eyebrow="Projects" title="Selected work">
      <div className={s.stack}>
        {projects.map((p) => (
          <Card key={p.id} className={s.proj}>
            <div>
              {p.logo && (
                <span className={s.badge}>
                  <BrandLogo name={p.logo} />
                </span>
              )}
              <p className="eyebrow">
                {p.company} · {p.date}
              </p>
              <h3>{p.title}</h3>
              <p className={s.d}>{p.summary}</p>
              {p.link && (
                <LinkButton href={p.link.href} className={s.cta}>
                  {p.link.label}
                  <Icon name="ext" />
                </LinkButton>
              )}
            </div>
            <Steps steps={p.steps} />
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
