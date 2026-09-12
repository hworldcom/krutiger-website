# M2-03 — Build the editor experience and validation

**Status:** Planned

## Outcome

Non-technical KRUTIGER editors can find, understand, validate, and safely update
content without creating duplicate singleton documents or changing application
layout.

## Scope

- Organize the Studio desk structure around Site settings, Core pages, Training,
  Team, FAQ, and optional announcements.
- Present singleton documents as direct editing destinations rather than generic
  document lists.
- Group German and English fields consistently and label the source language.
- Add useful document previews with titles, subtitles, status, and thumbnails.
- Provide intentional ordering controls where website order matters.
- Add field descriptions for content length, CTA destinations, images,
  alternative text, and SEO usage.
- Add document-level validation for required translations, broken references,
  missing approved images, invalid links, and incomplete SEO content.
- Make placeholder, draft, and publication-ready states distinguishable.
- Restrict document actions that would create duplicate fixed-page documents.
- Document editor roles and the publish/review responsibilities agreed with the
  content owner.

## Editorial safeguards

- Do not let an editor mark dummy contact information as verified accidentally.
- Do not allow image approval or consent state to be inferred from file upload
  alone.
- Do not silently publish one language while presenting the document as fully
  translated.
- Do not expose layout, arbitrary styling, scripts, or raw HTML fields.

## Acceptance criteria

- A new editor can locate every supported content area without schema knowledge.
- The Studio prevents duplicate site settings, homepage, and About documents.
- Missing translations and image rights information produce actionable
  validation messages.
- List previews make classes, coaches, and FAQs distinguishable without opening
  every document.
- Ordering changes are deterministic and reflected in query results.
- Invalid internal and external links are rejected or clearly flagged.
- An editor can save an incomplete draft without presenting it as launch-ready.
- The editing workflow is documented with screenshots or concise instructions.

## Out of scope

- A custom approval application
- Fine-grained enterprise workflow beyond the available Sanity plan
- Editor-controlled page composition
- Automatic translation or AI-generated content
