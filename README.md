# Muay Thai Gym Website

## Overview

This project is a modern website for a **Muay Thai gym**.

The website should combine:

- a custom, high-quality frontend built with **Next.js**
- editable website content managed through **Sanity CMS**
- class scheduling, bookings, memberships, payments, and gift cards handled by **bsport**

The goal is to create a fast, modern, maintainable website that gives developers full control over the frontend while allowing non-technical gym staff to update day-to-day website content without touching code.

## Reference Websites

These websites are useful references for content structure, presentation, and bsport-style booking flows:

- Chímosa Berlin: https://www.chimosaberlin.de/
- Superjack Muay Thai: https://superjackmuaythai.de/

We are **not** trying to clone either website. They are references for UX, page structure, positioning, schedules, pricing, and booking integration.

---

## Core Architecture

```text
                 Gym Staff
                    |
          +---------+---------+
          |                   |
          v                   v
     Sanity CMS            bsport
   Website Content      Gym Operations
          |                   |
          +---------+---------+
                    |
                    v
               Next.js
             Public Website
                    |
                    v
                Customer
```

### Next.js

Next.js is responsible for:

- frontend rendering
- page layouts
- responsive design
- navigation
- reusable UI components
- SEO implementation
- analytics integration
- bsport widget/component integration
- performance and accessibility

### Sanity

Sanity is the CMS for content that gym staff may need to update.

Examples:

- homepage text
- hero images
- class descriptions
- coach profiles
- FAQs
- contact information
- announcements
- SEO metadata
- general marketing content

Sanity should **not** be used as a full visual page builder initially.

Developers should control layouts and components. Editors should primarily control content.

### bsport

bsport is the operational system for the gym.

It should remain the source of truth for:

- class schedule
- class bookings
- class capacity / availability
- memberships
- passes
- payments
- gift cards
- member accounts
- waitlists
- cancellations

We should avoid duplicating this business logic in our application unless there is a clear future requirement.

---

## Initial Technology Stack

### Frontend

- Next.js
- TypeScript
- React
- Tailwind CSS

### CMS

- Sanity

### Booking / Gym Management

- bsport

### Hosting

To be decided.

The application should not depend on Vercel-specific functionality unless necessary.

Possible options include:

- Vercel
- Cloudflare
- Netlify
- another Node.js-compatible hosting provider

### Analytics

To be decided.

Possible options:

- Google Analytics 4
- PostHog

---

## Initial Website Structure

The first version will likely contain the following pages:

```text
/
├── Home
├── Training
├── Schedule
├── Prices
├── Coaches
├── About
├── FAQ
├── Contact
└── Gift Cards
```

This may evolve as the content and brand direction become clearer.

## Languages

The launch website supports German as its primary language and English as its secondary language. Both languages use explicit URL prefixes (`/de/...` and `/en/...`), and the root URL resolves to the German homepage. Application-interface translations live in the frontend; future localized editorial content will be managed through Sanity.

---

## Suggested Page Responsibilities

### Home

The homepage should communicate quickly:

- what the gym is
- where it is located
- what type of Muay Thai training is offered
- who the gym is for
- how to start training
- upcoming / current schedule access
- pricing CTA
- trial class CTA

Potential sections:

```text
Hero
Introduction
Why Train Here
Training Options
Schedule Preview / CTA
Coaches
Pricing CTA
Testimonials
FAQ
Final CTA
Footer
```

### Training

Explain the available training formats.

Possible examples:

- Beginners
- All Levels
- Advanced
- Kids
- Open Training
- Private Training

The exact classes will be configured later.

Content should come from Sanity.

### Schedule

The schedule should use bsport.

Preferred MVP approach:

```text
Next.js page
    |
    v
bsport calendar widget
```

We should avoid building our own scheduling backend initially.

If the bsport widget later proves too restrictive visually, we can investigate using the bsport Public API to create a custom schedule UI.

### Prices

The visual presentation should be controlled by our website.

For example:

```text
Membership Card
- name
- display price
- short description
- benefits
- CTA
```

The CTA should lead into the appropriate bsport purchase or registration flow.

Important:

**bsport should remain the source of truth for the actual purchasable product and charged price.**

We should avoid maintaining business-critical pricing separately in multiple systems.

### Coaches

Coach profiles should be managed in Sanity.

Suggested fields:

```text
Coach
- name
- slug
- photo
- short bio
- full bio
- role
- specialties
- Instagram URL
- sort order
```

### About

CMS-managed editorial page covering:

- gym philosophy
- story
- facilities
- training culture
- location

### FAQ

FAQ entries should be managed through Sanity.

Suggested structure:

```text
FAQ
- question
- answer
- category
- sort order
```

### Contact

Potential content:

- address
- map
- email
- phone
- opening information
- social media
- contact form

### Gift Cards

Gift cards should be powered by bsport.

Possible implementation:

```text
Custom website introduction
        |
        v
bsport gift card widget / purchase flow
```

---

## Sanity Content Model

Keep the CMS intentionally simple.

Suggested document types:

```text
siteSettings
homepage
classType
coach
faq
page
announcement
testimonial
```

### siteSettings

Potential fields:

```text
gymName
address
email
phone
instagramUrl
googleMapsUrl
defaultSeoTitle
defaultSeoDescription
logo
footerText
```

### homepage

Potential fields:

```text
heroTitle
heroSubtitle
heroImage
primaryCta
introTitle
introText
featuredClasses
featuredCoaches
announcement
seo
```

### classType

Potential fields:

```text
name
slug
shortDescription
description
image
level
duration
audience
whatToBring
ctaLabel
sortOrder
```

### coach

Potential fields:

```text
name
slug
photo
shortBio
bio
specialties
instagramUrl
sortOrder
```

---

## CMS Philosophy

The CMS should allow non-technical staff to safely edit content without accidentally breaking the website.

Good CMS fields:

```text
Title
Description
Image
Coach bio
FAQ answer
Announcement
CTA label
SEO description
```

Avoid exposing unnecessary layout controls such as:

```text
margin-top
grid columns
font-size
absolute positioning
arbitrary CSS
```

Developers should own the design system.

Editors should own the content.

---

## bsport Integration Strategy

### Phase 1 — Widgets and Deep Links

Start with bsport's existing website integration tools.

Likely integrations:

- calendar / schedule widget
- pricing / pass purchase links
- gift card widget
- member account / booking flows

This keeps implementation complexity low.

### Phase 2 — Public API

Only introduce API-level integration if we need functionality that the widgets cannot provide.

Possible future examples:

- fully custom schedule UI
- homepage showing today's classes
- available-spots indicators
- custom coach schedule pages
- synchronization with internal systems
- advanced analytics

API calls should be performed server-side.

Never expose private bsport credentials in browser JavaScript.

Example future architecture:

```text
Browser
   |
   v
Next.js
   |
   v
Server-side bsport adapter
   |
   v
bsport Public API
```

---

## Integration Abstraction

Where practical, isolate bsport-specific code.

Suggested structure:

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── marketing/
│   └── bsport/
│       ├── BsportWidget.tsx
│       ├── ScheduleWidget.tsx
│       ├── GiftCardWidget.tsx
│       └── PurchaseButton.tsx
├── lib/
│   ├── sanity/
│   └── bsport/
└── types/
```

This makes it easier to:

- update bsport integration code
- test integrations
- replace a provider in the future
- keep third-party code out of normal UI components

---

## Environment Variables

Expected variables may include:

```env
NEXT_PUBLIC_SITE_URL=

NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=

NEXT_PUBLIC_BSPORT_COMPANY_ID=
NEXT_PUBLIC_BSPORT_CALENDAR_COMPANY_ID=
NEXT_PUBLIC_BSPORT_PRICING_COMPANY_ID=
NEXT_PUBLIC_BSPORT_SHOP_COMPANY_ID=

# Future API integration only
BSPORT_API_KEY=
```

Exact bsport variables will depend on the access and integration method provided by bsport.

Secrets must never use the `NEXT_PUBLIC_` prefix.

---

## Example Data Flow

### CMS content

```text
Gym manager
    |
    v
Sanity Studio
    |
    v
Sanity Content Lake
    |
    v
Next.js
    |
    v
Website visitor
```

### Booking

```text
Website visitor
    |
    v
Next.js schedule / CTA
    |
    v
bsport
    |
    +--> booking
    +--> payment
    +--> membership
    +--> account
```

---

## Design Principles

The website should feel like a premium modern Muay Thai gym rather than generic fitness software.

Priorities:

1. strong photography
2. clear typography
3. mobile-first usability
4. obvious schedule access
5. obvious trial / signup CTA
6. fast page loads
7. minimal friction between marketing content and bsport booking
8. consistent branding across website and embedded bsport experiences

---

## Responsive Design

Mobile is a first-class requirement.

Important flows must work particularly well on mobile:

- checking today's schedule
- booking a class
- buying a membership
- finding the gym
- contacting the gym
- viewing coach information

bsport widgets must be tested on:

- iPhone-sized screens
- Android-sized screens
- tablets
- desktop

---

## SEO

Initial SEO requirements:

- semantic HTML
- metadata per page
- Open Graph metadata
- structured headings
- sitemap
- robots.txt
- optimized images
- meaningful alt text
- LocalBusiness / SportsActivityLocation structured data where appropriate
- location-focused content

Sanity should expose editable SEO fields for key pages.

---

## Performance

Avoid turning the site into an unnecessarily heavy application.

Guidelines:

- prefer server components where appropriate
- lazy-load non-critical third-party scripts
- load bsport only on pages/components that require it
- optimize images
- minimize client-side JavaScript
- avoid unnecessary animation libraries
- monitor Core Web Vitals

---

## Accessibility

Minimum expectations:

- keyboard-accessible navigation
- semantic HTML
- visible focus states
- appropriate color contrast
- accessible forms
- alt text for meaningful images
- descriptive button/link labels

Third-party bsport components should also be reviewed for accessibility behavior.

---

## Analytics

We should track important business actions rather than only page views.

Potential events:

```text
view_schedule
click_book_class
click_trial_class
view_prices
click_buy_membership
click_gift_card
view_coach
click_instagram
click_directions
submit_contact_form
```

If possible, we should also understand the handoff from the website into bsport.

---

## Development Principles

### Keep business logic out of the frontend

Do not recreate:

- memberships
- credit balances
- booking eligibility
- cancellations
- waitlists
- payments

unless explicitly required.

bsport already handles these concerns.

### Keep CMS and operations separate

Sanity is for website content.

bsport is for gym operations.

Do not duplicate operational data into Sanity unless there is a strong reason.

### Build reusable components

Examples:

```text
Hero
SectionHeader
ClassCard
CoachCard
PricingCard
Testimonial
FAQAccordion
CTASection
BsportSchedule
```

### Avoid premature complexity

The first release does not need:

- custom authentication
- custom database
- custom booking backend
- custom payment processing
- custom membership engine

---

## Suggested Initial Milestones

### Milestone 1 — Foundation

- create Next.js project
- configure TypeScript
- configure Tailwind
- establish design tokens
- create global layout
- create navigation and footer

### Milestone 2 — Sanity

- create Sanity project
- configure schemas
- connect Next.js to Sanity
- implement preview workflow
- seed basic content

### Milestone 3 — Core Pages

- homepage
- training
- coaches
- about
- FAQ
- contact

### Milestone 4 — bsport

- obtain bsport account / developer information
- integrate schedule
- integrate membership purchase flows
- integrate gift cards
- test login / booking journey

### Milestone 5 — Production

- analytics
- SEO
- responsive QA
- accessibility QA
- performance testing
- domain
- production deployment

---

## Open Questions

The following items still need to be confirmed:

### Branding

- final gym name
- logo
- colors
- typography
- photography direction
- tone of voice

### Content

- exact class types
- coach profiles
- pricing structure
- FAQ content
- contact details
- gym location

### bsport

We need to confirm with bsport:

- account setup
- company ID
- widget availability
- widget customization options
- direct product / membership purchase links
- gift card integration
- Public API access
- sandbox or test environment
- available API endpoints
- webhook support
- API pricing / plan requirements

### Hosting

Select production hosting once application requirements are clearer.

---

## Non-Goals for MVP

Unless requirements change, the MVP should **not** include:

- a custom booking engine
- custom user accounts
- custom payments
- custom membership management
- a bespoke gym-management backend
- a general-purpose page builder
- complex multi-location logic

---

## Guiding Principle

The website should own the **brand and customer experience**.

Sanity should own the **editable marketing content**.

bsport should own the **gym's operational and transactional workflows**.

This separation should remain clear throughout development.

---

## Local Development

### Requirements

- Node.js 20.9 or newer
- npm 10

### Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000` after the development server starts. The environment values may remain empty during Milestone 1 because Sanity and bsport are not configured yet.

### Quality Checks

```bash
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
```

Use `npm run format` to apply the repository's formatting rules.

With the development server running, `npm run qa:browser` performs the
responsive, localized-metadata, keyboard, reduced-motion, and zoom-reflow
checks described in [the foundation quality gates](./docs/foundation-quality-gates.md).
