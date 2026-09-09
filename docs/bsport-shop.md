# bsport shop integration

The localized `/de/shop` and `/en/shop` routes load the shop widget supplied by
bsport. Product data, availability, prices, and checkout remain owned by bsport.

## Current production configuration

- Script: `https://cdn.bsport.io/scripts/widget.js`
- Company ID: `6720`
- Widget type: `shop`
- Parent element: `bsport-widget-140155`
- Dialog mode: `1`
- Floating action button: disabled
- Full-screen popup: disabled

The public company ID can be overridden at build time with
`NEXT_PUBLIC_BSPORT_SHOP_COMPANY_ID`. The external script loads only when a
visitor opens a shop route, with localized loading and failure states supplied
by the website.

With the local app running, verify all bsport integrations in Chrome with:

```bash
npm run qa:bsport
```

## Before launch

- Confirm which products should be visible and purchasable.
- Verify prices, taxes, stock behavior, delivery or collection options, and the
  complete checkout flow.
- Confirm how the widget selects German and English.
- Review cookies, storage, payment destinations, and privacy disclosure.
- Test mobile, tablet, desktop, keyboard, zoom, and screen-reader behavior.
