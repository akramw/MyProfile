import { platformSchema } from '@/schemas';

export const jamf = platformSchema.parse({
  id: 'jamf',
  name: 'Jamf Pro',
  tagline: 'Enrollment, policies, configuration profiles and Apple device management — what to check first.',
  articles: [
    {
      id: 'enrollment-failed',
      title: 'Device enrollment fails',
      summary: 'A Mac, iPhone or iPad cannot enroll into Jamf Pro.',
      tags: ['Enrollment', 'macOS', 'iOS'],
      steps: [
        'Confirm the device can reach the Jamf Pro URL and Apple push services (APNs, ports 443 and 2195/2196).',
        'Check the enrollment method (User-Initiated, Automated Device Enrollment, Apple Configurator) matches the device.',
        'For ADE, confirm the device is assigned to the Jamf Pro MDM server in Apple Business Manager and the PreStage is scoped.',
        'Verify the user account or invitation is valid and not over its enrollment limit.',
        'Review the Jamf Pro log and the device Management History for the failing step.',
      ],
      fix: 'Fix the network, PreStage or invitation problem, remove any stale device record, and enroll again.',
    },
    {
      id: 'mdm-push-failing',
      title: 'MDM commands stay pending',
      summary: 'Commands queue but never reach the device, or the device shows as unmanaged.',
      tags: ['MDM', 'APNs'],
      steps: [
        'Check Settings > Global > Push certificates and confirm the Apple push certificate has not expired.',
        'Verify the device has internet and can reach `*.push.apple.com`.',
        'Open the device Management tab and check Pending commands and Failed commands.',
        'Confirm the MDM profile is still installed on the device.',
      ],
      fix: 'Renew the push certificate with the same Apple ID, or redeploy the MDM profile if it was removed.',
    },
    {
      id: 'policy-not-running',
      title: 'Policy does not run',
      summary: 'A policy shows as pending, or never executes on the Mac.',
      tags: ['Policies', 'Scope'],
      steps: [
        'Check the policy scope, exclusions and Smart Group membership for the computer.',
        'Review the trigger (Recurring Check-in, Enrollment Complete, Login) and the execution frequency.',
        'Open the policy logs for the computer to see Completed or Failed.',
        'Run `sudo jamf policy -verbose` on the Mac and read the output.',
      ],
      fix: 'Correct the scope or trigger, then run `sudo jamf policy` again to confirm.',
    },
    {
      id: 'profile-not-applying',
      title: 'Configuration profile not applying',
      summary: 'A profile is scoped but missing on the device, or shows a conflict.',
      tags: ['Profiles', 'Compliance'],
      steps: [
        'Open the device Profiles tab and check the install state.',
        'Confirm the device is scoped, and no exclusion or conflicting profile overrides it.',
        'For privacy or kernel extension payloads, verify the device is supervised or user-approved MDM.',
        'Check the payload is supported on the device OS version.',
      ],
      fix: 'Correct the scope or payload and redeploy the profile.',
    },
    {
      id: 'app-not-installing',
      title: 'App does not install',
      summary: 'A Mobile Device App or Self Service package stays pending or fails.',
      tags: ['Apps', 'Deployment'],
      steps: [
        'Check the app scope and that the device has an available license for VPP apps.',
        'Verify the Apps and Books (VPP) token is valid and synced.',
        'For packages, confirm the distribution point is reachable and the package is uploaded.',
        'Look at the device Management History for the install error.',
      ],
      fix: 'Fix the token, license or distribution point, then redeploy the app.',
    },
  ],
});
