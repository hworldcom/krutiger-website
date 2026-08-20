# Core UI primitives

The components in `src/components/ui` form the small shared UI foundation for the application shell and core pages. Import them from `@/components/ui`.

They use the tokens in `src/styles/tokens.css`, keep layout choices explicit, and intentionally do not accept arbitrary `className` or inline `style` values. Appropriate native attributes such as `id`, `aria-*`, `data-*`, button `type`, and link navigation props are forwarded.

## Components

| Component        | Purpose                                      | Supported choices                                      |
| ---------------- | -------------------------------------------- | ------------------------------------------------------ |
| `Button`         | Form and interface actions                   | `primary`, `secondary`, `ghost`; default or compact    |
| `ButtonLink`     | Navigation styled like a button              | Same visual variants and sizes as `Button`             |
| `Container`      | Horizontal page bounds and gutters           | `shell`, `copy`, `narrow`                              |
| `Section`        | Vertical rhythm and section surface          | `canvas`, `panel`, `warm`; default or compact spacing  |
| `SectionHeader`  | Eyebrow, semantic heading, and optional copy | Heading levels 1–3; page or section size; dark or ink  |
| `Logo`           | Approved KRUTIGER badge                      | Header, footer, or hero display; meaningful/decorative |
| `IconLink`       | Compact icon-only navigation                 | Requires a text label for assistive technology         |
| `ContentCard`    | General editorial grouping                   | Panel/warm; compact/default padding; flat/raised       |
| `VisuallyHidden` | Assistive text without visual layout impact  | Native span attributes                                 |

Use `Button` only for an action and `ButtonLink` when changing location. Supply `alt` to a meaningful `Logo`; pass `decorative` only when nearby content already identifies it. `IconLink` hides its icon from assistive technology and exposes its required `label` as visually hidden text.

## Development showcase

Run `npm run dev` and open `/de/dev/components` or `/en/dev/components`. The route demonstrates the supported variants, sizes, tones, heading levels, and disabled state. It has `noindex, nofollow` metadata and returns the localized not-found page outside development.
