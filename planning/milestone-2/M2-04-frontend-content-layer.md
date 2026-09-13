# M2-04 — Build the typed frontend content layer

**Status:** Planned

## Outcome

The Next.js application can read published Sanity content through a typed,
server-side adapter without coupling visual components directly to GROQ results.

## Scope

- Configure published-content and preview clients with an explicit API version.
- Keep token-bearing clients server-only and use the image CDN without exposing
  credentials.
- Define colocated, composable queries for site settings, homepage, About,
  classes, coaches, FAQs, bSport-linked pricing presentation cards, and SEO
  data.
- Generate or derive TypeScript types from the schemas and queries so schema
  drift becomes visible during development.
- Add a locale projection layer that accepts `de` or `en` and returns explicit
  missing-translation results rather than cross-language fallback.
- Map Sanity query results into application-owned content models before they
  reach visual components.
- Add a shared image URL helper with explicit dimensions, crop behavior, and
  high-resolution limits appropriate to each component.
- Define and document published-content caching and revalidation behavior.
- Return clear not-found, unavailable-content, and configuration states.
- Unit-test query projections, localization, malformed data, missing content,
  and image URL generation.

## Architecture rules

- GROQ and Sanity client imports remain under the `src/lib/sanity` boundary.
- Client Components receive serializable application models, not configured
  Sanity clients or private tokens.
- Route and navigation definitions remain in application code.
- Application-interface dictionaries remain separate from editorial content.
- Live or transactional bSport content must not pass through the Sanity
  adapter. Pricing presentation records from M2-07 remain clearly identified as
  reviewed display mirrors and only expose verified checkout destinations.

## Acceptance criteria

- A server-rendered test route or existing page can read published content from
  the configured dataset.
- Query and schema type mismatches fail during development or CI.
- German and English projections return only their requested language.
- Missing translations result in an explicit typed state.
- No private Sanity value appears in client assets or rendered HTML.
- Public pages do not load the Studio runtime or unnecessary Sanity JavaScript.
- Image requests are dimensioned and crop consistently at supported viewports.
- Membership and pass documents project into the existing pricing-card models
  without gaining any payment or checkout-construction behavior.
- The website retains a controlled failure state when Sanity is unavailable.

## Out of scope

- Final Milestone 3 page compositions
- Draft preview UI
- Webhooks or cache invalidation beyond the documented baseline
- Mutating Sanity content from the public website
