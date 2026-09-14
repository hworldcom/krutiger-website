# Sanity editor guide

The KRUTIGER Studio lets editors update bilingual marketing content without
changing the website layout or code.

- Hosted Studio: `https://krutiger-studio.sanity.studio`
- Local Studio: `http://localhost:3333`
- German is the source language.
- English must always be entered explicitly; the website never substitutes
  German content on an English page.

## Finding content

The Studio desk is organized into six destinations:

1. **Site settings** — gym identity, footer, contact information, social profile,
   and default SEO.
2. **Core pages** — Homepage and About page.
3. **Training** — reusable descriptions of training formats. Live sessions and
   bookings remain in bsport.
4. **Pricing cards** — reviewed website cards for existing bSport memberships
   and monthly passes.
5. **Team** — team-member profiles, photos, biographies, and specialties.
6. **FAQ** — categorized visitor questions and answers.

Site settings, Homepage, and About page are fixed documents. Open them directly
from the desk; do not create copies. Training classes, team members, and FAQs
are collections and may contain multiple documents.

## Editing and translation workflow

1. Open the relevant document and leave **Editorial state** as **In progress**
   while content is incomplete.
2. Enter or revise the German source value first.
3. Enter the English translation in the adjacent English field. Translate the
   meaning rather than copying German text unchanged.
4. Resolve validation messages for missing translations, invalid URLs, SEO,
   images, and required fields.
5. Select **Ready for review** and ask the content owner to check both languages.
6. After approval, select **Publication-ready** and publish the document.

The editorial-state badge is a communication aid, not a way around validation.
Sanity saves incomplete work as a draft, but validation errors prevent it from
being treated as ready for publication. Publishing is separate from changing
the editorial-state field.

## Previewing drafts

Use **Preview** to inspect unpublished content in the real KRUTIGER website
layout:

1. Save the document as a draft.
2. Open **Preview** in the Studio.
3. Choose the German or English location for that document.
4. Confirm that the orange draft-preview banner is visible on the website.
5. Refresh the preview after further edits when necessary.
6. Select **Exit preview** before checking the ordinary published page.

The two language locations are separate by design. Missing English fields stay
visible as an incomplete-draft warning and are never filled with German text.
Preview access does not publish the document. Do not share the temporary enable
URL from the browser address bar; use Sanity's controlled preview access if
preview sharing is enabled in the future.

## Ordering and visibility

Training, Pricing cards, Team, and FAQ documents contain two controls under
**Workflow**:

- **Display order:** lower numbers appear first. Use increments of 10 so a new
  item can be inserted later without renumbering everything.
- **Show on the website:** turn this off to keep a document in Sanity while
  omitting it from the public website.

Homepage features and About-page sections are ordered arrays. Drag their entries
within the document to change their order. Their internal keys select fixed
website treatments and should not be changed casually.

## Images and accessibility

Uploading an image does not establish permission to publish it. Every editorial
image requires:

- a traceable source;
- a rights holder;
- approved website usage rights;
- confirmed depicted-person consent, or an explicit statement that consent is
  not applicable; and
- meaningful German and English alternative text unless the image is genuinely
  decorative.

Use the hotspot and crop controls to keep the important subject visible across
desktop and mobile crops. If a visible caption is supplied, complete it in both
languages.

## Contact information

Contact details remain blocked from publication while **Contact information
status** is **Placeholder**. Change it to **Verified by KRUTIGER** only after the
address, map link, email, telephone, and opening information have all been
checked by the content owner. The badge at the top of Site settings makes this
state visible.

## Links and SEO

- Enter complete HTTPS URLs for maps, Instagram, and optional team social
  profiles.
- CTA destinations are fixed by the website; editors change CTA labels only.
- Complete the SEO title and description in German and English.
- Keep SEO titles at or below 65 characters and descriptions at or below 170
  characters. The Studio shows a warning when these recommendations are
  exceeded.
- Social share images follow the same rights, consent, and alternative-text
  requirements as other images.

The current schemas do not use document references, so editors cannot create a
dangling reference between these content types. This must be revisited if a
future schema introduces references.

## Membership and pass cards

Pricing cards describe existing bSport products; they do not create or modify
those products. Before publishing a card:

1. Open the corresponding product in bSport.
2. Check the name, displayed price, duration or validity, session allowance,
   benefits, and checkout destination.
3. Copy the complete checkout URL into Sanity. Only the approved KRUTIGER bSport
   membership and pass URL formats are accepted.
4. Record the current date and time under **Verified against bSport at**.
5. Complete both display-name languages, resolve validation, and follow the
   normal review workflow.

Prices are entered as integer euro cents to avoid decimal rounding: enter
`6900` for €69.00 and `10000` for €100.00. Shared membership terms such as the
billing day, joining fee, and automatic renewal remain application-owned and
must not be repeated in every card.

If commercial terms change, update bSport first and then update and re-verify
the Sanity card. Hiding or deleting the Sanity presentation does not cancel the
bSport product.

## Responsibilities

| Role                   | Responsibility                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Sanity administrator   | Manage project membership, roles, datasets, CORS, and Studio deployment.                                                             |
| Editor                 | Prepare German content and explicit English translations, record image metadata, and move work to Ready for review.                  |
| KRUTIGER content owner | Approve factual claims, contact details, translations, image rights and consent, then mark content Publication-ready and publish it. |

The actual administrator and editor accounts are configured in Sanity Manage;
their invitation remains part of the M2-01 external setup.

## Content that does not belong in Sanity

Do not copy live schedules, capacity, bookings, payment state, member accounts,
or shop inventory into Sanity. Those remain owned by bSport. Membership and
pass values belong only in the constrained Pricing-card documents as reviewed
display mirrors; bSport remains authoritative. Do not paste scripts, raw HTML,
CSS, or tracking code into content fields.
