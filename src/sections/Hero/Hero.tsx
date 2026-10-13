import { profile } from '@/content';
import { Icon, LinkButton } from '@/components';
import s from './Hero.module.css';

export function Hero() {
  return (
    <header id="hero" className={s.hero}>
      <div className={s.photo}>
        <div className={s.figure}>
          <img
            className={s.portrait}
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={1072}
            height={624}
            fetchPriority="high"
          />
        </div>
      </div>
      <div className={`wrap xl ${s.inner}`}>
        <div className={s.copy}>
          <p className={s.eyebrow}>{profile.eyebrow}</p>
          <h1 className={s.name} aria-label={profile.name}>
            <span className="grad" aria-hidden="true">
              {profile.name}
            </span>
          </h1>
          <p className={s.role}>{profile.role}</p>
          <p className={s.lede}>{profile.pitch}</p>
          <div className={s.cta}>
            <LinkButton variant="primary" href="#experience">
              Current status
            </LinkButton>
            <LinkButton href="#contact">
              <Icon name="mail" />
              Get in touch
            </LinkButton>
          </div>
        </div>
      </div>
    </header>
  );
}
