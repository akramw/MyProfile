import { projectSchema } from '@/schemas';

export const projects = projectSchema.array().parse([
  {
    id: 'ws1-upgrade',
    logo: 'vmware',
    company: 'Wipro',
    date: 'Dec 2021',
    title: 'Workspace ONE UEM upgrade and inter-migration',
    summary:
      'Upgrade and migrate data, configuration and workflows from the existing Workspace ONE UEM to the latest version, with minimal disruption and full use of the new features.',
    link: {
      label: 'Vendor upgrade guide',
      href: 'https://docs.vmware.com/en/VMware-Workspace-ONE-UEM/2306/UEM_Upgrade/GUID-AWT-UPGRADEINTRO.html',
    },
    steps: [
      { title: 'Check prerequisites', caption: 'Hardware, software and compatibility' },
      { title: 'Prepare', caption: 'Stakeholder comms, downtime schedule, resources' },
      { title: 'Back up', caption: 'Databases, servers and customizations' },
      { title: 'Stop services', caption: 'Avoid data inconsistency during the upgrade' },
      { title: 'Upgrade', caption: 'Database, console server and device services server' },
      { title: 'Validate', caption: 'Core features, data integrity, user acceptance' },
    ],
  },
]);
