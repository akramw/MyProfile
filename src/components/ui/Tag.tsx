import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import type { SkillItem } from '@/schemas';
import { SkillIcon } from './SkillIcon';
import s from './Tag.module.css';

export function Tag({ item, primary, index = 0 }: { item: SkillItem; primary?: boolean; index?: number }) {
  return (
    <span className={cn(s.tag, primary && s.primary)} style={{ ['--i' as string]: index } as CSSProperties}>
      <SkillIcon name={item.icon} />
      {item.name}
    </span>
  );
}

export function TagList({
  items,
  primary,
  active = true,
}: {
  items: readonly SkillItem[];
  primary?: string;
  active?: boolean;
}) {
  return (
    <ul className={cn(s.list, active && s.on)}>
      {items.map((t, i) => (
        <li key={t.name}>
          <Tag item={t} index={i} primary={t.name === primary} />
        </li>
      ))}
    </ul>
  );
}
