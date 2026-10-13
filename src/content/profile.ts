import { profileSchema, socialSchema } from '@/schemas';

export const profile = profileSchema.parse({
  name: 'MD Wasim Akram',
  wordmark: 'MD Wasim Akram',
  location: 'Bengaluru, India',
  eyebrow: 'Digital workspace · Endpoint management',
  role: 'Omnissa VMware Workspace ONE Administrator',
  pitch:
    'Designing secure, automated and effortless digital workspaces. Currently at Boeing, Bengaluru — previously Insight and Wipro, with deep expertise in UEM, MDM and identity integration.',
  about:
    "I'm an Associate VMware Workspace ONE Administrator at Boeing, Bengaluru, Karnataka, India. Previously, I've worked at Insight and Wipro, where I honed my skills in VMware Workspace ONE administration and system management. With a deep understanding of VMware technologies, I've architected robust workspace infrastructures, empowering businesses to embrace remote work, BYOD policies, and modern workplace trends. Whether it's integrating identity management systems or fine-tuning access controls, I craft tailored solutions that align with business objectives and regulatory requirements. With a collaborative spirit, I nurture cross-functional teamwork and spearhead VMware Workspace ONE initiatives, automating mundane tasks, integrating disparate systems and building resilient infrastructure to enhance efficiency and foster innovation.",
  email: 'akramw574@gmail.com',
  resumeUrl: 'https://github.com/akramw/profile/raw/main/MdWasimResumeExp7.pdf',
  photo: `${import.meta.env.BASE_URL}wasim-hero.jpg`,
  careerStart: '2017-10',
});

export const socials = socialSchema.array().parse([
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mdwasimakram' },
  { label: 'GitHub', href: 'https://www.github.com/akramw' },
]);
