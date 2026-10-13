import { skillGroupSchema } from '@/schemas';

export const skills = skillGroupSchema.array().parse([
  {
    id: 'platforms',
    title: 'Platforms',
    icon: 'layers',
    primary: 'Workspace ONE UEM',
    items: [
      { name: 'Workspace ONE UEM', icon: 'settings', brand: 'vmware' },
      { name: 'Workspace ONE Access', icon: 'key', brand: 'vmware' },
      { name: 'UAG', icon: 'server' },
      { name: 'AirWatch', icon: 'smartphone' },
      { name: 'Android', icon: 'smartphone', brand: 'android' },
      { name: 'iOS', icon: 'smartphone', brand: 'apple' },
      { name: 'Windows', icon: 'monitor' },
      { name: 'macOS', icon: 'laptop', brand: 'apple' },
      { name: 'Linux', icon: 'terminal', brand: 'linux' },
    ],
  },
  {
    id: 'practices',
    title: 'Practices',
    icon: 'activity',
    items: [
      { name: 'Unified Endpoint Management', icon: 'layers' },
      { name: 'Mobile Device Management', icon: 'smartphone' },
      { name: 'Identity Manager integration', icon: 'fingerprint' },
      { name: 'Application deployment', icon: 'rocket' },
      { name: 'Access control and security policies', icon: 'shield' },
      { name: 'Troubleshooting', icon: 'wrench' },
      { name: 'Virtualization', icon: 'boxes' },
      { name: 'Server monitoring', icon: 'activity' },
      { name: 'Technical documentation', icon: 'file' },
      { name: 'Remote support and training', icon: 'headset' },
    ],
  },
  {
    id: 'tools',
    title: 'Directories and tools',
    icon: 'wrench',
    items: [
      { name: 'Active Directory', icon: 'users' },
      { name: 'Azure AD', icon: 'cloud' },
      { name: 'Bash', icon: 'terminal', brand: 'gnubash' },
      { name: 'PowerShell', icon: 'terminal' },
      { name: 'VMware Workstation', icon: 'cpu', brand: 'vmware' },
      { name: 'VirtualBox', icon: 'boxes', brand: 'virtualbox' },
      { name: 'ServiceNow', icon: 'ticket' },
      { name: 'JIRA', icon: 'ticket', brand: 'jira' },
      { name: 'Git', icon: 'git', brand: 'git' },
    ],
  },
]);
