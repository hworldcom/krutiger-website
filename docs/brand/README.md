# KRUTIGER Brand Foundation

## Status

This document records the approved working direction for Milestone 1. It is implementation-ready, but it does not replace a future professional brand manual or grant rights to assets whose ownership has not been verified.

## Brand idea

KRUTIGER should feel authentic, disciplined, energetic, and rooted in Thai Muay Thai culture. Kru Tiger's experience and personality are the central differentiators. The website should feel premium without becoming polished to the point that the training loses its intensity or honesty.

The existing badge and current website are the authoritative visual starting points. [Superjack](https://superjackmuaythai.de/) is a reference for energy and direct calls to action. [Chímosa](https://www.chimosaberlin.de/) is a reference for restraint and cultural positioning. Neither reference should be copied.

## Working design direction

- Use a dark-first foundation with occasional warm, light sections to create rhythm and improve long-form readability.
- Use orange for the primary action and active emphasis.
- Use red sparingly as an expressive accent. Red must not carry meaning by itself.
- Prefer decisive typography, generous spacing, strong photography, and simple compositions.
- Avoid generic fitness gradients, neon effects, excessive distressed textures, and decorative animation.
- Do not simulate Thai cultural motifs. Only use approved artwork with understood provenance and meaning.

## Color system

The brand orange and signal red were sampled from the approved badge. Supporting neutrals were selected for accessibility and warmer visual character.

| Token              | Value     | Purpose                                    |
| ------------------ | --------- | ------------------------------------------ |
| Canvas             | `#080808` | Primary dark background and text on orange |
| Panel              | `#151515` | Dark section and card background           |
| Raised panel       | `#202020` | Elevated dark surface                      |
| Primary copy       | `#FAFAFA` | Main text on dark backgrounds              |
| Muted copy         | `#C7C1BA` | Supporting text on dark backgrounds        |
| Warm canvas        | `#F5F0E8` | Light editorial sections                   |
| Dark ink           | `#17120F` | Main text on warm backgrounds              |
| Muted dark ink     | `#6B625B` | Supporting text on warm backgrounds        |
| Border             | `#4A433D` | Dividers and component borders             |
| Brand orange       | `#F96900` | Primary CTA and brand emphasis             |
| Brand orange hover | `#FF7F24` | Hover state for primary CTA                |
| Signal red         | `#F8003D` | Limited expressive or status accent        |
| Focus              | `#FF9A57` | Keyboard focus indicator                   |

### Approved contrast pairings

| Foreground | Background | Contrast |
| ---------- | ---------- | -------- |
| `#FAFAFA`  | `#080808`  | 19.19:1  |
| `#C7C1BA`  | `#080808`  | 11.22:1  |
| `#080808`  | `#F96900`  | 6.72:1   |
| `#17120F`  | `#F5F0E8`  | 16.38:1  |
| `#6B625B`  | `#F5F0E8`  | 5.25:1   |
| `#FF9A57`  | `#151515`  | 8.71:1   |

Do not use white text on brand orange for normal-sized text; that combination measures approximately 2.85:1. Use canvas-colored text on orange instead.

## Typography

### Display — Barlow Condensed

Use Barlow Condensed at weights 600, 700, and 800 for display headings, compact labels, and strong numeric information. Uppercase is suitable for short headings and calls to action, but not long paragraphs.

### Body — Noto Sans

Use the Noto Sans variable font for body copy, navigation, form controls, captions, and long editorial content. It provides clear German and English character support, including umlauts and `ß`.

Both families are distributed under the SIL Open Font License 1.1: [Barlow Condensed license](https://github.com/google/fonts/blob/main/ofl/barlowcondensed/OFL.txt) and [Noto Sans license](https://github.com/google/fonts/blob/main/ofl/notosans/OFL.txt). They are loaded with `next/font`, which self-hosts the generated files and avoids browser requests to Google.

## Logo usage

The official circular badge at `public/brand/krutiger-badge.png` must remain unchanged.

- Do not redraw, recolor, crop, rotate, distort, outline, or remove the Thai lettering.
- Keep clear space around the badge equal to at least one eighth of its displayed diameter.
- Prefer display sizes of 80 pixels or larger so the surrounding lettering remains recognizable.
- Use the live Thai name `ครูเสือ` as the compact header wordmark. Do not crop or extract it from the badge image.
- The available master includes a black background. Place it on canvas or panel backgrounds so its square boundary disappears visually.
- Do not place the current asset directly on a light background.
- A transparent or vector asset should replace the web PNG when an approved original becomes available.
- The full badge is acceptable as a temporary development favicon but is not a final small-size solution.
- Use the full badge with ample clear space for social-preview images; combine it with live layout text rather than modifying the image.

## Layout and shape

- Default content maximum: 76rem
- Long-copy maximum: 48rem
- Narrow content maximum: 36rem
- Small custom breakpoint: 30rem
- Continue using Tailwind's standard `sm`, `md`, `lg`, `xl`, and `2xl` breakpoints.
- Use responsive section spacing between 4.5rem and 8rem.
- Controls use a small 0.25rem radius; cards use a restrained 0.75rem radius.
- Avoid excessive pill shapes. Reserve fully rounded shapes for tags and compact status labels.
- Shadows should remain subtle on dark surfaces; hierarchy should primarily come from spacing, borders, and contrast.

## Motion

- Motion should clarify state changes, not decorate static content.
- Standard transitions should complete in 150–240ms.
- Avoid parallax, long intro sequences, and animation that delays access to the schedule or trial CTA.
- Respect `prefers-reduced-motion` and remove nonessential transitions for those users.

## Photography

- Prefer real coaching, pad work, technique, class, seminar, and community moments over stock imagery.
- Prioritize visible human connection and Kru Tiger's coaching presence, not only anonymous action shots.
- Preserve natural skin tones. Avoid heavy orange overlays or high-contrast filters that obscure technique and expression.
- Leave negative space in hero selections for responsive text placement.
- Do not place important text directly over a busy photograph without a controlled solid or gradient surface.
- Use locally hosted optimized derivatives. Do not hotlink Instagram assets or load an Instagram feed.
- See [Photography inventory](./photography-inventory.md) for candidates and approval status.

## Sak Yant-inspired artwork

Decorative motifs may be used only when the artwork is approved and its use is culturally appropriate. Keep it secondary to content, normally at low contrast on a solid surface. It must never reduce text contrast or imply a meaning that has not been verified.

## Open asset follow-ups

- Obtain the original vector logo (`SVG`, `AI`, `EPS`, or print-ready `PDF`) if it exists.
- Obtain an approved transparent-background version.
- Confirm whether an official horizontal wordmark or simplified small-size mark exists.
- Create final favicon and social-preview assets only after small-size logo usage is approved.
- Obtain original Instagram files and publication permission for shortlisted photographs.
- Record photographer credit and depicted-person consent for each production image.
