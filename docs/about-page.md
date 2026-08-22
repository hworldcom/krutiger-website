# About page

The localized `/de/about` and `/en/about` routes present Kru Tiger's story as a responsive editorial timeline rather than a static recreation of the visual reference.

## Structure

- A full-width hero uses `main.png`, localized alternative text, responsive image sizing, and the Next.js 16 `preload` API because it is the page's likely Largest Contentful Paint image.
- Four ordered history chapters pair localized copy with `second.png`, `third.jpg`, `fourth.jpg`, and `fifth.jpg`.
- The final philosophy section presents Technique, Discipline, Respect, and Community as structured text with decorative inline icons.
- Desktop layouts place chapter copy beside wide archival image crops. Mobile layouts stack copy and imagery while retaining the numbered timeline.

The copy lives in the typed German and English application dictionaries. Image-to-chapter mapping and crop positions live in `src/components/marketing/about-page.tsx`.

## Visual treatment

The page uses the existing canvas, panel, line, warm-canvas, and brand-color tokens. On desktop, the text remains aligned to the shell while history images extend to the viewport's right edge, overlap toward the text column, and emerge gradually through a black-to-transparent gradient instead of a frame or hard vertical edge. The hero retains its right-side subject position and uses a transparency mask to blend its left edge into the canvas. Subtle horizontal timeline rules and restrained sepia, contrast, and saturation adjustments recall printed newspaper photography. On mobile, copy and imagery stack without the desktop overlap. The source photographs provide the archival character, so no fabricated background texture or tiger illustration is required. The approved badge asset remains unchanged.
