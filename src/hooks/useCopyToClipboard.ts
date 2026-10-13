import { useCallback, useEffect, useRef, useState } from 'react';

export type CopyState = 'idle' | 'copied' | 'failed';

export function useCopyToClipboard(resetMs = 1800) {
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setState('copied');
      } catch {
        setState('failed');
      }
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setState('idle'), resetMs);
    },
    [resetMs],
  );

  return { state, copy };
}
