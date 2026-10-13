import type { ComponentType } from 'react';
import type { SectionId } from '@/config/site.config';
import { Hero } from './Hero';
import { Stats } from './Stats';
import { Experience } from './Experience';
import { Workflow } from './Workflow';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { Certifications } from './Certifications';
import { Education } from './Education';
import { Contact } from './Contact';

export const registry: Record<SectionId, ComponentType> = {
  hero: Hero,
  stats: Stats,
  experience: Experience,
  workflow: Workflow,
  skills: Skills,
  projects: Projects,
  certifications: Certifications,
  education: Education,
  contact: Contact,
};
