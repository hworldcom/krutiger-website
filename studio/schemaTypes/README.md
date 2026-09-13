# KRUTIGER Sanity schema

## Localization

The Studio uses field-level localization. Every translatable value is stored in
one object with explicit `de` and `en` fields. German is the editorial source,
but both languages are required before publication; there is no implicit German
fallback on English pages.

Reusable types:

- `localizedString` for short plain text
- `localizedText` for multiline plain text
- `localizedRichText` for structured long-form content
- `localizedAlternativeText` for conditionally required image descriptions

## Images

`editorialImage` enables crop and hotspot controls and stores localized
alternative text, an optional localized caption, source, rights holder, usage
approval, and depicted-person consent. Images cannot pass publication
validation while rights or consent remain pending. Alternative text is required
in both languages unless an editor explicitly marks the image decorative.

## Site settings

`siteSettings` is opened through the fixed document ID `siteSettings`. It owns
the gym name, footer statement, contact information, opening information,
Instagram profile, and default SEO/social metadata. The global create menu and
document actions do not allow an accidental duplicate or deletion.

All fields on `siteSettings` are publication requirements. Sanity still saves
incomplete work as a draft, but publishing remains unavailable until validation
passes. In particular, `contactStatus` must be changed from `placeholder` to
`verified` only after KRUTIGER has checked every contact value.

## Ownership boundaries

Sanity owns editable marketing copy and approved imagery. Next.js owns routes,
layout, design tokens, interface labels, and locale behavior. bsport continues
to own schedules, bookings, memberships, prices, member authentication, and
shop data.
