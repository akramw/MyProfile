import { stepSchema } from '@/schemas';

export const workflow = stepSchema.array().parse([
  { title: 'Enroll', caption: 'Onboard Android, iOS, Windows & macOS devices' },
  { title: 'Configure', caption: 'Profiles, policies & identity integration' },
  { title: 'Deploy', caption: 'Apps & updates, delivered at scale' },
  { title: 'Secure', caption: 'Access control & compliance' },
  { title: 'Monitor', caption: 'Health, logs & reporting' },
  { title: 'Support', caption: 'Troubleshoot, document & train' },
]);
