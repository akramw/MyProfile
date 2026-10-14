import { profile, socials } from '@/content';
import { Button, Icon, LinkButton } from '@/components';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';
import s from './Contact.module.css';

export function Contact() {
  const { state, copy } = useCopyToClipboard();
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className={s.section} aria-labelledby="contact-title">
      <div ref={ref} className={cn('wrap xl', 'reveal', shown && 'shown')}>
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title" className={`grad ${s.title}`}>
          Let&apos;s talk.
        </h2>
        <p className={s.sub}>Message me on LinkedIn or email me directly.</p>
        <div className={s.mail}>
          <span className={s.addr}>{profile.email}</span>
          <Button small onClick={() => copy(profile.email)}>
            <Icon name="copy" />
            Copy
          </Button>
          <span className={s.status} role="status" aria-live="polite">
            {state === 'copied' ? 'Copied' : state === 'failed' ? 'Select and copy' : ''}
          </span>
        </div>
        <div className={s.soc}>
          {socials.map((so, i) => (
            <LinkButton key={so.label} href={so.href} variant={i === 0 ? 'primary' : 'ghost'}>
              <Icon name={so.label === 'GitHub' ? 'github' : 'linkedin'} />
              {so.label}
            </LinkButton>
          ))}
          <LinkButton href={`mailto:${profile.email}`}>
            <Icon name="mail" />
            Open mail app
          </LinkButton>
          <LinkButton href={profile.resumeUrl}>
            <Icon name="down" />
            Resume
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
