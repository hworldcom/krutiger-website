# Sanity setup and operations

## Architecture decision

The KRUTIGER Studio is maintained in this repository but built as a standalone Sanity application. It is not embedded in a Next.js route, so ordinary website routes do not load the Studio runtime or editor dependencies.

- Website development: `http://localhost:3000`
- Studio development: `http://localhost:3333`
- Hosted Studio: `https://krutiger-studio.sanity.studio`
- Sanity project: KRUTIGER (`nsznfiun`)
- Sanity Studio application: `ubywro7on9gltov2bpy3eqml`
- Editorial datasets: `development` for local and preview work, `production` for the public website

The production dataset is intended to be public because it contains public marketing content. Private datasets require a paid Sanity plan. Draft and preview access still use authenticated, server-only credentials. Revisit the visibility decision before entering any content that is not intended for publication.

## Prerequisites

- Node.js 22.12 or newer; Node.js 24 LTS is recorded in `.nvmrc`
- npm
- A Sanity account with Administrator access to the KRUTIGER project
- An approved KRUTIGER organization and editor list

After cloning the repository:

```bash
nvm use
npm ci
```

If `nvm` is not installed, use another Node version manager and select a supported Node release.

## Create or connect the project

Create the KRUTIGER organization and project in [Sanity Manage](https://www.sanity.io/manage), or ask an existing project administrator to invite your account. Keep the project under the gym-controlled organization rather than relying permanently on one person's account.

Log the local CLI into the same account:

```bash
npm run sanity:login
```

Create the datasets once, if the project does not already contain them:

```bash
npm run sanity:dataset:create -- development
npm run sanity:dataset:create -- production
npm run sanity:datasets
```

Choose public visibility only for datasets intended to contain public website content. Dataset creation changes remote project state and must be run by an authorized administrator.

## Local environment

Copy the two committed templates without placing real credentials in version control:

```bash
cp .env.example .env.local
cp studio/.env.example studio/.env.local
```

The committed templates contain the public KRUTIGER project ID. Keep the website dataset and the Studio dataset set to `development` during local work. The Studio refuses to start when a required identifier is missing or malformed, preventing it from silently connecting to the wrong dataset.

Only the following values are public:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SANITY_STUDIO_URL`
- variables beginning with `SANITY_STUDIO_`, because the Studio is a browser application

Never put a read token, revalidation secret, or deploy token in a
`NEXT_PUBLIC_` or `SANITY_STUDIO_` variable.

Draft preview requires a Sanity API token with the **Viewer** role. Create it in
Sanity Manage, store it only in the website runtime environment, and do not put
it in the Studio environment:

```dotenv
SANITY_API_READ_TOKEN=<viewer token>
```

The Presentation Tool creates and validates its own short-lived preview secret.
There is deliberately no static `SANITY_PREVIEW_SECRET` environment variable.
The hosted website must receive the Viewer token separately from the hosted
Studio.

Set the exact website origin loaded inside the Studio preview:

```dotenv
# studio/.env.local
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000

# studio/.env.production.local or the Studio build environment
SANITY_STUDIO_PREVIEW_URL=https://krutiger-website.vercel.app
```

This variable is public and must be an origin only: no locale path, query, hash,
credentials, or wildcard hostname.

## Run the website and Studio

Use two terminals:

```bash
npm run dev
```

```bash
npm run studio:dev
```

The Studio contains the bilingual schemas and editor workflow documented in
[`sanity-editor-guide.md`](./sanity-editor-guide.md). Use the `development`
dataset for local editorial work.

## CORS

Sanity permits the default Studio origin at `http://localhost:3333`. Add only exact, trusted origins required by the website preview and hosted Studio. Do not add wildcard deployment domains with credentials.

Manage origins under **Sanity Manage → Project → Settings → API settings → CORS origins**, or use the CLI:

```bash
npm run sanity:cors:list
npm run sanity:cors:add -- http://localhost:3000
```

The CLI asks whether credentials should be allowed. Enable credentials only for trusted Studio or preview origins that need authenticated browser requests. Ordinary server-side published-content requests do not require browser CORS access.

For the Presentation workflow, approve the exact local and deployed website
origins with credentials rather than approving a wildcard:

```bash
npm run sanity:cors:add -- http://localhost:3000 --credentials
npm run sanity:cors:add -- https://krutiger-website.vercel.app --credentials
```

## Draft preview

Run the website and Studio together, save a draft, then open **Preview** in the
Studio. Each supported document offers German and English website locations.
Selecting one opens the corresponding route and performs an authenticated
handshake with `/api/draft-mode/enable`.

The website accepts only the routes registered in `src/lib/routes.ts`. A valid
Sanity preview credential cannot be used to redirect to an external or unknown
destination. In Draft Mode, Sanity queries use the server-only Viewer token,
the `drafts` perspective, and no published cache. Normal visitors continue to
use anonymous published reads through the CDN.

An orange banner identifies draft content on every route. **Exit preview** sends
a same-origin POST to `/api/draft-mode/disable`, clears Draft Mode, and returns
to the same localized route. The enable URL is only a short-lived handshake;
its credential parameters are removed by the immediate redirect and must never
be copied into navigation links or logs.

Current troubleshooting:

- **503 Draft preview is not configured:** `SANITY_API_READ_TOKEN` is missing
  from the website runtime or the server was not restarted after adding it.
- **401 Invalid preview credentials/secret:** open Preview from the Studio
  again; the generated credential is missing, invalid, or expired.
- **400 Invalid preview destination:** the requested URL is not a known German
  or English route. Add real application routes to the shared route registry,
  not directly to the endpoint allowlist.
- **The iframe cannot connect:** confirm the website is running, the Studio's
  `SANITY_STUDIO_PREVIEW_URL` is exact, and the same origin is allowed in Sanity
  CORS with credentials.
- **The banner appears but content is unchanged:** confirm the document is
  saved as a draft, refresh the preview, and confirm that the route has been
  connected to the typed Sanity content layer. Initial content is populated in
  M2-06; an empty dataset intentionally uses the website's local fallback.
- **An incomplete-language warning appears:** complete the marked fields for
  the selected language. Preview never substitutes German for missing English.

## Build and deploy the Studio

Build locally using production-mode Studio variables:

```bash
npm run studio:build
npm run studio:preview
```

Before a hosted deployment, set `SANITY_STUDIO_DATASET=production` and the exact
`SANITY_STUDIO_PREVIEW_URL` in an uncommitted
`studio/.env.production.local`, review the project, dataset, and preview origin,
and then run:

```bash
npm run studio:deploy
```

The Studio is registered as application `ubywro7on9gltov2bpy3eqml` and deployed at `https://krutiger-studio.sanity.studio`. Store that public application identifier in the deployment environment; do not commit a deploy authorization token. CI deployments use the server-only `SANITY_AUTH_TOKEN` provided by the deployment platform.

## Dataset promotion

Schemas are deployed from version control. Content promotion is handled by an explicit export/import or migration process added in M2-06; production content must not be overwritten by copying the complete development dataset after editors begin working.

Before any operation that targets remote content, verify both values:

```bash
npm run sanity:datasets
```

The active project ID and dataset come from the Studio environment. Keep separate local environment files or deployment environment scopes for development and production.
