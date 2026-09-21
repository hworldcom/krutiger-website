# bSport private-training integration

The dedicated German and English Private Classes pages at `/de/private` and
`/en/private` are backed by bSport's appointment widget. The pages are linked
from the primary header and footer navigation.

## Current production configuration

- Script: `https://cdn.bsport.io/scripts/widget.js`
- Company ID: `6720`
- Private service ID: `30595`
- Widget type: `privateService`
- Parent element: `bsport-widget-856944`
- Dialog mode: `1`
- Display type: `detail`
- Floating action button: disabled
- Full-screen popup: disabled

The public company ID can be overridden at build time with
`NEXT_PUBLIC_BSPORT_PRIVATE_TRAINING_COMPANY_ID`, and the selected service can
be overridden with `NEXT_PUBLIC_BSPORT_PRIVATE_TRAINING_SERVICE_ID`. No private
API key is exposed to the browser.

The configured service ID skips bSport's service-list card and opens the
session type, coach selection, and appointment calendar directly. If the
service is deleted and recreated in bSport, update the service ID before the
next deployment.

The widget uses the shared bSport navigation and language handling. Moving from
another bSport page or switching the site language may trigger one clean page
reload before the appointment widget mounts.
