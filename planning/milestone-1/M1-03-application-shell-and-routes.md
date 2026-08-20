# M1-03 — Create the application shell and MVP routes

**Status:** Complete

## Outcome

A consistent root layout and a reachable German and English placeholder page for every route in the MVP site map.

## Scope

- Create the root application layout using the approved typography and design tokens.
- Add a reusable page container and main-content structure.
- Add a keyboard-accessible skip link.
- Establish a single source of truth for site navigation and footer links.
- Use the locale contract defined in M1-08.
- Scaffold the following routes beneath both `/de` and `/en`:

```text
/
/training
/schedule
/prices
/coaches
/about
/faq
/contact
/gift-cards
/impressum
/datenschutz
```

- Give each placeholder page a localized heading and short explanation of its eventual responsibility.
- Add a not-found page consistent with the application shell.
- Add an error boundary where appropriate for the chosen Next.js architecture.
- Reserve stable component boundaries for future Sanity content and bsport integrations.

## Integration boundaries

- Schedule content must be replaceable by a future `ScheduleWidget` or equivalent adapter.
- Pricing CTAs must be replaceable by future bsport purchase links.
- Gift-card content must be replaceable by a future bsport gift-card flow.
- Placeholder routes must not simulate booking, availability, membership, or payment logic.

## Acceptance criteria

- Every MVP route renders successfully in German and English when loaded directly.
- Every page has exactly one visible level-one heading.
- The skip link moves keyboard focus to the main content.
- Shared layout elements are not duplicated in individual route files.
- Route, locale, and navigation definitions are centralized and typed.
- Unknown routes render the custom not-found experience.
- Placeholder integration areas make no claims about live schedules, availability, or prices.
- The shell works at widths from 320 pixels through large desktop screens without horizontal page overflow.

## Out of scope

- Final page sections or content
- CMS queries or preview behavior
- Live schedule, price, booking, or gift-card data
- Final or legally approved Impressum and privacy-policy content
