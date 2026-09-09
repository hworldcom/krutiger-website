# bsport member-area integration

The localized `/de/member-area` and `/en/member-area` routes provide a stable
entry point for existing members. Authentication and the member profile remain
inside bsport; the KRUTIGER frontend does not collect or store credentials.

## Current production configuration

- Script: `https://cdn.bsport.io/scripts/widget.js`
- Company ID: `6720`
- Widget type: `loginButton`
- Parent element: `bsport-widget-832086`
- Open member profile after login: enabled
- Dialog mode: `3`
- Floating action button: disabled
- Full-screen popup: disabled

The company ID is public widget configuration and can be overridden at build
time with `NEXT_PUBLIC_BSPORT_COMPANY_ID`. No private bsport key is used by the
client component.

The script loads only when a visitor opens a bsport-powered route. The member
page provides localized loading and failure states. Run `npm run qa:bsport` with
the local app running to verify all widgets and their responsive layouts.

## Before launch

- Verify that login opens the correct KRUTIGER member profile and test logout,
  password recovery, and error handling.
- Confirm supported locale behavior with bsport; the supplied configuration has
  no explicit locale setting.
- Review the widget's cookies, storage, analytics, accessibility, and privacy
  disclosure before launch.
- Confirm whether bsport provides a supported teardown API for client-side route
  transitions.

## Integration observations

- The login button mounts in German and English browser locales without page
  overflow, and opens bsport's member overlay.
