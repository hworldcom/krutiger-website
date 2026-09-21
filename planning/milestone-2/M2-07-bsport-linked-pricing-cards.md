# M2-07 — Model bSport-linked pricing cards in Sanity

**Status:** Complete

## Outcome

Authorized editors can add, order, hide, and update website presentation cards
for memberships and monthly passes without changing code, while bSport remains
the authoritative product, price, and checkout system.

## Source-of-truth decision

Sanity stores a reviewed presentation mirror of each pricing option. The public
website uses that content only to render a card and send the visitor to the
corresponding bSport checkout URL. Sanity never creates a purchase, calculates
a charge, checks availability, or changes the bSport product.

Because the displayed price is repeated outside bSport, every card must record
when its values and destination were last verified against bSport. Editors must
update both systems deliberately when commercial terms change.

## Scope

- Add separate ordered collection schemas for membership cards and monthly-pass
  cards so their different commercial shapes remain explicit.
- Model stable internal keys, bilingual display names where needed, Euro prices
  in integer cents, access limits, and the existing application-owned benefit
  identifiers.
- Model membership duration using the supported 3-, 6-, and 12-month options.
- Keep shared membership terms such as billing day, joining fee, and automatic
  renewal application-owned for now rather than repeating them in individual
  cards.
- Model pass validity and session allowance without introducing payment logic.
- Store the exact HTTPS bSport checkout URL and reject destinations outside the
  approved bSport host and KRUTIGER company context.
- Add display order, website visibility, and the M2-03 editorial workflow to
  both card types.
- Require a bSport verification timestamp and clear editor guidance about stale
  price, benefit, and checkout-link risks.
- Add useful Studio previews showing product type, duration or validity, price,
  visibility, editorial state, and verification state.
- Update Studio navigation and schema/editor documentation for the two pricing
  collections.
- Add schema and validation tests for allowed product shapes and checkout URLs.

## Safeguards

- The bSport checkout is always the final commercial source of truth.
- Sanity values are display content only and must never be used to charge a
  customer or construct a checkout request.
- Editors must not invent or publish a card before its corresponding bSport
  product and checkout destination have been verified.
- No bSport credentials, member information, purchases, availability, or other
  operational data may be stored in Sanity.
- Removing or hiding a Sanity card does not cancel or modify its bSport product.

## Implementation notes

- Added separate `membershipCard` and `monthlyPassCard` document collections
  shaped for the existing website pricing-card models.
- Stored Euro display prices as positive integer cents and modeled limited or
  unlimited access explicitly.
- Constrained memberships to 3-, 6-, or 12-month durations and benefits to the
  existing application-owned identifiers.
- Added strict URL validation for KRUTIGER company `6720` membership and pass
  checkouts on the production `backoffice.bsport.io` host.
- Required a non-future bSport verification timestamp alongside every checkout
  destination.
- Added deterministic ordering, public visibility, editorial workflow, and
  detailed Studio previews for both card types.
- Added a Pricing cards desk area and documented the bSport verification and
  update workflow for editors.
- Added focused contract and validator tests covering allowed shapes, unsafe
  URLs, invalid access values, price formatting, and verification dates.

## Acceptance criteria

- Editors can add membership and pass presentation cards without a code change.
- Invalid product durations, access values, prices, and checkout destinations
  are rejected with actionable messages.
- Every publishable card has a stable identifier, deterministic order, explicit
  visibility, and a recorded bSport verification timestamp.
- The schema distinguishes membership cards from passes without exposing
  payment or layout controls.
- The frontend content layer can project both types into the existing pricing
  card component contracts.
- Tests prove that Sanity cards cannot point to an unrelated checkout host or
  silently omit required verification information.

## Out of scope

- Creating, updating, or deleting products in bSport
- Processing payments or validating the price charged by bSport
- Automatically synchronizing bSport products into Sanity
- Live availability, discounts, coupons, refunds, or member-specific pricing
- Allowing editors to change card layout, colors, or arbitrary benefit labels
