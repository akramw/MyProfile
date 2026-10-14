import { platformSchema } from '@/schemas';

export const intune = platformSchema.parse({
  id: 'intune',
  name: 'Microsoft Intune',
  tagline: 'Enrollment, compliance, app deployment and Conditional Access — what to check first.',
  articles: [
    {
      id: 'enrollment-failed',
      title: 'Device enrollment fails',
      summary: 'Android or iOS device cannot complete enrollment into Intune.',
      tags: ['Enrollment', 'Android', 'iOS'],
      steps: [
        'Confirm the user has an Intune license and is in the correct enrollment group.',
        'Check Devices > Enrollment restrictions for platform, ownership and device limit blocks.',
        'For iOS, verify the Apple MDM push certificate has not expired.',
        'For Android Enterprise, confirm the managed Google Play account is still bound.',
        'Review Devices > Monitor > Enrollment failures for the exact error code.',
      ],
      fix: 'Remove the stale device record, clear Company Portal data, and re-enroll.',
    },
    {
      id: 'compliance-not-reporting',
      title: 'Compliance status stuck on "Not evaluated"',
      summary: 'Device checks in but compliance never resolves, so Conditional Access may block it.',
      tags: ['Compliance', 'Conditional Access'],
      steps: [
        'Check the device last check-in time in the device overview.',
        'Confirm a compliance policy is actually assigned to the user or device group.',
        'Look at per-setting status for the policy to find the failing or conflicting setting.',
        'Trigger a manual Sync from the portal and from Company Portal on the device.',
      ],
      fix: 'Fix the conflicting setting or assignment, then sync again.',
    },
    {
      id: 'app-not-installing',
      title: 'Assigned app does not install',
      summary: 'A required app shows as pending or failed on the device.',
      tags: ['Apps', 'Deployment'],
      steps: [
        'Open Apps > Monitor > App install status and read the error for the device.',
        'Verify assignment intent (Required vs Available) and that filters are not excluding the device.',
        'For store apps, check the managed Google Play or VPP token status.',
        'Confirm the device has network access to the app source and enough storage.',
      ],
      fix: 'Correct the assignment or token, then sync the device to retry.',
    },
    {
      id: 'profile-not-applying',
      title: 'Configuration profile not applying',
      summary: 'A Wi-Fi, certificate or restrictions profile shows pending or conflict.',
      tags: ['Profiles', 'Certificates'],
      steps: [
        'Open the profile device status and check for Conflict or Error entries.',
        'Look for another profile or policy setting the same value on the same device.',
        'For SCEP or PKCS profiles, verify the trusted root profile is deployed first.',
        'Confirm the platform and profile type match the device.',
      ],
      fix: 'Remove the duplicate setting or deploy the missing dependency profile.',
    },
  ],
});
