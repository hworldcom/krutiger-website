# M1-07 — Establish foundation quality gates

## Outcome

The completed application foundation has repeatable checks for correctness, accessibility, responsiveness, SEO basics, and production builds.

## Scope

- Add focused tests for navigation configuration and critical interactive components.
- Add an automated accessibility check for the rendered application shell.
- Verify keyboard behavior for the skip link and mobile navigation.
- Check the shell at representative mobile, tablet, and desktop viewport sizes.
- Configure default metadata and a metadata-title template.
- Verify localized metadata, canonical URLs, document language, and reciprocal language alternates.
- Add development-safe defaults for canonical base URL configuration.
- Add baseline favicon and social-preview handling using approved assets.
- Confirm that decorative images and icons do not produce redundant accessible names.
- Confirm that the production build does not load Sanity, bsport, Instagram embeds, analytics, or unrelated third-party scripts.
- Document the manual release checklist for foundation changes.

## Required automated commands

```text
lint
typecheck
test
build
```

The exact command syntax may follow the package manager chosen in M1-01.

## Manual test matrix

- 320-pixel mobile viewport
- Representative modern iPhone viewport
- Representative Android viewport
- Tablet portrait viewport
- 1440-pixel desktop viewport
- German and English route variants
- Keyboard-only navigation
- Reduced-motion preference
- Browser zoom at 200 percent

## Acceptance criteria

- All required automated commands pass from a clean installation.
- The application shell has no known critical automated accessibility violations.
- Every route has a unique document title derived from the metadata system.
- Both locale variants expose the correct document language, canonical URL, and reciprocal language alternates.
- Header, mobile menu, footer, and not-found behavior have appropriate automated coverage.
- Manual checks find no horizontal page overflow at the listed viewport sizes.
- Content remains operable at 200 percent browser zoom.
- No private environment value appears in generated client assets.
- No bsport, Sanity, Instagram, analytics, or other nonessential third-party script is loaded.
- Known limitations are documented with follow-up ownership rather than left implicit.

## Out of scope

- Full page-level SEO content
- Production analytics and consent testing
- Testing third-party bsport widgets
- Production monitoring or uptime alerts
