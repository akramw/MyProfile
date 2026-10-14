import { education } from '@/content';
import { Card } from '@/components';
import s from './Education.module.css';

export function Education() {
  return (
    <section id="education" className={s.section} aria-label="Education">
      <div className="wrap">
        <Card className={s.edu}>
          <a 
            href="https://makautwb.ac.in/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={s.link}
          >
            <div className={s.mark}>
              <img 
                src="/MAKAUT-Kolkata-Logo.png" 
                alt="MAKAUT Logo" 
                className={s.logo} 
              />
            </div>
            <div>
              <h3>{education.school}</h3>
              <p>
                {education.degree} · {education.year}
              </p>
            </div>
          </a>
        </Card>
      </div>
    </section>
  );
}
