import { stepSchema } from '@/schemas';

export const workflow = stepSchema.array().parse([
  { title: 'Enroll', caption: 'Onboard Android, iOS, Windows and macOS devices' },
  { title: 'Configure', caption: 'Profiles, policies and identity integration' },
  { title: 'Deploy', caption: 'Apps and updates, delivered at scale' },
  { title: 'Secure', caption: 'Access control and compliance' },
  { title: 'Monitor', caption: 'Health, logs and reporting' },
  { title: 'Support', caption: 'Troubleshoot, document and train' },
]);
