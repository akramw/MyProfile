import { useState, type PointerEvent } from 'react';
import { skills } from '@/content';
import { SectionShell, TagList } from '@/components';
import { SkillIcon } from '@/components/ui/SkillIcon';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';
import type { SkillGroup } from '@/schemas';
import s from './Skills.module.css';

function Group({ g, index }: { g: SkillGroup; index: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  const spot = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      className={cn(s.card, 'reveal', shown && 'shown')}
      style={{ ['--d' as string]: `${index * 0.1}s` }}
      onPointerMove={spot}
    >
      <div className={s.cardHead}>
        <span className={s.badge}>
          <SkillIcon name={g.icon} size={22} />
        </span>
        <h3>{g.title}</h3>
        <span className={s.count}>{String(g.items.length).padStart(2, '0')}</span>
      </div>
      <TagList items={g.items} primary={g.primary} active={shown} />
    </div>
  );
}

const platforms = skills.find((g) => g.id === 'platforms')?.items ?? [];

export function Skills() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? skills : skills.filter((g) => g.id === filter);

  return (
    <SectionShell id="skills" eyebrow="Skills" title="Platforms, practices and tools">
      <div className={s.marquee} aria-hidden="true">
        <div className={s.track}>
          {[0, 1].map((n) => (
            <ul key={n} className={s.run}>
              {platforms.map((p) => (
                <li key={p.name}>
                  <SkillIcon name={p.icon} size={18} />
                  {p.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className={s.filters} role="group" aria-label="Filter skills">
        {[{ id: 'all', title: 'All' }, ...skills].map((f) => (
          <button
            key={f.id}
            type="button"
            className={cn(s.chip, filter === f.id && s.chipOn)}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.title}
          </button>
        ))}
      </div>

      <div className={cn(s.groups, filter !== 'all' && s.single)} key={filter}>
        {visible.map((g, i) => (
          <Group key={g.id} g={g} index={i} />
        ))}
      </div>
    </SectionShell>
  );
}
