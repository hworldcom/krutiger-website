# Sanity application boundary

This directory is the only place where the public Next.js application may configure Sanity clients, queries, image helpers, and content projections.

M2-04 adds the typed server-side content layer on top of the connection and
schemas established in M2-01 through M2-03. `content.ts` is the public data
access API for server routes; visual components must not import its query or
client dependencies directly.

## Structure

- `client.ts` configures anonymous published reads with an explicit
  `published` perspective.
- `preview-client.ts` is a separate, token-bearing server-only client using the
  `drafts` perspective.
- `draft-mode.ts` validates known localized destinations and contains the
  testable request boundary used by the enable and disable endpoints.
- `fetch.ts` chooses the published or draft client from Next.js Draft Mode.
- `queries.ts` contains the named GROQ queries consumed by Sanity TypeGen.
- `sanity.types.ts` is generated; edit schemas or queries, never this file.
- `projections.ts` validates query responses, selects exactly one requested
  language, and maps them to application-owned content models.
- `images.ts` creates crop/hotspot-aware, dimensioned image-CDN URLs and caps
  either dimension at 2400 pixels.
- `result.ts` describes ready, missing, invalid, missing-translation,
  unavailable, and configuration states without exposing upstream errors.

Run `npm run sanity:typegen` after editing schemas or queries. `npm run
typecheck` runs TypeGen first so query/schema drift is visible in CI.

## Published caching

Published queries use the Sanity CDN and Next's data cache with a five-minute
revalidation interval. Each content family also receives a `sanity:<type>`
cache tag. No webhook is required for the current baseline.

## Draft preview

The Studio Presentation Tool opens `/api/draft-mode/enable` with a short-lived
Sanity-generated credential. The official `next-sanity` handler validates that
credential with `SANITY_API_READ_TOKEN`; KRUTIGER additionally rejects any
destination outside the registered German and English routes.

Draft reads use the authenticated, server-only client with `cache: no-store`.
The browser receives neither the Viewer token nor a static preview secret.
Exiting through `/api/draft-mode/disable` requires a same-origin POST and returns
to an allowlisted localized route. The `VisualEditing` bridge is mounted only
while Draft Mode is active so the Studio Presentation iframe can connect; it is
absent from ordinary published-page rendering.

## Baseline and fallback behavior

M2-06 seeds the current bilingual baseline through the guarded development-only
script in `studio/scripts/seed-development.ts`. Public document IDs must not
contain dots; Sanity treats dotted IDs as private subpaths even when the dataset
is public. Only the reserved `drafts.` prefix is used for draft documents.

Page routes resolve validated Sanity content first and otherwise render their
same-language local baseline. This keeps missing or unavailable CMS data
deterministic without mixing German and English. Preview Mode additionally
shows whether the fallback was caused by missing, incomplete/invalid, or
unavailable Sanity content. The `data-content-source` marker is available for
integration and release checks; it is not an editorial control.

## Rules

- Public project, dataset, API-version, and Studio URL values use the documented `NEXT_PUBLIC_SANITY_*` variables.
- Read tokens and revalidation secrets remain server-only and never receive a
  `NEXT_PUBLIC_` prefix. Presentation preview credentials are short-lived and
  validated during the enable handshake rather than stored as application
  configuration.
- Token-bearing modules must import `server-only` before accessing a secret.
- Visual components receive application-owned models rather than Sanity clients or raw GROQ results.
- German and English editorial values remain explicit as documented in [`docs/i18n.md`](../../../docs/i18n.md).
- Schedules, bookings, authoritative products and prices, member accounts, and
  shop inventory remain in bsport. Sanity pricing records are reviewed display
  mirrors only, and their adapters accept existing verified bSport checkout
  URLs without constructing transactions.
