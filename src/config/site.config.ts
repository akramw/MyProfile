export const siteConfig = {
  sections: [
    { id: 'hero', enabled: true, nav: null },
    { id: 'stats', enabled: true, nav: 'About' },
    { id: 'experience', enabled: true, nav: 'Work' },
    { id: 'workflow', enabled: true, nav: null },
    { id: 'skills', enabled: true, nav: 'Skills' },
    { id: 'projects', enabled: true, nav: 'Projects' },
    { id: 'certifications', enabled: true, nav: 'Certification' },
    { id: 'education', enabled: true, nav: null },
    { id: 'contact', enabled: true, nav: 'Contact' },
  ],
} as const;

export type SectionId = (typeof siteConfig.sections)[number]['id'];
