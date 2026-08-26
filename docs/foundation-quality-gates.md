# Foundation quality gates

M1-07 adds repeatable checks around the bilingual application foundation. It
does not add final SEO copy, analytics, or Sanity. The later bsport widget
integrations extend these safeguards with an exact script allowlist.

## Required checks

Run these commands from the repository root:

```bash
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
```

`npm run build` also runs `verify:production`. That follow-up check scans the
generated client assets for configured private Sanity and bsport values,
rejects known integration or analytics runtime sources, and rejects external
script tags in prerendered HTML except for the explicitly approved bsport
schedule and member-area widgets.

## Browser quality check

Start the application, then run the browser check in a second terminal:

```bash
npm run dev
npm run qa:browser
```

The check uses an installed Chrome or Chromium browser. Set
`BROWSER_EXECUTABLE_PATH` if it is not installed in a standard location. The
optional `QA_BASE_URL` and `QA_EXPECTED_SITE_ORIGIN` variables support a
non-default local server and deployment-origin verification.

It verifies:

- the home and About designs at 320 px, iPhone, Android, tablet portrait, and
  1440 px desktop viewports in German and English;
- no horizontal document overflow at those viewports;
- the correct document language;
- unique rendered titles for every German and English MVP route;
- canonical, reciprocal `de`/`en`, and `x-default` links for every route;
- Open Graph, Twitter card, favicon, and social-preview output;
- skip-link behavior and keyboard opening, Escape closing, focus management,
  and scroll locking for the mobile menu;
- reduced-motion activation; and
- desktop reflow at a 200% zoom equivalent (a 720 CSS-pixel layout viewport).

German home and About screenshots are written to
`.next/quality-screenshots/` for visual review. Build output and screenshots
are ignored by Git.

## Metadata deployment rule

Local development safely uses `http://localhost:3000`. Before a production
build, set `NEXT_PUBLIC_SITE_URL` to the public origin, for example:

```env
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

The value must be an `http` or `https` origin without a locale path, query, or
hash. The production build freezes this public value into canonical and social
metadata, so it must be correct at build time.

## Release checklist

- Install from the lockfile with `npm ci` and run every required check.
- Set and verify the production `NEXT_PUBLIC_SITE_URL`.
- Run the browser quality check against the candidate build or deployment.
- Inspect the generated mobile, tablet, and desktop screenshots for cropping,
  legibility, and unexpected visual regressions.
- Navigate the header, language selector, mobile menu, main content, footer,
  and not-found recovery links using only the keyboard.
- Confirm focus is visible, the skip link reaches main content, Escape closes
  the menu, and focus returns to the menu trigger.
- Confirm browser zoom at 200% remains operable and does not hide controls.
- Confirm reduced-motion mode removes smooth scrolling and shortens motion.
- Inspect German and English page source for the expected title, description,
  canonical, language alternates, Open Graph values, and Twitter card values.
- Confirm no browser network request loads Sanity, an unapproved bsport script,
  an Instagram embed, analytics, or an unrelated third-party script. The
  approved bsport widget must load only on schedule and member-area routes.
- Confirm decorative icons remain hidden from assistive technology and content
  photography still has meaningful localized alternative text.
- Recheck that `.env*`, credentials, local build output, and editor files are
  absent from the commit.

## M1-07 verification record

Verified on 26 August 2026:

- `lint`, `typecheck`, 59 unit/component checks, and the production build pass;
- the automated shell scan reports no critical or serious axe violations;
- the browser matrix passes across all five viewport categories and both
  locales without horizontal overflow;
- all 24 localized MVP route variants expose unique rendered titles and the
  expected canonical and language-alternate links;
- keyboard skip-link and mobile-dialog behavior pass in Chrome;
- reduced-motion and the 200% reflow equivalent pass; and
- 18 generated client assets and 28 prerendered HTML files pass the production
  output safety scan.

## Known limitations and ownership

- The axe shell test disables its color-contrast rule because jsdom does not
  calculate rendered colors. Token contrast tests and the screenshot review
  cover the current palette; the release owner must manually recheck contrast
  when new color combinations are introduced.
- The current social preview reuses the approved 1536 × 1024 home hero. Social
  platforms may crop it. Brand/design owns approval of a dedicated 1.91:1
  preview before launch.
- The favicon reuses the full approved circular logo. Brand/design owns approval
  of a small optimized derivative; the badge must not be redrawn to create it.
- Browser QA requires a locally installed Chrome/Chromium and a running app, so
  it is intentionally separate from the default production build.
- Address, contact details, opening hours, and schedule cards are visibly marked
  development data. Content ownership must verify them before launch.
- The schedule and member area currently use the supplied bsport staging widgets. The bsport
  integration owner must approve the production CDN, verify live content and
  locale behavior, review the widget's internal analytics and privacy
  implications, and repeat accessibility QA before launch. First-party
  analytics, Sanity, and Instagram embeds remain absent.
