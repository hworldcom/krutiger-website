# bsport schedule integration

The German and English schedule routes load the calendar widget supplied by
bsport. The integration is deliberately isolated from the global shell and all
other routes.

## Current production configuration

- Script: `https://cdn.bsport.io/scripts/widget.js`
- Company ID: `6720`
- Widget type: `calendar`
- Parent element: `bsport-widget-368485`
- Dialog mode: `3`
- Calendar variant: `activityName`
- Floating action button: disabled
- Full-screen popup: disabled

The company ID is public widget configuration, not an API secret. It can be
overridden at build time with `NEXT_PUBLIC_BSPORT_CALENDAR_COMPANY_ID`. The
private `BSPORT_API_KEY` must never be imported by a Client Component or exposed
with a `NEXT_PUBLIC_` prefix.

The production script is loaded with Next.js `afterInteractive` behavior only
when a visitor opens a schedule route. A localized loading state is displayed
until mount is requested, and a localized error message is displayed if the
script fails to load or mount. The pricing widget also uses production, while
member login remains on staging until its production widget is supplied.

Because bsport exposes a single global `window.BsportWidget`, crossing between
the production calendar and a staging widget triggers one clean document reload.
This prevents one environment's runtime from sending another environment's
company ID to the wrong API. Navigation between widgets in the same environment
remains client-side.

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

With the local app running, verify the bsport integrations in Chrome with:

```bash
npm run qa:bsport
```

This confirms that the script is absent from the home page, mounts the calendar
on both localized schedule routes, and saves screenshots under
`.next/quality-screenshots/`.

## Before launch

- Verify that the live schedule, availability, login, and booking destinations
  belong to the correct company.
- Transfer and verify the KRUTIGER custom CSS in the production bsport account.
- Confirm how the widget selects German and English; the supplied configuration
  does not include a locale option. QA shows that it currently follows the
  browser locale rather than the site route by itself.
- Test mobile, tablet, desktop, keyboard, 200% zoom, and screen-reader behavior
  inside the third-party widget.
- Review cookies, storage, network destinations, and privacy disclosure before
  enabling the widget on the public site.
- Confirm whether bsport provides a supported unmount or teardown API for
  client-side route transitions.

## Integration observations

- The calendar renders at desktop and 390 px mobile widths without horizontal
  page overflow.
- A German browser locale renders the widget in German, and an English browser
  locale renders it in English. Switching only the website route does not
  provide a documented way to force the widget language.
- Earlier QA against the staging company exposed both past and bookable
  sessions. Product availability can change independently of the website.
