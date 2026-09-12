# M2-02 — Define the bilingual content schemas

**Status:** Planned

## Outcome

Sanity has a deliberately small, validated content model for the editable
German and English content required by the current website and Milestone 3.

## Localization model

Use field-level localization. Reusable localized field types should cover:

- short strings;
- multiline text;
- rich text only where structured long-form content is genuinely needed; and
- image alternative text and captions.

Every translatable field exposes explicit `de` and `en` values. German is the
source language, but an English page must never receive German as an implicit
fallback.

## Scope

- Define reusable localized fields with shared validation and editor guidance.
- Add singleton schemas for `siteSettings`, `homepage`, and `aboutPage`.
- Add collection schemas for `classType`, `coach`, and `faq`.
- Add a constrained generic page or announcement type only where a current
  route has a concrete requirement for it.
- Model page-specific SEO titles, descriptions, share images, and image
  alternative text.
- Support intentional ordering for classes, coaches, FAQs, homepage features,
  and About-page chapters.
- Add image hotspot/crop support and fields recording source, rights holder,
  approval, and depicted-person consent where applicable.
- Use stable internal keys for fixed pages; route paths and navigation grouping
  remain application-owned.
- Document which fields are required for drafts and which are required before a
  document is publication-ready.

## Initial field coverage

### `siteSettings`

- Gym name and footer statement
- Address and map URL
- Email and telephone
- Opening hours
- Instagram profile
- Default SEO title, description, and share image

### `homepage` and `aboutPage`

- Existing headings, introductions, calls to action, sections, and images
- About chapters, value statements, and approved image metadata
- Page-specific SEO fields

### Collections

- Class name, summary, description, level, duration, audience, equipment, image,
  CTA label, and order
- Coach name, photo, biography, specialties, social link, and order
- FAQ question, answer, category, and order

## Content boundaries

- Do not model schedules, availability, booking state, subscription prices,
  member accounts, or shop inventory in Sanity; these remain in bsport.
- Do not expose arbitrary CSS, spacing, grid, font, or component-selection
  controls to editors.
- Do not copy application-interface labels from `src/i18n/dictionaries` into
  Sanity.

## Acceptance criteria

- The Studio can create and validate every initial document type.
- Singleton documents cannot be duplicated accidentally.
- Localized fields make missing German or English values visible to editors.
- Image fields require meaningful localized alternative text unless explicitly
  marked decorative.
- References and ordered lists cannot point to incompatible document types.
- Schema names, field purpose, validation, and ownership are documented.
- Generated or derived frontend types can distinguish every schema reliably.

## Out of scope

- Editor layout controls or a general-purpose page builder
- Transactional and operational bsport data
- Automated translation
- Final content entry and page rendering
