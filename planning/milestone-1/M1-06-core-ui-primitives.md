# M1-06 — Create the core UI primitives

**Status:** Complete

## Outcome

A deliberately small set of reusable components that establishes consistent interaction and layout patterns without becoming a general-purpose page builder.

## Scope

Create and document the initial primitives needed by the application shell and upcoming core pages:

- `Button` and button-style link variants
- `Container`
- `Section`
- `SectionHeader`
- `Logo`
- `IconLink`
- Basic content card
- Visually hidden text helper where required

Components should:

- Use semantic HTML by default.
- Use design tokens rather than arbitrary visual values.
- Support necessary variants without accepting arbitrary layout controls.
- Clearly distinguish a navigation link from a form button.
- Include hover, focus-visible, active, and disabled states where applicable.
- Avoid requiring client-side JavaScript unless interaction genuinely needs it.

## Documentation

Add a lightweight internal showcase route or another repository-native way to review component states during development. It must not ship as an indexed public page in production.

## Acceptance criteria

- Existing shell and placeholder pages consume shared primitives instead of recreating equivalent styles.
- M1-04 and M1-05 consume these primitives when the header and footer are implemented.
- Buttons and links use the correct underlying HTML element for their behavior.
- Interactive states remain distinguishable in high-contrast and keyboard usage.
- Components accept typed props and forward appropriate native attributes.
- No primitive exposes arbitrary CSS, spacing, or positioning fields intended for CMS editors.
- Decorative icons are hidden from assistive technology; meaningful icons have an accessible name.
- The component showcase demonstrates all supported variants and states.

## Out of scope

- Class, coach, pricing, testimonial, FAQ, or bsport-specific components
- A public page builder
- A full external design-system package
