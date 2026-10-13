import { profile, socials } from '@/content';
import { Icon } from '@/components/ui/Icon';
import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`wrap xl ${s.in}`}>
        <span>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </span>
        <span className={s.right}>
          {socials.map((so) => (
            <a key={so.label} href={so.href} target="_blank" rel="noopener noreferrer" aria-label={so.label}>
              <Icon name={so.label === 'GitHub' ? 'github' : 'linkedin'} size={18} />
            </a>
          ))}
          <a href="#hero" className={s.top}>
            Back to top <Icon name="up" size={16} />
          </a>
        </span>
      </div>
    </footer>
  );
}
