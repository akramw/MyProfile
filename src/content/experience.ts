import { experienceSchema } from '@/schemas';

export const experience = experienceSchema.array().parse([
  {
    id: 'boeing',
    role: 'Associate VMware Workspace ONE Administrator',
    company: 'Boeing',
    location: 'Bengaluru',
    mark: 'B',
    logoSrc: '/logos/boeing.svg',
    start: '2023-12',
    end: null,
    summary:
      'Managing and supporting the Workspace ONE platform: implementation, configuration and deployment, user support, security management, monitoring and maintenance, documentation and training.',
  },
  {
    id: 'insight',
    role: 'Mobility Engineer',
    company: 'Insight',
    mark: 'I',
    logoSrc: '/logos/insight.png',
    start: '2022-01',
    end: '2023-12',
    summary:
      'Deployed, configured, documented and integrated Workspace ONE UEM for Android, iOS, Windows, macOS and VR devices against business requirements and best practice.',
  },
  {
    id: 'wipro',
    role: 'MDM Administrator',
    company: 'Wipro',
    mark: 'W',
    logoSrc: '/logos/wipro.svg',
    start: '2017-10',
    end: '2022-01',
    summary:
      'AirWatch administrator supporting banking users by call, mail and remote: app install, deployment and upgrade, enrolment and technical support. Moved into full Mobile Device Management after the first year.',
  },
]);
