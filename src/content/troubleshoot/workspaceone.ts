import { platformSchema } from '@/schemas';

export const workspaceone = platformSchema.parse({
  id: 'workspace-one-uem',
  name: 'Workspace ONE UEM',
  tagline: 'Enrollment, profiles, app delivery and console health — practical first checks.',
  articles: [
    {
      id: 'enrollment-failed',
      title: 'Device enrollment fails',
      summary: 'Android or iOS device cannot enroll through the Hub app.',
      tags: ['Enrollment', 'Android', 'iOS'],
      steps: [
        'Verify the Group ID and server URL entered during enrollment.',
        'Check Enrollment Restrictions for the organization group (ownership, platform, device limit).',
        'Confirm the user account is active and in the right organization group.',
        'For iOS, verify the APNs certificate is valid; for Android, check the Android EMM registration.',
        'Review Device Details > Troubleshooting for the failing event.',
      ],
      fix: 'Remove the stale device record, clear Hub app data, and enroll again.',
    },
    {
      id: 'device-not-checking-in',
      title: 'Device stopped checking in',
      summary: 'Last seen is old and commands stay queued.',
      tags: ['Connectivity', 'Commands'],
      steps: [
        'Check the Last Seen timestamp and the device Status in the console.',
        'Confirm the device has network access to the Device Services URL.',
        'Review the Commands tab for queued or failed commands.',
        'On Android, verify the Hub app is not battery-restricted.',
      ],
      fix: 'Re-queue a Query command, or re-enroll if the device was unenrolled locally.',
    },
    {
      id: 'app-not-installing',
      title: 'Assigned app does not install',
      summary: 'Internal or public app stays in Pending or Failed.',
      tags: ['Apps', 'Deployment'],
      steps: [
        'Open the app details view and check the install status per device.',
        'Verify the assignment group and the deployment delivery method.',
        'Check Smart Group membership includes the device.',
        'For VPP or managed Play apps, confirm the license or token is valid.',
      ],
      fix: 'Fix the assignment or Smart Group, then push the app again.',
    },
    {
      id: 'profile-not-applying',
      title: 'Profile not applying',
      summary: 'A device profile shows Pending or is missing on the device.',
      tags: ['Profiles', 'Compliance'],
      steps: [
        'Open Device Details > Profiles and check the install state.',
        'Confirm the profile is published and assigned to a Smart Group containing the device.',
        'Check for a higher-priority profile overriding the same payload.',
        'Verify the payload is supported on the device OS version.',
      ],
      fix: 'Republish the profile with the corrected assignment and sync the device.',
    },
  ],
});
