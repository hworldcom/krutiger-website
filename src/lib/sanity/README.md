# Sanity application boundary

This directory is the only place where the public Next.js application may configure Sanity clients, queries, image helpers, and content projections.

M2-01 installs the official integration packages and validates the public connection settings in `environment.ts`. The website does not create a client or request content yet; M2-04 adds that server-side content layer after the schemas are stable.

## Rules

- Public project, dataset, API-version, and Studio URL values use the documented `NEXT_PUBLIC_SANITY_*` variables.
- Read tokens, preview secrets, and revalidation secrets remain server-only and never receive a `NEXT_PUBLIC_` prefix.
- Token-bearing modules must import `server-only` before accessing a secret.
- Visual components receive application-owned models rather than Sanity clients or raw GROQ results.
- German and English editorial values remain explicit as documented in [`docs/i18n.md`](../../../docs/i18n.md).
- Schedules, bookings, memberships, prices, member accounts, and shop inventory remain outside this boundary and continue to come from bsport.
