# M2-05 — Implement secure draft preview

**Status:** Planned

## Outcome

Authorized editors can open German and English draft content in the real website
layout, exit preview reliably, and verify unpublished changes without exposing
drafts or credentials publicly.

## Scope

- Implement the supported Sanity preview workflow for the selected Studio and
  Next.js versions.
- Add authenticated preview-enable and preview-disable endpoints using the
  current Next.js Draft Mode APIs.
- Validate the preview secret and requested destination before enabling Draft
  Mode.
- Prevent open redirects by accepting only known localized site routes.
- Configure a token-bearing draft client in server-only code.
- Preserve the selected locale and document destination when opening a preview.
- Show an accessible, unmistakable preview indicator with an exit action.
- Ensure preview requests bypass published-content caches as required.
- Configure Studio document locations for the supported singleton and collection
  schemas.
- Document local preview setup, required environment variables, and common
  failure modes.

## Security and privacy rules

- Draft tokens and preview secrets never reach client bundles, query strings
  retained in navigation, logs, or generated HTML.
- Preview cannot be enabled using only a document ID or guessed URL.
- Draft content is never returned to ordinary published-page requests.
- Preview URLs may target only approved first-party origins and known routes.

## Acceptance criteria

- An authenticated editor can preview an unpublished German change on its German
  route and an English change on its English route.
- Missing translation states remain visible in preview and do not fall back to
  another language.
- Unauthenticated, invalid-secret, and unsafe-destination requests are rejected.
- Exiting preview clears Draft Mode and returns the visitor to published content.
- Preview mode is visually and accessibly distinguishable from production mode.
- Automated tests cover secret validation, redirect validation, enable/disable
  behavior, locale preservation, and published-versus-draft query selection.
- Preview behavior is verified locally and against the intended preview origin.

## Out of scope

- Public user authentication
- A bespoke editorial approval system
- Previewing bsport-managed operational content
- Production deployment of the public website
