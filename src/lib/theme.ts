export type Theme = 'light' | 'dark';
const KEY = 'theme';

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function setTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'light' ? '#f5f5f7' : '#000000');
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* storage unavailable: the choice just won't persist */
  }
}
