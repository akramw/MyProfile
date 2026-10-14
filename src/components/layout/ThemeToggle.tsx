import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { getTheme, setTheme, type Theme } from '@/lib/theme';
import s from './Navbar.module.css';

export function ThemeToggle() {
  const [theme, set] = useState<Theme>(getTheme);
  const next: Theme = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className={s.burger}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={() => {
        setTheme(next);
        set(next);
      }}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
    </button>
  );
}
