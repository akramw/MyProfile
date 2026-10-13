import { education } from '@/content';
import { Card, Icon } from '@/components';
import s from './Education.module.css';

export function Education() {
  return (
    <section id="education" className={s.section} aria-label="Education">
      <div className="wrap">
        <Card className={s.edu}>
          <div className={s.mark}>
            <Icon name="cap" size={26} />
          </div>
          <div>
            <h3>{education.school}</h3>
            <p>
              {education.degree} · {education.year}
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
