import {
  Activity, Boxes, Cloud, Cpu, FileText, Fingerprint, GitBranch, Headset, Key, Laptop, Layers,
  Monitor, Rocket, Server, Settings, ShieldCheck, Smartphone, Terminal, Ticket, Users, Wrench,
  RefreshCw, Lock, type LucideIcon,
} from 'lucide-react';
import type { SkillIconName } from '@/schemas';

const map: Record<SkillIconName, LucideIcon> = {
  smartphone: Smartphone,
  monitor: Monitor,
  laptop: Laptop,
  terminal: Terminal,
  server: Server,
  shield: ShieldCheck,
  users: Users,
  cloud: Cloud,
  boxes: Boxes,
  git: GitBranch,
  ticket: Ticket,
  key: Key,
  rocket: Rocket,
  activity: Activity,
  file: FileText,
  headset: Headset,
  layers: Layers,
  wrench: Wrench,
  fingerprint: Fingerprint,
  refresh: RefreshCw,
  cpu: Cpu,
  lock: Lock,
  settings: Settings,
};

export function SkillIcon({ name, size = 16 }: { name: SkillIconName; size?: number }) {
  const I = map[name];
  return <I size={size} strokeWidth={1.75} aria-hidden="true" focusable="false" />;
}
