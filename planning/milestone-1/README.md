# Milestone 1 — Foundation

## Goal

Deliver a working, branded, responsive, bilingual Next.js application shell for the KRUTIGER website. At the end of this milestone, every planned MVP route should be reachable in German and English through a consistent header and footer, and the project should be ready for Sanity content and bsport integrations in later milestones.

## Product direction

- The existing KRUTIGER identity is the source of truth for the official logo and the association with authentic Thai Muay Thai.
- Preserve the circular tiger badge. Do not redraw or simplify it without approval.
- Use a restrained visual system derived from the existing black, orange, white, and red identity.
- Sak Yant-inspired artwork may be used as subtle texture, but it must not reduce readability.
- The official [KRUTIGER Instagram account](https://www.instagram.com/krutiger.muay_thai_in_berlin/) is an approved candidate source for authentic training and community photography, subject to the asset and consent checks in M1-02.
- Kru Tiger's experience, Thai heritage, and personality will be central to the eventual content direction.
- Chímosa and Superjack are references for structure and presentation only. The site must not copy either one.

## Milestone outcome

- A runnable and production-buildable Next.js application
- TypeScript and Tailwind CSS configured
- Documented brand tokens and approved logo handling
- Global styles, typography, layout, header, navigation, and footer
- German-first routing and English-language support
- Localized placeholder routes for the complete MVP site map
- A small reusable UI foundation
- A responsive Team page with reusable person cards ready for Sanity content
- Baseline accessibility, SEO, and performance safeguards

## Tickets

| ID    | Ticket                                                                                    | Status   | Depends on                 |
| ----- | ----------------------------------------------------------------------------------------- | -------- | -------------------------- |
| M1-01 | [Bootstrap the Next.js application](./M1-01-project-bootstrap.md)                         | Complete | —                          |
| M1-02 | [Establish the brand and design foundations](./M1-02-brand-foundations.md)                | Complete | —                          |
| M1-08 | [Establish the German and English foundation](./M1-08-bilingual-foundation.md)            | Complete | M1-01, M1-02               |
| M1-03 | [Create the application shell and MVP routes](./M1-03-application-shell-and-routes.md)    | Complete | M1-01, M1-02, M1-08        |
| M1-04 | [Build the responsive header and navigation](./M1-04-responsive-header-and-navigation.md) | Complete | M1-03, M1-06, M1-08        |
| M1-05 | [Build the global footer](./M1-05-global-footer.md)                                       | Complete | M1-03, M1-06, M1-08        |
| M1-06 | [Create the core UI primitives](./M1-06-core-ui-primitives.md)                            | Complete | M1-01, M1-02               |
| M1-07 | [Establish foundation quality gates](./M1-07-foundation-quality-gates.md)                 | Complete | M1-03–M1-06, M1-08         |
| M1-09 | [Build the Team page and reusable person cards](./M1-09-team-page-and-cards.md)           | Planned  | M1-02, M1-03, M1-06, M1-08 |

M1-01 and M1-02 can proceed in parallel. M1-08 establishes the locale contract before M1-03 creates the route shell. M1-06 can proceed alongside that work. M1-04 and M1-05 can then proceed in parallel. M1-09 builds on the completed shell, localization, brand, and UI foundations and can be implemented before its content source changes to Sanity.

## Milestone definition of done

- All nine tickets meet their acceptance criteria.
- All MVP routes render in German and English without errors on mobile and desktop.
- Header, mobile navigation, and footer work using keyboard and pointer input.
- The language switcher preserves the corresponding route and clearly identifies the active language.
- Localized pages expose the correct document language and SEO language alternates.
- The official logo is displayed according to the documented usage rules.
- `lint`, `typecheck`, `test`, and `build` checks pass.
- There are no known critical accessibility issues in the application shell.
- Sanity and bsport can be added without restructuring the application shell.

## Out of scope

- Sanity project creation, schemas, queries, previews, and production content
- bsport widgets, APIs, credentials, purchase links, or booking logic
- Final designs for the remaining content pages and complete editorial content
- Production analytics and consent management
- Custom authentication, payments, memberships, or scheduling
- A redesign of the official KRUTIGER logo
- A live Instagram feed or third-party Instagram embed
