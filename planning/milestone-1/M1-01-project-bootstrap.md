# M1-01 — Bootstrap the Next.js application

**Status:** Complete

## Outcome

A clean, reproducible Next.js project that can be developed and built locally and does not depend on provider-specific hosting features.

## Scope

- Initialize Next.js with the App Router, TypeScript, React, and Tailwind CSS.
- Enable strict TypeScript settings.
- Select one package manager and commit its lockfile.
- Establish the initial `src` structure for `app`, `components`, `lib`, and `types`.
- Configure import aliases for stable internal imports.
- Add formatting and linting configuration with non-conflicting rules.
- Add scripts for development, linting, type checking, testing, and production builds.
- Add an example environment file containing names only, with no credentials.
- Document local setup and common commands.

## Suggested structure

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── marketing/
│   └── bsport/
├── lib/
│   ├── sanity/
│   └── bsport/
└── types/
```

The `sanity` and `bsport` directories may initially contain only documentation or a placeholder export. No integration code is required in this milestone.

## Acceptance criteria

- A fresh checkout can be installed and started using the documented commands.
- The development server renders the root route without errors.
- The project uses the Next.js App Router and strict TypeScript.
- Tailwind utility classes compile and render correctly.
- `lint`, `typecheck`, `test`, and `build` scripts exist and pass with the initial application.
- Exactly one package-manager lockfile is present.
- No secret, token, company ID, or environment-specific URL is committed.
- The application does not require Vercel-specific runtime functionality.

## Out of scope

- Sanity or bsport configuration
- Hosting-provider selection
- Production deployment
- Page-specific content or layouts
