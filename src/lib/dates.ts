const toMonths = (s: string) => {
  const [y, m] = s.split('-').map(Number);
  return y * 12 + (m - 1);
};

const nowMonths = () => {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
};

export function monthsBetween(start: string, end: string | null) {
  return Math.max(0, (end ? toMonths(end) : nowMonths()) - toMonths(start));
}

export const yearsSince = (start: string) => Math.floor(monthsBetween(start, null) / 12);

const fmt = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });
export const formatMonth = (s: string) => {
  const m = toMonths(s);
  return fmt.format(new Date(Math.floor(m / 12), m % 12, 1));
};

export function formatRange(start: string, end: string | null) {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}

export function formatDuration(start: string, end: string | null) {
  const m = monthsBetween(start, end);
  const y = Math.floor(m / 12);
  const r = m % 12;
  const parts = [y && `${y} year${y > 1 ? 's' : ''}`, r && `${r} month${r > 1 ? 's' : ''}`].filter(Boolean);
  return parts.join(' ') || 'Under a month';
}
