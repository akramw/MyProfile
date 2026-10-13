import { experience } from '@/content';
import { Card, SectionShell } from '@/components';
import { BrandLogo, brandColor } from '@/components/ui/BrandLogo';
import { formatDuration, formatRange } from '@/lib/dates';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import s from './Experience.module.css';

export function Experience() {
  const { ref, p } = useScrollProgress<HTMLOListElement>(0.62, 0);

  return (
    <SectionShell id="experience" eyebrow="Work" title="From AirWatch support to Workspace ONE administration">
      <ol ref={ref} className={s.rail} style={{ ['--p' as string]: p }}>
        {experience.map((job) => {
          const current = job.end === null;
          return (
            <Card as="li" key={job.id} className={s.job}>
              <span className={current ? `${s.dot} ${s.now}` : s.dot} aria-hidden="true" />
              <div
                className={s.mark}
                style={job.logo ? { color: brandColor(job.logo) } : undefined}
                role="img"
                aria-label={`${job.company} logo`}
              >
                {job.logoSrc ? (
                  <img src={job.logoSrc} alt="" loading="lazy" />
                ) : job.logo ? (
                  <BrandLogo name={job.logo} />
                ) : (
                  <span className={s.word}>{job.company.toLowerCase()}</span>
                )}
              </div>
              <div>
                <h3>{job.role}</h3>
                <p className={s.org}>
                  {job.company}
                  {job.location && ` · ${job.location}`}
                </p>
                <p className={s.dates}>
                  <span>
                    {formatRange(job.start, job.end)}
                    {!current && ` · ${formatDuration(job.start, job.end)}`}
                  </span>
                  {current && <span className={s.live}>Current</span>}
                </p>
              </div>
              <p className={s.body}>{job.summary}</p>
            </Card>
          );
        })}
      </ol>
    </SectionShell>
  );
}
