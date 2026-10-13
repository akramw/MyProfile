import { certificationSchema, educationSchema } from '@/schemas';

export const certifications = certificationSchema.array().parse([
  { logo: 'vmware', featured: true, title: 'VMware Certified Professional – Digital Workspace 2023', issuer: 'Credly', href: 'https://www.credly.com/badges/da478925-07eb-40cc-a314-eb65255f7680/linked_in?t=rpg7ij' },
  { logo: 'googlecloud', title: 'Google Associate Cloud Engineer: Google Cloud Platform Ecosystem', issuer: 'Skillsoft', href: 'https://skillsoft.digitalbadges.skillsoft.com/9c9f0b12-9b7a-4933-b7ba-357d756b3d9f' },
  { logo: 'gnubash', title: 'Introduction to Bash Scripting', issuer: 'Skillsoft', href: 'https://skillsoft.digitalbadges.skillsoft.com/0df59678-1e3b-4a90-9b46-2f21ef7b4eda' },
  { logo: 'redhat', title: 'Administration of Red Hat Enterprise Linux 8', issuer: 'Udemy', href: 'http://ude.my/UC-L12SWZ1I' },
  { logo: 'udemy', title: 'Complete Linux Bash Shell Scripting with Real Life Examples', issuer: 'Udemy', href: 'http://ude.my/UC-a3df076d-0e15-425e-85aa-a469b03bf860' },
]);

export const education = educationSchema.parse({
  school: 'West Bengal University of Technology',
  degree: 'Bachelor of Technology, Information Technology',
  year: 'Class of 2016',
});
