# bsport member-area integration

The localized `/de/member-area` and `/en/member-area` routes provide a stable
entry point for existing members. Authentication and the member profile remain
inside bsport; the KRUTIGER frontend does not collect or store credentials.

## Current staging configuration

- Script: `https://cdn.staging.bsport.io/scripts/widget.js`
- Company ID: `14416`
- Widget type: `loginButton`
- Parent element: `bsport-widget-235346`
- Open member profile after login: enabled
- Dialog mode: enabled
- Floating action button: disabled
- Full-screen popup: disabled

The company ID is public widget configuration and can be overridden at build
time with `NEXT_PUBLIC_BSPORT_COMPANY_ID`. No private bsport key is used by the
client component.

The script loads only on a schedule or member-area route. The member page shows
localized loading and failure states, and identifies the integration as staging.
Run `npm run qa:bsport` with the local app running to verify both widgets and
their responsive layouts.

## Before production

- Obtain and allowlist the production widget URL and confirm the company ID.
- Remove the visible staging notice.
- Verify that login opens the correct KRUTIGER member profile and test logout,
  password recovery, and error handling.
- Confirm supported locale behavior with bsport; the supplied configuration has
  no explicit locale setting.
- Review the widget's cookies, storage, analytics, accessibility, and privacy
  disclosure before launch.
- Confirm whether bsport provides a supported teardown API for client-side route
  transitions.

## Staging observations

- The login button mounts in German and English browser locales without page
  overflow, and opens bsport's member overlay.
- The staging bundle currently emits internal Mixpanel missing-token errors and
  requests translation paths containing `undefined`. These originate in the
  supplied bsport staging bundle; confirm the production configuration with
  bsport before launch.
