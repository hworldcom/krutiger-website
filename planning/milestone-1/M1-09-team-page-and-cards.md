# M1-09 — Build the Team page and reusable person cards

**Status:** Complete

## Outcome

A responsive, bilingual Team page presents each person through a reusable card
and can later consume Sanity `coach` documents without redesigning the page.

## Scope

- Replace the current `/[locale]/coaches` placeholder with a dedicated Team
  page in German and English.
- Add a page introduction that explains who visitors will meet without making
  unverified biography or qualification claims.
- Create a reusable person-card component for a name, localized role, photo,
  localized image alternative text, short biography, specialties, and an
  optional social link.
- Render cards from one centralized, typed temporary data source rather than
  embedding individual people directly in the page component.
- Keep the temporary content shape compatible with the Sanity `coach` schema:
  `internalKey`, `name`, `role`, `photo`, `biography`, `specialties`,
  `socialUrl`, `order`, and `active`.
- Apply deterministic ordering and omit inactive people from the rendered card
  grid.
- Use the established KRUTIGER typography, colors, image treatment, spacing,
  buttons, and responsive containers.
- Support keyboard focus, meaningful heading structure, descriptive image text,
  and readable card content without relying on hover.
- Add focused component and page tests for both languages, ordering, optional
  social links, and accessible image treatment.

## Content safeguards

- Use only names, roles, biographies, qualifications, and photos approved by
  KRUTIGER before presenting them as real staff information.
- Clearly identify temporary development fixtures and keep them out of
  production claims when approved content is unavailable.
- Do not infer coaching credentials, fighting records, social profiles, or
  depicted-person consent from Instagram or other public sources.
- Keep route paths, card layout, icons, and interface labels application-owned;
  Sanity will own the eventual editorial values only.

## Acceptance criteria

- `/de/coaches` and `/en/coaches` render a dedicated Team page with exactly one
  visible level-one heading.
- Every visible person is rendered through the same reusable card component
  from typed, centralized data.
- German and English editorial values are explicit; neither language silently
  falls back to the other.
- Card order is deterministic and inactive entries do not render.
- Images have approved, meaningful alternative text or are explicitly marked
  decorative where appropriate.
- Optional social links have descriptive accessible names and visible keyboard
  focus.
- The card grid remains readable without horizontal scrolling from 320 pixels
  through large desktop widths.
- The page can accept adapted Sanity `coach` results later without changing its
  visual component contract.
- `lint`, `typecheck`, `test`, and `build` pass.

## Out of scope

- Fetching or previewing Sanity content
- Creating or editing Sanity schemas
- Final staff copy or imagery that has not been supplied and approved
- Individual team-member profile routes
- Live schedules, bookings, memberships, or pricing
