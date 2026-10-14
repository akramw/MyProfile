import { profileSchema, socialSchema } from '@/schemas';

export const profile = profileSchema.parse({
  name: 'MD Wasim Akram',
  wordmark: 'MD Wasim Akram',
  location: 'Bengaluru, India',

  eyebrow: 'ENTERPRISE MOBILITY · UEM · MODERN ENDPOINT MANAGEMENT · AUTOMATION',

  role: 'Enterprise Mobility & Endpoint Management Engineer',

  pitch:
    'I help enterprise teams secure, manage, and optimize devices through scalable endpoint management, compliance, identity integration, and automation. Specializing in Omnissa Workspace ONE UEM, with experience working with Microsoft Intune.',

  about:
    "Hi, I'm Wasim — an Enterprise Mobility and Endpoint Management Engineer based in Bengaluru, India. With 8+ years of experience in enterprise IT, I specialize in mobile device management, endpoint security, and digital workspace technologies. Throughout my career at Wipro, Insight, and Boeing, I've worked on managing enterprise devices, troubleshooting complex technical issues, and maintaining reliable device management environments.\n\nMy core expertise is in Omnissa Workspace ONE UEM, with experience working with Microsoft Intune as I continue to expand my capabilities across modern endpoint management platforms. I work primarily with Android and iOS devices, focusing on device enrollment, application deployment, compliance policies, configuration profiles, identity integration, and enterprise mobility operations.\n\nWhat I enjoy most is solving technical challenges, improving operational efficiency, and finding practical ways to automate repetitive tasks. I believe effective endpoint management is about more than managing devices — it's about creating secure, seamless, and reliable experiences for the people who use them.\n\nI'm continuously learning and building my expertise in enterprise mobility architecture, automation, and cross-platform endpoint management to help organizations simplify IT operations and strengthen endpoint security.",

  email: 'akramw574@gmail.com',

  resumeUrl:
    'https://github.com/akramw/profile/raw/main/MdWasimResumeExp7.pdf',

  photo: `${import.meta.env.BASE_URL}wasim-hero.jpg`,

  careerStart: '2017-10',
});

export const socials = socialSchema.array().parse([
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mdwasimakram',
  },
  {
    label: 'GitHub',
    href: 'https://www.github.com/akramw',
  },
]);
