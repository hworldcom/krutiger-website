# M1-05 — Build the global footer

**Status:** Complete

## Outcome

A reusable footer that completes the application shell and gives visitors reliable access to navigation, contact, social, and legal destinations.

## Scope

- Display an approved logo treatment and a short editable brand statement.
- Include links to every MVP route that is not already prominent in the header.
- Provide structured areas for verified contact details, address, directions, and opening information.
- Include Instagram and other approved social links with descriptive accessible names.
- Include links for Impressum, privacy policy, and terms where applicable.
- Localize footer navigation, labels, and the brand statement according to M1-08.
- Display the current year without requiring manual annual edits.
- Keep contact values centralized so they can later come from Sanity `siteSettings`.

## Content safeguards

- Do not treat contact details from the legacy website as current until the client verifies them.
- Do not copy time-sensitive biography or location statements into the footer.
- Use clearly marked development placeholders for unverified information.

## Acceptance criteria

- The footer renders consistently on every route.
- All footer links are reachable and visibly focusable using a keyboard.
- Social icon links have accessible names; icons are not the only available meaning.
- Email, phone, address, and map links use appropriate link formats once verified.
- Legal destinations are present as real routes or explicitly identified placeholders.
- Footer navigation and interface copy render in the active language.
- The layout remains readable at 320 pixels without horizontal scrolling.
- Contact and social values are defined outside the visual component.

## Out of scope

- Building final legal-policy content
- Contact-form implementation
- Newsletter signup
- Live opening-hours integrations
