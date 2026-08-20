# M1-02 — Establish the brand and design foundations

**Status:** Complete

## Outcome

A documented, implementation-ready visual foundation derived from the official KRUTIGER identity.

## Context

The current brand uses a detailed circular tiger badge with Thai lettering and a black, orange, white, and red palette. The current website also uses Sak Yant-inspired artwork. The new site should preserve that authenticity while improving hierarchy, readability, and usability.

The Superjack reference demonstrates strong energy and direct calls to action. The Chímosa reference demonstrates restraint and cultural positioning. These are directional references, not templates.

## Scope

- Obtain the highest-quality approved logo assets available.
- Record the provenance and approval status of every brand asset.
- Preserve an untouched master copy of the official circular badge.
- Determine whether transparent, vector, horizontal, monochrome, and small-size variants already exist.
- Do not create a derivative logo or remove the Thai lettering without approval.
- Extract and document the exact approved color values.
- Define semantic color tokens for background, surface, text, border, primary action, and danger/error states.
- Select or propose heading and body typefaces that support German and English characters and meet performance requirements.
- Define initial spacing, container widths, breakpoints, radii, borders, shadows, and motion preferences.
- Define rules for photography and Sak Yant-inspired decorative textures.
- Review the official [KRUTIGER Instagram account](https://www.instagram.com/krutiger.muay_thai_in_berlin/) and shortlist authentic training, coaching, seminar, portrait, and community images for potential website use.
- Prefer original camera files supplied by the account owner over screenshots or Instagram-compressed downloads.
- Record the source post, photographer or rights holder, approval status, depicted-person consent, intended placement, orientation, and available resolution for every shortlisted image.
- Treat photographs containing children or other potentially vulnerable subjects as unavailable until explicit publication consent is confirmed.
- Plan for locally hosted, optimized image derivatives rather than hotlinking Instagram media or loading an Instagram embed.
- Produce representative light-on-dark and dark-on-light combinations and verify their contrast.

## Required decisions

- Whether the website will be entirely dark or use alternating light and dark sections
- Which logo variant is suitable below approximately 80 pixels
- Whether a secondary wordmark or simplified mark is already approved
- Which font files and licenses are available
- Whether orange or another approved color is the primary CTA color
- Which Instagram photographs have confirmed website-publication rights and suitable original files

## Deliverables

- Approved logo files stored in a clearly named brand-assets directory
- A short brand usage document
- A photography shortlist and rights/consent inventory, with separate desktop and mobile crop recommendations
- Design tokens represented as CSS variables and exposed to Tailwind
- At least one documented example for headings, body copy, links, buttons, and focus states

## Acceptance criteria

- The original badge remains unmodified and is traceable to its source asset.
- The token system does not rely on arbitrary one-off color values in components.
- Text, interactive controls, and focus indicators meet WCAG AA contrast requirements.
- Decorative artwork does not sit behind body copy unless readability is demonstrably preserved.
- The selected typography supports every character required by German and English content.
- Logo behavior is documented for desktop header, mobile header, footer, favicon, and social preview use.
- Every shortlisted photograph is traceable to its source and has an explicit publication status.
- No photograph is treated as production-ready when rights, depicted-person consent, or source resolution remain unknown.
- Selected images have sufficient resolution and crop-safe composition for their intended responsive placement.
- The design does not depend on Instagram being available at runtime and loads no Instagram tracking script.
- Any missing asset or approval is explicitly recorded rather than silently replaced.

## Out of scope

- Redesigning the official logo
- Producing final photography
- Downloading or publishing unapproved social-media images
- A live or automatically synchronized Instagram feed
- Final page compositions
- Implementing complex animation
