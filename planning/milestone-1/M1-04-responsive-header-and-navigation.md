# M1-04 — Build the responsive header and navigation

**Status:** Complete

## Outcome

A clear, responsive navigation system that preserves the KRUTIGER identity and keeps the trial-class journey prominent.

## Scope

- Build a desktop header and a mobile header from the centralized navigation configuration.
- Use the official approved logo variant without modifying the master badge.
- Keep primary navigation focused on the highest-value destinations.
- Provide access to all remaining MVP routes through secondary navigation or the footer.
- Include a visually prominent trial-class CTA whose destination is configuration-driven.
- Include an accessible `DE` / `EN` switcher using the routing behavior defined in M1-08.
- Until bsport is available, direct the CTA to an honest internal placeholder state rather than a fake booking flow.
- Implement an accessible mobile menu.
- Define header behavior for initial, scrolled, active-route, and menu-open states.
- Respect reduced-motion preferences for menu transitions.

## Recommended primary navigation

- Home
- Training
- Schedule
- Prices
- Coaches
- About

The Thai wordmark also links to Home. FAQ, Contact, and Gift Cards may be placed in secondary navigation and the footer to avoid the crowded navigation seen on the reference sites.

## Acceptance criteria

- The current route is visually identifiable without relying only on color.
- The desktop navigation fits without overlap at all supported desktop widths.
- The mobile menu works at 320 pixels wide.
- The menu can be opened, navigated, and closed using only a keyboard.
- Focus enters the open menu predictably and returns to the trigger when it closes.
- Escape closes the mobile menu.
- Background content cannot be interacted with unintentionally while the modal menu is open.
- All controls have accessible names and visible focus indicators.
- Opening or closing the menu does not cause unexpected layout shift.
- The trial CTA destination can later be changed to a bsport deep link without changing the header component.
- The active language is identifiable without relying only on color.
- Switching languages keeps the visitor on the corresponding route when one exists.
- The language switcher has descriptive accessible labels in both locales.

## Out of scope

- bsport authentication or booking behavior
- Large multi-level or mega-menu navigation
