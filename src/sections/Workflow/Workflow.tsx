import { workflow } from '@/content';
import { Icon, SectionShell } from '@/components';
import type { IconName } from '@/components/ui/Icon';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { cn } from '@/lib/cn';
import s from './Workflow.module.css';

const icons: IconName[] = ['plug', 'sliders', 'cloudUp', 'lock', 'pulse', 'lifebuoy'];

export function Workflow() {
  const { ref, p } = useScrollProgress<HTMLOListElement>(0.85, -0.6);

  return (
    <SectionShell
      id="workflow"
      eyebrow="Workflow"
      title="How I keep the workspace running."
      sub="A repeatable lifecycle for every device, user and application."
    >
      <ol ref={ref} className={s.flow} style={{ ['--p' as string]: p }}>
        {workflow.map((step, i) => (
          <li key={step.title} className={cn(s.step, p >= (i + 0.35) / workflow.length && s.on)}>
            <span className={s.node}>
              <Icon name={icons[i]} size={26} />
            </span>
            <div>
              <b>{step.title}</b>
              <span>{step.caption}</span>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
