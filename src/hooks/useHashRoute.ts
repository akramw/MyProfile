import { useEffect, useState } from 'react';

/** Segments of a `#/a/b` hash route, or null for plain `#section` anchors / no hash. */
const read = (): string[] | null => {
  const h = window.location.hash;
  return h.startsWith('#/') ? h.slice(2).split('/').filter(Boolean) : null;
};

export function useHashRoute() {
  const [path, setPath] = useState(read);
  const key = path?.join('/') ?? '';

  useEffect(() => {
    const onChange = () => setPath(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  // entering or switching a routed page starts at the top
  useEffect(() => {
    if (key) window.scrollTo(0, 0);
  }, [key]);

  return path;
}
