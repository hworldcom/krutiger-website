# M1-10 — Build the Training page and reusable course cards

**Status:** Complete

## Outcome

A responsive, bilingual Training page explains the available course formats
through reusable cards and can later consume Sanity `classType` documents
without redesigning the page.

## Scope

- Replace the current `/[locale]/training` placeholder with a dedicated
  Training page in German and English.
- Add a clear page introduction explaining how visitors can choose a suitable
  training format without duplicating live schedule or availability data.
- Present an initial set of at least three approved course descriptions, or
  clearly identified bilingual development placeholders until the final copy
  is supplied.
- Create a reusable course-card component for a localized name, summary,
  description, level, typical duration, audience, image, and call-to-action
  label.
- Keep CTA destinations application-owned and direct course actions to the
  appropriate localized schedule or contact route.
- Render every card from one centralized, typed temporary data source rather
  than embedding courses directly in the page component.
- Keep the temporary content shape aligned with the Sanity `classType` schema:
  `internalKey`, `name`, `summary`, `description`, `level`, `durationMinutes`,
  `audience`, `image`, `ctaLabel`, `order`, and `active`.
- Add `intermediate` to the existing Sanity class-level options so every public
  Training page level can be represented without changing the card contract.
- Apply deterministic ordering and omit inactive course records from the
  rendered grid.
- Use the established KRUTIGER typography, colors, imagery, spacing, buttons,
  and responsive containers.
- Support meaningful heading structure, descriptive image alternative text,
  keyboard-visible actions, and readable card content without relying on hover.
- Add focused component, localization, ordering, visibility, and accessibility
  tests.

## Content safeguards

- Use only course names, descriptions, levels, durations, audience guidance,
  and imagery approved by KRUTIGER before presenting them as current offerings.
- Clearly label temporary development copy and avoid inventing training claims
  or participation requirements.
- Do not copy live class dates, times, capacity, cancellations, prices, or
  booking status into course cards; bsport remains responsible for those values.
- Do not infer image rights or depicted-person consent from Instagram or another
  public source.
- Route paths, card layout, level-label translations, icons, and CTA
  destinations remain application-owned.

## Acceptance criteria

- `/de/training` and `/en/training` render a dedicated Training page with
  exactly one visible level-one heading.
- At least three approved or explicitly temporary course descriptions are shown
  through the same reusable course-card component.
- German and English editorial values are explicit; neither language silently
  falls back to the other.
- Card order is deterministic and inactive records do not render.
- Every informative course image has meaningful localized alternative text;
  decorative images are explicitly marked as such.
- Course actions have descriptive accessible names and visible keyboard focus.
- The card grid remains readable without horizontal scrolling from 320 pixels
  through large desktop widths.
- No card presents live bsport information as static website content.
- The page can accept adapted Sanity `classType` results later without changing
  its visual component contract.
- `lint`, `typecheck`, `test`, `build`, and responsive browser checks pass.

## Out of scope

- Fetching or previewing Sanity content
- Sanity schema changes beyond the required Intermediate level option
- Final course copy or imagery that has not been supplied and approved
- Live schedules, capacity, bookings, memberships, passes, or pricing
- Individual course-detail routes
- Editor-controlled page layout or styling
