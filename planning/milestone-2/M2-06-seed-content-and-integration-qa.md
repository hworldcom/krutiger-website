# M2-06 — Seed content and validate the integration

**Status:** Planned

## Outcome

The CMS contains traceable baseline German and English content, the existing
homepage and About page consume it through the Sanity adapter, and the complete
integration is ready for Milestone 3 page work.

## Scope

- Create an idempotent seed or migration process for the approved baseline
  documents.
- Migrate approved homepage and About-page editorial content without changing
  their established visual composition.
- Seed the available class, coach, and FAQ records needed to begin Milestone 3.
- Seed the currently verified membership and monthly-pass presentation cards
  with their exact bSport checkout destinations and verification timestamps.
- Seed verified site settings only after the client approves them.
- Keep current dummy address, email, telephone, and opening hours explicitly
  marked as placeholders; never migrate them as verified production data.
- Preserve asset provenance, rights, consent, localized alternative text,
  hotspot, and crop metadata during image migration.
- Connect the existing homepage, About page, page metadata, and approved global
  settings to the typed content adapter.
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

- Final Training, Team, FAQ, and Contact page designs
- Final legal text
- Analytics and consent management
- Production domain and deployment
- Copying bsport operational data into Sanity
