import { profile } from '@/content';
import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className="wrap xl">
        © {new Date().getFullYear()} {profile.name} · {profile.location}
      </div>
    </footer>
  );
}
