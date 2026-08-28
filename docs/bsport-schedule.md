# bsport schedule integration

The German and English schedule routes load the calendar widget supplied by
bsport. The integration is deliberately isolated from the global shell and all
other routes.

## Current staging configuration

- Script: `https://cdn.staging.bsport.io/scripts/widget.js`
- Company ID: `14416`
- Widget type: `calendar`
- Parent element: `bsport-widget-163824`
- Dialog mode: enabled
- Floating action button: disabled
- Full-screen popup: disabled

The company ID is public widget configuration, not an API secret. It can be
overridden at build time with `NEXT_PUBLIC_BSPORT_COMPANY_ID`. The private
`BSPORT_API_KEY` must never be imported by a Client Component or exposed with a
`NEXT_PUBLIC_` prefix.

The external script is loaded with Next.js `afterInteractive` behavior only
when a visitor opens a schedule route. A localized loading state is displayed
until mount is requested, and a localized error message is displayed if the
script fails to load or mount.

The paste-ready KRUTIGER overrides are maintained in:

- `docs/bsport-calendar-header.css` for the calendar header; and
- `docs/bsport-calendar-filters.css` for search, filter controls, and filter
  menus; and
- `docs/bsport-calendar-date-picker.css` for the date-range control and calendar
  popup; and
- `docs/bsport-search.css` for bsport's generic search component. The calendar's
  own `bs-calendar-search` control is covered by the filter stylesheet; and
- `docs/bsport-calendar-session-details.css` for session cards, metadata, level
  badges, and booking states; and
- `docs/bsport-activity-details.css` for the activity information dialog,
  including its image header, description, map, coach, and footer controls.

They intentionally change only presentation; bsport remains responsible for
the calendar grid and responsive behavior.

With the local app running, verify the staging integration in Chrome with:

```bash
npm run qa:bsport
```

This confirms that the script is absent from the home page, mounts the calendar
on both localized schedule routes, and saves screenshots under
`.next/quality-screenshots/`.

## Before production

- Obtain the production widget script URL and confirm the production company
  ID with bsport.
- Replace the staging script constant and remove the visible staging notice.
- Update the production-output script allowlist to the exact production URL.
- Verify that the live schedule, availability, login, and booking destinations
  belong to the correct company.
- Confirm how the widget selects German and English; the supplied configuration
  does not include a locale option. Staging QA shows that it currently follows
  the browser locale rather than the site route by itself.
- Test mobile, tablet, desktop, keyboard, 200% zoom, and screen-reader behavior
  inside the third-party widget.
- Review cookies, storage, network destinations, and privacy disclosure before
  enabling the widget on the public site.
- Confirm whether bsport provides a supported unmount or teardown API for
  client-side route transitions.

## Staging observations

- The calendar renders at desktop and 390 px mobile widths without horizontal
  page overflow.
- A German browser locale renders the widget in German, and an English browser
  locale renders it in English. Switching only the website route does not
  provide a documented way to force the widget language.
- During activity-dialog QA, the week of 24–30 August 2026 exposed both past
  and bookable sessions. This is staging data and can change independently of
  the website.
- The staging bundle emits two internal Mixpanel configuration errors even
  though the calendar continues to work. It also attempts translation requests
  containing an `undefined` base path before falling back to bundled language
  data. Ask bsport whether the production widget/configuration resolves these
  issues before launch.
