# M1-08 — Establish the German and English foundation

**Status:** Complete

## Outcome

The application has a reusable locale contract for German and English that M1-03, M1-04, and M1-05 can consume without inventing their own routing, translation, or metadata behavior.

## Language and URL strategy

- Support the locale codes `de` and `en`.
- Use German as the default language.
- Give both languages explicit, indexable URL prefixes: `/de/...` and `/en/...`.
- Resolve the site root to the German homepage without choosing a language solely from browser settings.
- Preserve the visitor's current page when switching languages whenever an equivalent route exists.
- Fall back to the corresponding locale homepage only when no equivalent route exists.

## Scope

- Establish a typed, centralized locale configuration.
- Establish the `[locale]` route boundary and statically generate supported locale roots.
- Add a lightweight, typed dictionary loader with a small representative set of localized shell and metadata copy.
- Add helpers for generating localized paths and replacing a path's current locale.
- Ensure the document `lang` attribute reflects the active locale.
- Establish helpers for locale-aware metadata, canonical URLs, and reciprocal `hreflang` alternates.
- Define the behavior and accessible labeling of the `DE` / `EN` switcher used by M1-04.
- Document how future Sanity content can provide German and English values without owning routing or application-shell translations.
- Keep the implementation compatible with static content and a future Node.js-compatible hosting decision.

## Content rules

- German is the source language unless a content owner explicitly approves another source.
- Do not silently display German editorial copy on an English page or English editorial copy on a German page.
- Missing translations must be visible during development and must not fail silently in production.
- Translation keys should describe meaning rather than visual placement.
- Route slugs remain stable and use the approved locale URL map; translated display labels must not determine URLs at runtime.
- User-entered data, brand names, and externally supplied bsport content must not be automatically translated.

## Acceptance criteria

- `/de` and `/en` render the corresponding localized homepage shell.
- Visiting the root resolves predictably to the German homepage.
- A tested path helper can move between equivalent German and English route paths without losing the current destination.
- The document `lang`, page title, description, canonical URL, and language alternates match the active locale.
- Unknown or unsupported locale values do not render an incorrectly labeled page.
- Locale configuration and representative shell translations are typed and centralized rather than duplicated across components.
- Automated tests cover locale validation, corresponding-path generation, and localized metadata examples.
- The architecture leaves a clear boundary for future localized Sanity content and bsport-supplied content.

## Out of scope

- Sanity project creation, localized schemas, queries, or editorial workflows
- Scaffolding the complete localized MVP route map or its placeholder copy; this belongs to M1-03
- Building the visible language-switcher control; this belongs to M1-04
- Localizing the complete footer; this belongs to M1-05
- Final page copy or professional translation of complete editorial content
- Automated or machine-translation services
- Translating content rendered inside bsport widgets
- Country, currency, timezone, or regional variants beyond language selection
