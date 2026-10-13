import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string(),
  wordmark: z.string(),
  location: z.string(),
  eyebrow: z.string(),
  role: z.string(),
  pitch: z.string(),
  about: z.string(),
  email: z.string().email(),
  resumeUrl: z.string(),
  photo: z.string(),
  careerStart: z.string().regex(/^\d{4}-\d{2}$/),
});
export type Profile = z.infer<typeof profileSchema>;

export const socialSchema = z.object({ label: z.string(), href: z.string().url() });
export type Social = z.infer<typeof socialSchema>;

export const companyLogos = ['boeing', 'wipro'] as const;
export type CompanyLogoName = (typeof companyLogos)[number];

export const experienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  location: z.string().optional(),
  mark: z.string().max(2),
  logo: z.enum(companyLogos).optional(),
  logoSrc: z.string().optional(),
  start: z.string().regex(/^\d{4}-\d{2}$/),
  end: z.string().regex(/^\d{4}-\d{2}$/).nullable(),
  summary: z.string(),
});
export type Experience = z.infer<typeof experienceSchema>;

export const stepSchema = z.object({ title: z.string(), caption: z.string() });
export type Step = z.infer<typeof stepSchema>;

export const projectSchema = z.object({
  id: z.string(),
  company: z.string(),
  date: z.string(),
  title: z.string(),
  summary: z.string(),
  link: z.object({ label: z.string(), href: z.string().url() }).optional(),
  steps: z.array(stepSchema),
});
export type Project = z.infer<typeof projectSchema>;

export const skillIcons = [
  'smartphone', 'monitor', 'laptop', 'terminal', 'server', 'shield', 'users', 'cloud', 'boxes',
  'git', 'ticket', 'key', 'rocket', 'activity', 'file', 'headset', 'layers', 'wrench', 'fingerprint',
  'refresh', 'cpu', 'lock', 'settings',
] as const;
export type SkillIconName = (typeof skillIcons)[number];

export const skillItemSchema = z.object({ name: z.string(), icon: z.enum(skillIcons) });
export type SkillItem = z.infer<typeof skillItemSchema>;

export const skillGroupSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.enum(skillIcons),
  items: z.array(skillItemSchema).min(1),
  primary: z.string().optional(),
});
export type SkillGroup = z.infer<typeof skillGroupSchema>;

export const brandLogos = ['vmware', 'googlecloud', 'gnubash', 'redhat', 'udemy'] as const;
export type BrandLogoName = (typeof brandLogos)[number];

export const certificationSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  href: z.string().url(),
  logo: z.enum(brandLogos).optional(),
  date: z.string().optional(),
  featured: z.boolean().optional(),
});
export type Certification = z.infer<typeof certificationSchema>;

export const educationSchema = z.object({
  school: z.string(),
  degree: z.string(),
  year: z.string(),
});
export type Education = z.infer<typeof educationSchema>;
