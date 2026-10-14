import { education } from '@/content';
import { Card, Icon } from '@/components';
import s from './Education.module.css';

export function Education() {
  return (
    <section id="education" className={s.section} aria-label="Education">
      <div className="wrap">
        <Card>
          <a href="https://makautwb.ac.in/" target="_blank" rel="noopener noreferrer" className={s.edu}>
            <div className={s.mark}>
              <img 
                src="public/MAKAUT-Kolkata-Logo.png" 
                alt="Maulana Abul Kalam Azad University of Technology"
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
