# M2-06 — Seed content and validate the integration

**Status:** In progress

## Outcome

The CMS contains traceable baseline German and English content, the existing
homepage, About page, and Training page consume it through the Sanity adapter,
and the complete integration is ready for Milestone 3 page work.

## Scope

- Create an idempotent seed or migration process for the approved baseline
  documents.
- Migrate approved homepage and About-page editorial content without changing
  their established visual composition.
- Seed the available class, coach, and FAQ records needed to begin Milestone 3.
- Seed the currently verified membership and monthly-pass presentation cards
  with their exact bSport checkout destinations and verification timestamps.
- Seed verified site settings only after the client approves them.
- Seed the approved address, email, and Instagram profile while keeping the
  dummy telephone and opening hours explicitly marked as placeholders; never
  migrate the incomplete contact record as verified production data.
- Preserve asset provenance, rights, consent, localized alternative text,
  hotspot, and crop metadata during image migration.
- Connect the existing homepage, About page, Training page, page metadata, and
  approved global settings to the typed content adapter.
- Add deterministic missing-content and unavailable-CMS behavior.
- Update release and quality checks to allow intended server-side Sanity access
  while continuing to reject credentials and unnecessary client runtimes.
- Document how content is promoted from development to production without
  overwriting editor changes.

## Migration rules

- Seed operations must be repeatable and must not overwrite newer editor-owned
  content without an explicit migration decision.
- Every seeded document uses a stable identifier.
- German and English values are seeded independently and validated.
- Unapproved images and unresolved rights records remain unavailable for
  production rendering.
- Schedules, authoritative product configuration, checkout behavior, login
  data, and shop inventory remain in bSport. Only the reviewed pricing-card
  presentation mirrors defined by M2-07 are seeded into Sanity.

## Acceptance criteria

- A documented clean dataset can be seeded reproducibly.
- Running the seed process a second time does not create duplicates.
- The homepage and About page render approved Sanity content in both languages.
- The Training page renders the seeded bilingual class records through its
  existing reusable cards in deterministic order.
- Their existing responsive layouts, headings, images, metadata, and calls to
  action remain intact.
- Missing documents, missing translations, and Sanity request failures produce
  intentional states and do not silently mix languages.
- Contact placeholders cannot appear as verified information.
- Seeded pricing cards match their reviewed bSport products and continue to use
  bSport for every transaction.
- Published pages expose correct canonical URLs and reciprocal language
  alternates using Sanity-owned page SEO fields where configured.
- Sanity secrets remain absent from browser assets and generated HTML.
- `lint`, `typecheck`, `test`, `build`, accessibility checks, and all responsive
  browser checks pass.
- The content owner reviews the seeded Studio content and records remaining
  Milestone 3 copy or asset gaps.

## Out of scope

- Final Team, FAQ, and Contact page designs
- Redesigning the completed Training page
- Final legal text
- Analytics and consent management
- Production domain and deployment
- Copying bsport operational data into Sanity

## Implementation notes

- `npm run sanity:seed:development` performs a read-only audit and
  `npm run sanity:seed:development:apply` creates only missing baseline
  documents in the `development` dataset. The script refuses every other
  dataset and checks both the published and draft IDs before writing.
- Stable published IDs contain no dots so they remain readable by anonymous
  website queries in a public Sanity dataset. Draft IDs use only Sanity's
  reserved `drafts.` prefix.
- The seed currently contains 67 documents: 14 editorial drafts and 53
  published pricing mirrors. A second dry run reports zero missing documents.
- Homepage, About, Training, Team, and Pricing render their seeded German and
  English page-level drafts in Preview Mode. Public local requests retain the
  same-language local baseline until those documents are approved and
  published. Pricing renders its 48 memberships and five passes from published
  Sanity documents.
- Page content resolution records whether Sanity or the local baseline was
  used. Preview Mode distinguishes missing, invalid or untranslated, and
  unavailable content without falling back across languages.
- Homepage, About, Training, Team, and Pricing metadata use their Sanity SEO
  title, description, and share image in Preview Mode while route-owned
  canonical and reciprocal language-alternate URLs remain intact.
- The responsive/accessibility browser matrix, unit tests, lint, TypeScript,
  Sanity TypeGen, production build, and generated-output credential checks pass
  locally.
- Publication remains intentionally blocked for eleven image/contact documents.
  The outstanding content-owner decisions are recorded in
  [`docs/m2-content-review.md`](../../docs/m2-content-review.md).
