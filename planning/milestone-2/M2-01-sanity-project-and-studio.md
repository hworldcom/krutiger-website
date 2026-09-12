# M2-01 — Bootstrap Sanity and the Studio

**Status:** Ready

## Outcome

A reproducible Sanity project and editing application are configured for local
development and future deployment without exposing private credentials to the
browser.

## Scope

- Create or connect the official KRUTIGER Sanity project.
- Confirm and document the development and production dataset strategy.
- Install compatible Sanity and Next.js integration packages using the official
  documentation for the versions selected by the project.
- Add the Studio configuration, schema entry point, project scripts, and any
  repository structure needed to run it locally.
- Configure project ID, dataset, API version, and Studio URL through validated
  environment variables.
- Keep read tokens, preview tokens, and webhook secrets server-only.
- Configure only the localhost and deployment origins required for Studio,
  Content Lake, image, and preview access.
- Document installation, login, Studio startup, dataset selection, and deployment
  commands.
- Update the existing `src/lib/sanity` boundary to describe the implemented
  structure rather than a future placeholder.

## Required decisions and inputs

- Sanity organization and project owner
- Development and production dataset names
- Public versus private production dataset
- Repository-integrated versus separately deployed Studio
- Initial administrator and editor accounts
- Local, preview, and production origins requiring CORS access

## Security rules

- No token or secret may use a `NEXT_PUBLIC_` prefix.
- Public project and dataset identifiers must be distinguished from credentials.
- The public website must not ship the Studio application or editing packages on
  routes that do not need them.
- `.env.example` contains names and documented safe examples only, never real
  private credentials.

## Acceptance criteria

- A documented fresh setup can start both the website and Studio locally.
- The Studio connects to the intended non-production dataset during local work.
- Environment validation produces a clear error for missing or invalid required
  configuration.
- Production and development datasets cannot be confused silently.
- Private values are absent from client bundles and prerendered HTML.
- Existing website routes continue to build and run before content migration.
- `lint`, `typecheck`, `test`, and `build` pass.

## Out of scope

- Final document schemas
- Migrating production content
- Draft preview and visual editing
- Deploying the public website
