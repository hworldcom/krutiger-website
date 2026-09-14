# Milestone 2 — Sanity CMS

## Goal

Give KRUTIGER staff a safe bilingual editing workflow for website content while
keeping layouts, application-interface translations, and bsport operations in
their existing systems.

At the end of this milestone, published German and English content can be read
from Sanity by the Next.js application, drafts can be previewed securely, and
the project is ready for CMS-backed Training, Team, FAQ, and Contact content work
in later milestones.

## Content ownership

- Sanity owns editable marketing content, images, image alternative text, and
  page-specific SEO fields.
- The Next.js application owns route paths, page composition, design tokens,
  components, locale detection, and interface labels.
- bSport owns the authoritative schedules, bookings, membership and pass
  products, prices, member authentication, shop inventory, availability, and
  transactional flows.
- Sanity may store reviewed membership and pass presentation cards that mirror
  selected public bSport values and link to bSport checkout. Those values never
  perform or control the transaction.
- German is the editorial source language. English must be explicit; the public
  site must never silently substitute German for missing English content.

## Localization decision

Use field-level localization for the initial two-language CMS: a single content
document contains explicit `de` and `en` values for translatable fields. Shared
assets, ordering, references, and operational identifiers remain outside those
localized values.

This decision should be recorded in the schema documentation and revisited only
if the language or editorial requirements materially expand.

## Tickets

| ID    | Ticket                                                                                  | Status      | Depends on             |
| ----- | --------------------------------------------------------------------------------------- | ----------- | ---------------------- |
| M2-01 | [Bootstrap Sanity and the Studio](./M2-01-sanity-project-and-studio.md)                 | In progress | Milestone 1            |
| M2-02 | [Define the bilingual content schemas](./M2-02-bilingual-content-schemas.md)            | Complete    | M2-01                  |
| M2-03 | [Build the editor experience and validation](./M2-03-editor-experience.md)              | Complete    | M2-02                  |
| M2-07 | [Model bSport-linked pricing cards in Sanity](./M2-07-bsport-linked-pricing-cards.md)   | Complete    | M2-02, M2-03           |
| M2-04 | [Build the typed frontend content layer](./M2-04-frontend-content-layer.md)             | Complete    | M2-01, M2-02, M2-07    |
| M2-05 | [Implement secure draft preview](./M2-05-draft-preview.md)                              | In progress | M2-03, M2-04           |
| M2-06 | [Seed content and validate the integration](./M2-06-seed-content-and-integration-qa.md) | Planned     | M2-02, M2-03, M2-04–05 |

M2-07 records the pricing-card scope added after the initial schemas were
completed and should be implemented before M2-04 finalizes its projections.
Initial content preparation for M2-06 can begin while the frontend adapter and
preview workflow are being built.

## Required external inputs

- Access to a Sanity organization and permission to create or configure the
  KRUTIGER project
- The approved dataset strategy and editor list
- Approved German source content and English translations
- Verified public membership and pass values with their bSport checkout links
- Publication rights and alternative text for CMS-managed images
- The deployment origins that need Sanity CORS and preview access

## Milestone definition of done

- Authorized editors can open the Studio and update the supported content
  without changing code.
- Published content is rendered through a typed, server-side Sanity boundary.
- German and English values remain explicit, with visible validation for missing
  translations.
- Draft content is visible only through an authenticated preview workflow.
- The existing homepage and About page can consume seeded CMS content without
  losing their approved layouts or responsive behavior.
- Editors can maintain membership and pass presentation cards that link to
  verified bSport checkout destinations without moving transaction logic into
  Sanity.
- Contact placeholders are not accidentally published as verified information.
- No bsport operational or transactional data is duplicated into Sanity.
- Sanity credentials do not appear in browser bundles or generated HTML.
- Linting, type checks, tests, production build, accessibility checks, and the
  responsive browser matrix pass.

## Out of scope

- A visual page builder or editor-controlled layout system
- Final Milestone 3 page compositions
- Replacing bsport with Sanity for operational data
- Custom authentication, payments, bookings, or membership management
- Automatic or machine-generated translations
- Final legal copy, analytics, hosting, or production deployment
