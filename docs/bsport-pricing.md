# bsport pricing integration

The German and English pricing routes load the subscription widget supplied by
bsport. The widget is isolated from the global shell and other routes.

## Current production configuration

- Script: `https://cdn.bsport.io/scripts/widget.js`
- Company ID: `6720`
- Widget type: `subscription`
- Parent element: `bsport-widget-361765`
- Dialog mode: `3`
- Floating action button: disabled
- Full-screen popup: disabled

The empty subscription configuration comes directly from the supplied widget.
Product names, prices, conditions, availability, and purchases remain owned by
bsport rather than duplicated in website content. The public company ID can be
overridden at build time with `NEXT_PUBLIC_BSPORT_PRICING_COMPANY_ID`.

The external script loads only when a visitor opens a pricing route. The page
provides localized loading and failure states.

With the local app running, verify all bsport integrations in Chrome with:

```bash
npm run qa:bsport
```

## Before launch

- Confirm the subscriptions that should be publicly purchasable.
- Verify taxes, prices, renewal terms, cancellation terms, and purchase flows.
- Confirm how the widget selects German and English.
- Review cookies, storage, network destinations, and privacy disclosure.
- Test mobile, tablet, desktop, keyboard, zoom, and screen-reader behavior.
