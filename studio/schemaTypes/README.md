# KRUTIGER Sanity schema

## Localization

The Studio uses field-level localization. Every translatable value is stored in
one object with explicit `de` and `en` fields. German is the editorial source,
but both languages are required before publication; there is no implicit German
fallback on English pages.

The Studio presents the German source and English translation together wherever
localized content is edited. Document previews call out when their representative
English value is missing.

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

## Fixed pages

`homepage` and `aboutPage` use the fixed document IDs `homepage` and
`aboutPage`. Editors can update copy, calls-to-action labels, SEO metadata, and
approved images, but cannot choose components or visual styles. The homepage
does not duplicate schedule or location data: live sessions remain in bsport,
and global contact details belong to `siteSettings`.

Homepage features, About chapters, and philosophy values are ordered embedded
objects. Each has a constrained, unique `internalKey` that allows the frontend
to select its code-owned icon or visual treatment independently of its display
order.

## Collections

- `classType` describes training formats but never live sessions, capacity, or
  booking state.
- `coach` stores team biographies, specialties, approved photos, and an
  optional social profile.
- `faq` stores categorized questions and rich-text answers.
- `membershipCard` stores a reviewed presentation mirror of an existing bSport
  membership and its exact checkout destination.
- `monthlyPassCard` stores the equivalent reviewed presentation for a bSport
  training pass. The internal schema name is retained for compatibility with
  existing content.

Each collection has an explicit integer `order` and an `active` switch. Default
Studio ordering uses `order` first and a stable title second. Embedded arrays
name their one permitted object type, so incompatible documents or content
objects cannot be inserted.

Pricing cards store Euro display prices as integer cents and require a bSport
verification timestamp. Their checkout validation accepts only the approved
KRUTIGER company paths on `backoffice.bsport.io`. These records render website
cards only: they never calculate charges, create purchases, or change products
in bSport.

## Publication requirements

Fields with validation errors do not block Sanity from auto-saving a draft, but
they do block publication. All German and English content, collection ordering,
stable internal identifiers, and required image approval metadata must be
complete before publishing. Secondary About imagery and a team member's social
profile are intentionally optional.

Every document also has an editorial-state control under **Workflow**:

- **In progress** for incomplete draft content;
- **Ready for review** when an editor requests content-owner review; and
- **Publication-ready** after content and approvals have been checked.

This state is shown as a document badge and in list previews. It communicates
workflow but never bypasses schema validation or publishes a document.
Collection previews also show public visibility, ordering, and whether
representative English content has been entered.

Detailed editing and review instructions are in
[`docs/sanity-editor-guide.md`](../../docs/sanity-editor-guide.md).

## Ownership boundaries

Sanity owns editable marketing copy and approved imagery. Next.js owns routes,
layout, design tokens, interface labels, and locale behavior. bsport continues
to own schedules, bookings, memberships, prices, member authentication, and
shop data.
