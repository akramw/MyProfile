import {
  siAndroid, siApple, siBoeing, siGit, siGnubash, siGooglecloud, siJira, siLinux, siRedhat, siUdemy,
  siVirtualbox, siVmware, siWipro,
} from 'simple-icons';

const logos = {
  vmware: siVmware,
  googlecloud: siGooglecloud,
  gnubash: siGnubash,
  redhat: siRedhat,
  udemy: siUdemy,
  boeing: siBoeing,
  wipro: siWipro,
  android: siAndroid,
  apple: siApple,
  linux: siLinux,
  git: siGit,
  jira: siJira,
  virtualbox: siVirtualbox,
};

export type LogoName = keyof typeof logos;

/** brand colour, or near-white when the brand colour would vanish on the dark theme */
export const brandColor = (name: LogoName) => {
  const hex = logos[name].hex;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return (r * 299 + g * 587 + b * 114) / 1000 < 60 ? '#f5f5f7' : `#${hex}`;
};

export function BrandLogo({ name }: { name: LogoName }) {
  const l = logos[name];
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={l.title} fill="currentColor" width="100%" height="100%">
      <path d={l.path} />
    </svg>
  );
}
