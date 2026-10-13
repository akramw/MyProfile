const paths = {
  ext: 'M7 17L17 7M9 7h8v8',
  mail: 'M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z',
  copy: 'M11 9h7a2 2 0 012 2v7a2 2 0 01-2 2h-7a2 2 0 01-2-2v-7a2 2 0 012-2zM5 15V6a2 2 0 012-2h9',
  menu: 'M4 8h16M4 16h16',
  close: 'M6 6l12 12M18 6L6 18',
  down: 'M12 3v12m0 0l-4-4m4 4l4-4M4 20h16',
  cert: 'M12 4a5 5 0 100 10 5 5 0 000-10zM9 13.5L8 21l4-2 4 2-1-7.5',
  cap: 'M2 9l10-5 10 5-10 5-10-5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5',
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={size ? { width: size, height: size } : undefined}
    >
      <path d={paths[name]} />
    </svg>
  );
}
