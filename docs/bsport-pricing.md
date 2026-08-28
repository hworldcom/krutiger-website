# bsport pricing integration

The German and English pricing routes load the pass widget supplied by bsport.
The widget is isolated from the global shell and other routes.

## Current staging configuration

- Script: `https://cdn.staging.bsport.io/scripts/widget.js`
- Company ID: `14416`
- Widget type: `pass`
- Parent element: `bsport-widget-107643`
- Payment-pack category filter: none
- Private-pass category filter: none
- Dialog mode: enabled
- Floating action button: disabled
- Full-screen popup: disabled

The empty category arrays come directly from the supplied widget and allow
bsport to return all eligible payment packs and private passes for the staging
company. Product names, prices, conditions, availability, and purchases remain
owned by bsport rather than duplicated in website content.

The external script loads only when a visitor opens a pricing route. The page
provides localized loading and failure states and visibly identifies the
integration as staging.

With the local app running, verify all bsport integrations in Chrome with:

```bash
npm run qa:bsport
```

## Before production

- Obtain the production widget script URL and confirm the production company
  ID with bsport.
- Confirm the memberships and passes that should be publicly purchasable.
- Decide whether category filters should replace the empty arrays.
- Verify taxes, prices, renewal terms, cancellation terms, and purchase flows.
- Confirm how the widget selects German and English.
- Review cookies, storage, network destinations, and privacy disclosure.
- Test mobile, tablet, desktop, keyboard, zoom, and screen-reader behavior.
