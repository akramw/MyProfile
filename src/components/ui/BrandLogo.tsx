import { siBoeing, siGnubash, siGooglecloud, siRedhat, siUdemy, siVmware, siWipro } from 'simple-icons';
import type { BrandLogoName, CompanyLogoName } from '@/schemas';

type LogoName = BrandLogoName | CompanyLogoName;

const logos: Record<LogoName, { title: string; path: string; hex: string }> = {
  vmware: siVmware,
  googlecloud: siGooglecloud,
  gnubash: siGnubash,
  redhat: siRedhat,
  udemy: siUdemy,
  boeing: siBoeing,
  wipro: siWipro,
};

export const brandColor = (name: LogoName) => `#${logos[name].hex}`;

export function BrandLogo({ name }: { name: LogoName }) {
  const l = logos[name];
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={l.title} fill="currentColor" width="100%" height="100%">
      <path d={l.path} />
    </svg>
  );
}
