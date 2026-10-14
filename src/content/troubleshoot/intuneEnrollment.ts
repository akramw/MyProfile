import { troubleshooterSchema } from '@/schemas';

/** Tabbed enrollment troubleshooter for the Intune page. One tab per platform, one issue per card. */
export const intuneEnrollment = troubleshooterSchema.parse({
  title: 'Enrollment Issues',
  intro:
    'Enrollment failures are a common first-line Intune ticket. Pick the platform, run the quick checks, then match the symptom to a cause and fix.',
  tabs: [
    {
      id: 'ios',
      label: 'iOS',
      heading: 'Most common iPhone (iOS) enrollment failures',
      quickChecks: [
        'Apple MDM push certificate is valid',
        'User has an Intune license',
        'Device runs a supported iOS version',
        'Device can reach `*.manage.microsoft.com`',
      ],
      items: [
        {
          title: 'Profile installation failed',
          tag: 'Profile',
          cause: 'The MDM profile download is blocked by the network, or the device does not trust the profile.',
          fix: [
            'Check network access to `*.manage.microsoft.com`.',
            'Open Settings → General → VPN & Device Management and trust the profile.',
            'Remove any half-installed management profile, then enroll again.',
          ],
        },
        {
          title: 'Certificate not trusted',
          tag: 'Certificates',
          cause: 'SCEP or PKCS certificate issue: the root or intermediate CA is missing on the device.',
          fix: [
            'Re-deploy the certificate profile to the device.',
            'Deploy the trusted root certificate profile before the SCEP profile.',
            'Confirm the NDES or connector server is healthy.',
          ],
        },
        {
          title: 'Enrollment blocked by restriction',
          tag: 'Restrictions',
          cause: 'An iOS enrollment restriction blocks the OS version or personally owned devices.',
          fix: [
            'Intune → Devices → Enrollment → Device platform restrictions.',
            'Check iOS/iPadOS min and max versions and the personal device setting.',
            'Confirm the user is in a group the restriction does not target.',
          ],
        },
        {
          title: 'User enrollment vs Device enrollment mismatch',
          tag: 'Enrollment type',
          cause: 'BYOD and corporate devices were given the wrong enrollment type.',
          fix: [
            'Use User Enrollment for BYOD and Device Enrollment for corporate-owned devices.',
            'Confirm the correct enrollment profile is assigned.',
            'Mark corporate devices with a corporate device identifier.',
          ],
        },
        {
          title: 'ADE (DEP) device not showing in Intune',
          tag: 'ABM / ADE',
          cause: 'The Apple Business Manager token is out of sync, expired, or the device is assigned to a different MDM server.',
          fix: [
            'Intune → Devices → Enrollment → Apple → Enrollment program tokens → Sync.',
            'In ABM, assign the device to the Intune MDM server.',
            'Renew the ADE token if it has expired (it lasts one year).',
          ],
        },
        {
          title: 'Apple MDM push certificate expired',
          tag: 'APNs',
          cause: 'The Apple MDM push certificate expired or was renewed with a different Apple ID, so new enrollments and commands fail.',
          fix: [
            'Intune → Devices → Enrollment → Apple → Apple MDM Push certificate.',
            'Renew it using the same Apple ID that created it.',
            'Never create a new certificate: devices would have to re-enroll.',
          ],
        },
        {
          title: 'Company Portal sign-in loop',
          tag: 'Sign-in',
          cause: 'Conditional Access, MFA or a stale token keeps sending the user back to the Company Portal sign-in screen.',
          fix: [
            'Update Company Portal and Microsoft Authenticator.',
            'Check Conditional Access policies that apply to the Intune Enrollment app.',
            'Sign out, delete and reinstall Company Portal, then retry.',
          ],
        },
        {
          title: 'Stuck at Setup Assistant',
          tag: 'ABM / ADE',
          cause: 'The ADE profile requires authentication, but the user, license or Entra account is not ready.',
          fix: [
            'Check the user has a license and the device is assigned the enrollment profile.',
            'Try Setup Assistant with modern authentication.',
            'Wipe the device and retry after the profile shows Assigned.',
          ],
        },
      ],
    },
    {
      id: 'ipados',
      label: 'iPadOS',
      heading: 'Most common iPad (iPadOS) enrollment failures',
      quickChecks: [
        'Device is supervised if you need Shared iPad or kiosk features',
        'Apple MDM push certificate is valid',
        'Enrollment profile is assigned in the Apple token',
        'User has an Intune license',
      ],
      items: [
        {
          title: 'iPad not supervised after enrollment',
          tag: 'Supervision',
          cause: 'The iPad was enrolled through Company Portal or a user flow, not ADE or Apple Configurator, so supervised-only settings do nothing.',
          fix: [
            'Wipe the device and enroll through Automated Device Enrollment.',
            'Or use Apple Configurator to supervise it, which wipes the iPad.',
            'Set Supervised = Yes in the ADE enrollment profile.',
          ],
        },
        {
          title: 'Shared iPad will not enroll',
          tag: 'Shared iPad',
          cause: 'Shared iPad needs ADE, supervision and Managed Apple IDs. A mismatch in the enrollment profile or Apple ID setup stops it.',
          fix: [
            'Enable Shared iPad in the ADE enrollment profile.',
            'Federate your domain in Apple Business Manager so Managed Apple IDs exist.',
            'Check the iPad has enough storage and that it is a supported model.',
          ],
        },
        {
          title: 'iPad not appearing in ADE list',
          tag: 'ABM / ADE',
          cause: 'The iPad was not added to ABM, or was assigned to a different MDM server.',
          fix: [
            'Ask the reseller to confirm the device is in your ABM organization.',
            'Assign the serial number to the Intune MDM server in ABM.',
            'Sync the token in Intune, then assign the profile.',
          ],
        },
        {
          title: 'Enrollment stalls at Remote Management',
          tag: 'Network',
          cause: 'The iPad cannot reach Apple or Microsoft services during setup (captive portal, filtered Wi-Fi or proxy).',
          fix: [
            'Switch to a network without a captive portal, or use cellular.',
            'Allow Apple device management hosts and `*.manage.microsoft.com`.',
            'Check the date and time sync correctly.',
          ],
        },
        {
          title: 'Company Portal app missing or not installing',
          tag: 'Apps',
          cause: 'Company Portal has not been assigned as a VPP app, or the iPad is not allowed to install apps from the App Store.',
          fix: [
            'Assign Company Portal as a required VPP app with device licensing.',
            'Check the Apple VPP token is not expired.',
            'Allow App Store use in the device restrictions profile.',
          ],
        },
        {
          title: 'Wrong enrollment type for classroom or kiosk iPads',
          tag: 'Enrollment type',
          cause: 'Userless iPads were enrolled with user affinity, so they ask for a sign-in or are tied to one person.',
          fix: [
            'Set User affinity = Enroll without user affinity in the ADE profile.',
            'Use Single App Mode for kiosk, and assign apps with device licensing.',
            'Re-enroll the iPad after changing the profile.',
          ],
        },
      ],
    },
    {
      id: 'android',
      label: 'Android',
      heading: 'Most common Android enrollment failures',
      quickChecks: [
        'Managed Google Play is connected',
        'Device runs Android 8.0 or later',
        'Google Play services is up to date',
        'Device is factory reset for fully managed or corporate modes',
      ],
      items: [
        {
          title: 'Work profile not created',
          tag: 'Managed Google Play',
          cause: 'Android Enterprise is not configured, so the work profile cannot be created.',
          fix: [
            'Intune → Devices → Enrollment → Android → Managed Google Play.',
            'Confirm the Google account connection is active.',
            'Re-bind the account if the status shows an error.',
          ],
        },
        {
          title: 'Google Play services outdated',
          tag: 'Device',
          cause: 'The device runs an old version of Google Play services.',
          fix: [
            'Update Google Play services from the Play Store before enrolling.',
            'Update Company Portal at the same time.',
            'Reboot and retry.',
          ],
        },
        {
          title: 'Device not eligible for Android Enterprise',
          tag: 'Device',
          cause: 'The device or OS is not supported by Android Enterprise.',
          fix: [
            'Android 8.0 or later is required for work profile.',
            'Confirm the device supports Android Enterprise at [androidenterprisepartners.withgoogle.com](https://androidenterprisepartners.withgoogle.com).',
            'Use an Android Open Source Project (AOSP) enrollment for devices without Google services.',
          ],
        },
        {
          title: 'Enrollment token expired',
          tag: 'Corporate-owned',
          cause: 'The corporate-owned enrollment token is stale or revoked.',
          fix: [
            'Intune → Devices → Enrollment → Android → Corporate-owned.',
            'Regenerate the enrollment token.',
            'Create a new QR code or token string and enroll again.',
          ],
        },
        {
          title: 'QR code enrollment fails',
          tag: 'Corporate-owned',
          cause: 'The device was already set up, so the QR scan from the welcome screen is unavailable, or the Wi-Fi details in the QR are wrong.',
          fix: [
            'Factory reset the device, then tap the welcome screen six times to open the QR scanner.',
            'Check the Wi-Fi SSID and password in the enrollment profile.',
            'Confirm the token has not expired.',
          ],
        },
        {
          title: 'Zero-touch enrollment not applying',
          tag: 'Zero-touch',
          cause: 'The device is not linked to the zero-touch configuration, or the Intune DPC extras in the configuration are wrong.',
          fix: [
            'In the zero-touch portal, assign the device to the configuration.',
            'Check the DPC extras JSON contains a valid token.',
            'Factory reset the device and make sure it has internet at setup.',
          ],
        },
        {
          title: 'Samsung Knox Mobile Enrollment issues',
          tag: 'Samsung',
          cause: 'The device is not in Knox, the MDM profile in the Knox portal is wrong, or the token is out of date.',
          fix: [
            'In Knox Mobile Enrollment, check the device is uploaded and assigned.',
            'Update the profile with the current Intune token.',
            'Use the Samsung-specific Intune Knox enrollment profile if you rely on KME.',
          ],
        },
        {
          title: 'Blocked by Conditional Access or compliance',
          tag: 'Compliance',
          cause: 'Enrollment completes, but Conditional Access blocks the device because compliance has not been reported yet.',
          fix: [
            'Wait for the first check-in, or sync from Company Portal.',
            'Review the compliance policy for the settings the device fails.',
            'Exclude the Intune Enrollment app from policies that require a compliant device.',
          ],
        },
        {
          title: 'Device administrator enrollment unavailable',
          tag: 'Legacy',
          cause: 'Google deprecated device administrator management, so newer Android versions can no longer enroll this way.',
          fix: [
            'Move to Android Enterprise (work profile or fully managed).',
            'Review the device administrator warning banner in the Intune admin center.',
            'Re-enroll affected devices with the new profile type.',
          ],
        },
      ],
    },
  ],
});
